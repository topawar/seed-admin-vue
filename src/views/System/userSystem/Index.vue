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
                @update:page-size="PAGE_SIZE"
                :pager-count="PAGER_COUNT.value"
                :page-count="pageCount"
                layout="prev, pager, next"
                @update:current-page.sync="current_page.value"
                @current-change="currentChange"
        />
    </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import dayjs from 'dayjs'
import {getUserList} from "../../../api/user/userRequest";
import {User} from "../../../api/user/type";
import {pageParam} from "../../../api/common/type";
import {getArticleList} from "../../../api/articleSystem/articleRequest";

const userList = ref()
const PAGE_SIZE = 5
const PAGER_COUNT = 11
const pageCount = ref(10)

const current_page = ref(1)
onBeforeMount(async () => {
    const result = await getUserList(pageInfo);
    userList.value = result.pageList
    pageCount.value = result.total
    console.log(userList)
})

const pageInfo: pageParam = {
    pageNum: 1,
    pageSize: PAGE_SIZE
};


const currentChange = (currentPage: any) => {
    console.log("page变化", currentPage)
    pageInfo.pageNum = currentPage
    pageInfo.pageSize = PAGE_SIZE
    getUserList(pageInfo).then((result: { pageList: any; total: number; }) => {
        userList.value = result.pageList
        pageCount.value = result.total
    })
}

const now = new Date()


const deleteRow = (index: number) => {

}

const onAddItem = () => {
    now.setDate(now.getDate() + 1)
}
</script>
<style lang="css" scoped>

</style>