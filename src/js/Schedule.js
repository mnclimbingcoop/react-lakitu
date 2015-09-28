//var React = require('react');

/* eslint-disable */
var Chip = require('./Chip');
/* eslint-enable */

var Schedule = React.createClass({
  render: function() {
    return (
      <Chip icon="timelapse">{this.props.scheduleName}</Chip>
    );
  }
});

module.exports = Schedule;
