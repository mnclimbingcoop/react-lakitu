module.exports = function(gulpConfig) {
    return {
        assemble: {

        },
        html: {

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
        }
    };
};
