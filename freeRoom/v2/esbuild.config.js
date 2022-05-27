import esbuildServe from 'esbuild-serve'
import babel from 'esbuild-plugin-babel'

esbuildServe({
  entryPoints: ['src/index.js'],
  bundle: true,
  minify: true,
  outfile: 'dist/index.js',
  plugins: [babel({
    config: {
      "presets": [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          {
            "pragma": "dom",
            "pragmaFrag": "\'frag\'"
          }
        ]
      ]
    },
  })],
}, {
  port: 3000,
  root: 'dist',
}).then(() => {
  console.log('reload')
})
