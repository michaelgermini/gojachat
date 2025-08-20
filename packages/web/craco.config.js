const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // Disable source maps in development to avoid 404 errors
      if (webpackConfig.mode === 'development') {
        webpackConfig.devtool = false;
      }
      return webpackConfig;
    },
  },
};
