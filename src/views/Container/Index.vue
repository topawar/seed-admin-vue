<template>
    <el-container class="common-container">
      <el-aside width="200px" class="aside">
        <layout-aside></layout-aside>
      </el-aside>
      <el-container>
        <el-header class="header">
          <div class="toolbar">
            <el-dropdown>
              <el-icon style="margin-right: 8px; margin-top: 1px">
                <setting/>
              </el-icon>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>View</el-dropdown-item>
                  <el-dropdown-item>Add</el-dropdown-item>
                  <el-dropdown-item>Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <span>Tom</span>
          </div>
        </el-header>
        <el-main>
          <tabs-nav></tabs-nav>
          <router-view v-slot="{ Component, route }">
            <transition name="fade-slide" mode="out-in" appear>
              <keep-alive>
                <component :is="useWrapComponents(Component, route)" :key="route.path" />
              </keep-alive>
            </transition>
          </router-view>
        </el-main>
        <el-footer>
          <component :is="containerComponent['footerBody']" />
        </el-footer>
      </el-container>
    </el-container>
</template>


<script lang="ts" setup>
import home from "../Home/Index.vue"
import footer from  "../../components/Footer/Index.vue"
import LayoutAside from "../../components/Aside/Index.vue"
import TabsNav from "../../components/TabsNav/Index.vue"
import { useWrapComponents } from '../../hooks/useWrapComponents'

const containerComponent={
  mainBody: home,
  footerBody: footer,
}

</script>

<style scoped>
.common-container .header {
  position: relative;
  text-align: right;
  font-size: 12px;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.common-container .aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.common-container .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

</style>
