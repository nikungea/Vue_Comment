# Vue事件与表单

## 事件处理

  v-on:事件 = '表达式或者方法名'

```js
  <button v-on:click="counter += 1">Add 1</button>
  <button v-on:click="greet">Greet</button>
   methods: {
    greet(event) {
      // `this` 在方法里指向当前 Vue 实例
      alert('Hello ' + this.name + '!')
      // `event` 是原生 DOM 事件
      if (event) {
        alert(event.target.tagName)
      }
    }
  }
  // 也可以在内联 JavaScript 语句中调用方法：
  <button v-on:click="say('hi')">Say hi</button>
  methods: {
    say: function (message) {
      alert(message)
    }
  }
```

在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 $event 把它传入方法。

```js
  <button v-on:click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>
```

### 事件修饰符

在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 是非常常见的需求。尽管我们可以在方法中轻松实现这点，但更好的方式是：方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。

为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

- .stop
- .prevent
- .capture
- .self
- .once
- .passive

```js
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>
<!-- 点击事件将只会触发一次 -->
<a v-on:click.once="doThis"></a>
```

**使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。**

Vue 还对应 addEventListener 中的 passive 选项提供了 .passive 修饰符。

```js
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

.passive 修饰符尤其能够提升移动端的性能。

### 按键修饰符

```js
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">
```

- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down
- .left
- .right

### 系统修饰键

可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器。

- .ctrl
- .alt
- .shift
- .meta

> 在 Mac 系统键盘上，meta 对应 command 键 (⌘)。在 Windows 系统键盘 meta 对应 Windows 徽标键 (⊞)。

```js

<!-- Alt + C -->
<input v-on:keyup.alt.67="clear">

<!-- Ctrl + Click -->
<div v-on:click.ctrl="doSomething">Do something</div>
```

#### .exact修饰符

.exact 修饰符允许你控制由精确的系统修饰符组合触发的事件。

```js
<!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
<button v-on:click.ctrl="onClick">A</button>

<!-- 有且只有 Ctrl 被按下的时候才触发 -->
<button v-on:click.ctrl.exact="onCtrlClick">A</button>

<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button v-on:click.exact="onClick">A</button>

```

#### 鼠标按钮修饰符

- .left
- .right
- .middle

这些修饰符会限制处理函数仅响应特定的鼠标按钮。

## 表单输入绑定

可以用 v-model 指令在表单 <input>、<textarea> 及 <select> 元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据，并对一些极端场景进行一些特殊处理。

v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。**你应该通过 JavaScript 在组件的 data 选项中声明初始值。**

v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

1. text 和 textarea 元素使用 value property 和 input 事件；
2. checkbox 和 radio 使用 checked property 和 change 事件；
3. select 字段将 value 作为 prop 并将 change 作为事件。

```js
<input v-model="message" placeholder="edit me">
<p>Message is: {{ message }}</p>
```

### 修饰符

#### .lazy

在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步：

```js
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg">
```

#### .number

自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：

```js
<input v-model.number="age" type="number">
```

这通常很有用，因为即使在 type="number" 时，HTML 输入元素的值也总会返回字符串。如果这个值无法被 parseFloat() 解析，则会返回原始的值。

#### .trim

自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符：

```js
<input v-model.trim="msg">
```
