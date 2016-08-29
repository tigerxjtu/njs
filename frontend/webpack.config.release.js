const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        "./entry.js"
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/build/'
    },
    module: {
        loaders: [{
                test: /\.css$/,
                loader: "style!css"
            },
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /bootstrap(\\|\/)js(\\|\/)/,
                loader: 'imports?jQuery=jquery'
            }, 
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loaders: ['react-hot', 'babel' // 'babel-loader' is also a legal name to reference 
                ]
            }
        ]
    },
    babel: {
        presets: ['react', 'es2015']
    },
};