/**
 * 这里，是真正定义Vue最开始的地方
 * 实际上就是一个用 Function 实现的类，只能通过 new Vue 去实例化它。
 */
import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// Vue 只能通过 new 关键字初始化，然后会调用 this._init 方法
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
/**
 * 给 Vue 的 prototype 上扩展一些方法。
 * Vue 按功能把这些扩展分散到多个模块中去实现，而不是在一个模块里实现所有。
 * 方便代码的维护和管理
 */
initMixin(Vue)
stateMixin(Vue)
eventsMixin(Vue)
lifecycleMixin(Vue)
renderMixin(Vue)

export default Vue
