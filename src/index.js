import Vue from 'vue' // Vue を使う
import App from './App' // App.vue を読み込む

// IE11/Safari9用のpolyfill
// babel-polyfill を import するだけで IE11/Safari9 に対応した JavaScript にトランスコンパイルされる
import 'babel-polyfill'

// Buefy: Vue + Bulma
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)

// DraggableTree
import {DraggableTree} from 'vue-draggable-nested-tree';
Vue.component('tree', DraggableTree);

// Vue警告無視
Vue.config.warnHandler = function (msg, vm, trace) {
  msg = null;
  vm = null;
  trace = null;
}

// NestedTreeコンポーネント
import NestedTree from './components/NestedTree'
Vue.component('nested-tree', NestedTree)

// BaklavaJS
import { BaklavaVuePlugin } from '@baklavajs/plugin-renderer-vue';
import '@baklavajs/plugin-renderer-vue/dist/styles.css';
Vue.use(BaklavaVuePlugin);

new Vue({
  el: '#app', // Vueでマウントする要素
  render: h => h(App), // App.vue をレンダリング
})