//var React = require('react');

var Chip = React.createClass({
  render: function() {
    return (
      <div className="chip">
        {this.props.children}
        <i className="material-icons">{this.props.icon}</i>
      </div>
    );
  }
});

module.exports = Chip;
