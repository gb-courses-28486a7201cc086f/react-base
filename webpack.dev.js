const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


module.exports = merge(common, {
    mode: "development",
    devServer: {
        host: "0.0.0.0",
        port: "8180",
        historyApiFallback: {
            index: "index.html"
        },
    },
    devtool: "inline-source-map",
});
