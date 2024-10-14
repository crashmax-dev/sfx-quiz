import { fileURLToPath } from 'node:url'
import { defineConfig, Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString())
  },
  plugins: [
    viteSingleFile(),
    replaceSvgUrl()
  ],
  build: {
    minify: true
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

function replaceSvgUrl(): Plugin {
  const svgUrl = 'http://www.w3.org/2000/svg'
  const svgUrlRegexp = new RegExp(svgUrl, 'g')
  const svgUrlBase64 = btoa(svgUrl)
  const svgUrlVariable = `const __SVG_URL__ = atob('${svgUrlBase64}');`

  return {
    name: 'vite:replace-svg-url',
    apply: 'build',
    generateBundle(_, bundle) {
      for (const bundleIndex in bundle) {
        const file = bundle[bundleIndex]
        if (file.type === 'chunk') {
          file.code =
            svgUrlVariable +
            file.code.replaceAll(svgUrlRegexp, `"+__SVG_URL__+"`)
        }
      }
    }
  }
}
