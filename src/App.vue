<script setup lang="ts">
  import {onBeforeMount} from "vue";
  import {useRouter} from "vue-router";

  const router = useRouter();

  onBeforeMount(()=>{
    router.push("/")
  })
</script>
<template>
  <router-view></router-view>
</template>
<style scoped>
</style>
