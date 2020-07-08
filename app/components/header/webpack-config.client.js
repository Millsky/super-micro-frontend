const path = require('path');
const ModuleFederationPlugin = require("webpack").container
    .ModuleFederationPlugin;
const LoadablePlugin = require("@loadable/webpack-plugin");

module.exports = {
    mode: 'production',
    entry: './component.js',
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
   optimization: {
       moduleIds: 'deterministic',
       splitChunks: {
           cacheGroups: {
               vendor: {
                   test: /node_modules/,
                   name(module, chunks, cacheGroupKey) {
                       const moduleFileName = module.identifier().split('/').reduceRight(item => item);
                       const allChunksNames = chunks.map((item) => item.name).join('~');
                       return `${cacheGroupKey}-${moduleFileName}`;
                   },
                   chunks: 'all',
                   enforce: true
               },
           }
       }
    },
    plugins: [
        new LoadablePlugin({ filename: "stats.json", writeToDisk: true }),
        new ModuleFederationPlugin({
            name: "header",
            library: { type: "var", name: "header" },
            filename: "component.js",
            exposes: {
                "./header": "./component",
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

