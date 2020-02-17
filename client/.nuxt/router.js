import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _4b8ffe26 = () => interopDefault(import('../pages/address/index.vue' /* webpackChunkName: "pages/address/index" */))
const _6f267bc1 = () => interopDefault(import('../pages/cart.vue' /* webpackChunkName: "pages/cart" */))
const _63bf35a0 = () => interopDefault(import('../pages/FeaturedProduct.vue' /* webpackChunkName: "pages/FeaturedProduct" */))
const _9b14bc6e = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _62fcd690 = () => interopDefault(import('../pages/logIn.vue' /* webpackChunkName: "pages/logIn" */))
const _37649ac6 = () => interopDefault(import('../pages/orders.vue' /* webpackChunkName: "pages/orders" */))
const _754c2a16 = () => interopDefault(import('../pages/payment.vue' /* webpackChunkName: "pages/payment" */))
const _0fbe5630 = () => interopDefault(import('../pages/placeOrder.vue' /* webpackChunkName: "pages/placeOrder" */))
const _2bc1b918 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _422af7ee = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _979178ce = () => interopDefault(import('../pages/signUp.vue' /* webpackChunkName: "pages/signUp" */))
const _7c778d75 = () => interopDefault(import('../pages/address/add.vue' /* webpackChunkName: "pages/address/add" */))
const _1b33520e = () => interopDefault(import('../pages/address/_id.vue' /* webpackChunkName: "pages/address/_id" */))
const _198fe6b0 = () => interopDefault(import('../pages/products/_id.vue' /* webpackChunkName: "pages/products/_id" */))
const _45c09335 = () => interopDefault(import('../pages/reviews/_id.vue' /* webpackChunkName: "pages/reviews/_id" */))
const _3b750581 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/address",
    component: _4b8ffe26,
    name: "address"
  }, {
    path: "/cart",
    component: _6f267bc1,
    name: "cart"
  }, {
    path: "/FeaturedProduct",
    component: _63bf35a0,
    name: "FeaturedProduct"
  }, {
    path: "/inspire",
    component: _9b14bc6e,
    name: "inspire"
  }, {
    path: "/logIn",
    component: _62fcd690,
    name: "logIn"
  }, {
    path: "/orders",
    component: _37649ac6,
    name: "orders"
  }, {
    path: "/payment",
    component: _754c2a16,
    name: "payment"
  }, {
    path: "/placeOrder",
    component: _0fbe5630,
    name: "placeOrder"
  }, {
    path: "/profile",
    component: _2bc1b918,
    name: "profile"
  }, {
    path: "/search",
    component: _422af7ee,
    name: "search"
  }, {
    path: "/signUp",
    component: _979178ce,
    name: "signUp"
  }, {
    path: "/address/add",
    component: _7c778d75,
    name: "address-add"
  }, {
    path: "/address/:id",
    component: _1b33520e,
    name: "address-id"
  }, {
    path: "/products/:id?",
    component: _198fe6b0,
    name: "products-id"
  }, {
    path: "/reviews/:id?",
    component: _45c09335,
    name: "reviews-id"
  }, {
    path: "/",
    component: _3b750581,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
