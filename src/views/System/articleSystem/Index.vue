<template>
    <div>
        <el-table :data="articleList" style="width: 100%" max-height="600">
            <el-table-column fixed prop="title" label="标题" width="150"/>
            <el-table-column prop="catalogue" label="目录" width="120"/>
            <el-table-column prop="content" label="正文" width="700" max-height="100"/>
            <el-table-column prop="article_kind" label="类别" width="120"/>
            <el-table-column prop="pointnum" label="点赞量" width="120"/>
            <el-table-column prop="favoritenum" label="喜爱数" width="120"/>
            <el-table-column label="封面" width="120">
                <template #default="scope">
                    <el-image style="width: 100px; height: 100px" :src="scope.row.imageurl" fit="fill"/>
                </template>
            </el-table-column>
            >
            <el-table-column fixed="right" label="Operations" width="120">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click.prevent="deleteRow(scope.row.article_id)"
                    >
                        Remove
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="Operations" width="100">
                <template #default="scope">
                    <el-button
                            link
                            type="primary"
                            size="small"
                            @click.prevent="editItem(scope.row)"
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
        <article-dialog ref="articleDialog"></article-dialog>
    </div>
</template>

<script lang="ts" setup>
import {onBeforeMount, ref} from 'vue'
import dayjs from 'dayjs'
import {deleteArticleById, getArticleList} from "../../../api/articleSystem/articleRequest";
import {pageParam} from "../../../api/common/type";
import ArticleDialog from "../articleSystem/articleDialog/Index.vue"

const PAGE_SIZE = 5

const pagination = ref({
    current_page: 1,
    pageCount: 10,
    PAGER_COUNT: 11,

})

const now = new Date()

const articleList = ref()
const articleDialog = ref()

const pageInfo: pageParam = {
    pageNum: 1,
    pageSize: PAGE_SIZE
};

onBeforeMount(async () => {
    const result = await getArticleList(pageInfo);
    articleList.value = result.records
    pagination.value.pageCount = result.total
})

const currentChange = (currentPage: any) => {
    console.log("page变化", currentPage)
    pageInfo.pageNum = currentPage
    pageInfo.pageSize = PAGE_SIZE
    pagination.value.current_page = currentPage
    getArticleList(pageInfo).then((result: { records: any; total: number; }) => {
        articleList.value = result.records
        pagination.value.pageCount = result.total
    })
}
const deleteRow = (article_id: number) => {
    console.log(pagination.value.current_page)
    deleteArticleById(article_id).then((res) => {
        if (1 == res) {
            pageInfo.pageNum = pagination.value.current_page
            console.log(pagination.value.current_page)
            pageInfo.pageSize = PAGE_SIZE
            getArticleList(pageInfo).then((result: { records: any; total: number; }) => {
                articleList.value = result.records
                pagination.value.pageCount = result.total
            })
        }
    })
}

const editItem = (row: any) => {
    articleDialog.value.show(row)
}

</script>
