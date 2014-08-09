/* global describe, it */
var assert    = require('assert');
var lowerCase = require('./');

describe('upper case', function () {
  it('should upper case a string', function () {
    assert.equal(lowerCase('test'), 'TEST');
    assert.equal(lowerCase('TEST'), 'TEST');
  });
});
