//var React = require('react');
var DoorForm = require('./DoorForm');

var Door = React.createClass({

  render: function() {
    var door = this.props.doorState;
    var icon = 'lock';
    if (door.relayState == 'set') { icon = 'lock_open'; }

    return (
      <div id={door.door} className="door">
        <h3><i className="medium material-icons left">{icon}</i> {door.doorName}</h3>
        <DoorForm doorKey={door.door} onDoorSubmit={this.props.onDoorSubmit} />
      </div>
    );
  }

});

module.exports = Door;
