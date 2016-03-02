let React = require('react');

let ApiKeyForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    let accessToken = React.findDOMNode(this.refs.token).value.trim();
    if (!accessToken) { return; }
    this.props.onApiKeySubmit(accessToken);
    return;
  },

  render: function() {
    let access = this.props.access;
    let formClass = 'api-key-' + access.success;
    return (
      <form className={formClass} onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="token">API Key</label>
            <input className={access.success}
                   type="password"
                   ref="token"
                   placeholder="API Key"
                   defaultValue={access.token}/>
          </div>
        </div>
        <button className="waves-effect waves-light btn" type="submit">
          Connect
          <i className="material-icons right">send</i>
        </button>

      </form>
    );
  }

});

module.exports = ApiKeyForm;
