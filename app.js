var IntlMixin     = ReactIntl.IntlMixin;
var FormattedDate = ReactIntl.FormattedDate;
var FormattedRelative = ReactIntl.FormattedRelative;

// Just adding this rather then pulling in all of underscore
// http://modernjavascript.blogspot.com/2013/08/building-better-debounce.html
var debounce = function(func, wait) {
  // we need to save these in the closure
  var timeout, args, context, timestamp;

  return function() {

    // save details of latest call
    context = this;
    args = [].slice.call(arguments, 0);
    timestamp = new Date();

    // this is where the magic happens
    var later = function() {

      // how long ago was the last call
      var last = (new Date()) - timestamp;

      // if the latest call was less that the wait period ago
      // then we reset the timeout to wait for the difference
      if (last < wait) {
        timeout = setTimeout(later, wait - last);

        // or if not we can null out the timer and run the latest
      } else {
        timeout = null;
        func.apply(context, args);
      }
    };

    // we only need to set the timer now if one isn't already running
    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
  }
};

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
    var email          = React.findDOMNode(this.refs.emailAddress).value.trim();
    var phone          = React.findDOMNode(this.refs.phoneNumber).value.trim();
    var cardNumber     = React.findDOMNode(this.refs.cardNumber).value.trim();
    var expirationDate = React.findDOMNode(this.refs.expirationDate).value.trim();

    if (!expirationDate || !firstName || !lastName) { return; }

    var accessHolder = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      phoneNumber: phone,
      cards: [ { cardNumber: cardNumber, formatName: "MNCC" } ],
      endTime: expirationDate
    }

    this.props.onAccessHolderSubmit(accessHolder);
    return;
  },

  render: function() { 
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Access Holder</h2>
        <p>
          <input type="text" required="required" placeholder="First Name" ref="firstName" />
          <input type="text" required="required" placeholder="Last Name" ref="lastName" />
        </p>
        <p>
          <input type="email" placeholder="user@domain.com" ref="emailAddress" />
          <input type="tel"
                 placeholder="(###) ###-####"
                 ref="phoneNumber"
                 pattern='[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}' />
        </p>
        <p>
          <input type="text" required="required" placeholder="Fob Number" ref="cardNumber" />
          <input type="date" required="required" placeholder="Access Expiration Date" ref="expirationDate" />
        </p>
        <button type="submit">Configure Access</button>
      </form>
    )
  }
});

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

var CredentialSearch = React.createClass({
  handleChange: function(e) {
    this.props.handleSearch(
      this.refs.query.getDOMNode().value
    );
  },

  componentWillMount: function() {
    this.lazyChange = debounce(this.handleChange, 200, function(e) {
      e.preventDefault();
    });
  },

  render: function() {
    return (
      <form className="find-access">
        <h2>Find Access Holders</h2>
        <input type="text"
               className="cred-search"
               placeholder="Search..."
               ref="query"
               value={this.props.query}
               onChange={this.lazyChange} />
      </form>
    )
  }
});


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

var EventList = React.createClass({
  render: function() {
    var eventNodes = this.props.events.map(function(event) {
      return (
          <Event key={event.key}
                 door={event.door}
                 eventType={event.eventType}
                 firstName={event.forename}
                 lastName={event.surname}
                 timestamp={event.timestamp} />
      );
    });
    return (
      <div className="eventList">
        {eventNodes}
      </div>
    );
  }
});

var Cardholders = React.createClass({
  render: function() {
    var eventNodes = this.props.cardholders.map(function(cardholder) {
      return (
        <Cardholder key={cardholder.key}
                    door={cardholder.door}
                    cardholderID={cardholder.cardholderID}
                    firstName={cardholder.forename}
                    middleName={cardholder.middleName}
                    lastName={cardholder.surname}
                    email={cardholder.email}
                    phone={cardholder.phone}
                    credentials={cardholder.credentials}
                    roles={cardholder.roles} />
      );
    });

    if (this.props.cardholders.length > 0) {
      return (
        <div className="cardholders">{eventNodes}</div>
      );
    } else {
      return (<span/>)
    }

  }
});

var Cardholder = React.createClass({
  render: function() {
    var name = this.props.firstName;
    if (this.props.middleName) {
      name = name + ' ' + this.props.middleName;
    }
    if (this.props.lastName) {
      name = name + ' ' + this.props.lastName;
    }

    var cardholder = [];
    cardholder.push( <span key="key" className="key">{this.props.key}</span> );
    if (name) { cardholder.push( <span key="name" className="name">{name}</span> ); }
    if (this.props.email) { cardholder.push( <span key="email" className="email">{this.props.email}</span> ); }
    if (this.props.phone) { cardholder.push( <span key="phone" className="phone">{this.props.phone}</span> ); }

    return (
      <div className="cardholder">
        {cardholder}
         <Roles roles={this.props.roles}/>
         <Credentials credentials={this.props.credentials} />
      </div>
    )
  }
});

var Credentials = React.createClass({
  render: function() {
    if (!this.props.credentials) { return(<span/>); };
    var credentialNodes = this.props.credentials.map(function(credential) {
      return (
        <Credential key={credential.credentialID}
                    cardNumber={credential.cardNumber}
                    endTime={credential.endTime} />
      );
    });
    return (
      <ul className="credentials">
        {credentialNodes}
      </ul>
    );
  }
});

var Credential = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    var credential = [];
    credential.push( <span key="cardNumber" className="cardNumber">{this.props.cardNumber} </span> );

    if (this.props.endTime) {
      var expires = new Date(this.props.endTime);
      credential.push( <span key="expires" className="expires"><FormattedDate value={expires} /></span> );
    }
    return (
      <li className="credential">{credential}</li>
    );
  }
});


