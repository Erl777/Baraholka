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
        path: 'add',
        meta: { auth: true },
        component: () => import('../views/ProfilePages/AddPost')
      },
      {
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
    const userToken = localStorage.getItem('token');

    if(!store.state.user){
      // подтягиваются данные пользователя если их нет, но есть токен
      // (тот случай, когда пользователь зашел на страницу и у него есть токен)
      (async function () {
        await store.dispatch('getUserByToken', userToken);
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
