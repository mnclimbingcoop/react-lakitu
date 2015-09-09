
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
    var formClass = 'api-key-' + access.success
    return (
      <form className={formClass} onSubmit={this.handleSubmit}>
        <input className={access.success}
               type="password"
               ref="token"
               defaultValue={access.token}/>
        <button type="submit">Update Key</button>
      </form>
    );
  }

});

var AccessHolder = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var firstName      = React.findDOMNode(this.refs.firstName).value.trim();
    var lastName       = React.findDOMNode(this.refs.lastName).value.trim();
    var email          = React.findDOMNode(this.refs.email).value.trim();
    var phone          = React.findDOMNode(this.refs.phone).value.trim();
    var cardNumber     = React.findDOMNode(this.refs.cardNumber).value.trim();
    var expirationDate = React.findDOMNode(this.refs.expirationDate).value.trim();

    if (!accessToken) { return; }

    var accessHolder = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: emailAddress,
      phoneNumber: phoneNumber,
      cards: [
        { cardNumber: cardNumber, formatName: "MNCC" }
      ],
      endTime: "2015-09-07T14:18:56.225"
    }

    this.props.onApiKeySubmit(accessHolder);
    return;
  },

  render: function() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Access Holder</h2>
        <p>
          <input type="text" placeholder="First Name" ref="firstName" />
          <input type="text" placeholder="Last Name" ref="lastName" />
        </p>
        <p>
          <input type="text" placeholder="Email Address" ref="emailAddress" />
          <input type="text" placeholder="Phone Number" ref="phoneNumber" />
        </p>
        <p>
          <input type="text" placeholder="Fob Number" ref="cardNumber" />
          <input type="datetime" placeholder="Access Expiration Date" ref="expirationDate" />
        </p>
        <button type="submit">Configure Access</button>
      </form>
    )
  }
});


var Door = React.createClass({

  render: function() {
    var door = this.props.doorState;
    var doorIcon = 'door-' + door.key;

    return (
      <div id={doorIcon} className="door">
        <h2 className={door.relayState}>{door.doorName}</h2>
        <DoorForm doorKey={door.key} onDoorSubmit={this.props.onDoorSubmit} />
      </div>
    );
  }

});

var LakituResult = React.createClass({
  render: function() {
    var messageId = this.props.commandResult.messageId;
    var md5 = this.props.commandResult.md5OfMessageBody;
    var lakituClass = 'lakitu-empty';
    var label = '';
    if (md5) { label = 'Last Message Sent: '; }
    if (messageId) { lakituClass = 'lakitu-updated'; }
    return (
      <div className={lakituClass}>{label}{messageId}</div>
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

  loadDoorsFromServer: function() {
    var url = this.props.lakituUrl + 'doors';
    var apiToken = this.state.access.token;

    $.getJSON(url, {access_token: apiToken})
    .done(function(json) {
      var doors = [];
      for (var key in json) {
        if (json.hasOwnProperty(key)) {
          var door = json[key];
          door.key = key;
          doors.push(door);
        }
      }
      this.apiTokenValid("valid");
      this.setState({
        commandResult: this.state.commandResult,
        access: this.state.access,
        data: doors
      });

    }.bind(this))
    .fail(function(xhr, status, err) {
      this.apiTokenValid("invalid");
      console.error(url, status, err.toString());
    }.bind(this))
  },

  handleApiKeySubmit: function(apiToken) {
    this.setState({
      commandResult: this.state.commandResult,
      access: { token: apiToken, success: "unknown" },
      data: this.state.data
    });
  },

  apiTokenValid: function(success) {
    var token = this.state.access.token;
      this.setState({
        commandResult: this.state.commandResult,
        access: { token: token, success: success },
        data: this.state.data
      });
  },

  handleDoorSubmit: function(doorCommand) {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl +
              'doors/' + doorCommand.action + '/' + doorCommand.door;

    this.setState({
      commandResult: { messageId: "", md5OfMessageBody: this.state.commandResult.md5OfMessageBody },
      access: this.state.access,
      data: this.state.data
    });

    $.post(url, {access_token: apiToken})
      .done(function(json) {
        this.setState({
          commandResult: json,
          access: this.state.access,
          data: this.state.data
        });
        this.apiTokenValid("valid");
      }.bind(this))
      .fail(function(xhr, status, err) {
        this.apiTokenValid("invalid");
      }.bind(this));
  },

  getInitialState: function() {
    return {
      data: [],
      access: { token: "", success: "unknown" },
      commandResult: { md5OfMessageBody: "", messageId:  "" }
    };
  },

  componentDidMount: function() {
    this.loadDoorsFromServer();
    setInterval(this.loadDoorsFromServer, this.props.pollInterval);
  },

  handleAccessHolder: function(accessHolder) {
    // TODO: POST json data
    console.log("add access holder" + accessHolder);
  },

  render: function() {
    return (
      <div className="doorBox">
        <LakituResult commandResult={this.state.commandResult} />
        <ApiKeyForm access={this.state.access} onApiKeySubmit={this.handleApiKeySubmit} />
        <DoorList data={this.state.data} onDoorSubmit={this.handleDoorSubmit} />
        <AccessHolder onAccessHolderSubmit={this.handleAccessHolder} />
      </div>
    );
  }

});

React.render(
  <DoorBox
    pollInterval={3000}
    lakituUrl="http://localhost:6590/"
    />,
  document.getElementById('content')
);
