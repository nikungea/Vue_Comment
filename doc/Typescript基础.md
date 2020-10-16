# Typescript

## 简介

TypeScript 是 JavaScript 的一个超集，主要提供了类型系统和对 ES6 的支持，它由 Microsoft 开发，代码开源于 GitHub 上。

> 官方定义：TypeScript 是 JavaScript 的类型的超集，它可以编译成纯 JavaScript。编译出来的 JavaScript 可以运行在任何浏览器上。TypeScript 编译工具可以运行在任何服务器和任何系统上。TypeScript 是开源的。

### 优势

TypeScript 增加了代码的可读性和可维护性：

- 类型系统实际上是最好的文档，大部分的函数看看类型的定义就可以知道如何使用了
- 可以在编译阶段就发现大部分错误，这总比在运行时候出错好
- 增强了编辑器和 IDE 的功能，包括代码补全、接口提示、跳转到定义、重构等

TypeScript 非常包容：

- TypeScript 是 JavaScript 的超集，.js 文件可以直接重命名为 .ts 即可
- 即使不显式的定义类型，也能够自动做出类型推论
可以定义从简单到复杂的几乎一切类型
- 即使 TypeScript 编译报错，也可以生成 JavaScript 文件
- 兼容第三方库，即使第三方库不是用 TypeScript 写的，也可以编写单独的类型文件供 TypeScript 读取

TypeScript 拥有活跃的社区：

- vue3就是用ts重写的

### 缺点

- 有一定的学习成本，需要理解接口（Interfaces）、泛型（Generics）、类（Classes）、枚举类型（Enums）等概念
- 短期可能会增加一些开发成本，要多写一些类型的定义，不过对于一个需要长期维护的项目，TypeScript 能够减少其维护成本
- 集成到构建流程需要一些工作量
- 和一些库结合的不是很完美

## 安装

全局安装

```bash
npm install -g typescript
```

编译

```bash
tsc hello.ts
```

编辑

VSCode原生支持TS

## 基础

TypeScript 中，使用 : 指定变量的类型，: 的前后有没有空格都可以。

编译为 js 之后，并没有什么检查的代码被插入进来，**TypeScript 只会进行静态检查，如果发现有错误，编译的时候就会报错。**编译的时候**即使报错了，还是会生成编译结果**，仍然可以使用这个编译之后的文件。
> 如果要在报错的时候终止 js 文件的生成，可以在 tsconfig.json 中配置 noEmitOnError 即可。

简单的例子

```typescript
const say = function(person:string){
  console.log('Hello :>> ', person);
};
const user = 'lhq';
say(user);
```

在终端执行

```bash
tsc hello.ts
```

会生成hello.js文件

```js
var say = function (person) {
    console.log('Hello :>> ', person);
};
var user = 'lhq';
say(user);
```

### 原始数据类型

JavaScript 的类型分为两种：原始数据类型（Primitive data types）和对象类型（Object types）。

原始数据类型包括：布尔值、数值、字符串、null、undefined 以及 ES6 中的新类型 Symbol。

#### 布尔值

在 TypeScript 中，使用 boolean 定义布尔值类型：

```ts
let isDone: boolean = false;
```

需要注意，使用构造函数 Boolean 创造的是对象不是布尔值：

```ts
let createdByNewBoolean: boolean = new Boolean(1);
编译器会报错
// 不能将类型“Boolean”分配给类型“boolean”。
// “boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。
typeof new Boolean(1);
// "object"
```

事实上 new Boolean() 返回的是一个 Boolean 对象，可以用Boolean注释

```ts
let createdByBoolean: boolean = Boolean(1);
```

#### 数值

number

```ts
  let decLiteral: number = 6;
  let hexLiteral: number = 0xf00d;
```

#### 字符串

string

```ts
  let myName: string = 'Tom';
  // 模板字符串
  let sentence: string = `Hello, my name is ${myName}.
  I'll be ${myAge + 1} years old next month.`;
```

#### 空值void

JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数：

```ts
  function alertName(): void {
    alert('My name is Tom');
}
```

声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null：

```ts
  let unusable: void = undefined;
```

#### Null 和 Undefined

在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型：

```ts
  let u: undefined = undefined;
  let n: null = null;
```

与 void 的区别是，**undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量：**

```ts
  // 这样不会报错
  let num: number = undefined;
  // 这样也不会报错
  let u: undefined;
  let num: number = u;
```

而 void 类型的变量不能赋值给 number 类型的变量：

```ts
  let u: void;
  let num: number = u;
