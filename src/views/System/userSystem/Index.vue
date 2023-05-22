<template>
    <el-table :data="userStore.userList" style="width: 100%" max-height="550">
        <el-table-column fixed prop="uid" label="Id" width="150"/>
        <el-table-column prop="name" label="用户名" width="150"/>
        <el-table-column prop="password" label="密码" width="150"/>
        <el-table-column label="性别" width="150">
            <template #default="scope">
                <el-switch
                        v-model="scope.row.gender"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="男"
                        inactive-text="女"
                        :active-value="1"
                        :inactive-value="0"
                />
            </template>
        </el-table-column>
        <el-table-column prop="age" label="年龄" width="150"/>
        <el-table-column label="头像" width="150">
            <template #default="scope">
                <el-image style="width: 100px; height: 100px" :src="scope.row.imageurl" fit="cover"/>
            </template>
        </el-table-column>
        <el-table-column label="角色" width="150">
            <template #default="scope">
                <el-switch
                        v-model="scope.row.role"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="管理员"
                        inactive-text="普通用户"
                        :active-value="1"
                        :inactive-value="0"
                />
            </template>
        </el-table-column>
        <el-table-column label="状态" width="150">
            <template #default="scope">
                <el-switch
                        v-model="scope.row.effectiveTag"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="有效"
                        inactive-text="无效"
                        :active-value="1"
                        :inactive-value="0"
                />
            </template>
        </el-table-column>
        <el-table-column label="创建时间" width="200">
            <template #default="scope">
                {{ dayjs(scope.row.create_time).format("YYYY/MM/DD HH:mm:ss") }}
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations">
            <template #default="scope" style="width: 150px">
                <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="deleteRow(scope.row.id)"
                >
                    Remove
                </el-button>
                <el-button
                        link
                        type="primary"
                        size="small"
                        @click.prevent="editRow(scope)"
                        style="width: 150px"
                >
                    Edit
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <div style="float: right">
        <el-pagination
                @update:page-size="PAGE_SIZE"
                :pager-count="pagination.PAGER_COUNT"
                :page-count="pagination.pageCount"
                layout="prev, pager, next"
                @update:current-page.sync="pagination.current_page"
                @current-change="currentChange"
        />
    </div>
    <user-dialog ref="userDialog"></user-dialog>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import {deleteUserById, getUserList} from "../../../api/user/userRequest";
import {pageParam} from "../../../api/common/type";
import UserDialog from "../userSystem/userDialog/Index.vue";
import {userSystemStore} from "../../../stores/userSystem";
import dayjs from "dayjs";



const userStore = userSystemStore();
const PAGE_SIZE = 5

const pagination = ref({
    current_page: 1,
    pageCount: 10,
    PAGER_COUNT: 11,
})

const userDialog = ref()
const current_page = ref(1)



onBeforeMount(async () => {
    const result = await getUserList(pageInfo)
    userStore.setUserList(result)
    pagination.value.pageCount = userStore.total
})


const pageInfo: pageParam = {
    pageNum: 1,
    pageSize: PAGE_SIZE
};


const currentChange = (currentPage: any) => {
    console.log("page变化", currentPage)
    pageInfo.pageNum = currentPage
    pageInfo.pageSize = PAGE_SIZE
    pagination.value.current_page = currentPage
    userStore.current_page = current_page.value
    getUserList(pageInfo).then((result: { records: any; total: number; }) => {
        userStore.setUserList(result)
        pagination.value.pageCount = userStore.total
    })
}

const now = new Date()


const deleteRow = (id: string) => {
    deleteUserById(id).then((res => {
        if (1 == res) {
            pageInfo.pageNum = current_page.value
            pageInfo.pageSize = PAGE_SIZE
            userStore.current_page = current_page.value
            getUserList(pageInfo).then((result: { records: any; total: number; }) => {
                userStore.setUserList(result)
                pagination.value.pageCount = userStore.total
            })
        }
    }))
}

const editRow = (scope: any) => {
    userDialog.value.show(scope.row)
}

const onAddItem = () => {
    now.setDate(now.getDate() + 1)
}
</script>
<style lang="css" scoped>

</style>