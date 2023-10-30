<template>
  <div>
    <!-- <van-nav-bar title="骨松医生版" left-arrow @click-left="onClickLeft" class="css-green" /> -->

    <router-view />

    <van-tabbar
      @change="changeTabbar"
      :safe-area-inset-bottom="true"
      active-color="#42bd56"
      v-model="active"
      route
    >
      <!-- <van-icon name="underway-o" /> -->
      <van-tabbar-item to="/patient/reserve" icon="underway-o">到诊患者</van-tabbar-item>
      <van-tabbar-item to="/patient/list" icon="friends-o">全部患者</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: "",
      active: 0,
      pid: "",
      realname: ""
    };
  },
  created() {
    let pid = this.$route.query.pid;
    let realname = this.$route.query.realname;
    this.pid = pid;
    this.realname = realname;
  },
  methods: {
    changeTabbar(active) {
      // console.log(e);
      this.active = active;
      // console.log(this.active);
    },
    onSearch(val) {
      console.log(val);
    },
    onCancel() {
      //   Toast('取消');
      //   this.$router.go(-1);
      this.$router.push("/home");
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>