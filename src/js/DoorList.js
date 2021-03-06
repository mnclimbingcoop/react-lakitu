let React = require('react');

/* eslint-disable */
let Door = require('./Door');
/* eslint-enable */

let DoorList = React.createClass({
  render: function() {
    let onDoorSubmit = this.props.onDoorSubmit;
    let doorNodes = this.props.doors.map(function(door) {
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
