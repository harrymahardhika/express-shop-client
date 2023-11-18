import api from '@/support/api'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserStore } from './user'

export const useOrderStore = defineStore('order', () => {
  const defaultCart = [] as Cart[]
  const orders = ref(null as Order[] | null)
  const meta = ref(null as Meta | null)
  const order = ref(null as Order | null)
  const cart = ref(useStorage('cart', defaultCart))
  const userStore = useUserStore()

  const addProductToCart = async (data: object) => {
    if (!userStore.token) throw new Error('Please login to add product to cart')

    try {
      await api.withToken(userStore.token).post('/cart', data)
      await fetchCart()
      return true
    } catch (error) {
      console.error(error)
    }
  }

  const removeProductFromCart = async (cart: Cart) => {
    if (!userStore.token) throw new Error('User is not authenticated')

    try {
      await api.withToken(userStore.token).delete(`/cart/${cart.id}`)
      await fetchCart()
    } catch (error) {
      console.error(error)
    }
  }

  const fetchCart = async () => {
    if (!userStore.token) throw new Error('User is not authenticated')

    try {
      cart.value = await api.withToken(userStore.token).get('/cart')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchOrders = async (query: object = {}) => {
    if (!userStore.token) throw new Error('User is not authenticated')

    try {
      orders.value = await api.withToken(userStore.token).get('/orders')
    } catch (error) {
      console.error(error)
    }
  }

  const fetchOrder = async (id: number) => {
    if (!userStore.token) throw new Error('User is not authenticated')

    try {
      order.value = await api.withToken(userStore.token).get(`/orders/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  const createOrder = async () => {
    if (!userStore.token) throw new Error('User is not authenticated')

    try {
      await api.withToken(userStore.token).post('/orders')
      return true
    } catch (error) {
      console.error(error)
    }
  }

  return {
    orders,
    meta,
    order,
    cart,
    addProductToCart,
    removeProductFromCart,
    fetchCart,
    fetchOrders,
    fetchOrder,
    createOrder
  }
})
