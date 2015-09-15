//var React = require('react');

var ApiKeyForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var accessToken = React.findDOMNode(this.refs.token).value.trim();
    if (!accessToken) { return; }
    this.props.onApiKeySubmit(accessToken);
    return;
  },

  render: function() {
    var access = this.props.access
    var formClass = 'api-key-' + access.success
    return (
      <form className={formClass} onSubmit={this.handleSubmit}>
        <input className={access.success}
               type="password"
               ref="token"
               defaultValue={access.token}/>
        <button type="submit">Update Key</button>
      </form>
    );
  }

});

module.exports = ApiKeyForm;
