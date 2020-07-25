import React from 'react';
import ReactDOMServer from 'react-dom/server.js';
import path from 'path';
import Mali from 'mali';
import toJSON from 'mali-tojson';
import ReactApp from './dist/server.js'
import deps from './deps.js';

const port = process.env.PORT || 8080;

const __dirname = process.cwd();
const PROTO_PATH = path.resolve(__dirname, './frontend_service.proto');

const app = new Mali(PROTO_PATH, 'FrontEnd');

// Get the compiled stats file from the downstream client
const scriptTags = deps.scripts.reduce((acc, s) => `${acc}<script src="${s}" />`);

console.log(scriptTags);

async function getFrontEnd (ctx) {
  const DOM = ReactDOMServer.renderToString(React.createElement(ReactApp, null, "This is some Body"));
  const response = {
      dom: `${DOM}`,
      scriptTags,
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
