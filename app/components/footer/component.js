const React = require('react');

class Footer extends React.Component {
  render() {
    return React.createElement('footer', null, `this is a footer for: ${this.props.name}`);
  }
}

module.exports = (props) => React.createElement(Footer, props, null);
