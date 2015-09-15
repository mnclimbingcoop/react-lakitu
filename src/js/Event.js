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
      <div className="event">
         <span className="door"> {this.props.door} </span> 
         <span className="desc"> {desc} </span>
         <span className="time">
           <FormattedRelative value={this.props.timestamp} />
         </span>
      </div>
    );
  }
});

module.exports = Event;
