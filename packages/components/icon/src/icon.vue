<template>
  <i :class="ns.b()" :style="style">
    <slot />
  </i>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { CSSProperties } from 'vue'
import { useNameSpace } from '@d-ui/hooks'
import { iconProps } from './icon'

defineOptions({
  name: 'DIcon',
  inheritAttrs: false
})

const ns = useNameSpace('icon')

const props = defineProps(iconProps)

const style = computed<CSSProperties>(() => {
  const { size, color } = props

  if (!size && !color) return {}

  return {
    fontSize: size ? `${size}px` : undefined,
    color: color ? color : undefined
  }
})
</script>
