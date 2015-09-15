//var React = require('react');

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

module.exports = AccessHolder;
