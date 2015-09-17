//var React = require('react');
//var ReactIntl  = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var Event = React.createClass({
  mixins: [IntlMixin],
  render: function() {

    var icon = 'card_membership';
    var desc = this.props.eventType;
    if (this.props.firstName) {
      desc = this.props.firstName + ' ' + this.props.lastName;
      if (desc == 'Skateboard Coop') {
        desc = 'Bathroom Key';
      }
    }  else if (this.props.eventType == '12031') {
      icon = 'directions_walk';
      desc = 'Grant Access';
    }  else if (this.props.eventType == '12032') {
      icon = 'lock_open';
      desc = 'Unlock';
    }  else if (this.props.eventType == '12033') {
      icon = 'lock';
      desc = 'Lock';
    }
    return (
      <li className="collection-item event s12">

        <div className="chip">
          {desc}
          <i className="material-icons">{icon}</i>
        </div>
        <div className="chip">
          <FormattedRelative value={this.props.timestamp} />
          <i className="material-icons">timelapse</i>
        </div>
        <div className="chip">
          {this.props.door}
          <i className="material-icons">home</i>
        </div>
      </li>
    );
  }
});

module.exports = Event;
