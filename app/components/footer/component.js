const React = require('react');

class Footer extends React.Component {
  render() {
    return React.createElement('footer', null, `this is a footer`);
  }
}

module.exports = React.createElement(Footer, {}, null);
