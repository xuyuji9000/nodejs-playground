// Command example:  node index.js --name=karl

var argv = require('minimist')(process.argv.slice(2));

console.log(argv);
console.log(argv['name']);

/**
# References

1. [Node.js, accept arguments from the command line](https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line)
 */