<template>
    <el-dialog v-model="userDialogTag" title="用户管理">
        <el-form :model="form" label-width="120px">
            <el-form-item label="用户名">
                <el-input v-model="form.name"/>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="form.password"/>
            </el-form-item>
            <el-form-item label="性别">
                <el-switch
                        v-model="form.gender"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="男"
                        inactive-text="女"
                        :active-value="1"
                        :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="年龄">
                <el-input-number v-model="form.age" :min="0" @change="handleChange" controls-position="right"/>
            </el-form-item>
            <el-form-item label="头像">
                <el-upload
                        class="avatar-uploader"
                        action="/api/user/uploadAvatar"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                >
                    <img v-if="form.imageurl" :src="form.imageurl" class="avatar"/>
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus/>
                    </el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="角色">
                <el-switch
                        v-model="form.role"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="管理员"
                        inactive-text="普通用户"
                        :active-value="1"
                        :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="状态">
                <el-switch
                        v-model="form.effectiveTag"
                        inline-prompt
                        style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                        active-text="有效"
                        inactive-text="无效"
                        :active-value="1"
                        :inactive-value="0"
                />
            </el-form-item>
            <el-form-item label="操作">
                <el-button type="success" @click="userSubmit">提交</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {UploadProps} from 'element-plus'
import {ElMessage} from "element-plus";
import {getUserList, updateUserById} from "../../../../api/user/userRequest";
import {UpdateUser} from "../../../../api/user/type";
import {userSystemStore} from "../../../../stores/userSystem"

const userStore = userSystemStore();

const userDialogTag = ref<boolean>(false)


const show = (row: any) => {
    Object.keys(row).forEach((key) => {
        form[key] = row[key]
    })
    userDialogTag.value = true
}

const handleChange = () => {
    console.log("点击了喜爱数")
}

// do not use same name with ref
const form = reactive<any>({
    name: '',
    password: '',
    gender: 0,
    age: 0,
    effectiveTag: 0,
    imageurl: '',
    role: 0,
})

const userSubmit = (() => {
    const updateUser: UpdateUser = {
        id: form.id,
        name: form.name,
        password: form.password,
        age: form.age,
        effectiveTag: form.effectiveTag,
        role: form.role,
        gender: form.gender,
        imageurl: form.imageurl
    }
    updateUserById(updateUser).then((res) => {
        if (res) {
            userDialogTag.value = false
            const pageInfo = {pageNum: userStore.current_page, pageSize: 5}
            getUserList(pageInfo).then((res => {
                userStore.setUserList(res)
            }))
        }
    });
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response
) => {
    form.imageurl = response.data
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log(rawFile.type)
    if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
        ElMessage.error('Avatar picture must be JPG and PNG format!')
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

</style>
