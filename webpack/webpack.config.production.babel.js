import webpack from 'webpack';
import getConfig from './webpack.config.babel';

export default function (args) {
    const config = getConfig(args);

    return {
        ...config,
        devtool: false,
        output: {
            ...config.output,
            filename: '[name].[hash].js',
        },
        plugins: [
            ...config.plugins,
            new webpack.LoaderOptionsPlugin({
                debug: false,
            }),
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
            }),
        ],
        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.(sass|scss)/,
                    loader: 'style-loader!css-loader!resolve-url-loader!sass-loader?sourceMap',
                },
            ],
        },
    };
}
