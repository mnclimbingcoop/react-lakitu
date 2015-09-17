//var React = require('react');
//var ReactIntl  = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedRelative = ReactIntl.FormattedRelative;

var Event = React.createClass({
  mixins: [IntlMixin],
  render: function() {
    var desc = this.props.eventType;
    if (this.props.firstName) {
      desc = this.props.firstName + ' ' + this.props.lastName;
    }
    return (
      <li className="collection-item event s12">
        <div className="chip">
          {this.props.door}
          <i className="material-icons">home</i>
        </div>

        <div className="chip">
          {desc}
          <i className="material-icons">card_membership</i>
        </div>
        <div className="chip">
          <FormattedRelative value={this.props.timestamp} />
          <i className="material-icons">timelapse</i>
        </div>
      </li>
    );
  }
});

module.exports = Event;
