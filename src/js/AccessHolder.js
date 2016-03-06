const React = require('react');
const ReactDOM = require('react-dom');

let AccessHolder = React.createClass({

  clearForm: function() {
    console.log('Clearing form.');
    ReactDOM.findDOMNode(this.refs.firstName).value = '';
    ReactDOM.findDOMNode(this.refs.lastName).value = '';
    ReactDOM.findDOMNode(this.refs.emailAddress).value = '';
    ReactDOM.findDOMNode(this.refs.phoneNumber).value = '';
    ReactDOM.findDOMNode(this.refs.cardNumber).value = '';
    ReactDOM.findDOMNode(this.refs.expirationDate).value = '';
  },

  handleSubmit: function(e) {
    e.preventDefault();

    let firstName = ReactDOM.findDOMNode(this.refs.firstName).value.trim();
    let lastName = ReactDOM.findDOMNode(this.refs.lastName).value.trim();
    let email = ReactDOM.findDOMNode(this.refs.emailAddress).value.trim();
    let phone = ReactDOM.findDOMNode(this.refs.phoneNumber).value.trim();
    let cardNumber = ReactDOM.findDOMNode(this.refs.cardNumber).value.trim();
    let expirationDate = ReactDOM.findDOMNode(this.refs.expirationDate).value.trim();

    if (!expirationDate || !firstName || !lastName) { return; }

    let accessHolder = {
      firstName: firstName,
      lastName: lastName,
      emailAddress: email,
      phoneNumber: phone,
      cards: [ { cardNumber: cardNumber, formatName: 'MNCC' } ],
      endTime: expirationDate
    };

    this.props.onAccessHolderSubmit(accessHolder);
    this.clearForm();
    console.log('Cleared form?');
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
            <label htmlFor="firstName">First Name</label>
            <input type="text" required="required" placeholder="First Name" ref="firstName" />
          </div>
          <div className="input-field col s6">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" required="required" placeholder="Last Name" ref="lastName" />
          </div>
        </div>
        <div className="row">
          <div className="col s6">
            <label htmlFor="emailAddress">Email</label>
            <input type="email" placeholder="user@domain.com" ref="emailAddress" />
          </div>
          <div className="col s6">
            <label htmlFor="phoneNumber">Phone</label>
            <input type="tel"
                   placeholder="(###) ###-####"
                   ref="phoneNumber"
                   pattern='[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}' />
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <label htmlFor="cardNumber">Fob Number</label>
            <input type="text" required="required" placeholder="Fob Number" ref="cardNumber" />
          </div>
          <div className="col s6">
            <label htmlFor="expirationDate">Access Expiration</label>
            <input type="date" required="required" placeholder="Access Expiration" ref="expirationDate" />
          </div>
        </div>

        <button className="waves-effect waves-light btn" type="submit">
          Configure Access
          <i className="material-icons right">send</i>
        </button>

      </form>
    );
  }
});

module.exports = AccessHolder;
