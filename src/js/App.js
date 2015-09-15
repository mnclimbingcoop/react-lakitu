//var React = require('react');
var DoorBox = require('./DoorBox');

React.render(
  <DoorBox pollInterval={3000}
           lakituUrl="http://mncc.aaronzirbes.com:6590/" />,
  document.getElementById('app')
);
