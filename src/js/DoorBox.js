//var React            = require('react');
var AccessHolder     = require('./AccessHolder');
var ApiKeyForm       = require('./ApiKeyForm');
var Cardholders      = require('./Cardholders');
var CredentialSearch = require('./CredentialSearch');
var DoorList         = require('./DoorList');
var Events        = require('./Events');
var LakituResult     = require('./LakituResult');

var DoorBox = React.createClass({

  loadDoorsFromServer: function() {
    var url = this.props.lakituUrl + 'doors';
    var apiToken = this.state.access.token;

    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken },
      success: function(json) {
        var doors = this.mapToList(json, function(door) { return door.door; });
        this.apiTokenValid("valid");
        this.setState({ doors: doors });
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to door information.', 3000);

      }.bind(this)
    });
  },

  loadEventsFromServer: function() {
    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl + 'events';
    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken },
      success: function(json) {
        var events = this.mapToList(json, function(event) {
          return event.timestamp + '@' + event.door;
        });
        events.sort(function(a, b) {
          if ( a.timestamp < b.timestamp ) return 1;
          if ( a.timestamp > b.timestamp ) return -1;
          return 0;
        });
        this.setState({ events: events });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to load events.', 3000);
      }.bind(this)
    });
  },

  findCardholders: function(query) {
    if (!query) { return; }

    var apiToken = this.state.access.token;
    var url = this.props.lakituUrl + 'cardholders/find/' + query;
    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken },
      success: function(json) {
        var cardholders = this.mapToList(json, function(cardholder) {
          return cardholder.cardholderID + ':' + cardholder.door;
        });
        cardholders.sort(function(a, b) {
          if ( (a.forename + a.surname) < (b.forename + b.surname) ) return -1;
          if ( (a.forename + a.surname) > (b.forename + b.surname) ) return 1;
          return 0;
        });

        this.setState({ cardholders: cardholders });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to find cardholder(s).', 3000);
      }.bind(this)
    });
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

    $.ajax(url, {
      data: { access_token: apiToken },
      type: 'POST',
      success: function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid("valid");
        Materialize.toast(
          doorCommand.door + ' was ' + doorCommand.action + 'ed.', 3000, 'rounded'
        );
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
        Materialize.toast(
          'failed to ' + doorCommand.action + ' ' + doorCommand.door + ' door.' , 3000
        );

      }.bind(this)
    });
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
        Materialize.toast(
          'Access holder was updated.', 3000, 'rounded'
        );
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
        Materialize.toast(
          'Failed to update Access holder.', 3000, 'rounded'
        );
      }.bind(this)
    });
  },

  render: function() {

    var show = ( <DoorList doors={this.state.doors} onDoorSubmit={this.handleDoorSubmit} /> );

    if (this.state.show == 'events') {
      var show = ( <Events events={this.state.events} /> );
    } else if (this.state.show == 'access') {
      var show = (
        <div id="access">
          <AccessHolder onAccessHolderSubmit={this.handleAccessHolder} />
          <CredentialSearch handleSearch={this.findCardholders} />
          <Cardholders cardholders={this.state.cardholders}/>
        </div>
      );
    }

    return (
      <div className="doorBox">
        <nav>
          <div className="nav-wrapper">
            <a href="#" className="left brand-logo">
              <img src="images/lakitu.png"/>
              Lakitu
            </a>
            <ul id="nav-mobile" className="right">
              <li><a className="waves-effect waves-light" onClick={this.showDoors}>Doors</a></li>
              <li><a className="waves-effect waves-light" onClick={this.showEvents}>Events</a></li>
              <li><a className="waves-effect waves-light" onClick={this.showAccess}>Access</a></li>
            </ul>
          </div>
        </nav>
        <LakituResult commandResult={this.state.commandResult} />
        <ApiKeyForm access={this.state.access} onApiKeySubmit={this.handleApiKeySubmit} />
        {show}
      </div>
    );
  },

  showAccess: function() { this.setState({show: 'access'}); },
  showDoors: function() { this.setState({show: 'doors'}); },
  showEvents: function() { this.setState({show: 'events'}); },

  handleApiKeySubmit: function(apiToken) {
    this.setState(
      { access: { token: apiToken, success: "unknown" } },
      function() {
        this.loadDoorsFromServer();
        this.loadEventsFromServer();
      });
  },

  apiTokenValid: function(success) {
    // If the request was successful, put the token in local storage
    if (success == 'valid' && this.state.access.success == 'unknown') {
      var apiToken = this.state.access.token;
      // Or we could use sessionStorage?
      localStorage.setItem("lakituApiToken", apiToken);
    }

    this.setState({ access: { token: this.state.access.token, success: success } });
  },

  clearMessageId: function() {
    this.setState({
      commandResult: { messageId: "", md5OfMessageBody: this.state.commandResult.md5OfMessageBody },
    });
  },

  getInitialState: function() {
      // Or we could use sessionStorage?
    var apiToken = localStorage.getItem("lakituApiToken");
    return {
      access: { token: apiToken, success: "unknown" },
      commandResult: { md5OfMessageBody: "", messageId:  "" },
      cardholders: [],
      doors: [],
      events: [],
      show: 'doors'
    };
  }

});

module.exports = DoorBox;
