const ReactDOMServer = require('react-dom/server');
const path = require('path');
const Mali = require('mali');
const toJSON = require('mali-tojson');
const { ChunkExtractor } = require("@loadable/server");
const reactApp = require('./dist/server/component');

const port = process.env.PORT || 8080;

const PROTO_PATH = path.resolve(__dirname, './frontend_service.proto');

const app = new Mali(PROTO_PATH, 'FrontEnd');

// Get the compiled stats file from the downstream client
const statsFile = path.resolve("./dist/client/stats.json");

async function getFrontEnd (ctx) {
  // Traverse the dep tree
  const extractor = new ChunkExtractor({ statsFile });
  const reactProps = ctx.req.props ? JSON.parse(ctx.req.props) : {};
  const jsx = extractor.collectChunks(reactApp.default(reactProps));
  // Grab all the necessary resources
  const scriptTags = extractor.getScriptTags();
  const linkTags = extractor.getLinkTags();
  const styleTags = extractor.getStyleTags();
  const DOM = ReactDOMServer.renderToString(jsx);
  const response = {
      dom: `${DOM}`,
      scriptTags: `${scriptTags}`,
      linkTags: `${linkTags}`,
      styleTags: `${styleTags}`,
  };
  ctx.res = response;
}

app.use(toJSON());
app.use({ getFrontEnd });

app.start(`127.0.0.1:${port}`);


async function shutdown (err) {
    if (err) console.error(err);
    await app.close();
    process.exit();
}

process.on('uncaughtException', shutdown);
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
