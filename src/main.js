// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './../static/css/reset.css'
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'
import './common/less/common.less'
import 'vue2-animate/dist/vue2-animate.min.css'

Vue.config.productionTip = false

Vue.use(VueRouter)

let router = new VueRouter({
	linkActiveClass: 'active',
	// mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/goods',
		},
		{
			path: '/goods',
			name: 'goods',
			component: goods,
		},
		{
			path: '/ratings',
			name: 'ratings',
			component: ratings,
		},
		{
			path: '/seller',
			name: 'seller',
			component: seller,
		},
	]
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	template: '<App/>',
	components: { App }
})
