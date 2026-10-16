<script setup lang="ts">
  import { computed } from 'vue'
  import { useRoute, RouterView } from 'vue-router'
  import DefaultLayout from '@/layouts/DefaultLayout.vue'
  import AuthLayout from '@/layouts/AuthLayout.vue'

  const route = useRoute()

  const layoutComponent = computed(() => {
    if (route.meta.layout === 'auth') {
      return AuthLayout
    }
    return DefaultLayout
  })
</script>

<template>
  <component :is="layoutComponent">
    <RouterView />
  </component>
</template>

