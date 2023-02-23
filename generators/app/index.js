const Generator = require('yeoman-generator');
const beautify = require('gulp-beautify');
const config = require('./config');

/* Priorities are defined in your code as special prototype method names. 
When a method name is the same as a priority name, the run loop pushes the 
method into this special queue. If the method name doesn’t match a priority, 
it is pushed in the default group.

initializing - Your initialization methods (checking current project state, getting configs, etc)
prompting - Where you prompt users for options (where you’d call this.prompt())
configuring - Saving configurations and configure the project (creating .editorconfig files and other metadata files)
default - If the method name doesn’t match a priority, it will be pushed to this group.
writing - Where you write the generator specific files (routes, controllers, etc)
conflicts - Where conflicts are handled (used internally)
install - Where installations are run (npm, bower)
end - Called last, cleanup, say good bye, etc
*/
module.exports = class MyGenerator extends Generator {

    constructor(args, opts) {
        // Calling the super constructor is important so our generator is correctly set up
        super(args, opts);

        // Next, add your custom code
        this.option('babel'); // This method adds support for a `--babel` flag

        this.helperMethod = function () {
            this.log('won\'t be called autommatically');
        }
    }

    async prompting() {
        this.answers = await this.prompt([
            {
                type: "input",
                name: "name",
                message: "Your project name",
                default: this.appname //Default to current folder
            },
            {
                type: "input",
                name: "title",
                message: "Your project title",
                default: this.apptitle //Default to current folder
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        this.log("app name", this.answers.name);
        this.log("app title", this.answers.title);
        this.log("cool feature", this.answers.cool);
    }

    paths() {
        //Yeoman file utilities are based on the idea you always have two location contexts on disk.
        // These contexts are folders your generator will most likely read from and write to.
        this.destinationRoot();
        // returns '~/projects'
    
        this.destinationPath('index.js');
        // returns '~/projects/index.js'

        this.sourceRoot();
        // returns './templates'

        this.templatePath('index.js');
        // returns './templates/index.js'
    }
    
    writing() {
        this.log("inside writing");
        this.log("cool feature", this.answers.cool);

        this.queueTransformStream(beautify.html({ indent_size: 2 }));

        const templateData = { title: this.answers.title };
        const copy = (input, output) => {
            this.fs.copy(this.templatePath(input), this.destinationPath(output));
        };

        const copyTpl = (input, output, data) => {
            this.fs.copyTpl(
                this.templatePath(input),
                this.destinationPath(output),
                data
            );
        };

        config.filesToCopy.forEach(file => {
            copy(file.input, file.output);
        });

        config.filesToRender.forEach(file => {
            copyTpl(file.input, file.output, templateData)
        });
        /*
        this.fs.copyTpl(
            this.templatePath('index.html'),
            this.destinationPath('public/index.html'),
            { title: this.answers.title }
        );
        */
    }

    method1() {
        this.log("method 1 just ran");
    }
    method2() {
        this.log("method 2 just ran");
    }

    //Private methods won't run automatically
    _private_method() {
        //Outputting information is handled by the this.log module.
        this.log('private hey');
    }
};