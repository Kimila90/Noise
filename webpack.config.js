const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.sass$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            }
        ],
    },
    
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new CopyPlugin({
            patterns: [
                {from:'./src/assets',to:'assets'} 
            ]
        }),
    ],
    experiments: {
        topLevelAwait: true
    }
}