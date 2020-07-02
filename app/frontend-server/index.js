const ReactDOMServer = require('react-dom/server');
const path = require('path');
const Mali = require('mali');
const reactApp = require('./component');

const port = process.env.PORT || 8080;

const PROTO_PATH = path.resolve(__dirname, './frontend_service.proto');

const app = new Mali(PROTO_PATH, 'FrontEnd');

function getFrontEnd (ctx) {
  const DOM = ReactDOMServer.renderToString(reactApp(JSON.parse(ctx.req.props)));
  ctx.res = { dom: DOM };
}

app.use({ getFrontEnd });

app.start(`127.0.0.1:${port}`);
