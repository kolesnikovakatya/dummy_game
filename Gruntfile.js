module.exports = function (grunt) {

    grunt.initConfig({
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public/js/**/*.js',
                    'public/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    liverload: true
                }

            }
        }, /*grunt-contrib-watch*/
        connect: {
            server: { /* Подзадача */
                options: {
                    keepalive: false, /* работать постоянно */
                    port: 8000, /* номер порта */
                    base: 'public' /* публичная директория */
                }
            }        
    	}, /* grunt-contrib-connect */

        fest: {
            templates: { /* Подзадача */
                files: [{
                    expand: true,
                    cwd: 'templates', /*исходная директория*/
                    src: '*.xml', /* имена шаблонов */
                    dest: 'public/js/tmpl' /* результирующая директория */
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'var <%= name %>Tmpl = <%= contents %> ;',
                            {data: data}
                        );
                    }
                } 
            }
        } /*grunt-fest*/
    });

    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-fest');

    grunt.registerTask('default', ['connect', 'watch']);
};
        
