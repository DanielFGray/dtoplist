var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports =
  { resolve:
    { extensions: ['', '.js', '.jsx']
    }
  , entry: './app/initialize.js'
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
        , loader: 'style!css'
        }
      ]
    }
  , plugins:
    [ new HtmlWebpackPlugin(
      { inject: 'body'
      , title: 'dtop lists'
      , template: 'app/assets/index.html'
      })
    , new webpack.optimize.UglifyJsPlugin(
        { compress:
          { warnings: false
          }
        }
      )
    ]
  };
