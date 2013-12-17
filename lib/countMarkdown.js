var fs = require('fs');

var Section = require('./Section');

var countMarkdown = function (filename) {
    var text = fs.readFileSync(filename, 'utf8');

    var section = new Section();

    var lines = [];
    var sections = [];

    text.split(/\n/).forEach(function (text) {
        var stripedText = text
                .replace(/\n+/g, '')
                .replace(/[\s\b ]/g, '')
                .replace(/^#+.+$/g, '')
                .replace(/^>+.+$/g, '')
                .replace(/^-/g, '')
                .replace(/^>/g, '');

        var length = stripedText.length;

        var headerMatch = text.match(/^ *(#+) *(.+)$/);
        if (headerMatch) {
            sections.push(section);

            section = new Section({
                name: headerMatch[2],
                header: headerMatch[1]
            });
        }

        section.length += length;

        lines.push({
            length: length,
            text: text,
            stripedText: stripedText
        });
    });        

    sections.push(section);

    return {
        lines: lines,
        sections: sections
    };
};

module.exports = countMarkdown;
