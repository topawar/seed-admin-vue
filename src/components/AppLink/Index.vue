<template>
  <component is="router-link" v-bind:="linkProps" >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
  const linkProps={
    href: '/system/error',
    target: '_self',
    rel: 'noopener',
  }
</script>

<style scoped>

</style>