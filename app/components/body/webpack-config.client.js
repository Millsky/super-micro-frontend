const path = require('path');
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './component.js',
    optimization: {
        minimize: true,
        moduleIds: 'deterministic',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name(module, chunks, cacheGroupKey) {
                        const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                        console.log(moduleFileName);
                        return `${cacheGroupKey}-${moduleFileName}`;
                    },
                    chunks: 'all',
                    enforce: true
                },
            }
        }
    },
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
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    plugins: [
        new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
        new ModuleFederationPlugin({
            name: "footer",
            library: { type: "var", name: "footer" },
            filename: "component.js",
            exposes: {
                "./footer": "./component",
            },
            shared: ["react", "react-dom"],
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'dist/client'),
        filename: "[name].[contenthash].js",
        chunkFilename: "[name].js",
    },
};
