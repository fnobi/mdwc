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
        let base = 1;
        if(result.sections.length > 1 && result.sections[0].length == result.sections[1].length){
            // 最初の行からセクションがはじまっている＝rootと第一セクションの字数が同じになるのでrootの表記をやめる
            result.sections.shift();
            base = 0;
        }
        result.sections.forEach(function (section) {
            console.log([
                (new Array(section.floor + base)).join('  '),
                '-'.grey,
                (section.name || 'root'.grey),
                ['(', section.length, ')'].join('').green
            ].join(' '));
        });
    }
})();








