//var React = require('react');
var Event = require('./Event');

var Events = React.createClass({
  render: function() {
    var eventNodes = this.props.events.map(function(event) {
      // TODO: Figure this out.  It's hard coded to CST right now
      // We should use UTC
      var timestamp = event.timestamp + '-0400';
      return (
          <Event key={event.key}
                 door={event.door}
                 eventType={event.eventType}
                 firstName={event.forename}
                 lastName={event.surname}
                 timestamp={timestamp} />
      );
    });
    return (
      <div id="events">
        <h2>
          <i className="medium material-icons left">today</i>
          Events
        </h2>
        <ul className="events collection">{eventNodes}</ul>
      </div>
    );
  }
});

module.exports = Events;
