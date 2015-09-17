//var React = require('react');
//
var Roles = require('./Roles');
var Credentials = require('./Credentials');
var Chip = require('./Chip');

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
    cardholder.push( <Chip key="home" icon="home">{this.props.door}</Chip> );
    cardholder.push( <Chip icon="account_circle">{name}</Chip> );
    if (this.props.email) {
      var emailTo = 'mailto:' + this.props.email;
      cardholder.push(
        <Chip icon="email"><a href={emailTo}>{this.props.email}</a></Chip>
      );
    }
    if (this.props.phone) {
      var phoneTel = 'tel:' + this.props.phone;
      cardholder.push(
        <Chip icon="phone"><a href={phoneTel}>{this.props.phone}</a></Chip>
      );
    }

    return (
      <li className="collection-item cardholder s12">
        {cardholder}
         <Roles roles={this.props.roles}/>
         <Credentials credentials={this.props.credentials} />
      </li>
    )
  }
});

module.exports = Cardholder;
