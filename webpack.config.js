const path = require("path");
const webpack = require("webpack");

module.exports = {
    devServer: {
        host: "0.0.0.0",
        port: "8180"
    },
    entry: {
        app: "./index.js"
    },
    context: path.resolve(__dirname, "src"),
    output: {
        path: path.resolve(__dirname, "static", "build"),
        filename: "app.js"
    }
};
