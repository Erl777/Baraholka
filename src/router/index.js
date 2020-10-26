import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: { auth: false },
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { auth: false },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { auth: false },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    meta: { auth: false },
    component: () => import('../views/PostPage.vue')
  },
  {
    path: '*',
    name: 'Error',
    meta: { auth: false },
    component: () => import('../views/Error404')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { auth: true },
    component: () => import('../views/Profile.vue'),
    redirect: {name: 'profileDefaultPage'},
    children: [
      {
        // при совпадении пути с шаблоном /user/:id/profile
        // в <router-view> компонента User будет показан UserProfile
        path: 'add',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/AddPost')
      },
      {
        // при совпадении пути с шаблоном /user/:id/posts
        // в <router-view> компонента User будет показан UserPosts
        path: 'archive',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/Archive')
      },
      {
        path: 'favourite',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/Favourite')
      },
      {
        name: 'profileDefaultPage',
        path: 'posts',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/MyPosts')
      },
      {
        path: 'post/:id/edit',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/PostEdit')
      },
      {
        path: 'settings',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/Settings')
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {

  if(!store.state.token){
    store.state.token = localStorage.getItem('token');
  }

  if (to.matched.some(record => record.meta.auth === true)){
    // если необходима авторизация на странице, то берем токен пользователя
    console.time("askToken");
    const userToken = localStorage.getItem('token');
    console.timeEnd("askToken");

    if(!store.state.user){
      // подтягиваются данные пользователя если их нет, но есть токен
      // (тот случай, когда пользователь зашел на страницу и у него есть токен)
      (async function () {
        const userData = await store.dispatch('getUserByToken', userToken);
        console.log(userData);
        store.commit('setUserToStore', userData.data) ;
      }())

    }

    if(!userToken){
      // Если нет токена, то авторизуйтесь
      next('/login')
    } else {
      next()
    }
  }
  else {
    next()
  }

});

export default router
