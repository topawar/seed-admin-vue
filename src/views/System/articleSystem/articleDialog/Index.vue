<template>
    <el-dialog v-model="articleDialogTag" title="Shipping address">
        <el-form :model="form" label-width="120px">
            <el-form-item label="标题">
                <el-input v-model="form.title"/>
            </el-form-item>
            <el-form-item label="目录">
                <el-input v-model="form.catalogue"/>
            </el-form-item>
            <el-form-item label="正文">
                <el-input
                        v-model="form.content"
                        :rows="2"
                        type="textarea"
                        placeholder="Please input"
                />
            </el-form-item>
            <el-form-item label="类别">
                <el-select v-model="form.article_kind" placeholder="please select your zone">
                    <el-option label="Vue" value="Vue"/>
                    <el-option label="Java" value="Java"/>
                    <el-option label="Html" value="Html"/>
                </el-select>
            </el-form-item>
            <el-form-item label="喜爱数">
                <el-input-number v-model="form.favoritenum" :min="0" @change="handleChange" controls-position="right"/>
            </el-form-item>
            <el-form-item label="点赞量">
                <el-input-number v-model="form.ponitnum" :min="0" @change="handleChange" controls-position="right"/>
            </el-form-item>
            <el-form-item label="封面">
                <el-upload
                        class="avatar-uploader"
                        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="imageUrl" :src="form.imgurl" class="avatar"/>
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {UploadProps} from 'element-plus'
import {ElMessage} from "element-plus";


const articleDialogTag = ref<boolean>(false)


const show = (row: any) => {
    Object.keys(row).forEach((key)=>{
        form[key] = row[key]
    })
    articleDialogTag.value = true
}

const handleChange = () => {
    console.log("点击了喜爱数")
}

// do not use same name with ref
const form = reactive<any>({
    title: '',
    catalogue: '',
    content: '',
    article_kind: '',
    ponitnum: 0,
    favoritenum: 0,
    imgurl: '',
})

const onSubmit = () => {
    console.log('submit!')
}

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}

defineExpose({
    show,
})
</script>
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}

.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
