/**
 * Sentence case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return string
    // Convert the object to a string.
    .toString()
    // Add camel case support.
    .replace(/([a-z])([A-Z0-9])/g, '$1 $2')
    // Remove every non-word character and replace with a period.
    .replace(/[^a-zA-Z0-9]+/g, '.')
    // Replace every period not between two numbers with a space.
    .replace(/(?!\d\.\d)(^|.)\./g, '$1 ')
    // Trim whitespace from the string.
    .replace(/^ | $/g, '')
    // Finally lower case the entire string.
    .toLowerCase();
};
