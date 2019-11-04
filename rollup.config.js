import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve'
import url from 'rollup-plugin-url'
import svgr from '@svgr/rollup'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      extensions: ['.css', '.scss', '.less'],
      use : [
        'sass', 
        ['less', { 
          javascriptEnabled: true,
          modifyVars: {
            'font-size-base': '12px',
            'form-item-margin-bottom': '16px',
            'table-padding-vertical': '12px',
            'table-padding-horizontal':'12px',
            'btn-height-base': '27px',
            'card-padding-base': '16px',
            'card-head-padding': '12px'
          },
        }]
      ],
    }),
    url(),
    svgr(),
    babel({
      babelrc: false,
      compact: true,
      exclude: 'node_modules/**',
      "presets": [
          ["env", {
              "modules": false
          }],
          "stage-0",
          "react"
      ],
      plugins: [
        ["prismjs", {
          "languages": ["javascript", "jsx", "typescript", "tsx", "java", "sql"],
          "theme": "coy",
          "css": true
        }],
        'external-helpers', 
        'babel-plugin-styled-components'
      ]
    }),
    resolve(),
    commonjs()
  ],
}
