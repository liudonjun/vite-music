import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import VueLazyLoad from 'vue3-lazyload'
import loadingDirective from './components/base/loading/directive'
import noResultDirective from './components/base/no-result/directive'
// import { mainStore } from './store/index'
// 导入全局样式
import './styles/index.scss'
// 创建Vue实例
let app = createApp(App)
let pinia = createPinia()
app.use(router)
app.use(pinia)
app.directive('loading', loadingDirective)
app.directive('no-result', noResultDirective)
app.use(VueLazyLoad, {
  loading: new URL('./assets/images/default.png', import.meta.url).toString()
})
app.mount('#app')
