<template>
  <div>
    <van-nav-bar title="诊疗预约" left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <div style="color:#42bd56" slot="right">确定</div>
    </van-nav-bar>
    <van-cell-group>
      <van-cell title="选择日期" is-link :value="currentDateText" @click="btn1" />
      <van-cell title="选择时间" is-link :value="apmText" @click="btn2" />
    </van-cell-group>

    <van-popup position="bottom" v-model="show1">
      <div class="model-body">
        <div>
          <van-datetime-picker
            @cancel="cancel1"
            title="预约时间"
            @confirm="ok1"
            v-model="currentDate"
            type="date"
            :min-date="minDate"
          />
        </div>
      </div>
    </van-popup>
    <van-popup position="bottom" :style="{ height: '10%' }" v-model="show2">
      <div style="padding-top:5px;" class="model-body">
        <div>
          <van-radio-group @change="change1" v-model="apm">
            <van-cell title="上午" clickable @click="apm = '0'">
              <van-radio slot="right-icon" checked-color="#07c160" name="0" />
            </van-cell>
            <van-cell title="下午" clickable @click="apm = '1'">
              <van-radio slot="right-icon" checked-color="#07c160" name="1" />
            </van-cell>
          </van-radio-group>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: "",
      radio: "",
      show1: false,
      minDate: new Date(),
      currentDateText: "",
      currentDate: "",
      apm: "",
      apmText: "",
      show2: false
    };
  },
  created() {
    // let pid = this.$route.query.pid;
    // let hid = this.$route.query.hid;
    // this.token = window.localStorage.getItem("sessionId");
    // console.log(pid);
    // this.getList1(pid, hid);
  },
  methods: {
    change1(e) {
      //   console.log(this.apm);
      if (e != 1) {
        this.apmText = "上午";
      } else {
        this.apmText = "下午";
      }
      this.show2 = false;
    },
    cancel1() {
      this.show1 = false;
      // console.log(this.currentDate);
    },
    btn1() {
      this.show1 = true;
    },
    btn2() {
      this.show2 = true;
    },
    ok1(e) {
      this.show1 = false;
      this.currentDate = this.dateFormat("YYYY-mm-dd", e);
      this.currentDateText = this.currentDate;
      console.log(this.currentDateText);
    },

    onClickRight() {
      let _t = this
      //   console.log("转诊");
      if (!this.currentDate) {
        this.$dialog
          .alert({
            title: "提示",
            message: "请选择日期！",
            confirmButtonColor: "#07c160"
          })
          .then(() => {
            // on close
          });
        return;
      }
      if (!this.apmText) {
        this.$dialog
          .alert({
            title: "提示",
            message: "请选择时间！",
            confirmButtonColor: "#07c160"
          })
          .then(() => {
            // on close
          });
        return;
      }
      let pid = this.$route.query.pid;
      let realname = this.$route.query.realname;

      let adate = this.currentDateText;
      let apm = this.apm;
      this.$dialog.confirm({
        title: "提示",
        message: "预约后无法撤销,请确认日期是否正确!",
        confirmButtonColor: "#07c160",
        
      }).then(function () {
 
      console.log(_t.$api)
      _t.$api.post(
        "/app/appointment/addAppointment",
        { pid, adate, apm },
        res => {
          console.log(res);
          // this.$router.push("/reserve?pid=" + pid);
          _t.$router.push("/reserve?pid=" + pid + "&realname=" + realname);
        }
      );

	}).catch( );




     
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    // 日期格式化
    dateFormat(fmt, date) {
      let ret;
      let opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>

<style>
 @import '../../assets/css/global.css'; /*引入公共样式*/ 

</style>