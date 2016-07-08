const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        "./entry.js"
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: "bundle.js",
        publicPath: '/build'
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

    devServer: {
        contentBase: __dirname,
        port: 3000,
        inline: true,
        hot: true,
        historyApiFallback: false,
        stats: {
            colors: true
        },
        proxy:{
            '*': 'http://127.0.0.1:3001'
        }
    },
    babel: {
        presets: ['react', 'es2015']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};