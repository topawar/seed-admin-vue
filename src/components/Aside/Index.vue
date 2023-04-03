<template>
  <el-scrollbar>
    <el-menu :default-active="route.path" router unique-opened>
      <SubItem
          v-for="route in routeItem"
          :key="route.path"
          :item="route"
          :base-path="route.path"
      />
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import {useRoute,useRouter} from "vue-router";
import SubItem from "../SubItem/Index.vue"

const router = useRouter()
const route = useRoute()

let routes = router.getRoutes();

let routeItem = []

routes.forEach(item =>{
  if (item.children.length){
    routeItem.push(item)
  }
})





</script>

<style scoped>
.scrollbar-demo-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
}
</style>