var fs = require('fs');
var path = require('path');

module.exports = function(gulpConfig) {
  return {
    assemble: {
      files: {
        dest: gulpConfig.paths.dist + '/js',
      },
      browserify: {
        source: 'app.min.js',
        config: {
          entries: ['./src/js/App.js']
        }
      }
    },
    html: {
      files: {
        src: ['src/index.html'],
        dest: gulpConfig.paths.dist
      }
    },
    sass: {
      files: {
        src: ['src/sass/**/*.scss'],
        dest: gulpConfig.paths.dist + '/css'
      }
    },
    images: {
      files: {
        src: ['src/images/*.svg','src/images/*.png'],
        dest: gulpConfig.paths.dist + '/images'
      }
    },
    scripts: {
      eslint: {
        files: {
          src: ['src/js/**/*.js']
        }
      }
    },
    browsersync: {
      server: {
        baseDir: 'dist'
      }
    },
    publish: {
      aws: JSON.parse(fs.readFileSync( __dirname + '/../../../aws.json'))
    },
    favicon: {
      files: {
        src: ['src/favicon.ico'],
        dest: gulpConfig.paths.dist
      }
    }
  };
};
