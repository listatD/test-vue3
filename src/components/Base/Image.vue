<script setup lang="ts">
import { twMerge } from 'tailwind-merge'
import type { BaseImageProps } from '@/utils/types'

defineOptions({
  inheritAttrs: false
})

const {
  src,
  alt,
  avif,
  webp,
  sizes,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  class: className,
  imgClass
} = defineProps<BaseImageProps>()
</script>

<template>
  <picture :class="twMerge('block overflow-hidden', className)">
    <source v-if="avif" :srcset="avif" type="image/avif" :sizes="sizes" />
    <source v-if="webp" :srcset="webp" type="image/webp" :sizes="sizes" />
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      v-bind="$attrs"
      :class="twMerge('block h-full w-full object-cover', imgClass)"
    />
  </picture>
</template>
