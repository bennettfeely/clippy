var lowerCase = require('lower-case');

/**
 * Check if a string is lowercased.
 *
 * @param  {String}  string
 * @return {Boolean}
 */
module.exports = function (string) {
  return lowerCase(string) === string;
};
