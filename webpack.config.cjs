const path = require('path');
const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: prod ? 'static/js/[name].[contenthash:8].js' : 'static/js/[name].js',
    chunkFilename: prod ? 'static/js/[name].[contenthash:8].chunk.js' : 'static/js/[name].chunk.js',
    publicPath: '/',
    clean: true // Clean the output directory before emit
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: !prod, // Speed up dev builds
              compilerOptions: {
                sourceMap: !prod
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          prod ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: !prod
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'postcss-preset-env', // Enables future CSS features
                  'autoprefixer' // Add vendor prefixes
                ]
              },
              sourceMap: !prod
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|svg)$/i,
        exclude: /node_modules/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 10kb - inline if smaller
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /\.md$/,
        type: 'asset/source' // This loads the MD files as raw text
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: prod
          },
          format: {
            comments: false
          }
        },
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      chunks: 'all',
      name: false
    },
    runtimeChunk: {
      name: (entrypoint) => `runtime-${entrypoint.name}`
    }
  },
  devServer: {
    historyApiFallback: true,
    open: false,
    hot: true,
    port: 3000,
    compress: true, // Enable gzip compression
    client: {
      overlay: {
        errors: true,
        warnings: false
      }
    }
  },
  devtool: prod ? false : 'source-map',
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      minify: prod
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
        : false
    }),
    new MiniCssExtractPlugin({
      filename: prod ? 'static/css/[name].[contenthash:8].css' : 'static/css/[name].css',
      chunkFilename: prod
        ? 'static/css/[name].[contenthash:8].chunk.css'
        : 'static/css/[name].chunk.css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '.',
          globOptions: {
            ignore: ['**/index.html']
          }
        },
        {
          from: path.resolve('public/locales'),
          to: path.resolve('build/locales')
        }
      ]
    })
  ],
  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
