import Dep from "./dep";
import Observer from "./observer";
/**
 * @desc 定义一个响应式数据
 * @param {object} data
 * @param {string} key
 * @param {any} val
 */
export const defineReactive = function (data, key, val) {
  // 递归侦测所有属性
  if (typeof val === 'object') {
    new Observer(val);
  }
  const dep = new Dep();
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: true,
    get() {
      dep.depend();
      return val;
    },
    set(newVal) {
      if (val === newVal) {
        return;
      }
      val = newVal;
      dep.notify();
    }
  })
}