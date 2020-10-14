import { defineReactive } from "./reactive";
/**
 * @desc 观察者
 */
export default class Observer {
  constructor(value){
    this.value = value;
    if(!Array.isArray(value)){
      this.walk(value);
    }
  };
  // 将每个属性都转换为响应式数据
  walk(obj){
    const keys = Object.keys(obj);
    for (const el of keys) {
      defineReactive(obj, el, obj[el]);
    }
  }
};
