const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const srcPath = path.resolve(__dirname, 'src');
const distPath = path.resolve(__dirname, 'public');

const plugins = [
    new HTMLWebpackPlugin({
        title: 'Get real playlists to share with Spotify',
        template: path.resolve(__dirname, 'src/client/index.ejs'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
    }),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': '"development"',
        'process.env.BROWSER': true,
    }),
    new ExtractTextPlugin({
        filename: 'style.css',
        allChunks: true,
    }),
];

module.exports = {
    context: srcPath,
    target: 'web',
    entry: {
        client: `${srcPath}/client/index.js`,
        vendor: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-redux',
            'redux',
            // 'redux-form',
            'redux-thunk',
        ],
    },
    output: {
        path: distPath,
        filename: '[name].js',
        publicPath: '/',
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['*', '.js', '.json', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: { compact: false },
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
    plugins,
    devtool: 'source-map',
};
