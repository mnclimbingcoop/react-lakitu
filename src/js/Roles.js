//var React = require('react');

/* eslint-disable */
var Schedule = require('./Schedule');
/* eslint-enable */

var Roles = React.createClass({
  render: function() {
    if (!this.props.roles) {
        return (<span/>);
    }

    var schedules = this.props.roles.map(function(role) {
      return (
        <Schedule key={role.roleID} scheduleName={role.scheduleName} />
      );
    });
    return (
      <span className="roleList">
        {schedules}
      </span>
    );
  }
});

module.exports = Roles;
