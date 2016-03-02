let React = require('react');
/* eslint-disable */
let Roles = require('./Roles');
let Credentials = require('./Credentials');
let Chip = require('./Chip');
/* eslint-enable */

let Cardholder = React.createClass({

  render: function() {
    let name = this.props.firstName;
    if (this.props.middleName) {
      name = name + ' ' + this.props.middleName;
    }
    if (this.props.lastName) {
      name = name + ' ' + this.props.lastName;
    }

    let cardholder = [];
    cardholder.push( <span key="key" className="key">{this.props.key}</span> );
    cardholder.push( <Chip key="home" icon="home">{this.props.door}</Chip> );
    cardholder.push( <Chip icon="account_circle">{name}</Chip> );
    if (this.props.email) {
      let emailTo = 'mailto:' + this.props.email;
      cardholder.push(
        <Chip icon="email"><a href={emailTo}>{this.props.email}</a></Chip>
      );
    }
    if (this.props.phone) {
      let phoneTel = 'tel:' + this.props.phone;
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
    );
  }
});

module.exports = Cardholder;
