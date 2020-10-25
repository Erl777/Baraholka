import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/post/:id',
    name: 'PostPage',
    component: () => import('../views/PostPage.vue')
  },
  {
    path: '*',
    name: 'Error',
    component: () => import('../views/Error404')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    redirect: {name: 'profileDefaultPage'},
    children: [
      {
        // при совпадении пути с шаблоном /user/:id/profile
        // в <router-view> компонента User будет показан UserProfile
        path: 'add',
        component: () => import('../views/ProfilePages/AddPost')
      },
      {
        // при совпадении пути с шаблоном /user/:id/posts
        // в <router-view> компонента User будет показан UserPosts
        path: 'archive',
        component: () => import('../views/ProfilePages/Archive')
      },
      {
        path: 'favourite',
        component: () => import('../views/ProfilePages/Favourite')
      },
      {
        name: 'profileDefaultPage',
        path: 'posts',
        component: () => import('../views/ProfilePages/MyPosts')
      },
      {
        path: 'post/:id/edit',
        component: () => import('../views/ProfilePages/PostEdit')
      },
      {
        path: 'settings',
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

export default router
