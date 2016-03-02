var ReactDOM = require('react-dom');

/*eslint-disable */
let Lakitu = require('./Lakitu');
/*eslint-enable */

ReactDOM.render(
  <Lakitu pollInterval={3000}
          lakituUrl="http://mncc.aaronzirbes.com:6590/" />,
  document.getElementById('app')
);
