<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar :title="realname"
                 left-arrow
                 @click-left="onClickLeft"
                 @click-right="onClickRight" class="leve-font1" id="reset">
      <!-- <div class="icon1" slot="left">
        <img src="../../assets/icons/caidan.png" />
      </div>-->
      <!-- <div class="icon2" slot="right">
        <img src="../../assets/icons/yonghuzu.png" />
      </div>-->
      <div slot="left">
        <!-- <van-icon size="20" name="friends-o" /> -->
        <van-icon size="20"
                  name="wap-nav" />
      </div>
      <div slot="right">
        <van-icon size="20"
                  name="friends-o" />
      </div>
    </van-nav-bar>
    <!-- 内容 -->

    <van-grid class="css-grid"
              clickable
              :border="false"
              :gutter="40"
              :column-num="2">
      <van-grid-item @click="goUrl(1)">
        <div solt="icon">
          <img src="../../assets/icons/geren.png" />
        </div>
        <div solt="text" class="">基本信息</div>
      </van-grid-item>
      <!-- <van-grid-item @click="goUrl(2)">
        <div solt="icon">
          <img src="../../assets/icons/sousuo.png" />
        </div>
        <div solt="text">风险筛查</div>
      </van-grid-item> -->
      <van-grid-item @click="goUrl(3)">
        <div solt="icon">
          <img src="../../assets/icons/wodeyisheng.png" />
        </div>
        <div solt="text">诊疗记录</div>
      </van-grid-item>
      <!-- <van-grid-item @click="goUrl(4)">
        <div solt="icon">
          <img src="../../assets/icons/yangben.png" />
        </div>
        <div solt="text">样本登记</div>
      </van-grid-item> -->
      <van-grid-item @click="goUrl(5)">
        <div solt="icon">
          <img src="../../assets/icons/yuyue.png" />
        </div>
        <div solt="text">预约</div>
      </van-grid-item>
    </van-grid>

    <!-- 新增患者 -->
    <van-sticky :offset-top="500">
      <div style="position:absolute; right:24px;"
           class="sticky">
        <div style="margin-top:20px;">
          <van-button size="small"
                      plain
                      style="min-width:100px;width:100px;"
                      type="primary"
                      icon="plus"
                      @click="addNew">
            新建患者
            <!-- <van-icon color="#42bd56" size="20px" name="plus" /> -->
          </van-button>
        </div>
      </div>
    </van-sticky>
    <div class="btnyy"
         @click="btnOpen">查看预约患者</div>
    <van-popup v-model="show"
               position="bottom"
               :style="{ height: '50%' }">
      <div class="week"
           @click="onWeek">目前距离预约时间≤7天的患者有<span class="red">{{weekNum}}</span>人</div>
      <div class="month"
           @click="onMonth">目前距离预约时间一个月的患者有<span class="red">{{monthNum}}</span>人</div>
      <div class="month"
           @click="onNum1">无诊断记录患者有<span class="red">{{num1}}</span>人</div>
      <div class="month"
           @click="onNum2">未签署知情同意书患者有<span class="red">{{num2}}</span>人</div>
      <div class="month"
           @click="onNum3">未预约下一次诊疗患者有<span class="red">{{num3}}</span>人</div>
      <div class="month"
           @click="onNum4">已预约未到诊患者有<span class="red">{{num4}}</span>人</div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pid: '',
      token: '',
      url1: '',
      show: false,
      weekNum: '',
      monthNum: '',
      num1:'',
      num2:'',
      num3:'',
      num4:'',
      number:'',
    }
  },
  created() {
    this.url1 = window.location.href.split('/index.html#')[0]
    console.log(this.url1, '路径')

    //this.url1 = window.location.href.split("/index.html#")[0];

    this.token = window.localStorage.getItem('sessionId')
    if (!this.token) {
      this.$router.push('/login')
    }

    let pid = this.$route.query.pid
    let realname = '骨力医生版(安卓)'
    if (this.$route.query.realname) {
      realname = this.$route.query.realname
    }
    this.pid = pid
    this.realname = realname
    this.getWeeknum()

    let fl = localStorage.getItem("firstLogin"); 
    if( (fl+'') == "1" ){ 
      this.$dialog.alert({
          title: "提示",
          message: localStorage.getItem("msg"),
          confirmButtonColor: "#ff976a"
        });
    }
    //alert(12);
    // console.log(pid);
  },
  methods: {
    btnOpen() {
      this.show = true
    },
    getWeeknum() {
      this.loading = true
      let params = {}
      this.$api.post('app/appointment/day', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.weekNum = res.data
          this.direction = "1"
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
      this.$api.post('app/appointment/month', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.monthNum = res.data
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
      /**
       * 无诊疗记录人数
       */
      this.$api.post('app/appointment/noDiagnosis', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.num1 = res.data.count
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
      /***
       * 未签知情同意书
       */
      this.$api.post('app/appointment/noSign', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.num2 = res.data.count
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
      /***
       * 未预约下一次诊疗患者
       */
      this.$api.post('app/appointment/noAppointmen', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.num3 = res.data.count
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })

      /***
       *已预约未到诊患者人数
       */
      this.$api.post('app/appointment/isAppointmen', params, (res) => {
        if (res.code == 0) {
          this.loading = false
          this.num4 = res.data.count
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })

    },
    onWeek() {
      this.show = false
      let params = {}
      console.log(params)
      this.$api.post('app/appointment/selectDay', params, (res) => {
        this.loading = false
        if (res.code === 0) {
          this.loading = false
          this.$router.push({
            path: '/patient/yyList',
            query: {
              data: res,
              number: 1
            },
          })

          //   this.$router.push('/patient/yyList?data=' + res)
        }
      })
    },
    onMonth() {
      this.loading = true
      this.show = false
      this.pageNo = 1
      this.page_size = 10
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
      }
      console.log(params)
      this.$api.post('app/appointment/selectMonth', params, (res) => {
        this.loading = false
        this.$router.push({
            path: '/patient/yyList',
            query: {
              data: res,
              number: 2
            },
          })
      })
    },

    onNum1() {
      this.loading = true
      this.show = false
      this.pageNo = 1
      this.page_size = 10
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
        direction:'1',
      }
      console.log(params)
      this.$api.post('app/patient/listPage', params, (res) => {
        this.loading = false
        this.$router.push({
          path: '/patient/yyList',
          query: {
            data: res,
            number: 3
          },
        })
      })
    },

    onNum2() {
      this.loading = true
      this.show = false
      this.pageNo = 1
      this.page_size = 10
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
        direction:'2',
      }
      console.log(params)
      this.$api.post('app/patient/listPage', params, (res) => {
        this.loading = false
        this.$router.push({
          path: '/patient/yyList',
          query: {
            data: res,
            number: 4
          },
        })
      })
    },


    onNum3() {
      this.loading = true
      this.show = false
      this.pageNo = 1
      this.page_size = 10
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
        direction:'3',
      }
      console.log(params)
      this.$api.post('app/patient/listPage', params, (res) => {
        this.loading = false
        this.$router.push({
          path: '/patient/yyList',
          query: {
            data: res,
            number: 5
          },
        })
      })
    },


    onNum4() {
      this.loading = true
      this.show = false
      this.pageNo = 1
      this.page_size = 10
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
        direction:'4',
      }
      console.log(params)
      this.$api.post('app/patient/listPage', params, (res) => {
        this.loading = false
        this.$router.push({
          path: '/patient/yyList',
          query: {
            data: res,
            number: 6
          },
        })
      })
    },


    addNew() {
      // var url1 = window.location.href.split("#")[0];
      // var url1 = window.location.href.split("/index.html#")[0];

      let url = '/app/patientAdd.html'
      window.location.href = this.url1 + url + '?token=' + this.token
    },
    onClickLeft() {
      this.$router.push('/user/info')
    },
    onClickRight() {
      this.$router.push('/patient/reserve')
      // this.$router.push(
      //   "/patient/reserve?pid=" + this.pid + "&realname=" + this.realname
      // );
    },
    goUrl(id) {
      let pid = this.$route.query.pid
      let realname = this.$route.query.realname
      let timec = new Date().getTime()
      if (pid) {
        //  this.$router.push("/patient/reserve");

        let url = ''

        // var url1 = window.location.href.split("/index.html#")[0];
        // var url1 = window.location.href.split("#")[0];

        // console.log(url1);
        if (id == 5) {
          this.$router.push('/reserve?pid=' + pid + '&realname=' + realname)
          return
        }
        if (id == 1) {
          url = '/app/patientInformationInfo.html'
          // url = "/app/index.html";
        }
        if (id == 2) {
          url = '/app/p_riskList.html'
        }
        if (id == 3) {
          url = '/app/index.html'
        }
        if (id == 4) {
          url = '/app/sampleDiagnosis.html'
        }

        window.location.href =
          this.url1 +
          url +
          '?token=' +
          this.token +
          '&pid=' +
          pid +
          '&realname=' +
          realname +
          '&time=' +
          timec
      } else {
        this.$router.push('/patient/reserve')
      }
    },
  },
}
</script>



<style >

</style>


<style >

@import '../../assets/css/global.css'; /*引入公共样式*/

.icon1 {
  line-height: 40px;
}
.icon1 img {
  width: 20px;
}
.icon2 {
  line-height: 36px;
}
.icon2 img {
  width: 22px;
}
.css-grid {
  margin-top: 30px;
}
.css-grid img {
  width: 50px;
}
.btnyy {
  position: fixed;
  right: 0;
  bottom: 30%;
  width: 15px;
  padding: 8px;
  background: #ccc;
  z-index: 999;
}
.week,
.month {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  padding: 0px 10px;
}
.red {
  color: #ff0000;
}

</style>
