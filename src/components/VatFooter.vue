<template>
  <div class="vat-footer">
    <p :style="styleObj">Copyright © {{ new Date().getFullYear() }} Vue Admin TS</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  theme: string
}>()

const styleObj: any = computed(() => {
  if (props.theme === 'light') {
    return {
      color: '#666'
    }
  } else if (props.theme === 'dark') {
    return {
      color: '#fff',
      position: 'fixed',
      bottom: '10px',
      width: '100%'
    }
  }
})
</script>

<style scoped lang="scss">
.vat-footer {
  height: 55px;
  line-height: 55px;
  text-align: center;
  user-select: none;
}
</style>
