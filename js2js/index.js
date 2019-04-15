// import babelParser from '@babel/parser';
const babylon = require("babylon");

function traversAst() {
    const textarea = document.querySelector('#textarea');
    const ast = babylon.parse(textarea.innerHTML);
    parseAstNode.bind(this)(ast.program);
}
window.traversAst = traversAst;
function parseAstNode(node) {
  // 根节点
  if(node.type === 'Program') {
    node.body && node.body.forEach(node => {
      return parseAstNode(node);
    })
  }


  if(node.type === 'ExpressionStatement') {
      return parseAstNode(node.expression);
  }


  if(node.type === 'CallExpression') {

    const callee = parseAstNode(node.callee).value;

    // 获取函数的参数
    const args = node.arguments.map(arg => {
      return parseAstNode(arg);
    });

    callee(...args);
  }

  if(node.type === 'MemberExpression') {

    const propName = node.property.name; // 对象
    const hostObject = parseAstNode(node.object); // 对象上的方法

    const target = hostObject[propName];

    return typeof target === "function"
      ? target.bind(hostObject) // 绑定作用域
      : target;
  }

  if(node.type === 'StringLiteral') {
    return node.value;
  }

  if(node.type === 'Identifier') {
    return {
      name: node.name,
      value:this[node.name]
    };
  }

  if(node.type === 'VariableDeclaration') {
    node.declarations.forEach(d => {
      parseAstNode(d);
    })
  }

  if(node.type === 'VariableDeclarator') {
    const variableName = node.id.name;
    const variableValue = node.init.value;

    this[variableName] = variableValue;
  }

  if(node.type === 'BinaryExpression'){
    const left = parseAstNode(node.left).value;
    const right = parseAstNode(node.right).value;

    switch (node.operator) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
    }
  }

  if(node.type === 'UpdateExpression'){
    let {name, value} = parseAstNode(node.argument);

    switch (node.operator) {
      case '++': this[name] = value++;
      case '--': this[name] = value--;
    }
  }

}

