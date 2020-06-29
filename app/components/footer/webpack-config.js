const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    component: './component.js'
  },
  optimization: {
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
  output: {
    filename: '[name]-[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
  },
}
