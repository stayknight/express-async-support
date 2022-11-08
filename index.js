const Layer = require('express/lib/router/layer')
const Router = require('express/lib/router')

Object.defineProperty(Layer.prototype, 'handle', {
  enumerable: true,
  get() {
    return this.__handle
  },
  set(fn) {
    this.__handle = wrapHandle(fn)
  }
})

function isAsyncFunction(fn) {
  return Object.prototype.toString.call(fn) === '[object AsyncFunction]'
}

function wrapHandle(fn) {
    if (isAsyncFunction(fn)) {
      return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next)
      }
    }
    return fn
}

function patchRouterParam() {
  const originalParam = Router.prototype.constructor.param;
  Router.prototype.constructor.param = function param(name, fn) {
    fn = wrapHandle(fn);
    return originalParam.call(this, name, fn);
  };
}
patchRouterParam();
