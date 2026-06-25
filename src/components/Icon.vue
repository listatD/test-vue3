<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import checkCircle20Solid from '@iconify-icons/heroicons/check-circle-20-solid'
import chevronDown20Solid from '@iconify-icons/heroicons/chevron-down-20-solid'
import chevronLeft20Solid from '@iconify-icons/heroicons/chevron-left-20-solid'
import chevronRight20Solid from '@iconify-icons/heroicons/chevron-right-20-solid'
import exclamationTriangle20Solid from '@iconify-icons/heroicons/exclamation-triangle-20-solid'
import informationCircle20Solid from '@iconify-icons/heroicons/information-circle-20-solid'
import plus20Solid from '@iconify-icons/heroicons/plus-20-solid'
import star20Solid from '@iconify-icons/heroicons/star-20-solid'
import xCircle20Solid from '@iconify-icons/heroicons/x-circle-20-solid'
import check from '@iconify-icons/mdi/check'
import close from '@iconify-icons/mdi/close'

const props = defineProps<{
  name: string
}>()

const localIcons = {
  'heroicons:check-circle-20-solid': checkCircle20Solid,
  'heroicons:chevron-down-20-solid': chevronDown20Solid,
  'heroicons:chevron-left-20-solid': chevronLeft20Solid,
  'heroicons:chevron-right-20-solid': chevronRight20Solid,
  'heroicons:exclamation-triangle-20-solid': exclamationTriangle20Solid,
  'heroicons:information-circle-20-solid': informationCircle20Solid,
  'heroicons:plus-20-solid': plus20Solid,
  'heroicons:star-20-solid': star20Solid,
  'heroicons:x-circle-20-solid': xCircle20Solid,
  'mdi:check': check,
  'mdi:close': close
} as const

const icon = computed(() => localIcons[props.name as keyof typeof localIcons] || props.name)
</script>

<template>
  <IconifyIcon :icon="icon" />
</template>
