module.exports = function(grunt){
    //project configuration.

    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            testbuild: {
                src: 'client/scripts/appTest.js',
                dest: 'server/public/assets/scripts/appTest.min.js'
            },
            build : {
                src: 'client/scripts/app.js',
                dest: 'server/public/assets/scripts/app.min.js'
            }
        },
        copy:{
            jquery:{
                expand: true,
                cwd: "node_modules/",
                src: [
                    "jquery/dist/jquery.js",
                    "jquery/dist/jquery.min.js",
                    "jquery/dist/jquery.min.map"
                ],
                "dest": "server/public/vendors/"
            },
            bootstrap: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "bootstrap/dist/css/bootstrap.min.css"
                ],
                "dest": "server/public/vendors/"
            },
            glyphicons: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "bootstrap/dist/fonts/**"
                ],
                "dest": "server/public/vendors/"
            },
            html: {
                expand: true,
                cwd: "client",
                src: "views/index.html",
                dest: "server/public/assets/"
            },
            style: {
                expand: true,
                cwd: 'client',
                src: [
                    "styles/style.css"
                ],
                "dest": "server/public/assets"
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    //Default Tasks
    grunt.registerTask('default',['copy','uglify']);
};