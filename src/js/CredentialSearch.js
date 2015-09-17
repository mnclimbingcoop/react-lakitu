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
        <h2>
          <i className="medium material-icons left">search</i>
          Lookup
        </h2>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">search</i>
            <label for="query">Search...</label>
            <input type="text"
                   placeholder="Search..."
                   ref="query"
                   value={this.props.query}
                   onChange={this.lazyChange} />
          </div>
        </div>
      </form>
    )
  }
});

module.exports = CredentialSearch;
