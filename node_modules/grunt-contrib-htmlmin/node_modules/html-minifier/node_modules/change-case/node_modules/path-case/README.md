# path-case

Path case a string.

## Installation

```bash
npm install path-case --save
```

## Usage

```javascript
var pathCase = require('path-case');

pathCase('string');        //=> "string"
pathCase('camelCase');     //=> "camel/case"
pathCase('sentence case'); //=> "sentence/case"
```

## License

MIT
