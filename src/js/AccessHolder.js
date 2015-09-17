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
        <h2>
          <i className="medium material-icons left">account_circle</i>
          Add/Update
        </h2>
        <div className="row">
          <div className="input-field col s6">
            <label for="firstName">First Name</label>
            <input type="text" required="required" placeholder="First Name" ref="firstName" />
          </div>
          <div className="input-field col s6">
            <label for="lastName">Last Name</label>
            <input type="text" required="required" placeholder="Last Name" ref="lastName" />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label for="emailAddress">Email</label>
            <input type="email" placeholder="user@domain.com" ref="emailAddress" />
          </div>
          <div className="col s6">
            <label for="phoneNumber">Phone</label>
            <input type="tel"
                   placeholder="(###) ###-####"
                   ref="phoneNumber"
                   pattern='[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}' />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label for="cardNumber">Fob Number</label>
            <input type="text" required="required" placeholder="Fob Number" ref="cardNumber" />
          </div>
          <div className="col s6">
            <label for="expirationDate">Access Expiration</label>
            <input type="date" required="required" placeholder="Access Expiration" ref="expirationDate" />
          </div>
        </div>

        <button className="waves-effect waves-light btn" type="submit">
          Configure Access
          <i className="material-icons right">send</i>
        </button>

      </form>
    )
  }
});

module.exports = AccessHolder;
