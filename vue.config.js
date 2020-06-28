module.exports = {
  devServer: {
    port: 80,
    proxy: {
      '/test/': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/test': '',
        },
      },
    },
  },
};
