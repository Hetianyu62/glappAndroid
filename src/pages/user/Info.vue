<template>
  <div style="position: relative">
    <van-nav-bar title="我的信息" left-arrow @click-left="onClickLeft" />
    <div v-if="list">
      <van-cell-group>
        <van-cell title="登录名称" :value="list.login" />
        <van-cell title="医院名称" :value="list.hname" />
        <van-cell title="科室名称" :value="list.dname" />
        <van-cell title="所在科室" :value="list.actualDept" />
        <van-cell title="角色名称" :value="list.flagName" />
        <van-cell title="用户名称" :value="list.realname" />
        <van-cell title="职务" :value="list.title" />
        <van-cell title="职称" :value="list.qualification" />
        <van-cell title="医师执业证书编码" :value="list.qcode" />
        <van-cell title="电话" :value="list.phone" />
        <van-cell title="手机" :value="list.mobile" />
        <van-cell title="邮箱" :value="list.email" />
        <van-cell title="微信" :value="list.qq" />
      </van-cell-group>
      <div style="padding: 24px">
        <van-button type="primary" @click="logout" round block>退出登录</van-button>
      </div>
    </div> 
    <!-- <div class="footer">
      <van-button type="primary" @click="logout" block>退出登录</van-button>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    logout() {
      localStorage.removeItem("sessionId");
      this.$router.push("/login");
    },
    getData() {
      this.$api.post("app/doctor/personalData", {}, (res) => {
        console.log(res);
        this.list = res.data;
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
@import "../../assets/css/global.css"; /*引入公共样式*/

.footer {
  border: 0;
  height: 3rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fbf8f8;
}
</style>
