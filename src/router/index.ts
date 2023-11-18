import HomeView from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { left: 0, top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/products',
      name: 'products',
      component: () => import('@/pages/Products.vue')
    },
    {
      path: '/products/:id',
      name: 'products.show',
      component: () => import('@/pages/ProductDetail.vue'),
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/pages/Cart.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/pages/Checkout.vue')
    },
    {
      path: '/orders',
      name: 'orders',
      component: () => import('@/pages/Orders.vue')
    },
    {
      path: '/orders/:id',
      name: 'orders.show',
      component: () => import('@/pages/OrderDetail.vue'),
      props: (route) => ({ id: route.params.id })
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/Register.vue')
    }
  ]
})

export default router
