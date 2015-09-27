var gulpConfig = {
    paths: {
        dist: './dist'
    }
};

var tasks = require('./config/tasks-config')(gulpConfig);

gulpConfig.tasks = tasks;
module.exports = gulpConfig;
