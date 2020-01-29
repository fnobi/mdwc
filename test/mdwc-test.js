const fs = require('fs');
const assert = require('chai').assert;

const countMarkdown = require('../lib/countMarkdown');

describe('mdwc', function () {
    it('count section chars', function () {
        const text = fs.readFileSync('test/samples/sample1.md', 'utf8');
        const lines = text.split(/\n/g);
        const result = countMarkdown(lines);
        assert.equal(result.children.length, 3);

        assert.equal(result.children[0].length, 4);
        assert.equal(result.children[1].length, 8);
        assert.equal(result.children[2].length, 16);
    });

    it('count section complex chars', function () {
        const text = fs.readFileSync('test/samples/sample2.md', 'utf8');
        const lines = text.split(/\n/g);
        const result = countMarkdown(lines);
        assert.equal(result.children.length, 1);

        assert.equal(result.children[0].length, 0);
        assert.equal(result.children[0].children[0].children[0].length, 4);
        assert.equal(result.children[0].children[0].children[1].length, 4);
        assert.equal(result.children[0].children[0].children[2].length, 4);
        assert.equal(result.children[0].children[1].length, 6);
        assert.equal(result.children[0].children[2].length, 6);
    });
});
