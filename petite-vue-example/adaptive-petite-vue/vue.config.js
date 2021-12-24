const HtmlWebpackPlugin = require("html-webpack-plugin")

const templateParameters = {
  "env": process.env.NODE_ENV,
  "title": "adaptive petite-vue",
  "mainChunk": "./js/chunk-vendors.js",
  "chunkVendors": "./js/index.js",
  "cssChunk": "./css/index.css",
}

const { minify } = require('html-minifier')
const { writeFileSync, readFileSync } = require('fs')
const { build } = require('esbuild')

async function minifyHTML(injectPetiteVue, injectCommon) {
  const buf = readFileSync('public/index.html', 'utf-8')
  const partiallyInjected = buf.replace('<!--COMMON-->', injectCommon)
  const injected = partiallyInjected.replace('<!--PETITEVUETGY-->', injectPetiteVue)

  const min = minify(injected, {
    collapseWhitespace: true,
    removeComments: true,
    removeOptionalTags: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeTagWhitespace: true,
    useShortDoctype: true,
    minifyCSS: true,
    minifyJS: true,
  })
  writeFileSync('dist/index.min.html', min, 'utf-8')
}

class petiteVuePlugin {
  apply(compiler) {
    compiler.hooks.run.tapPromise('petite-vue-plugin', async (compilation) => {
      await Promise.all([
        build({
          entryPoints: ['petite-vue/index.js'],
          outfile: 'dist/petite.min.js',
          minify: true,
        }),
        build({
          entryPoints: ['common/index.js'],
          outfile: 'dist/common.min.js',
          minify: true,
        }),
      ])
      await minifyHTML(
        readFileSync('dist/petite.min.js', 'utf-8'),
        readFileSync('dist/common.min.js', 'utf-8'),
      )
    })
  }
}

module.exports = {
  publicPath: "./",
  filenameHashing: false,
  pages: {
    index: {
      entry: "src/main.js",
      chunks: [ "chunk-vendors", "index" ],
      templateParameters,
    },
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new petiteVuePlugin(),
      new HtmlWebpackPlugin({
        inject: false,
        template: "dist/index.min.html",
        templateParameters,
      }),
    ],
  },
}
