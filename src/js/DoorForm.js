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
      <a className="waves-effect waves-light btn" type="button" onClick={this.lock}>
        <i className="material-icons left">lock</i>
        Lock</a>
      <a className="waves-effect waves-light btn" type="button" onClick={this.unlock}>
        <i className="material-icons left">lock_open</i>
        Unlock</a>
      <a className="waves-effect waves-light btn" type="button" onClick={this.open}>
        <i className="material-icons left">lock_outline</i>
        Open</a>
      </div>
    );
  }

});

module.exports = DoorForm;
