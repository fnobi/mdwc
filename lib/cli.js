(function () {
    var optimist = require('optimist');
    var colors = require('colors');
    var util = require('util');

    var countMarkdown = require('./countMarkdown');

    var argv = optimist
            .boolean('h')
            .alias('h', 'help')
            .default('h', false)
            .describe('h', 'show this help.')

            .boolean('l')
            .alias('l', 'line')
            .default('l', false)
            .describe('l', 'show summary by line.')

            .argv;

    if (argv.h) {
        optimist.showHelp();
        return;
    }

    var filename = argv._.shift();

    var result = countMarkdown(filename);
    if (argv.l) {
        result.lines.forEach(function (line) {
            console.log(
                '%s\t"%s"',
                ['(', line.length, ')'].join('').green,
                line.text
            );
        });
    } else {
        result.sections.forEach(function (section) {
            console.log([
                (new Array(section.floor + 1)).join('  '),
                '-'.grey,
                (section.name || 'root'.grey),
                ['(', section.length, ')'].join('').green
            ].join(' '));
        });
    }
})();