// Type 'void' is not assignable to type 'number'.

```

### 任意值

any用来表示允许赋值为任意类型。

如果是一个普通类型，在赋值过程中改变类型是不被允许的，但如果是 any 类型，则允许被赋值为任意类型。

在任意值上访问任何属性都是允许的，也允许调用任何方法，可以认为，**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值。**

变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型。

### 类型推论

如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。
> 在没有明确的指定类型的时候推测出一个类型，这就是类型推论。

```ts
let myName = 'lhq';
myName = 123;
// 不能将类型“number”分配给类型“string”。ts(2322)
```

等价于

```ts
let myName:string = 'lhq';
myName = 123;
```

如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：

```ts
let myFavoriteNumber;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

### 联合类型

联合类型（Union Types）表示取值可以为多种类型中的一种。使用 | 分隔每个类型。

```ts
let myVar: string | number;
myVar = 123;
myVar = 'lhq';
```

```ts
let myVar: string | number;
myVar = true;
// 不能将类型“boolean”分配给类型“string | number”。ts(2322)
```

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，只能访问此联合类型的所有类型里共有的属性或方法：

```ts
const getSth = function(sth: string | number):number{
  return sth.length;
}
// 类型“number”上不存在属性“length”。ts(2339)
```

可以访问共有属性：

```ts
const getSth = function(sth: string | number):string{
  return sth.toString();
}
```

联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型：

```ts
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
console.log(myFavoriteNumber.length); // 5
myFavoriteNumber = 7;
console.log(myFavoriteNumber.length); // 编译时报错

// index.ts(5,30): error TS2339: Property 'length' does not exist on type 'number'.
```

上例中，第二行的 myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错。

而第四行的 myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了。

### 接口-Interfaces

在 TypeScript 中，我们使用接口（Interfaces）来定义对象的类型。

在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。

接口一般首字母大写。

```ts
interface Person {
  name: string;
  age: number;
  isGay: boolean;
  detail: object;
}

let Arthur: Person = {
  name: 'lhq',
  age: 28,
  isGay: false,
  detail: {
    hobby: 'shooting',
    job: 'programmer'
  }
}
```

我们定义了一个接口 Person，接着定义了一个变量 Arthur，它的类型是 Person。这样，我们就约束了 Arthur 的形状必须和接口 Person 一致。

定义的变量比接口少了一些属性， 多一些属性都是不允许的。

**赋值的时候，变量的形状必须和接口的形状保持一致。**

#### 可选属性

有时希望不要完全匹配一个形状，那么可以用可选属性：

```ts
interface Person {
  name: string;
  age: number;
  isGay?: boolean;
  detail: object;
}

let Arthur: Person = {
  name: 'lhq',
  age: 28,
  detail: {
    hobby: 'shooting',
    job: 'programmer'
  }
}
```

**可选属性的含义是该属性可以不存在，但仍然不允许添加未定义的属性。**

#### 任意属性

有时候我们希望一个接口允许有任意的属性，可以使用 [propName: string] 定义了任意属性取 string 类型的值。

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集。

```ts
interface Person {
  name: string;
  age?: number;
  isGay?: boolean;
  detail: object;
  [propName: string]: string;
}
// 类型“number”的属性“age”不能赋给字符串索引类型“string”。
// 类型“boolean”的属性“isGay”不能赋给字符串索引类型“string
// 类型“object”的属性“detail”不能赋给字符串索引类型“string
```

上例中，任意属性的值允许是 string，但是可选属性 age 的值却是 number，number 不是 string 的子属性，所以报错了。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型，或者使用any：

```ts
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
    [propName: string]: any;

}
```

#### 只读属性

有时希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性：

```ts
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}
let arthur:Person = {
  id: 123,
  name: 'lhq',
  gender: 'male'
}
arthur.id = 456;
// 无法分配到 "id" ，因为它是只读属性。ts(2540)
```

需要注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候，也就是说，必须要在给对象初始化的时候就赋值，而不能通过 .语法或者[]。

```ts
interface Person {
  readonly name?: string;
  age?: number;
  isGay?: boolean;
  detail: object;
  [propName: string]: any;
}

let Arthur: Person = {
  age: 28,
  detail: {
    hobby: 'shooting',
    job: 'programmer'
  },
  isGay:false,
  sex:'male'
}
Arthur.name = 'lmh'
// Arthur['name'] = 'lmh'一样
// 无法分配到 "name" ，因为它是只读属性。ts(2540)
```

### 数组的类型
