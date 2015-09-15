//var React = require('react');
var Credential = require('./Credential');

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

module.exports = Credentials;
