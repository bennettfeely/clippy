/**
 * Uppercase a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return String.prototype.toUpperCase.call(string);
};
