# grunt-remfallback v0.0.5

> Generate px valued fallbacks for CSS properties with rem values.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-remfallback --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-remfallback');
```

## The "remfallback" task

### Overview
In your project's Gruntfile, add a section named `remfallback` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  remfallback: {
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### log

Type: `boolean`
Default: `false`

Log some information about the processed found root font-size and the amount of rem values.

#### replace

Type: `boolean`
Default: `false`

Replace rem values by the px values, handy for generating seperate stylesheets.

#### ignoreUnsupported

Type: `boolean`
Default: `true`

Ignore rem values that are for properties that are unsupported by ltIE9.

##### mediaQuery

Type: `boolean`
Default: `false`

Ignore rem values within media queries.

#### round

Type: `boolean`
Default: `false`

Round fallback values.

### Usage Examples

```js
grunt.initConfig({
  remfallback: {
    options: {
      log: false,
      replace: false
    },
    your_target: {
      files: {
        'result/example.css': ['test/example.css']
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 14-03-14 - v0.0.5 - Improved task and added options.
* 17-11-13 - v0.0.4 - Added replace option.
* 17-11-13 - v0.0.3 - Corrected dependencies.
* 17-11-13 - v0.0.2 - Corrected version number.
* 17-11-13 - v0.0.1 - Initial release.
