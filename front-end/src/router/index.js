import Vue from 'vue';
import VueRouter from 'vue-router';
import BrowseView from '../views/BrowseView.vue';
import LibraryView from '../views/LibraryView.vue';
import ManageView from '../views/ManageView.vue';

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
		path: '/manage',
		name: 'manage',
		component: ManageView,
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
