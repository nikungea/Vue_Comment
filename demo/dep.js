import { remove } from "./utils";

/**
 * @desc 依赖管理
 */
export default class Dep {
  constructor() {
    this.subs = [];
  };
  add(sub) {
    this.subs.push(sub);
  };
  removeSub(sub) {
    remove(this.subs, sub)
  };
  depend() {
    if (window.target) {
      this.addSub(window.target);
    }
  };
  notify() {
    const subs = [...this.subs];
    for (const value of subs) {
      value.update();
    }
  };
}
