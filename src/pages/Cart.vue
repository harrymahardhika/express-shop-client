<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { formatPrice } from '@/support/helper'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const orderStore = useOrderStore()
const { cart } = storeToRefs(orderStore)
const userStore = useUserStore()
const router = useRouter()
const toast = useToast()

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push({ name: 'login' })
  }

  if (userStore.isAuthenticated) {
    orderStore.fetchCart()
  }
})

const removeProductFromCart = async (item: Cart) => {
  await orderStore.removeProductFromCart(item)
}

const createOrder = async () => {
  await orderStore
    .createOrder()
    .then((success) => {
      if (success) {
        router.push({ name: 'orders' })
      }
    })
    .catch((error) => {
      toast.error(String(error))
    })
}
</script>

<template>
  <h2 class="text-3xl font-semibold mb-4 text-center">Cart</h2>

  <div v-if="cart.length > 0">
    <div
      v-for="(item, index) in cart"
      :index="index"
      class="flex justify-between p-3 rounded bg-white border border-gray-200 mb-3"
    >
      <div>
        <div class="mb-1">{{ item.product.name }}</div>

        <div class="mb-1 text-gray-500 text-sm">{{ item.product.description }}</div>

        <div class="text-gray-500 text-sm">
          {{ item.quantity }} x {{ formatPrice(item.product.price) }}
        </div>

        <a href="#" @click.prevent="removeProductFromCart(item)">
          <small class="text-red-500">Remove</small>
        </a>
      </div>

      <div class="font-bold text-gray-500 ps-3">
        {{ formatPrice(item.quantity * item.product.price) }}
      </div>
    </div>

    <div class="flex justify-between p-3 rounded bg-white border border-gray-200 mb-3">
      <div class="font-bold text-gray-500">Total</div>

      <div class="font-bold text-gray-500">
        {{ formatPrice(cart.reduce((acc, item) => acc + item.quantity * item.product.price, 0)) }}
      </div>
    </div>

    <button
      class="block bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      @click.prevent="createOrder"
    >
      Checkout
    </button>
  </div>

  <div v-else class="block bg-orange-200 p-3 rounded text-orange-600 text-center">
    Cart is empty. <RouterLink :to="{ name: 'products' }">Shop Now!</RouterLink>
  </div>

  <Alert v-else type="warning">Cart is empty. Shop Now!</Alert>
</template>
