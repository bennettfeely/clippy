/* global describe, it */
var assert       = require('assert');
var sentenceCase = require('./');

describe('sentence case', function () {
  it('should lower case a single word', function () {
    assert.equal(sentenceCase('test'), 'test');
    assert.equal(sentenceCase('TEST'), 'test');
  });

  it('should sentence case camel cased strings', function () {
    assert.equal(sentenceCase('testString'), 'test string');
    assert.equal(sentenceCase('testString123'), 'test string 123');
  });

  it('should sentence case non-alphanumeric separators', function () {
    assert.equal(sentenceCase('dot.case'), 'dot case');
    assert.equal(sentenceCase('path/case'), 'path case');
    assert.equal(sentenceCase('snake_case'), 'snake case');
  });

  it('should handle punctuation', function () {
    assert.equal(sentenceCase('"quotes"'), 'quotes');
  });

  it('should have special support for numbers', function () {
    assert.equal(sentenceCase('version 0.45.0'), 'version 0.45.0');
    assert.equal(sentenceCase('version 0..78..0'), 'version 0.78.0');
    assert.equal(sentenceCase('version.4_99/4'), 'version 4.99.4');
  });
});
