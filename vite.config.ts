import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  plugins: [viteSingleFile()]
})
