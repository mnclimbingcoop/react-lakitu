let React = require('react');

let Door = React.createClass({

  commandDoor: function(action, e) {
    let door = this.props.doorState;
    e.preventDefault();
    this.props.onDoorSubmit({door: door.door, action: action});
  },

  lock: function(e) { this.commandDoor('lock', e); },
  unlock: function(e) { this.commandDoor('unlock', e); },
  open: function(e) { this.commandDoor('open', e); },


  render: function() {
    let door = this.props.doorState;
    let icon = 'lock';
    if (door.relayState === 'set') { icon = 'lock_open'; }

    return (
      <div id={door.door} className="row door">

        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <span className="card-title">
                <div className="btn-floating btn-large black right">
                  <i className="material-icons">{icon}</i>
                </div>
                {door.doorName}
              </span>
            </div>
            <div className="card-action">
              <a href="#" className="waves-effect waves-light s3" onClick={this.lock}>
                <i className="material-icons">lock</i>
                Lock
              </a>
              <a href="#" className="waves-effect waves-light s3" onClick={this.unlock}>
                <i className="material-icons">lock_open</i>
                Unlock
              </a>
              <a href="#" className="waves-effect waves-light s3" onClick={this.open}>
                <i className="material-icons">directions_walk</i>
                Open
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Door;
