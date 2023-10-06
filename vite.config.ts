import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue()],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'NoticeVue',
			fileName: 'notice',
		},
		rollupOptions: {
			external: ['vue', '@notice-org/ntc'],
			output: {
				dir: 'lib',
				globals: {
					vue: 'Vue',
					'@notice-org/ntc': 'NTC',
				},
			},
		},
	},
})
