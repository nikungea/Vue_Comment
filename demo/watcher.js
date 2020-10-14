import { parsePath } from "./utils";

export default class Watcher {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    if (typeof expOrFn === 'function') {
      this.getter = expOrFn
    } else {
      this.getter = parsePath(expOrFn)
    }
    this.cb = cb;
    this.value = this.get();
  };
  get() {
    window.target = this;
    const vm = this.vm;
    const value = this.getter.call(vm, vm);
    window.target = null;
    return value;
  };
  update() {
    const oldVal = this.value;
    this.value = this.get();
    this.cb.call(this.vm, this.value, oldVal)
  }
};
