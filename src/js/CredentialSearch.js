//var React = require('react');
var debounce = require('./debounce');

var CredentialSearch = React.createClass({
  handleChange: function(e) {
    this.props.handleSearch(
      this.refs.query.getDOMNode().value
    );
  },

  componentWillMount: function() {
    this.lazyChange = debounce(this.handleChange, 200, function(e) {
      e.preventDefault();
    });
  },

  render: function() {
    return (
      <form className="find-access">
        <h2>Find Access Holders</h2>
        <input type="text"
               className="cred-search"
               placeholder="Search..."
               ref="query"
               value={this.props.query}
               onChange={this.lazyChange} />
      </form>
    )
  }
});

module.exports = CredentialSearch;
