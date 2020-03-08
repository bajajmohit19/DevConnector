const { override, fixBabelImports } = require('customize-cra');


module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css',
  }),
  {
    babel: {
      plugins: [
        [
          '@babel/plugin-proposal-decorators',
          {
            https:babeljs.io/blog/2018/09/17/decorators,
            // https://github.com/mobxjs/mobx/issues/1352
            legacy: true
          }
        ]
      ]
    },
  }
);