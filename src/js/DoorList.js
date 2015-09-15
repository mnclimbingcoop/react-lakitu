//var React = require('react');
var Door = require('./Door');

var DoorList = React.createClass({
  render: function() {
    var onDoorSubmit = this.props.onDoorSubmit;
    var doorNodes = this.props.doors.map(function(door) {
      return (
          <Door key={door.door} doorState={door} onDoorSubmit={onDoorSubmit} />
      );
    });
    return (
      <div className="doorList">
        {doorNodes}
      </div>
    );
  }
});

module.exports = DoorList;
