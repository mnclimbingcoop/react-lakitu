
var ApiKeyForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var accessToken = React.findDOMNode(this.refs.token).value.trim();
    if (!accessToken) { return; }
    this.props.onApiKeySubmit(accessToken);
    return;
  },

  render: function() {
    var access = this.props.access
    return (
      <form onSubmit={this.handleSubmit}>
        <input className={access.success}
               type="password"
               ref="token"
               defaultValue={access.token}/>
        <button type="submit">Update Key</button>
      </form>
    );
  }

});

var Door = React.createClass({

  render: function() {
    var door = this.props.doorState;

    return (
      <div id="door-{door.key}" className="door">
        <h2 className="door-key">
          {door.doorName}
        </h2>
        <p className="door-info">
          Lock state: {door.relayState}
        </p>
        <DoorForm doorKey={door.key} onDoorSubmit={this.props.onDoorSubmit} />
      </div>
    );
  }

});

var LakituResult = React.createClass({
  render: function() {
    var messageId = this.props.commandResult.messageId;
    var md5 = this.props.commandResult.md5OfMessageBody;
    return (
      <div className="lakituResult">Last Message Sent: {messageId}</div>
    );
  }
});

var DoorList = React.createClass({
  render: function() {
    var onDoorSubmit = this.props.onDoorSubmit;
    var doorNodes = this.props.data.map(function(door) {
      return (
          <Door key={door.key} doorState={door} onDoorSubmit={onDoorSubmit} />
      );
    });
    return (
      <div className="doorList">
        {doorNodes}
      </div>
    );
  }
});

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


var DoorBox = React.createClass({

  loadCommentsFromServer: function() {
    $.getJSON(this.props.url)
    .done(function(json) {
      this.setState({
        commandResult: this.state.commandResult,
        access: this.state.access,
        data: json
      });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(this.props.url, status, err.toString());
    }.bind(this))
  },

  handleApiKeySubmit: function(apiToken) {
    this.setState({
      commandResult: this.state.commandResult,
      access: { token: apiToken, success: "", valid: true },
      data: this.state.data
    });
  },

  handleDoorSubmit: function(doorCommand) {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl +
              'doors/' + doorCommand.action + '/' + doorCommand.door;
    $.post(url, {access_token: apiToken})
      .done(function(json) {
        this.setState({
          commandResult: json,
          access: { token: apiToken, success: "valid", valid: true },
          data: this.state.data
        });

      }.bind(this))
      .fail(function(xhr, status, err) {
        var token = this.state.access.token;
        this.setState({
          commandResult: this.state.commandResult,
          access: { token: token, success: "invalid", valid: false },
          data: this.state.data
        });
      }.bind(this));
  },

  getInitialState: function() {
    return {
      data: [],
      access: {
        token: "INVALID",
        success: "",
        valid: false
      },
      commandResult: {
        md5OfMessageBody: "",
        messageId:  ""
      }
    };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="doorBox">
        <h1>Doors</h1>
        <LakituResult commandResult={this.state.commandResult} />
        <ApiKeyForm access={this.state.access} onApiKeySubmit={this.handleApiKeySubmit} />
        <DoorList data={this.state.data} onDoorSubmit={this.handleDoorSubmit} />
      </div>
    );
  }

});

// Joonei1Eemaero6Maejucheivoo9YooB

React.render(
  <DoorBox
    url="doors.json"
    pollInterval={5000}
    lakituUrl="http://localhost:8080/"
    />,
  document.getElementById('content')
);
