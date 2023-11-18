<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { formatPrice } from '@/support/helper'
import { useOrderStore } from '@/stores/order'
import { useToast } from 'vue-toastification'

const props = defineProps<{
  id: string
}>()

const productStore = useProductsStore()
const { product } = storeToRefs(productStore)
const orderStore = useOrderStore()
const toast = useToast()

onMounted(() => {
  productStore.fetchProduct(parseInt(props.id))
})

const addProductToCart = () => {
  if (product.value) {
    orderStore
      .addProductToCart({
        productId: product.value.id,
        quantity: 1
      })
      .catch((error) => {
        toast.error(String(error))
      })
  }
}

const productAddedToCart = computed(() => {
  if (product.value && orderStore.cart && orderStore.cart.length > 0) {
    const cartItem = orderStore.cart.find((item) => {
      return item.productId === product.value?.id
    })

    if (cartItem) {
      return true
    }
  }

  return false
})
</script>

<template>
  <div v-if="product">
    <h2 class="text-3xl font-semibold mb-4 text-center">{{ product.name }}</h2>

    <div>
      <img :src="product.imageUrl" :alt="product.name" class="w-full h-auto mb-4 rounded-md" />
    </div>

    <div v-if="product.categories && product.categories.length > 0" class="mb-4">
      <div
        v-for="(category, index) in product.categories"
        class="inline mr-2 bg-slate-400 rounded p-1 px-2 text-sm"
      >
        {{ category.name }}
      </div>
    </div>

    <div class="text-lg font-semibold text-primary mt-4">{{ formatPrice(product.price) }}</div>

    <p class="text-gray-600">{{ product.description }}</p>

    <div>
      <button
        v-if="!productAddedToCart"
        @click="addProductToCart"
        class="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>

    <div class="text-center mt-5">
      <RouterLink to="/products" class="text-primary mt-4 block">
        &larr; Back to Products
      </RouterLink>
    </div>
  </div>
</template>
