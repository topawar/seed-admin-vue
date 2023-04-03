<template>
  <div class="personal">
    <el-card style="width: 600px">
      <div class="avatar">
        <el-avatar :size="100" shape="square" :src="avatarUrl"></el-avatar>
      </div>
      <div class="list">
        <div>姓名：topawar</div>
        <div>年龄：20</div>
        <div>职业：IT运维</div>
        <div>QQ：3443492915</div>
        <div>邮箱：yangjun0125@yaeh.net</div>
        <div>掌握技能：JAVA、SpringBoot、SpringCloud、Mybatis、Sqoop、Flink、Kafka、SpringJba、Vue、React、Js、Ts、Axios</div>
      </div>
      <el-divider></el-divider>
      <div style="margin-bottom: 15px"><h5>最喜欢的一句话</h5></div>
      <div>---------- 其实吧！人生在世，是不太需要其他人的建议的。</div>
      <el-divider></el-divider>
    </el-card>
  </div>
</template>


<script lang="ts" setup>
  import {ref} from "vue";

  const avatarUrl = ref("https://seed-1306904200.cos.ap-shanghai.myqcloud.com/images/topawar.png")
</script>

<style scoped lang="scss">
.personal {
  .name {
    margin-top: 15px;
    font-size: 24px;
    font-weight: 500;
    color: rgb(38,38,38);
    word-break: break-all;
  }

  .list {
    margin-top: 18px;
    line-height: 30px;
    text-align: left;
  }
}
</style>
