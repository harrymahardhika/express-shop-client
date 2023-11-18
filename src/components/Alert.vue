<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'success' | 'warning' | 'error'
}>()

const alertClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-200 text-green-600'

    case 'warning':
      return 'bg-orange-200 text-orange-600'

    case 'error':
      return 'bg-red-200 text-red-600'

    default:
      return 'bg-gray-200 text-gray-600'
  }
})
</script>

<template>
  <div class="block text-center p-3 rounded-md" :class="alertClass">
    <slot></slot>
  </div>
</template>
