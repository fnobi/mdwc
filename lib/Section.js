var Section = function (opts) {
    opts = opts || {};

    this.name = opts.name || '';
    this.header = opts.header || '';

    this.length = 0;
    this.floor = this.header.length;
};

module.exports = Section;
