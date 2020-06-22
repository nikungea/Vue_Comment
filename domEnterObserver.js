/**
 * @desc 元素完全进入时触发回调
 * @param flag String TODO 后续用来控制事件
 */

// 引入w3c polyfill
// import './intersection-observer';

let target;
let targetNodes = [], trackInfo = [];

/**
 * Ensure a function is called only once.
 */
const once = function(fn) {
  let called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

// - 遍历DOM，记录下具有某属性的节点，存入数组。
const getTarget = function () {
  const allNodes = document.getElementsByTagName('*');
  // 获取目标节点
  for (let i = 0, max_0 = allNodes.length; i < max_0; i++) {
    let node = allNodes[i];
    if (node.getAttribute('_st')) {
      target = node;
      targetNodes.push(target);
    }
  }
  targetNodes = [... new Set(targetNodes)];
};

// 获取给每个目标节点的信息，并注册上观察者事件
const registerObserver = function () {
  getTarget();
  for (let j = 0, max_1 = targetNodes.length; j < max_1; j++) {
    // 采集信息
    trackInfo.push({
      nodeKey: targetNodes[j].getAttributeNames(),
      node: targetNodes[j].nodeName,
      nodeContent: targetNodes[j].textContent
    });
    // 注册事件
    initEnterObserver(targetNodes[j]);
  }
  trackInfo = [... new Set(trackInfo)];
  console.log(targetNodes);
  // console.log(trackInfo);
}

// 注册曝光观察者事件
const initEnterObserver = function (el) {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };
  // entry.intersectionRatio;   重叠区域占被观察者面积的比例
  const callback = function (entries, observer) {
    entries.forEach(entry => {
      // 元素完全进入时触发回调，而且只有第一次进入会触发
      if (entry.intersectionRatio === 1) {
        // 触发一次
        // TODO 埋点callback
        console.log('ob');
        // 移除观察事件
        observer.disconnect();
      }
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
}

// 监视动态添加的属性或节点
const initChangeObserver = function () {
  const callback = () => {
    registerObserver();
  }
  const config = {
    childList: true,
    attributes: true,
    subtree: true
  };
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, config);
}

// 暴露接口
export const domEnterObserver = function () {
  registerObserver();
  initChangeObserver();
};
