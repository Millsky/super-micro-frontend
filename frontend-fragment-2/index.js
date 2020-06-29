const React = require('react');
const ReactDOMServer = require('react-dom/server');
const path = require('path');
const Mali = require('mali');

const port = process.env.PORT || 8080;

const PROTO_PATH = path.resolve(__dirname, './frontend_service.proto');

const app = new Mali(PROTO_PATH, 'FrontEnd');

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

function getFrontEnd (ctx) {
  const DOM = ReactDOMServer.renderToString(
    React.createElement(Hello, {toWhat: 'World-2'}, null)
  );
  ctx.res = { dom: DOM };
}

app.use({ getFrontEnd });
app.start(`127.0.0.1:${port}`);
