<script setup lang="ts">
import BlankLayout from '@/layouts/blank.vue'
import DefaultLayout from '@/layouts/default.vue'

const route = useRoute()
const mainStore = useMainStore()

const layout = computed(() =>
  route.meta.layout === defLayoutPage.blank.name ? BlankLayout : DefaultLayout
)
</script>

<template>
  <Transition
    enter-active-class="transition-opacity duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <BaseLoader v-if="mainStore.isPageLoading" full-screen />
  </Transition>

  <component :is="layout">
    <RouterView />
  </component>
</template>
