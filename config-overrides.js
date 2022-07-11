const {
  override,
  overrideDevServer,
  fixBabelImports,
  addWebpackAlias,
  addWebpackModuleRule,
  setWebpackOptimizationSplitChunks,
  addBundleVisualizer,
} = require("customize-cra");

const path = require("path");
const resolve = (dir) => path.join(__dirname, ".", dir);

const removeManifest = () => (config) => {
  config.plugins = config.plugins.filter(
    (p) => p.constructor.name !== "ManifestPlugin"
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
};

const closedMap = (config) => {
  config.devtool =
    config.mode === "development" ? "cheap-module-source-map" : false;
  return config;
};

module.exports = {
  webpack: override(
    addBundleVisualizer({}, true),
    removeManifest(),
    addWebpackAlias({
      ["@"]: resolve("src"),
    }),
    setWebpackOptimizationSplitChunks({
      // chunks: "all",
      // minSize: 0,
      cacheGroups: {
        dlleth: {
          test: /@ethereumjs/,
          name: "ethereumjs",
          chunks: "all",
          priority: 4,
          enforce: true,
        },
        dllethothers: {
          test: /eth.*/,
          name: "ethother",
          chunks: "all",
          priority: 3,
          enforce: true,
        },
        dllpolymers: {
          test: /(idna.*|@mui|browserify-sign|bignumber|elliptic|aes|keccak|react.*).*/,
          name: "dll-polymers",
          chunks: "all",
          priority: 3,
          enforce: true,
        },
        commons: {
          chunks: "all",
          name: "commons",
          minChunks: 2,
          reuseExistingChunk: true,
        },
      },
    }),
    closedMap
    // addLessLoader(),
  ),
  devServer: overrideDevServer(addProxy()),
};
