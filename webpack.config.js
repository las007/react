const path = require('path');
const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
// const nodeExternals = require('webpack-node-externals');
module.exports = {
    devtool: 'inline-source-map',
    entry: {
        index: './src/index.js'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            loader:['style-loader', 'css-loader']
        }, {
            test: /\.scss$/,
            loader: ['style-loader', 'css-loader', 'sass-loader']
        }, {
            test: /\.less$/,
            loader: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                limit: 10000,
                name: 'img/[name].[hash:7].[ext]'
            }
        }, {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    devServer: {
        contentBase: './build',
        port: 8083,
        inline: true,
        hot: true,
        host: '0.0.0.0',
        // host: 'localhost',

        proxy: {
            '/api': {
                target: "http://localhost:3010",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            },
            '/weather': {
                target: 'http://api.weatherdt.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/weather': '/'
                }
            },
            '/getWeather': {
                target: 'https://yiketianqi.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/getWeather': '/'
                }
            }
        }
    },
    // externals: [nodeExternals()],
    resolve: {
        alias: {
            '@': path.resolve('src')
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            template: 'src/index.html'
        })
    ]
};
