// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
//   };
   const { injectBabelPlugin } = require('react-app-rewired');
  module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd-mobile', style: 'css' }], config);
    return config;
  };