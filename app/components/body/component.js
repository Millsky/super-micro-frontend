const React = require('react');

class Body extends React.Component {
  render() {
    console.log('cool!');
    return React.createElement('div', null, `this is some body content`);
  }
}

module.exports = (props) => React.createElement(Body, props, null);