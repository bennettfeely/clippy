/*
 * grunt-remfallback
 * https://github.com/thomasdobber/grunt-remfallback
 *
 * Copyright (c) 2013 Thomas Dobber
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('remfallback', 'Finds rem values in CSS and creates fallbacks with px values.', function() {

    // requirements
    var parse = require('css-parse'),
        stringify = require('css-stringify');

    // options
    var options = this.options({
      log: false,
      replace: false,
      ignoreUnsupported: true,
      mediaQuery: false,
      round: false
    });

    this.files.forEach(function(f) {

      // get file contents
      var contents = f.src.filter(function(filepath) {
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return grunt.file.read(filepath);
      }).join('\n');

      // parse the contents and setup objects used for combining and sorting
      var json = parse(contents),
          rootSize = 16,
          regexHtml = /^html$|\w*\s+html$/,
          regexRem = /[0-9]+rem(?![^\(\)]*\))/,
          regexCalc = /calc(.+)/,
          regexFont = /\s*(.*)\//,
          remFound = 0,
          unsupportedProperties = ['transform', 'perspective', 'background-size'];

      // round floating numbers
      function preciseRound(num) {
        var decimals = options.round ? 0 : 1;
        return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
      }

      function isSupported(declaration) {
         if (unsupportedProperties.indexOf(declaration.property) != -1) {
            return false;
         }

         // uses multiple backgrounds
         if (/^background/.test(declaration.property) && /[,](?![^\(\)]*\))/.test(declaration.value)) {
            return false;
         }

         return true;
      }

      // convert rem to px
      function remToPx(remArray) {

        var pxArray = remArray.map(function(v) {
          if (regexCalc.test(v)) {
            return v;
          } else if (regexRem.test(v)) {

            // this one is needed to split properties like '2rem/1.5'
            var restValue = '';
            if (/\//.test(v)) {
              restValue = v.match(/\/.*/);
            }

            // replace 'rem' and anything that comes after it, we'll repair this later
            var unitlessValue = v.replace(/rem.*/, '');
            var pxValue = preciseRound(unitlessValue * rootSize) + 'px';
            var newValue = restValue ? pxValue + restValue : pxValue;

            remFound++;
            return newValue;
          }
          return v;
        }).join(' ');

        return pxArray;
      }

      // function to clone object
      function clone(obj) {
        var copy = {};
        for (var attr in obj) {
          if (obj.hasOwnProperty(attr)) {
            copy[attr] = obj[attr];
          }
        }
        return copy;
      }

      // create a base value from px,em,rem or percentage
      function createBaseSize(value) {
        if (/px/.test(value)) {
          return value.replace(/px/, '');
        }

        if (/em|rem/.test(value)) {
          return value.replace(/em|rem/, '') * 16;
        }

        if (/%/.test(value)) {
          return value.replace(/%/, '')/100 * 16;
        }
      }

      // find root font-size declarations
      function findRoot(r) {
        r.selectors.forEach(function(s) {

          // look for 'html' selectors
          if (regexHtml.test(s)) {

            r.declarations.forEach(function(d) {
              var foundSize = false;

              // look for the 'font' property
              if (d.property === 'font' && regexFont.test(d.value)) {
                foundSize = d.value.match(regexFont)[1];
              }

              // look for the 'font-size' property
              else if (d.property === 'font-size') {
                foundSize = d.value;
              }

              // update root size if new one is found
              if (foundSize) {
                rootSize = createBaseSize(foundSize);
              }
            });
          }
        });
      }

      // look for rem values
      function findRems(rule) {

        for (var i = 0; i < rule.declarations.length; i++) {
          var declaration = rule.declarations[i];

          // grab values that contain 'rem'
          if (declaration.type === 'declaration' && isSupported(declaration) && regexRem.test(declaration.value)) {

            var pxValues = remToPx(declaration.value.split(/\s(?![^\(\)]*\))/));

            if (options.replace) {
              declaration.value = pxValues;
            } else {
              var fallback = clone(declaration);
              fallback.value = pxValues;
              rule.declarations.splice(i, 0, fallback);
            }

            i++;
          }
        }
      }

      // go through all the rules
      json.stylesheet.rules.forEach(function(rule) {

        if (rule.type === 'rule') {
          findRoot(rule);
          findRems(rule);
        }

        if (options.mediaQuery && rule.type === 'media') {
          rule.rules.forEach(function(mediaRule) {
            if (mediaRule.type === 'rule') {
              findRoot(mediaRule);
              findRems(mediaRule);
            }
          });
        }

      });

      // log stuff
      if(options.log) {
        grunt.log.writeln('Root size found: ' + rootSize + 'px');
        grunt.log.writeln('Rem units found: '+ remFound);
      }

      // write the new file
      grunt.file.write(f.dest, stringify(json));
      grunt.log.ok('File "' + f.dest + '" created.');

    });
  });
};