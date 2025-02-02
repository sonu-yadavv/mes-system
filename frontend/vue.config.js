module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions: {
          plugins: [
            require('autoprefixer'), // or other plugins
          ],
        },
      },
    },
  },
};
