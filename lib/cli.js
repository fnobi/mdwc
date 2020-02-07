const fs = require('fs');
const optimist = require('optimist');
const colors = require('colors');
const clipboardy = require('clipboardy');

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

            .boolean('c')
            .alias('c', 'clipboard')
            .default('c', false)
            .describe('c', 'use clipboard text.')

            .boolean('v')
            .alias('v', 'version')
            .default('v', false)
            .describe('v', 'show version.')

            .argv;

    let text;
    if (argv.h) {
        optimist.showHelp();
        return;
    }else if (argv.v) {
        const json = require( "../package.json" );
        console.log(json.version);
		return;
	}else if (argv.c) {
        try {
            text = clipboardy.readSync();
        } catch (e) {
            console.log("No readable data on the Clipboard.".red);
            return;
        }
    } else {
        const filename = argv._.shift();
        if( !filename ){
            console.log("Markdown file not specified.".red);
            return;
        }
        text = fs.readFileSync(filename, 'utf8');
    }
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








