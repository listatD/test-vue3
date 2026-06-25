<script setup lang="ts">
const { fullScreen = false } = defineProps<{
  fullScreen?: boolean
}>()
</script>

<template>
  <div
    class="flex items-center justify-center"
    :class="fullScreen ? 'fixed inset-0 z-[9999] bg-auth-page' : ''"
  >
    <div
      class="h-16 w-16 animate-spin rounded-full border-4 border-white/35 border-t-brand-primary"
    />
  </div>
</template>
