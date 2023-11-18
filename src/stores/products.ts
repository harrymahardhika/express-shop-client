import api from '@/support/api'
import type { AxiosError } from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref(null as Product[] | null)
  const meta = ref(null as Meta | null)
  const product = ref(null as Product | null)

  const fetchProducts = async (query: object = {}) => {
    try {
      const params = new URLSearchParams(query as Record<string, string>)
      const queryString = params.toString()
      const url = queryString.length > 0 ? `/products?${queryString}` : '/products'
      const response = await api.get(url)
      products.value = response.data
      meta.value = {
        currentPage: response.currentPage,
        hasNextPage: response.hasNextPage,
        hasPreviousPage: response.hasPreviousPage,
        nextPage: response.nextPage,
        previousPage: response.previousPage,
        totalPages: response.totalPages
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchProduct = async (id: number) => {
    try {
      product.value = await api.get(`/products/${id}`)
    } catch (err) {
      const error = err as AxiosError
      console.error(error.response?.data)
    }
  }

  return {
    products,
    meta,
    product,
    fetchProducts,
    fetchProduct
  }
})
