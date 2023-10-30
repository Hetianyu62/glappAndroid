<template>
  <div>
    <van-nav-bar title="选择转诊医院" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <div style="color:#42bd56" slot="right">确定</div>
    </van-nav-bar>
    <van-radio-group @change="change1" v-model="radio1">
      <van-cell-group>
        <van-cell
          v-for="(item) in list1 "
          :key="item.hid"
          checked-color="#07c160"
          :name="item.hid"
          :title="item.hname"
          clickable
        >
          <van-radio checked-color="#07c160" slot="right-icon" :name="item.hid" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: "",
      radio1: ""
    };
  },
  created() {
    let pid = this.$route.query.pid;
    let hid = this.$route.query.hid;

    // this.token = window.localStorage.getItem("sessionId");
    // console.log(pid);
    this.getList1(pid, hid);
  },
  methods: {
    change1() {
      console.log(this.radio1);
    },
    getList1(pid, hid) {
      this.$api.post("/app/appointment/hospKeyValue", { pid, hid }, res => {
        this.list1 = res.data;
      });
    },
    onClickRight() {
      if (!this.radio1) {
        this.$dialog
          .alert({
            title: "提示",
            message: "请选择转诊医院！",
            confirmButtonColor: "#07c160"
          })
          .then(() => {
            // on close
          });
        return;
      }

      //   console.log("转诊");
      let pid = this.$route.query.pid;
      let realname = this.$route.query.realname;

      let hid = this.radio1;

      this.$api.post("/app/appointment/changeHospital", { pid, hid }, res => {
        // console.log(res);
        //         this.$router.push("/reserve?pid=" + pid + "&realname=" + realname);

        if(res.data){
          if(res.data.code==1){
        this.$router.push("/reserve?pid=" + pid + "&realname=" + realname);
        }else{
          this.$dialog
          .alert({
            title: "提示",
            message: res.data.msg,
            confirmButtonColor: "#07c160"
          })
        }
        }else{
                  this.$router.push("/reserve?pid=" + pid + "&realname=" + realname);

        }
        
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>