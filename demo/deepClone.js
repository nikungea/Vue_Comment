const exactType = param => Object.prototype.toString.call(param).slice(8, -1).toLowerCase();

class ValidationError extends Error {
  constructor(errMsg) {
    super(errMsg);
    this.name = 'ValidationError';
    this.message = errMsg;
  }
}

const deepClone = param => {
  // 简单的参数校验
  if (typeof param === 'undefined' || typeof param === 'function') {
    throw new ValidationError('请正确传参！');
  };
  // 简单数据类型直接返回此值
  if (typeof param !== 'object') {
    return param;
  } else {
    let obj = {};
    // 引用类型分object和array处理
    switch (exactType(param)) {
      case 'object':
        for (const key in param) {
          if (param.hasOwnProperty(key) && typeof param[key] === 'object') {
            obj[key] = deepClone(param[key]);
          } else {
            obj[key] = param[key];
          }
        };
        break;
      case 'array':
        let tmpArr = [];
        for (const iterator of param) {
          if (typeof iterator !== 'object') {
            tmpArr.push(iterator);
          } else {
            let tmpObj = {};
            for (const key in iterator) {
              if (iterator.hasOwnProperty(key) && typeof iterator[key] === 'object') {
                tmpObj[key] = deepClone(iterator[key]);
              } else {
                tmpObj[key] = iterator[key];
              }
            }
            tmpArr.push(tmpObj);
          }
          obj = tmpArr;
        };
        break;
      default:
        throw new Error('暂不具备处理set, map等格式数据的能力');
    }
    return obj;
  }
}

let arr = [1, 2, 3, { a: 1 }];
let arr2 = deepClone(arr);
console.log('arr2 :>> ', arr2);
arr2.push(4);
console.log('arr2 :>> ', arr2);
console.log('arr :>> ', arr);
arr2[3].text = 'lll';
console.log('arr2 :>> ', arr2);
console.log('arr :>> ', arr);
arr.length = 0;
console.log('arr :>> ', arr);
console.log('arr2 :>> ', arr2);
deepClone();