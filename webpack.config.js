const { resolve } = require("path");
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    devServer: {
        host: "0.0.0.0",
        port: "8180",
        historyApiFallback: {
            index: "index.html"
        },
    },
    devtool: "inline-source-map",
    entry: {
        app: "./index.jsx"
    },
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "static", "build"),
        filename: "./[name].bundle.js",
        publicPath: "/"
    },
    plugins: [new HtmlWebpackPlugin({
        title: "MyMessenger",
        template: './index.html'
    })],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, "src"),
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    presets: ["@babel/env", "@babel/react"]
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    }
};
