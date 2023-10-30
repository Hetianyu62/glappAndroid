<template> 
  <div>
    <van-nav-bar title="预约" left-arrow @click-left="onClickLeft" @click-right="onClickRight" >
      <!-- <div  style="color:#42bd56" slot="right">转诊</div>   -->
      <!-- v-if="hid" -->
    </van-nav-bar>
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <!--  :value="item.state" -->
      <van-cell v-for="item in list " :key="item.uid" :title="item.s1" :label="item.s2" center></van-cell>
    </van-list>
    <div v-if="!loading && list.length<1" class="noData">
      <img src="../../assets/wushuju.png" />
      <div>暂无数据</div>
    </div>
    <!-- 新增患者 -->
    <van-sticky :offset-top="500">
      <div style="position:absolute; right:24px;" class="sticky">
        <div style="margin-top:20px;">
          <van-button
            size="small"
            plain
            style="min-width:100px;width:100px; "
            type="primary"
            icon="plus"
            @click="addNew"
          >
          立即预约
            <!-- <van-icon color="#42bd56" size="20px" name="plus" /> -->
          </van-button>
        </div>
      </div>
    </van-sticky>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      finished: false,
      pageNo: 1,
      list: [],
      radio1: "",

      hid: ""
    };
  },
  created() {
    let pid = this.$route.query.pid;
    // this.token = window.localStorage.getItem("sessionId");
    console.log(pid);
  },
  methods: {
    addNew() {
      let pid = this.$route.query.pid;
      let realname = this.$route.query.realname;

      this.$router.push(
        "/reserve/add?pid=" +
          pid +
          "&hid=" +
          this.hid +
          "&realname=" +
          realname
      );
    },

    onClickRight() {
      // console.log("转诊");
      //   this.show1 = true;
      let pid = this.$route.query.pid;
      let realname = this.$route.query.realname;

      this.$router.push(
        "/reserve/replace?pid=" +
          pid +
          "&hid=" +
          this.hid +
          "&realname=" +
          realname
      );
    },
    onClickLeft() {
      //   this.$router.go(-1);
      let pid = this.$route.query.pid;
      let realname = this.$route.query.realname;

      this.$router.push("/home?pid=" + pid + "&realname=" + realname);
    },
    onLoad() {
      this.loading = true;
      let pid = this.$route.query.pid;
      //   let _this = this;
      this.$api.post("app/appointment/appointmentList", { pid }, res => {
        if(res.data){
        this.loading = false;
        this.finished = true;
        this.list = res.data;
        this.hid = res.data[0].hid;
        }else{
        this.loading = false;
        this.finished = true;
        }
        
        // _this.getList1(pid, res.data.hid);
      });
    }
  }
};
</script>

<style>

 @import '../../assets/css/global.css'; /*引入公共样式*/ 



</style>