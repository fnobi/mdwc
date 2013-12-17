var fs = require('fs');

var Section = require('./Section');

var countMarkdown = function (filename) {
    var text = fs.readFileSync(filename, 'utf8');

    var currentSection = new Section();

    var lines = [];
    var sections = [currentSection];
    var sectionFloors = [currentSection];

    function countUpAncestor (section) {
        for (var i = 0; i < section.floor; i++) {
            sectionFloors[i].length += section.length;
        }
    }

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
            countUpAncestor(currentSection);

            currentSection = new Section({
                name: headerMatch[2],
                header: headerMatch[1]
            });

            sections.push(currentSection);
            sectionFloors[currentSection.floor] = currentSection;
        }

        currentSection.length += length;

        lines.push({
            length: length,
            text: text,
            stripedText: stripedText
        });
    });        

    countUpAncestor(currentSection);

    return {
        lines: lines,
        sections: sections
    };
};

module.exports = countMarkdown;
