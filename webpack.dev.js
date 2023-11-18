
const {merge} = require("webpack-merge");

const config = require("./webpack.config.js");


module.exports = merge(config, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./dist",
        port: 3000,
        open: true,
        hot: true,
        historyApiFallback: true,
        

    }
});