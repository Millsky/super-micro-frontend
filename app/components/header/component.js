const React = require('react');

class Header extends React.Component {
  render() {
    return React.createElement('header', null, `this is a header`);
  }
}

module.exports = (props) => React.createElement(Header, props, null);
