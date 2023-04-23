<script setup lang="ts">
import {onBeforeMount} from "vue";
import {useRouter} from "vue-router";
import {initRoute} from "./util/asyncRoute";
import {userStore} from "./stores/userStore";

const router = useRouter();

onBeforeMount(() => {
    if (userStore().$state.user.role == 1) {
        initRoute()
    }
})
</script>
<template>
    <router-view></router-view>
</template>
<style scoped>
</style>
