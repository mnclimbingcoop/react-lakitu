let React = require('react');

let LakituResult = React.createClass({
  render: function() {
    let messageId = this.props.commandResult.messageId;
    let md5 = this.props.commandResult.md5OfMessageBody;
    let lakituClass = 'lakitu-empty';
    let label = '';
    if (md5) { label = 'Last Message Sent: '; }
    if (messageId) { lakituClass = 'lakitu-updated'; }
    return (
      <div className={lakituClass}>{label}{messageId}</div>
    );
  }
});

module.exports = LakituResult;
