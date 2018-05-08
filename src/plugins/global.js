export default {
  install (Vue, options) {
    Vue.$test = function () {
      console.log('test function in vue plugins')
    }

    // 2. 添加全局资源
    Vue.directive('my-directive', {
      bind (el, binding, vnode, oldVnode) {
        // 逻辑...
      }
    })

    // 3. 注入组件
    Vue.mixin({
      created: function () {
        // 逻辑...
      }
    })

    // 4. 添加实例方法
    Vue.prototype.$test2 = function (methodOptions) {
      console.log('test function in vue plugins')
    }
  }
}