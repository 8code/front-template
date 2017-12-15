import vue from 'Vue'
import VueRouter from 'vue-router'

/**
 * Components
 */
// pages
import Hello from './views/page-hello.vue'
// single
//import Single from './views/single.vue'
// page
//import Page from './views/page.vue'


/**
 * Settings
 */
vue.use(VueRouter)


/**
 * Routing
 */
export default new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    { path: '/', component: Hello }
  ]
});