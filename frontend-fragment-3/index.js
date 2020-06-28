const React = require('react');
const ReactDOMServer = require('react-dom/server');
const express = require('express');

const app = express();
const port = process.env.PORT || 8080;

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

app.get('/health', (req, res) => res.json({ health: 'OK' }));

app.get('/frontend-fragment', (req, res) => {
    const DOM = ReactDOMServer.renderToString(React.createElement(Hello, {toWhat: 'Fragment 3'}, null));
    return res.json({
      data: {
        dom: DOM,
      }
    });
});

app.listen(port, () => console.log(`Application is up and running on ${port}`));
