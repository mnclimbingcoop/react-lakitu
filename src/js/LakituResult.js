//var React = require('react');

var LakituResult = React.createClass({
  render: function() {
    var messageId = this.props.commandResult.messageId;
    var md5 = this.props.commandResult.md5OfMessageBody;
    var lakituClass = 'lakitu-empty';
    var label = '';
    if (md5) { label = 'Last Message Sent: '; }
    if (messageId) { lakituClass = 'lakitu-updated'; }
    return (
      <div className={lakituClass}>{label}{messageId}</div>
    );
  }
});

module.exports = LakituResult;
