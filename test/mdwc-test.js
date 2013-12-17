var assert = require('chai').assert;

var countMarkdown = require('../lib/countMarkdown');

describe('mdwc', function () {
    it('count section chars', function () {
        var result = countMarkdown('test/samples/sample1.md');
        assert.equal(result.sections.length, 4);

        assert.equal(result.sections[0].length, 4 + 8 + 16);
        assert.equal(result.sections[1].length, 4);
        assert.equal(result.sections[2].length, 8);
        assert.equal(result.sections[3].length, 16);
    });

    it('count section complex chars', function () {
        var result = countMarkdown('test/samples/sample2.md');
        assert.equal(result.sections.length, 8);

        assert.equal(result.sections[0].length, 24);
        assert.equal(result.sections[1].length, 24);
        assert.equal(result.sections[2].length, 12);
        assert.equal(result.sections[3].length, 4);
        assert.equal(result.sections[4].length, 4);
        assert.equal(result.sections[5].length, 4);
        assert.equal(result.sections[6].length, 6);
        assert.equal(result.sections[7].length, 6);
    });
});
