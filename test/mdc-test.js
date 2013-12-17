var assert = require('chai').assert;

var countMarkdown = require('../lib/countMarkdown');

describe('mdc', function () {
    it('count section chars', function () {
        var result = countMarkdown('test/samples/sample1.md');
        assert.equal(result.sections.length, 4);

        assert.equal(result.sections[0].length, 4 + 8 + 16);
        assert.equal(result.sections[1].length, 4);
        assert.equal(result.sections[2].length, 8);
        assert.equal(result.sections[3].length, 16);
    });
});
