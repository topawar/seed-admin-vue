<template>
  <el-tabs
      type="card"
      class="demo-tabs"
      v-model="activeTab"
      @tab-click="tabClick"
      @tab-remove="tabRemove"
  >
    <el-tab-pane
        v-for="item in editableTabs"
        :key="item.routePath"
        :label="item.routeName"
        :name="item.routePath"
        :closable="item.routeKeepAlive"
    >
    </el-tab-pane>
  </el-tabs>
</template>
<script lang="ts" setup>
import {ref, watch} from 'vue'
import {useRouteStore} from "../../stores/route";
import {useRoute} from "vue-router";
import {TabsPaneContext} from "element-plus";
import {useRouter} from "vue-router";

const routeStore = useRouteStore();

const editableTabs = ref(routeStore.getKeepaliveRoute)
const router = useRouter()
const tabClick = (tabInfo: TabsPaneContext) => {
  router.push(tabInfo.props.name as string)
}

const tabRemove = (tabPath: TabsPaneContext) => {
  console.log(tabPath)
  routeStore.removeKeepaliveRoute(tabPath)
}

const route = useRoute()
let activeTab = ref("/home")

watch(route, () => {
  let routeInfo = {routePath: route.path, routeName: route.meta.name as string, routeKeepAlive: true}
  activeTab.value = route.path as string
  routeStore.addKeepaliveRoute(routeInfo)
}, {deep: true})

</script>
<style>
.demo-tabs > .el-tabs__content {
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
