/* 
Successful command example:  node index.js --name=karl
Failed command example: node index.js
*/

var argv = require('minimist')(process.argv.slice(2));

console.log(argv);
console.log(argv['name']);

if(undefined == argv['name']) {
    console.error("Parameter name is not defined.")
    process.exit(1); // [2]
}

console.log("Parameter passing succeed.")

/**
# References

1. [Node.js, accept arguments from the command line](https://nodejs.dev/learn/nodejs-accept-arguments-from-the-command-line)

2. [How to exit from a Node.js program](https://nodejs.dev/learn/how-to-exit-from-a-nodejs-program)
*/