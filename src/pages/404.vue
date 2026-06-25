<script setup lang="ts">
const router = useRouter()

const onBack = () => {
  router.replace({ name: defUserPage.main.name })
}
</script>

<template>
  <main class="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
    <h1 class="m-0 text-4xl font-bold text-slate-900">{{ $t('page.notFound') }}</h1>
    <BaseButton type="button" @click="onBack">{{ $t('btn.goBack') }}</BaseButton>
  </main>
</template>

<route lang="json">
{
  "name": "404",
  "meta": {
    "public": true,
    "layout": "default"
  }
}
</route>
