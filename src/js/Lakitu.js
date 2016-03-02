let React = require('react');

/* eslint-disable */
let AccessHolder = require('./AccessHolder');
let ApiKeyForm = require('./ApiKeyForm');
let Cardholders = require('./Cardholders');
let CredentialSearch = require('./CredentialSearch');
let DoorList = require('./DoorList');
let Events = require('./Events');
let LakituResult = require('./LakituResult');
let LakituHeader = require('./LakituHeader');
/* eslint-enable */

let Lakitu = React.createClass({

  loadDoorsFromServer: function() {
    let url = this.props.lakituUrl + 'doors';
    let apiToken = this.state.access.token;

    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken }, // eslint-disable-line camelcase
      success: function(json) {
        let doors = this.mapToList(json, function(door) { return door.door; });
        this.apiTokenValid('valid');
        this.setState({ doors: doors });
      }.bind(this),
      error: function(xhr, status, err) {
        this.apiTokenValid('invalid');
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to door information.', 3000);

      }.bind(this)
    });
  },

  loadEventsFromServer: function() {
    let apiToken = this.state.access.token;
    let url = this.props.lakituUrl + 'events';
    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken }, // eslint-disable-line camelcase
      success: function(json) {
        let events = this.mapToList(json, function(event) {
          return event.timestamp + '@' + event.door;
        });
        events.sort(function(a, b) {
          if ( a.timestamp < b.timestamp ) {
              return 1;
          }
          if ( a.timestamp > b.timestamp ) {
              return -1;
          }
          return 0;
        }).bind(this);
        this.setState({ events: events });
      },
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to load events.', 3000);
      }
    });
  },

  findCardholders: function(query) {
    if (!query) { return; }

    let apiToken = this.state.access.token;
    let url = this.props.lakituUrl + 'cardholders/find/' + query;
    if (!apiToken) { return; }

    $.ajax(url, {
      dataType: 'json',
      data: { access_token: apiToken }, // eslint-disable-line camelcase
      success: function(json) {
        let cardholders = this.mapToList(json, function(cardholder) {
          return cardholder.cardholderID + ':' + cardholder.door;
        });
        cardholders.sort(function(a, b) {
          if ( (a.forename + a.surname) < (b.forename + b.surname) ) {
              return -1;
          }
          if ( (a.forename + a.surname) > (b.forename + b.surname) ) {
              return 1;
          }
          return 0;
        });

        this.setState({ cardholders: cardholders });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(url, status, err.toString());
        Materialize.toast( 'Failed to find cardholder(s).', 3000);
      }
    });
  },

  mapToList: function(json, getKey) {
      let things = [];
      for (let door in json) {
        if (json.hasOwnProperty(door)) {
          let stuff = json[door];
          if( Object.prototype.toString.call( stuff ) === '[object Array]' ) {
            for (let i in stuff) {
              let thing = stuff[i];
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
    let apiToken = this.state.access.token;
    let url = this.props.lakituUrl +
              'doors/' + doorCommand.action + '/' + doorCommand.door;

    this.clearMessageId();

    $.ajax(url, {
      data: { access_token: apiToken }, // eslint-disable-line camelcase
      type: 'POST',
      success: function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid('valid');
        Materialize.toast(
          doorCommand.door + ' was ' + doorCommand.action + 'ed.', 3000, 'rounded'
        );
      }.bind(this),
      error: function() {
        this.apiTokenValid('invalid');
        Materialize.toast(
          'failed to ' + doorCommand.action + ' ' + doorCommand.door + ' door.', 3000
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
    let apiToken = this.state.access.token;
    let url = this.props.lakituUrl + 'access/?access_token=' + apiToken;
    let data = JSON.stringify(accessHolder);

    this.clearMessageId();

    $.ajax(url, {
      type: 'POST',
      data: data,
      contentType: 'application/json',
      success: function(json) {
        this.setState({ commandResult: json });
        this.apiTokenValid('valid');
        Materialize.toast(
          'Access holder was updated.', 3000, 'rounded'
        );
      }.bind(this),
      error: function() {
        this.apiTokenValid('invalid');
        Materialize.toast(
          'Failed to update Access holder.', 3000, 'rounded'
        );
      }.bind(this)
    });
  },

  render: function() {
    let show = ( <DoorList doors={this.state.doors} onDoorSubmit={this.handleDoorSubmit} /> );

    if (this.state.show === 'events') {
      show = ( <Events events={this.state.events} /> );
  } else if (this.state.show === 'access') {
      show = (
        <div id="access">
          <AccessHolder onAccessHolderSubmit={this.handleAccessHolder} />
          <CredentialSearch handleSearch={this.findCardholders} />
          <Cardholders cardholders={this.state.cardholders}/>
        </div>
      );
    }

    return (
      <div className="doorBox">
        <LakituHeader showAccess={this.showAccess}
                      showDoors={this.showDoors}
                      showEvents={this.showEvents} />
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
      { access: { token: apiToken, success: 'unknown' } },
      function() {
        this.loadDoorsFromServer();
        this.loadEventsFromServer();
      });
  },

  apiTokenValid: function(success) {
    // If the request was successful, put the token in local storage
    if (success === 'valid' && this.state.access.success === 'unknown') {
      let apiToken = this.state.access.token;
      // Or we could use sessionStorage?
      localStorage.setItem('lakituApiToken', apiToken);
    }

    this.setState({ access: { token: this.state.access.token, success: success } });
  },

  clearMessageId: function() {
    this.setState({
      commandResult: { messageId: '', md5OfMessageBody: this.state.commandResult.md5OfMessageBody }
    });
  },

  getInitialState: function() {
      // Or we could use sessionStorage?
    let apiToken = localStorage.getItem('lakituApiToken');
    return {
      access: { token: apiToken, success: 'unknown' },
      commandResult: { md5OfMessageBody: '', messageId: '' },
      cardholders: [],
      doors: [],
      events: [],
      show: 'doors'
    };
  }

});

module.exports = Lakitu;
