const fs = require('fs');
const optimist = require('optimist');
const colors = require('colors');

const countMarkdown = require('./countMarkdown');
const countStripedLine = require('./countStripedLine');

function printTree(section, prefix) {
    const count = sumUpTree(section);
    const name = (prefix ? `${prefix} / ` : '') + (section.name || 'root'.grey);
    const current = [
        ' -'.grey,
        name,
        `(${count})`.green
    ].join(' ');

    if (!section.children.length) {
        return current;
    }

    if (section.children.length === 1 && count === sumUpTree(section.children[0])) {
        return printTree(section.children[0], name);
    }

    const c = section.children.map((child) => printTree(child)).join('\n');
    return current + '\n' + c.split(/\n/g).map(l => `  ${l}`).join('\n');
}

function sumUpTree(section) {
    return section.children.reduce((prev, child) => prev + sumUpTree(child), section.length);
}


(function () {
    const argv = optimist
            .boolean('h')
            .alias('h', 'help')
            .default('h', false)
            .describe('h', 'show this help.')

            .boolean('l')
            .alias('l', 'line')
            .default('l', false)
            .describe('l', 'show summary by line.')

            .boolean('v')
            .alias('v', 'version')
            .default('v', false)
            .describe('v', 'show version.')

            .argv;

	if (argv.v) {
        const json = require( "../package.json" );
        console.log(json.version);
		return;
	}

    if (argv.h || argv._.length == 0) {
        optimist.showHelp();
        return;
    }

    const filename = argv._.shift();
    const text = fs.readFileSync(filename, 'utf8');
    const lines = text.split(/\n/g);

    if (argv.l) {
        lines.forEach(function (line, i) {
            console.log(
                '%s\t"%s"',
                `(${countStripedLine(line)})`.green,
                line
            );
        });
    } else {
        const result = countMarkdown(lines);
        console.log(printTree(result));
    }
})();








