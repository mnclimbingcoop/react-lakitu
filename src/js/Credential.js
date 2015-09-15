//var React      = require('react');
//var ReactIntl  = require('react-intl');
var Cardholder = require('./Cardholder');

var FormattedDate = ReactIntl.FormattedDate;
var IntlMixin     = ReactIntl.IntlMixin;

var Credential = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    var credential = [];
    credential.push( <span key="cardNumber" className="cardNumber">{this.props.cardNumber} </span> );

    if (this.props.endTime) {
      var expires = new Date(this.props.endTime);
      credential.push( <span key="expires" className="expires"><FormattedDate value={expires} /></span> );
    }
    return (
      <li className="credential">{credential}</li>
    );
  }
});

module.exports = Credential;
