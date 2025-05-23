import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/dashboard',
	},
	{
		path: '/dashboard',
		name: '主页',
		layout: "Default",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard.vue'),
	},
	{
		path: '/layout',
		name: 'Layout',
		layout: "dashboard",
		component: () => import('../views/Layout.vue'),
	},
	{
		path: '/recommend',
		name: '推荐',
		layout: "dashboard",
		component: () => import('../views/Recommend.vue'),
	},
	{
		path: '/generate',
		name: '生成',
		layout: "dashboard",
		component: () => import('../views/Generate.vue'),
	},
	{
		path: '/match',
		name: '搭配',
		layout: "dashboard",
		component: () => import('../views/Match.vue'),
	},
    {
		path: '/history',
		name: '推荐历史',
		layout: "dashboard",
		component: () => import('../views/RecommendHistory.vue'),
	},
    {
		path: '/generate_history',
		name: '生成历史',
		layout: "dashboard",
		component: () => import('../views/GenerateHistory.vue'),
	},
    {
		path: '/find_history',
		name: '检索历史',
		layout: "dashboard",
		component: () => import('../views/FindHistory.vue'),
	},
    {
		path: '/match_history',
		name: '搭配历史',
		layout: "dashboard",
		component: () => import('../views/MatchHistory.vue'),
	},
    {
		path: '/index',
		name: '主页',
		layout: "dashboard",
		component: () => import('../views/Index.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	},
	{
		path: '/login',
		name: 'Login',
		component: () => import('../views/Sign-In.vue'),
	},
    {
		path: '/wear',
		name: 'Virtual Wear',
        layout: "dashboard",
		component: () => import('../views/Wear.vue'),
	},
    {
		path: '/find',
		name: 'Clip Find',
        layout: "dashboard",
		component: () => import('../views/Find.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		meta: {
			layoutClass: 'layout-sign-up',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

export default router