var Roles = React.createClass({
  render: function() {
    if (!this.props.roles) { return(<span/>); };
    var schedules = this.props.roles.map(function(role) {
      return (
        <Schedule key={role.roleID} scheduleName={role.scheduleName} />
      );
    });
    return (
      <span className="roleList">
        {schedules}
      </span>
    );
  }
});

var Schedule = React.createClass({
  render: function() {
    return (
        <span className="schedule">{this.props.scheduleName}</span>
    );
  }
});


var Event = React.createClass({
  render: function() {
    var desc = this.props.eventType;
    if (this.props.firstName) {
      desc = this.props.firstName + ' ' + this.props.lastName;
    }
    return (
      <div className="event">
         <span className="door"> {this.props.door} </span> 
         <span className="desc"> {desc} </span>
         <span className="time">
           <FormattedRelative value={this.props.timestamp} />
         </span>
      </div>
    );
  }
});

var DoorBox = React.createClass({

  loadDoorsFromServer: function() {
    var url = this.props.lakituUrl + 'doors';
    var apiToken = this.state.access.token;

    if (!apiToken) { return; }

    $.getJSON(url, {access_token: apiToken})
    .done(function(json) {

      var doors = this.mapToList(json, function(door) { return door.door; });
      this.apiTokenValid("valid");
      this.setState({ doors: doors });
    }.bind(this))
    .fail(function(xhr, status, err) {
      this.apiTokenValid("invalid");
      console.error(url, status, err.toString());
    }.bind(this))
  },

  loadEventsFromServer: function() {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl + 'events';
    if (!apiToken) { return; }

    $.getJSON(url, {access_token: apiToken})
    .done(function(json) {
      var events = this.mapToList(json, function(event) {
        return event.timestamp + '@' + event.door;
      });
      events.sort(function(a, b) {
        if ( a.timestamp < b.timestamp ) return 1;
        if ( a.timestamp > b.timestamp ) return -1;
        return 0;
      });
      this.setState({ events: events });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(url, status, err.toString());
    }.bind(this))
  },

  findCardholders: function(query) {
    if (!query) { return; }

    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl + 'cardholders/find/' + query;
    if (!apiToken) { return; }

    $.getJSON(url, {access_token: apiToken})
    .done(function(json) {

      var cardholders = this.mapToList(json, function(cardholder) {
        return cardholder.cardholderID + ':' + cardholder.door;
      });
      cardholders.sort(function(a, b) {
        if ( (a.forename + a.surname) < (b.forename + b.surname) ) return -1;
        if ( (a.forename + a.surname) > (b.forename + b.surname) ) return 1;
        return 0;
      });

      this.setState({ cardholders: cardholders });
    }.bind(this))
    .fail(function(xhr, status, err) {
      console.error(url, status, err.toString());
    }.bind(this))
  },

  mapToList: function(json, getKey) {
      var things = [];
      for (var door in json) {
        if (json.hasOwnProperty(door)) {
          var stuff = json[door];
          if( Object.prototype.toString.call( stuff ) === '[object Array]' ) {
            for (var i in stuff) {
              var thing = stuff[i];
              thing.door = door;
              thing.key = getKey(thing);
              things.push(thing);
            }
          } else {
            stuff.door = door;
            stuff.key = getKey(stuff);
            things.push(stuff);
          }
        }
      }

      return things;
  },

  handleDoorSubmit: function(doorCommand) {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl +
              'doors/' + doorCommand.action + '/' + doorCommand.door;

    this.clearMessageId();

    $.post(url, {access_token: apiToken})
      .done(function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid("valid");
      }.bind(this))
      .fail(function(xhr, status, err) {
        this.apiTokenValid("invalid");
      }.bind(this));
  },

  componentDidMount: function() {
    this.loadDoorsFromServer();
    this.loadEventsFromServer();
    setInterval(this.loadDoorsFromServer, this.props.pollInterval);
    setInterval(this.loadEventsFromServer, this.props.pollInterval);
  },

  handleAccessHolder: function(accessHolder) {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl + 'access/?access_token=' + apiToken;
    var data = JSON.stringify(accessHolder)

    this.clearMessageId();

    $.ajax(url, {
      type: 'POST',
      data: data,
      contentType: 'application/json',
      success: function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid("valid");
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div className="doorBox">
        <LakituResult commandResult={this.state.commandResult} />
        <ApiKeyForm access={this.state.access} onApiKeySubmit={this.handleApiKeySubmit} />
        <DoorList doors={this.state.doors} onDoorSubmit={this.handleDoorSubmit} />
        <EventList events={this.state.events} />
        <AccessHolder onAccessHolderSubmit={this.handleAccessHolder} />
        <CredentialSearch handleSearch={this.findCardholders} />
        <Cardholders cardholders={this.state.cardholders}/>
      </div>
    );
  },

  handleApiKeySubmit: function(apiToken) {
    this.setState(
      { access: { token: apiToken, success: "unknown" } },
      function() {
        this.loadDoorsFromServer();
        this.loadEventsFromServer();
      });
  },

  apiTokenValid: function(success) {
    this.setState({ access: { token: this.state.access.token, success: success } });
  },

  clearMessageId: function() {
    this.setState({
      commandResult: { messageId: "", md5OfMessageBody: this.state.commandResult.md5OfMessageBody },
    });
  },

  getInitialState: function() {
    return {
      access: { token: "", success: "unknown" },
      commandResult: { md5OfMessageBody: "", messageId:  "" },
      cardholders: [],
      doors: [],
      events: []
    };
  }

});

React.render(
  <DoorBox
    pollInterval={3000}
    lakituUrl="http://localhost:6590/"
    />,
  document.getElementById('content')
);
