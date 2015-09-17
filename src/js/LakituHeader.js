//var React            = require('react');

var LakituHeader = React.createClass({
  render: function() {
    return (
      <nav className="titleBar orange">
        <div className="nav-wrapper">
          <a href="#" className="left brand-logo">
            <img src="images/lakitu.png"/>
            Lakitu
          </a>
          <ul id="nav-mobile" className="right">
            <li><a className="waves-effect waves-light" onClick={this.props.showDoors}>Doors</a></li>
            <li><a className="waves-effect waves-light" onClick={this.props.showEvents}>Events</a></li>
            <li><a className="waves-effect waves-light" onClick={this.props.showAccess}>Access</a></li>
          </ul>
        </div>
      </nav>
    );
  }

});

module.exports = LakituHeader;
