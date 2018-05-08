var babel = require('babel-core');
var t = require('babel-types');

const visitor = {
  /*
  * ImportDeclaration 是固定写法,具体参照AST语法树
  * AST语法树在线转换网址 http://astexplorer.net/
  * */
  ImportDeclaration(path, _ref = {opts:{}}){
    const specifiers = path.node.specifiers;
    const source = path.node.source;
    if (!t.isImportDefaultSpecifier(specifiers[0]) ) {
      var declarations = specifiers.map((specifier, i) => {
        return t.ImportDeclaration(
          [t.importDefaultSpecifier(specifier.local)],
          t.StringLiteral(`${source.value}/${specifier.local.name}`)
        )
      })
      path.replaceWithMultiple(declarations)
    }
  }
}


module.exports  = function () {
  return {visitor}
}


