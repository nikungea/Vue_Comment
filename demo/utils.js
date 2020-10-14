/**
 * @desc 解析路径，不会正则，直接抄的
 */
const bailRE = new RegExp(`[^${unicodeRegExp.source}.$_\\d]`)
export const parsePath = path => {
  if (bailRE.test(path)) {
    return;
  }
  const segments = path.split('.')
  return function (obj) {
    for (let i = 0; i < segments.length; i++) {
      if (!obj) return;
      obj = obj[segments[i]];
    }
    return obj;
  }
}

/**
 * @desc 移除指定元素
 * @param {array} arr 
 * @param {any} item 
 */
export const remove = (arr, item) => {
  if (arr.length) {
    const i = arr.indexOf(item);
    if (i > -1) {
      return arr.splice(i, 1)
    }
  }
}