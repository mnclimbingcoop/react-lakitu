//var React = require('react');
var Event = require('./Event');

var EventList = React.createClass({
  render: function() {
    var eventNodes = this.props.events.map(function(event) {
      return (
          <Event key={event.key}
                 door={event.door}
                 eventType={event.eventType}
                 firstName={event.forename}
                 lastName={event.surname}
                 timestamp={event.timestamp} />
      );
    });
    return (
      <div className="eventList">
        {eventNodes}
      </div>
    );
  }
});

module.exports = EventList;
