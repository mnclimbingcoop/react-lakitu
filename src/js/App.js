//var React = require('react');
var Lakitu = require('./Lakitu');

React.render(
  <Lakitu pollInterval={3000}
          lakituUrl="http://mncc.aaronzirbes.com:6590/" />,
  document.getElementById('app')
);
