let React = require('react');

/* eslint-disable */
let Chip = require('./Chip');
/* eslint-enable */

let Schedule = React.createClass({
  render: function() {
    return (
      <Chip icon="timelapse">{this.props.scheduleName}</Chip>
    );
  }
});

module.exports = Schedule;
