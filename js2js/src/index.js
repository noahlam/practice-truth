const babelParser = require('@babel/parser');

const ast = babelParser.parse('console.log("hello world!")');

console.log(ast)