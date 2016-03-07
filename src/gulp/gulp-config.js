let gulpConfig = {
    paths: {
        dist: './dist'
    }
};

let tasks = require('./config/tasks-config')(gulpConfig);

gulpConfig.tasks = tasks;
module.exports = gulpConfig;
