const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');
const path = require('path');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');

module.exports = {
    context: srcPath,
    entry: './server/index.js',
    output: {
        path: distPath,
        filename: 'server.js',
        publicPath: '/',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        ['env', {
                            targets: {
                                node: 8,
                            },
                        }],
                    ],
                },
            },
            // {
            //     test: /\.css$/,
            //     loader: 'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"]}',
            // },
            // {
            //     test: /\.(sass|scss)/,
            //     loader:
            //         'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"],remove:false}!sass-loader?sourceMap',
            // },
            {
                test: /\.gif$/,
                use: 'url-loader?limit=100&mimetype=image/gif&name=[name].[ext]?[hash]',
            },
            {
                test: /\.jpg$/,
                use: 'url-loader?limit=100&mimetype=image/jpg&name=[name].[ext]?[hash]',
            },
            {
                test: /\.png$/,
                use: 'url-loader?limit=100&mimetype=image/png&name=[name].[ext]?[hash]',
            },
            {
                test: /\.(woff|wff2|ttf|otf|eot|svg)/,
                use: 'url-loader?limit=500000&name=[name].[ext]?[hash]',
            },
            {
                test: /\.(css|sass|scss)/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    publicPath: '/',
                }),
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true,
        }),
        new webpack.NormalModuleReplacementPlugin(/dist\/axios/, (res) => {
            res.request = res.request.replace('dist/axios', 'lib/axios');
        }),
        new webpack.DefinePlugin({
            'process.env.BROWSER': false,
        }),
    ],
    externals: nodeExternals(),
};
