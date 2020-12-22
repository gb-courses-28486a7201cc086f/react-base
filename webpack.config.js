const { resolve } = require("path");
const path = require("path");
const webpack = require("webpack");

module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: "8180",
        publicPath: "/static/build/"
    },
    entry: {
        app: "./index.js"
    },
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "static", "build"),
        filename: "app.js"
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
            }
        ]
    }
};
