/**
 * Uppercase the first character of a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  string = '' + string;

  return string.charAt(0).toUpperCase() + string.substr(1);
};
