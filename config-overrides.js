const { override, overrideDevServer, fixBabelImports, addWebpackAlias, addWebpackModuleRule } = require('customize-cra');

const path = require('path')
const resolve = dir => path.join(__dirname, '.', dir)

const removeManifest = () => config => {
  config.plugins = config.plugins.filter(
      p => p.constructor.name !== "ManifestPlugin"
  );
  return config;
};

const addProxy = () => (configFunction) => {
  // configFunction.proxy = {
  //     '/api/': {
  //         target: 'https://www.api.com',
  //         changeOrigin: true,
  //         pathRewrite: { '^/api': '/' },
  //     },
  // };

  return configFunction;
}

module.exports = {
  webpack: override(
      removeManifest(),
      addWebpackAlias({
        ['@']: resolve('src')
      })
      // addLessLoader(),
  ),
  devServer: overrideDevServer(
    addProxy()
  )
}