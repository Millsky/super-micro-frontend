const React = require('react');

class Body extends React.Component {
  render() {
    return React.createElement('div', null, `this is some body content`);
  }
}

module.exports = React.createElement(Body, {}, null);
