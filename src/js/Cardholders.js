//var React = require('react');
var Cardholder = require('./Cardholder');

var Cardholders = React.createClass({
  render: function() {
    var eventNodes = this.props.cardholders.map(function(cardholder) {
      return (
        <Cardholder key={cardholder.key}
                    door={cardholder.door}
                    cardholderID={cardholder.cardholderID}
                    firstName={cardholder.forename}
                    middleName={cardholder.middleName}
                    lastName={cardholder.surname}
                    email={cardholder.email}
                    phone={cardholder.phone}
                    credentials={cardholder.credentials}
                    roles={cardholder.roles} />
      );
    });

    if (this.props.cardholders.length > 0) {
      return (
        <div className="cardholders">{eventNodes}</div>
      );
    } else {
      return (<span/>)
    }

  }
});

module.exports = Cardholders;
