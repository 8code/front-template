import vue from 'Vue'
import VueResource from 'vue-resource'
import WPAPI from 'wpapi'
import App from './app.vue'
//import store from './store'
import router from './router'
//import { sync } from 'vuex-router-sync'


/**
 * Settings
 */
//sync(store, router)
vue.use(VueResource)
vue.config.devtools = true;
vue.http.options.credentials = true;

//console.log(WP_API_Settings);
const wp = new WPAPI({
    endpoint: window.WP_API_Settings.root,
    nonce: window.WP_API_Settings.nonce
});


/**
 * App Entry
 */
const app = new vue({
  data: () => {
    return {
      'wp': wp
    }
  },
  router,
  render: c => c(App)
}).$mount('#app');

export { app, router };