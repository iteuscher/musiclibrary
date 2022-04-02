import Vue from 'vue';
import VueRouter from 'vue-router';
import BrowseView from '../views/BrowseView.vue';
import LibraryView from '../views/LibraryView.vue';
import AboutView from '../views/AboutView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'browse',
		component: BrowseView,
	},
	{
		path: '/library',
		name: 'library',
		component: LibraryView,
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
