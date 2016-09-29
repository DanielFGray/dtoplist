var fs = require('fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var WebpackDevServer = require('webpack-dev-server');
var DashboardPlugin = require('webpack-dashboard/plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

module.exports =
  { resolve:
    { extensions: ['', '.js', '.jsx']
    }
  , entry:
    [ 'react-hot-loader/patch'
    , `webpack-dev-server/client?http://0.0.0.0:${process.env.PORT || '8080'}`
    , 'webpack/hot/only-dev-server'
    , './src/initialize'
    ]
  , output:
    { path: __dirname + '/public'
    , filename: 'bundle.js'
    }
  , module:
    { preLoaders:
      [ { test: /.jsx?$/
        , exclude: /node_modules/
        , loader: 'eslint'
        }
      ]
    , loaders:
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
      , title: 'setlist'
      , template: './src/assets/index.html'
      , xhtml: true
      })
    , new DashboardPlugin()
    , new webpack.HotModuleReplacementPlugin()
    , new NpmInstallPlugin(
      { save: true
      })
    ]
  , devServer:
    { host: '0.0.0.0'
    , port: process.env.PORT || '8080'
    , contentBase: 'public/'
    , hot: true
    , inline: true
    , progress: true
    , stats: 'errors-only'
    }
  };
