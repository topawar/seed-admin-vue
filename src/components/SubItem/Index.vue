<template>
  <template v-if="hasChildRoot(item.children,item)">
    <app-link v-if="itemRoot.meta" :to="resolvePath(itemRoot.path)">
      <el-menu-item :index="resolvePath(itemRoot.path)">
        <template #title>{{ itemRoot.meta.name }}</template>
      </el-menu-item>
    </app-link>
  </template>
  <el-sub-menu :index="resolvePath(item.path)" v-else popper-append-to-body>
    <template #title>
      <span>{{ item.meta.name }}</span>
    </template>
    <sub-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath(child.path)"
    />
  </el-sub-menu>
</template>

<script lang="ts" setup>
import {defineProps, ref} from "vue";
import AppLink from "../AppLink/Index.vue"
import SubItem from "../SubItem/Index.vue"
import path from 'path-browserify'

const onlyOneChild = ref(null)
const props = defineProps({
  item: {
    type: Object,
    require: true
  },
  basePath: {
    type: String,
    default: ''
  }
})

const itemRoot = ref(null)
const hasChildRoot = (child = [], parent: any) => {

  if (child.length === 1 || child.length === 0) {
    console.log("返回单一根节点")
    itemRoot.value = {...parent, path: ''}
    return true;
  }

  itemRoot.value = child[0]
  return false

}


const resolvePath = (routePath: any) => {
  // console.log("resolve "+  path.resolve(props.basePath, routePath))
  return path.resolve(props.basePath, routePath)
}

</script>

<style scoped>

</style>