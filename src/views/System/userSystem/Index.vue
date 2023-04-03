<template>
  <el-table :data="userList" style="width: 100%" max-height="450">
    <el-table-column fixed prop="uid" label="Id" width="150"/>
    <el-table-column prop="name" label="用户名" width="150"/>
    <el-table-column prop="effectiveTag" label="状态" width="150"/>
    <el-table-column prop="password" label="密码" width="150"/>
    <el-table-column prop="gender" label="性别" width="150"/>
    <el-table-column prop="age" label="年龄" width="150"/>
    <el-table-column prop="imageurl" label="头像" width="150"/>
    <el-table-column prop="role" label="角色" width="150"/>
    <el-table-column prop="create_time" label="创建时间" width="150"/>
    <el-table-column fixed="right" label="Operations">
      <template #default="scope">
        <el-button
            link
            type="primary"
            size="small"
            @click.prevent="deleteRow(scope.$index)"
        >
          Remove
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <div style="float: right">
    <el-pagination
        :page-size="20"
        :pager-count="11"
        layout="prev, pager, next"
        :total="1000"
    />
  </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import dayjs from 'dayjs'
import {getUserList} from "../../../api/user/userRequest";
import {User} from "../../../api/user/type";

const userList = ref<User>()

onBeforeMount(async () => {
  userList.value = await getUserList()
  console.log(userList)
})

const now = new Date()


const deleteRow = (index: number) => {

}

const onAddItem = () => {
  now.setDate(now.getDate() + 1)
}
</script>
<style lang="css" scoped>

</style>