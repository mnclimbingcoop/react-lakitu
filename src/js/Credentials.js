let React = require('react');

/* eslint-disable */
let Credential = require('./Credential');
/* eslint-enable */

let Credentials = React.createClass({
  render: function() {
    if (!this.props.credentials) { return (<span/>); }
    let credentialNodes = this.props.credentials.map(function(credential) {
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
