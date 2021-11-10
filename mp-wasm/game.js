import "./weapp-adapter"
import "./wasm_exec"

function term_space(str) {
  return str.replace(/[\s\r\n]/g, "");
}
var s_id = term_space('(function(x) { return x; })');
var s_instanceOf = term_space('(function (x, y) { return x instanceof y; })');
var s_getValueType = term_space(`(function (x) {
  if (typeof (x) === "undefined") {
    return 0; // TypeUndefined
  }
  if (x === null) {
    return 1; // TypeNull
  }
  if (typeof (x) === "boolean") {
    return 2; // TypeBoolean
  }
  if (typeof (x) === "number") {
    return 3; // TypeNumber
  }
  if (typeof (x) === "string") {
    return 4; // TypeString
  }
  if (typeof (x) === "symbol") {
    return 5; // TypeSymbol
  }
  if (typeof (x) === "function") {
    return 7; // TypeFunction
  }
  return 6; // TypeObject
})`)

var s_id2 = term_space('(function (a) { return a; })')
var s_copy = term_space('(function(a, b) {for (let i = 0; i < b.length; i++) {a[i] = b[i]}})')
var s_time = term_space('(function() {return new Date().getTime();})')

function fn_id(x) { return x; }
function fn_instanceOf(x, y) { return x instanceof y; }
function fn_getValueType(x) {
  if (typeof (x) === "undefined") {
    return 0; // TypeUndefined
  }
  if (x === null) {
    return 1; // TypeNull
  }
  if (typeof (x) === "boolean") {
    return 2; // TypeBoolean
  }
  if (typeof (x) === "number") {
    return 3; // TypeNumber
  }
  if (typeof (x) === "string") {
    return 4; // TypeString
  }
  if (typeof (x) === "symbol") {
    return 5; // TypeSymbol
  }
  if (typeof (x) === "function") {
    return 7; // TypeFunction
  }
  return 6; // TypeObject
}

function fn_copy(a, b) { for (let i = 0; i < b.length; i++) { a[i] = b[i] } }

GameGlobal.eval = function(a) {
  a = term_space(a)
  if (a == s_id) {
    return fn_id;
  } else if (a == s_instanceOf) {
    return fn_instanceOf;
  } else if (a == s_getValueType) {
    return fn_getValueType;
  } else if (a == s_copy) {
    return fn_copy;
  } 
}


// if (!WXWebAssembly.instantiateStreaming) { // polyfill
//   WXWebAssembly.instantiateStreaming = async (resp, importObject) => {
//     const source = await (await resp).arrayBuffer();
//     return await WXWebAssembly.instantiate(source, importObject);
//   };
// }

global.WebAssembly = WXWebAssembly

const go = new global.Go();
let mod, inst;
WebAssembly.instantiate("/main.wasm", go.importObject).then((result) => {
  mod = result.module;
  inst = result.instance;
  console.log("load",inst);
  go.run(inst);
}).catch((err) => {
  console.error(err);
});


// async function run() {
//   //console.clear();
//   await go.run(inst);
//   inst = await WXWebAssembly.instantiate(mod, go.importObject); // reset instance
// }

// run();
