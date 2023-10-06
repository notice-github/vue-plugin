<script setup lang="ts">
import { NTCBrowser } from '@notice-org/ntc'
import { onMounted, ref, watch } from 'vue'

const props = defineProps({
	pageId: {
		type: String,
		required: true,
	},
	lang: String,
	theme: {
		type: String,
		validator(val: string) {
			return ['light', 'dark'].includes(val)
		},
	},
	navigationType: {
		type: String,
		default: 'memory',
		validator(val: string) {
			return ['query', 'memory'].includes(val)
		},
	},
	layout: {
		type: String,
		validator(val: string) {
			return ['empty', 'page', 'full'].includes(val)
		},
	},
	metadata: Boolean,
})

const abortController = ref<AbortController>(new AbortController())
const body = ref<string | null>(null)

const vOuterHtml = {
	mounted: (el: HTMLElement) => el.replaceWith(...el.children),
}

const loadNotice = () => {
	abortController.value.abort()
	abortController.value = new AbortController()

	const { pageId, ...params } = props

	NTCBrowser.queryDocument(pageId, params, { signal: abortController.value.signal }).then((res) => {
		if (!res.ok) return
		body.value = res.data
	})
}

onMounted(() => loadNotice())
watch(
	() => props,
	() => loadNotice(),
	{ deep: true }
)
</script>

<template>
	<div v-if="body != null" v-html="body" v-outer-html></div>
	<slot v-else />
</template>
