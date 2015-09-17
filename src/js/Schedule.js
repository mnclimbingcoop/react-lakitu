//var React = require('react');
var Chip = require('./Chip');

var Schedule = React.createClass({
  render: function() {
    return (
      <Chip icon="timelapse">{this.props.scheduleName}</Chip>
    );
  }
});

module.exports = Schedule;
