<script setup lang="ts">
import { useOrderStore } from '@/stores/order'
import { formatPrice } from '@/support/helper'
import { storeToRefs } from 'pinia'
import { onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  id: string
}>()

const orderStore = useOrderStore()
const { order } = storeToRefs(orderStore)

onMounted(() => {
  orderStore.fetchOrder(parseInt(props.id))
})

onUnmounted(() => {
  orderStore.order = null
})
</script>

<template>
  <template v-if="order">
    <h2 class="text-3xl font-semibold mb-4 text-center">{{ order.number }}</h2>

    <dl class="border-b border-gray-300 pb-2 mb-3">
      <dt class="font-bold text-gray-600">Created at</dt>
      <dd class="mb-2">{{ order.createdAt }}</dd>
      <dt class="font-bold text-gray-600">Status</dt>
      <dd class="mb-2">{{ order.status }}</dd>
      <dt class="font-bold text-gray-600">Total</dt>
      <dd class="mb-2">{{ formatPrice(order.total) }}</dd>
    </dl>

    <div
      class="flex justify-between mb-2 border-b border-gray-300 pb-3 px-1"
      v-for="(item, index) in order.items"
      :index="index"
    >
      <div>
        <div>{{ item.product.name }}</div>
        <div class="text-sm text-gray-500">
          {{ item.quantity }} x {{ formatPrice(item.product.price) }}
        </div>
      </div>

      <div class="font-bold text-gray-500">{{ formatPrice(item.total) }}</div>
    </div>
  </template>
</template>
