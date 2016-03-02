let React = require('react');

/* eslint-disable */
let Schedule = require('./Schedule');
/* eslint-enable */

let Roles = React.createClass({
  render: function() {
    if (!this.props.roles) {
        return (<span/>);
    }

    let schedules = this.props.roles.map(function(role) {
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
