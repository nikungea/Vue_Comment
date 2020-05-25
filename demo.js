function isPrimitive(v) {
  return (
    typeof v === "string" ||
    typeof v === "number" ||
    typeof v === "symbol" ||
    typeof v === "boolean"
  );
}
// 判断是否定义
function isDef(v) {
  return v !== undefined && v !== null;
}

function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

function isPromise(obj) {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}

var _toString = Object.prototype.toString;

function toRawType(v) {
  return _toString.call(v).slice(8, -1);
}

function isPlainObject(obj) {
  return _toString.call(obj) === "[object Object]";
}

function isPromiseVue(v) {
  return (
    isDef(v) && typeof v.then === "function" && typeof v.catch === "function"
  );
}

/**
 * Convert a value to a string that is actually rendered.
 * 转为标准的字符串
 * 条件运算符，条件?表达式1:表达式2  条件为true时执行表达式1，false执行表达式2
 */
function toString(val) {
  return val == null
    ? ""
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)  // 是否为数组 || (是否为Plain Object且原型链上有toString方法)
      ? JSON.stringify(val, null, 2)  // 转为json字符串，缩进两位
      : String(val); // 转为字符串
}

function cached(fn) {
  var cache = Object.create(null);
  // console.log(cache, 'outer');
  return (function cachedFn(str) {
    var hit = cache[str];
    // console.log(cache, 'inner');
    return hit || (cache[str] = fn(str))
  })
}

// let testFn = cached(function(id) {
//   console.log("执行testFn");
//   return id;
// });


// console.log(testFn('123'));
// console.log(testFn('123'));

var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

// console.log(hyphenate('helloWorld'));

function toArray(list, start) {
  start = start || 0;
  let i = list.length - start;
  let ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret;
}
let arrLike = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}

// console.log(toArray(arrLike));
// let arr = Array.prototype.slice.call(arrLike);
// let arr = [...arrLike]
// console.log(arr);
function extend(to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}
let obj1 = { a: 1, b: 2, c: 3 };
let obj2 = { d: 4, e: 5, f: 6 };
// console.log(extend(obj1, obj2));

function toObject(arr) {
  let res = {};
  for (let i = 0; i< arr.length; i++) {
    if(arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res;
}
let test = [{a:'wer'}, {b:234}];
console.log(toObject(test));
