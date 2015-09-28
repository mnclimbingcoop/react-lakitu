//var React      = require('react');
//var ReactIntl  = require('react-intl');

/* eslint-disable */
var Cardholder = require('./Cardholder');
var Chip = require('./Chip');
var FormattedDate = ReactIntl.FormattedDate;
/* eslint-enable */

var IntlMixin = ReactIntl.IntlMixin;

var Credential = React.createClass({
  mixins: [IntlMixin],
  render: function() {

    var credentialExpires = ( <i className="material-icons">help</i> );
    if (this.props.endTime) {
      var expires = new Date(this.props.endTime);
      credentialExpires = ( <FormattedDate value={expires} /> );
    }
    return (
      <Chip icon="settings_remote">
        {this.props.cardNumber}
         &rarr;
        {credentialExpires}
      </Chip>
    );
  }
});

module.exports = Credential;
