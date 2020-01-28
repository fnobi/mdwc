module.exports = (line) => {
    return line
        .replace(/\n+/g, '')
        .replace(/[\s\b ]/g, '')
        .replace(/^#+.+$/g, '')
        .replace(/^>+.+$/g, '')
        .replace(/^-/g, '')
        .replace(/^>/g, '')
        .length;
}