const React = require('react');

class Hello extends React.Component {
  render() {
    return React.createElement('div', null, `Hello ${this.props.toWhat}`);
  }
}

module.exports = React.createElement(Hello, {toWhat: 'World-3'}, null);
