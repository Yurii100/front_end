const { defineConfig } = require('@vue/cli-service');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    // Удалим все существующие экземпляры HtmlWebpackPlugin
    config.plugins = config.plugins.filter(
      plugin => !(plugin instanceof HtmlWebpackPlugin)
    );

    // Добавим наш экземпляр HtmlWebpackPlugin
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: './public/index_3.html', // Шаблон HTML
        filename: 'index.html' // Выходной файл
      })
    );

    config.plugins.push(
      new webpack.DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
      })
    );

    // Прокси настройки
    config.devServer = {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true
        }
      }
    };
  }
});


