//var React = require('react');
var DoorForm = require('./DoorForm');

var Door = React.createClass({

  render: function() {
    var door = this.props.doorState;
    var doorIcon = 'door-' + door.door;

    return (
      <div id={doorIcon} className="door">
        <h2 className={door.relayState}>{door.doorName}</h2>
        <DoorForm doorKey={door.door} onDoorSubmit={this.props.onDoorSubmit} />
      </div>
    );
  }

});

module.exports = Door;
