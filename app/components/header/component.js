const React = require('react');

class Header extends React.Component {
  render() {
    return React.createElement('header', null, `this is a header`);
  }
}

module.exports = React.createElement(Header, {}, null);
