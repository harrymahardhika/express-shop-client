<script setup lang="ts">
import Alert from '@/components/Alert.vue'
import router from '@/router'
import { useOrderStore } from '@/stores/order'
import { useUserStore } from '@/stores/user'
import { formatPrice } from '@/support/helper'
import { onMounted } from 'vue'

const orderStore = useOrderStore()
const userStore = useUserStore()

onMounted(() => {
  if (!userStore.isAuthenticated) {
    router.push({ name: 'login' })
  }

  if (userStore.isAuthenticated) {
    orderStore.fetchOrders()
  }
})
</script>

<template>
  <h2 class="text-3xl font-semibold mb-4 text-center">Orders</h2>

  <div v-if="orderStore.orders && orderStore.orders.length > 0">
    <RouterLink
      :to="{ name: 'orders.show', params: { id: order.id } }"
      v-for="(order, index) in orderStore.orders"
      :index="index"
      class="flex justify-between p-3 rounded bg-white border border-gray-200 mb-3 hover:bg-gray-100"
    >
      <div>
        <div class="mb-1">{{ order.number }}</div>
        <div class="mb-1 text-xs text-gray-500">{{ order.status }}</div>
        <div class="mb-1 text-xs text-gray-500">{{ order.createdAt }}</div>
      </div>

      <div class="font-bold text-gray-500">{{ formatPrice(order.total) }}</div>
    </RouterLink>
  </div>

  <Alert v-else type="warning">No orders found.</Alert>
</template>
