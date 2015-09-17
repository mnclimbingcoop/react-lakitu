//var React            = require('react');
var AccessHolder     = require('./AccessHolder');
var ApiKeyForm       = require('./ApiKeyForm');
var Cardholders      = require('./Cardholders');
var CredentialSearch = require('./CredentialSearch');
var DoorList         = require('./DoorList');
var EventList        = require('./EventList');
var LakituResult     = require('./LakituResult');

/* TODO: Replace JQuery usage with something not jquery.ajax */

var DoorBox = React.createClass({

  loadDoorsFromServer: function() {
    var url = this.props.lakituUrl + 'doors';
    var apiToken = this.state.access.token;

    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken }
      success: function(json) {
        var doors = this.mapToList(json, function(door) { return door.door; });
        this.apiTokenValid("valid");
        this.setState({ doors: doors });
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
        console.error(url, status, err.toString());
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
      data: { access_token: apiToken }
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
      dataType: 'json',
      data: { access_token: apiToken },
      type: 'POST',
      success: function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid("valid");
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid("invalid");
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

module.exports = DoorBox;
