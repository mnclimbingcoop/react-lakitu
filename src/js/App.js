//var React = require('react');
/*eslint-disable */
var Lakitu = require('./Lakitu');
/*eslint-enable */

React.render(
  <Lakitu pollInterval={3000}
          lakituUrl="http://night-watchman.aaronzirbes.com:6590/" />,
  document.getElementById('app')
);
