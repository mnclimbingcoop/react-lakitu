//var React = require('react');

var DoorForm = React.createClass({

  commandDoor: function(action, e) {
    e.preventDefault();
    this.props.onDoorSubmit({door: this.props.doorKey, action: action});
  },

  lock:   function(e) { this.commandDoor('lock', e); },
  unlock: function(e) { this.commandDoor('unlock', e); },
  open:   function(e) { this.commandDoor('open', e); },

  render: function() {
    return (
      <div className="doorButtons">
      <button type="button" onClick={this.lock} > Lock</button>
      <button type="button" onClick={this.unlock} > Unlock</button>
      <button type="button" onClick={this.open} > Open</button>
      </div>
    );
  }

});

module.exports = DoorForm;
