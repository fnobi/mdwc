const Section = require('./Section');
const countStripedLine = require('./countStripedLine');

function findParent(section, level) {
    if (section.level < level) {
        return section;
    } else {
        return findParent(section.parent, level);
    }
}

const countMarkdown = function (lines) {
    const rootSection = new Section();
    let currentSection = rootSection;

    lines.forEach(function (line) {
        const length = countStripedLine(line);

        const headerMatch = line.match(/^ *(#+) *(.+)$/);
        if (headerMatch) {
            const [ , header, name ] = headerMatch;
            const parent = findParent(currentSection, header.length);
            const child = new Section({
                name,
                header,
                parent
            });
            parent.children.push(child);
            currentSection = child;
        }

        currentSection.length += length;
    });

    return rootSection;
};

module.exports = countMarkdown;
