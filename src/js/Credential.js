let React = require('react');
let ReactIntl = require('react-intl');

/* eslint-disable */
let Cardholder = require('./Cardholder');
let Chip = require('./Chip');
let FormattedDate = ReactIntl.FormattedDate;
/* eslint-enable */

let IntlMixin = ReactIntl.IntlMixin;

let Credential = React.createClass({
  mixins: [IntlMixin],
  render: function() {

    let credentialExpires = ( <i className="material-icons">help</i> );
    if (this.props.endTime) {
      let expires = new Date(this.props.endTime);
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
