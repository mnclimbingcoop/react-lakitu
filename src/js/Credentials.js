//var React = require('react');

/* eslint-disable */
var Credential = require('./Credential');
/* eslint-enable */

var Credentials = React.createClass({
  render: function() {
    if (!this.props.credentials) { return (<span/>); }
    var credentialNodes = this.props.credentials.map(function(credential) {
      return (
        <Credential key={credential.credentialID}
                    cardNumber={credential.cardNumber}
                    endTime={credential.endTime} />
      );
    });
    return (
      <ul className="collection credentials">{credentialNodes}</ul>
    );
  }
});

module.exports = Credentials;
