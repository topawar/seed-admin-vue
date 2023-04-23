<template>
    <div>
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane label="登录" name="first">
                <el-input v-model="form.name" placeholder="用户名"/>
                <el-input v-model="form.password" placeholder="密码"/>
                <el-button type="warning" @click="userLogin">提交</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {login} from "../../api/user/userRequest";
import {useRouter} from "vue-router";
import {userStore} from "../../stores/userStore";

const router = useRouter()

const activeName = ref('first')

const form = reactive({
    name: '',
    password: ''
})

const userLogin = () => {
    login({name: form.name, password: form.password}).then((res) => {
        if (res) {
            userStore().$state.user = res.userInfo
            window.localStorage.setItem("tokenId",res.tokenId)
            router.replace("/home")
        }
    })
}

</script>
<style scoped>
.demo-tabs {
    background: rgba(41, 54, 81, 0.27);
    width: 500px;
    height: 300px;
    position: absolute;
    top: 200px;
    left: 0;
    right: 0;
    margin: auto;
}

:deep(.el-tabs__item.is-active) {
    color: #e3cc16;
    padding: 0;
}

:deep(.el-tabs__item) {
    color: #e3cc16;
    padding: 0 5px;
    font-size: 25px;
}

:deep(.el-tabs__nav.is-top) {
    position: relative;
    left: 195px;
}
:deep(.el-tabs__content){
    overflow: visible;
}

:deep(.el-input) {
    position: relative;
    display: block;
    width: 220px;
    height: 50px;
    padding-bottom: 10px;
    margin: auto;
}

:deep(.el-input__wrapper) {
    display: block;
}

:deep(.el-button) {
    display: block;
    margin: auto;
    width: 80px;
}

:deep(body.el-tabs__nav.is-top) {
    position: relative;
    margin: auto;
    left: 225px;
}

div {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url("/src/components/image/pexels-adam-krypel-6498990.jpg");
}
</style>
