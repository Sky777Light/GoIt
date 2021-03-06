const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
// const webpackMergeDll = webpackMerge.strategy({plugins: 'replace'});
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3007;
const HMR = helpers.hasProcessFlag('hot');
const METADATA = webpackMerge(commonConfig({env: ENV}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});


// const DllBundlesPlugin = require('webpack-dll-bundles-plugin').DllBundlesPlugin;

module.exports = function (options) {
  return webpackMerge(commonConfig({env: ENV}), {

    devtool: 'cheap-module-source-map',
    output: {
      path: helpers.root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[file].map',
      chunkFilename: '[id].chunk.js',

      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
          include: [helpers.root('src', 'styles')]
        },
        {
          test: /\.s[ac]ss$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
          include: [helpers.root('src', 'styles')]
        },
      ]
    },

    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),

      // new DllBundlesPlugin({
      //   bundles: {
      //     polyfills: [
      //       'core-js',
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/zone.js'
      //       },
      //       {
      //         name: 'zone.js',
      //         path: 'zone.js/dist/long-stack-trace-zone.js'
      //       },
      //     ],
      //     vendor: [
      //       '@angular/platform-browser',
      //       '@angular/platform-browser-dynamic',
      //       '@angular/core',
      //       '@angular/common',
      //       '@angular/forms',
      //       '@angular/http',
      //       '@angular/router',
      //       '@angularclass/hmr',
      //       'rxjs',
      //     ]
      //   },
      //   dllDir: helpers.root('dll'),
      //   webpackConfig: webpackMergeDll(commonConfig({env: ENV}), {
      //     devtool: 'cheap-module-source-map',
      //     plugins: []
      //   })
      // }),

      // new AddAssetHtmlPlugin([
      //   { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('polyfills')}`) },
      //   { filepath: helpers.root(`dll/${DllBundlesPlugin.resolveFile('vendor')}`) }
      // ]),

      // new NamedModulesPlugin(),

      new LoaderOptionsPlugin({
        debug: true,
        options: {

        }
      }),

    ],

    devServer: {
      port: METADATA.port,
      host: METADATA.host,
      historyApiFallback: true,
      watchOptions: {
        // if you're using Docker you may need this
        // aggregateTimeout: 300,
        // poll: 1000,
        ignored: /node_modules/
      },

      setup: function(app) {
        // For example, to define custom handlers for some paths:
        // app.get('/some/path', function(req, res) {
        //   res.json({ custom: 'response' });
        // });
      }
    },

    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  });
}
