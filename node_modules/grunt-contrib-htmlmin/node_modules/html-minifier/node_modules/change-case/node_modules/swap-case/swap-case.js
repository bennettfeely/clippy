/**
 * Swap the case of a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return string.toString().replace(/\w/g, function (c) {
    var u = c.toUpperCase();

    return c === u ? c.toLowerCase() : u;
  });
};
