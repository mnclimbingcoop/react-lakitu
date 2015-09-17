//var React = require('react');
//
var Roles = require('./Roles');
var Credentials = require('./Credentials');

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

module.exports = Cardholder;
