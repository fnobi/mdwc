var Section = function (opts) {
    opts = opts || {};

    this.name = opts.name || '';
    this.header = opts.header || '';
    this.parent = opts.parent || null;

    this.level = this.header.length;
    this.length = 0;
    this.children = [];
};

module.exports = Section;
