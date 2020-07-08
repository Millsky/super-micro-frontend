const path = require('path');
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
const ExtractCSSChunks = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    entry: {
        component: './component.js'
    },
    target: "async-node",
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        onlyLocals: true,
                    }
                }],
            },
        ],
    },
    optimization: {
        minimize: false,
    },
    plugins: [
        new ExtractCSSChunks({}),
    ],
    output: {
        path: path.resolve(__dirname, 'dist/server'),
        filename: "[name].js",
        libraryTarget: "commonjs2",
    },
}
