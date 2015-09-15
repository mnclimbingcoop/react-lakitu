//var React = require('react');

var Schedule = React.createClass({
  render: function() {
    return (
        <span className="schedule">{this.props.scheduleName}</span>
    );
  }
});

module.exports = Schedule;
