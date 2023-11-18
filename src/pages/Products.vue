<script setup lang="ts">
import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue'
import { formatPrice } from '@/support/helper'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const productStore = useProductsStore()
const { meta } = storeToRefs(productStore)
const route = useRoute()

onMounted(() => {
  productStore.fetchProducts(route.query)
})

onMounted(() => {
  productStore.product = null
})

onBeforeRouteUpdate((to, from, next) => {
  productStore.products = {} as Product[]
  productStore.fetchProducts(to.query)
  next()
})
</script>

<template>
  <h2 class="text-3xl font-semibold mb-4 text-center">Products</h2>

  <div
    v-if="productStore.products && productStore.products.length > 0"
    class="grid sm:grid-cols-2 gap-3 mx-3 sm:mx-0"
  >
    <RouterLink
      v-for="(product, index) in productStore.products"
      :to="{ name: 'products.show', params: { id: product.id } }"
      class="block max-w p-3 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-3"
    >
      <div>
        <img
          :src="product.imageUrl"
          :alt="product.name"
          class="w-full h-64 object-cover rounded-lg"
        />
      </div>

      <h5 class="mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {{ product.name }}
      </h5>

      <div class="mb-3 font-bold text-slate-500 text-lg">{{ formatPrice(product.price) }}</div>

      <p class="font-normal text-gray-700 dark:text-gray-400">
        {{ product.description }}
      </p>
    </RouterLink>
  </div>

  <div
    v-if="
      productStore.products && productStore.products?.length > 0 && meta && meta?.totalPages > 0
    "
    class="my-5 flex justify-between"
  >
    <div>
      <RouterLink
        v-if="meta.hasPreviousPage"
        :to="{ name: 'products', query: { page: meta.previousPage } }"
      >
        Prev
      </RouterLink>
    </div>

    <div>
      <RouterLink
        v-if="meta.hasNextPage"
        :to="{ name: 'products', query: { page: meta.nextPage } }"
      >
        Next
      </RouterLink>
    </div>
  </div>
</template>
