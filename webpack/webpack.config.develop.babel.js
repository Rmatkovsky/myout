import webpack from 'webpack';
import WebpackNotifierPlugin from 'webpack-notifier';
import getConfig from './webpack.config.babel';

export default function (args) {
    const config = getConfig(args);

    return {
        ...config,
        entry: [
            'react-hot-loader/patch',
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            ...config.entry,
        ],

        devtool: 'cheap-module-eval-source-map',

        devServer: {
            inline: true,
            hot: false,
            host: '0.0.0.0',
            port: 3000,
            historyApiFallback: true,
        },

        plugins: [
            ...config.plugins,
            new webpack.LoaderOptionsPlugin({
                debug: true,
            }),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NamedModulesPlugin(),
            new WebpackNotifierPlugin(),
        ],

        output: {
            ...config.output,
            pathinfo: true,
        },

        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.(sass|scss)/,
                    loader:
                        'style-loader!css-loader!autoprefixer-loader?{browsers:["last 1 version", "ie >= 11"],remove:false}!sass-loader?sourceMap',
                },
                // {
                //     test: /\.js$/,
                //     loader: 'eslint-loader',
                //     enforce: 'pre',
                //     options: {
                //         fix: true,
                //     },
                //     exclude: [/node_modules/]
                // }
            ]
        }
    };
};
