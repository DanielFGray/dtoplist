var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
  { resolve:
    { extensions: ['', '.js', '.jsx']
    }
  , entry: './src/initialize.js'
  , output:
    { path: __dirname + '/public'
    , filename: 'bundle.js'
    }
  , module:
    { loaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'babel'
        }
      , { test:   /\.css$/
        , loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }
      ]
    }
  , plugins:
    [ new HtmlWebpackPlugin(
      { inject: 'body'
      , title: 'dtop lists'
        , template: './src/assets/index.html'
      })
    , new ExtractTextPlugin('styles.css')
    , new webpack.DefinePlugin(
      { 'process.env':
        { 'NODE_ENV': JSON.stringify('production')
        }
      })
    , new webpack.optimize.DedupePlugin()
    , new webpack.optimize.UglifyJsPlugin(
        { compress:
          { warnings: false
          }
        }
      )
    ]
  };
