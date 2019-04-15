const { ANALYZE } = process.env;
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  webpack: config => {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true,
        })
      );
    }

    config.module.rules.push({
      test: /\.md$/,
      loader: 'emit-file-loader',
      options: {
        name: 'dist/[path][name].[ext]',
      },
    });

    config.module.rules.push({
      test: /\.md$/,
      loader: 'raw-loader',
    });

    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
          name: '[name].[ext]',
        },
      },
    });

    config.module.rules.push({
      test: /\.spec.(js||jsx)$/,
      loader: 'ignore-loader',
    });

    config.module.rules.push({
      test: /\.(js||jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader',
      // options: {
      //   emitWarning: dev,
      // },
    });

    config.module.rules.push({
      test: /\.css$/,
      use: ['to-string-loader', 'css-loader'],
    });

    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'js-yaml-loader',
    });

    return config;
  },
};
