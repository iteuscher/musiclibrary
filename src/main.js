import Vue from 'vue';
import App from './App.vue';
import router from './router';
import mock from './mock-data';

Vue.config.productionTip = false;

let data = {
	albums: mock,
	library: [],
};

new Vue({
	router,
	data,
	render: (h) => h(App),
}).$mount('#app');
