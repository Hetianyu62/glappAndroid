<template>
  <div>
    <!-- 预约患者 -->
    <!-- <van-sticky>
      <van-search v-model="keyword"
                  show-action
                  placeholder="请输入搜索关键词"
                  @search="onSearch"
                  @cancel="onCancel" />
      <van-tabs color="#07c160"
                @change="changeTabs"
                v-model="filter">

        <van-tab title="全部"></van-tab>
        <van-tab title="未脱失"></van-tab>
        <van-tab title="脱失"></van-tab>
        <van-tab title="死亡"></van-tab>
      </van-tabs>
    </van-sticky> -->
    <div class="top">
      <div class="left"
           style="width:10%;" @click="onCancel()">
        <van-icon name="arrow-left" />
      </div>
      <div class="center" style="width:100%;" v-html="yyHtml()">预约患者</div>
    </div>
    <div class="yylist">
      <van-list v-model="loading"
                :finished="finished"
                @load="onLodeList">
        <van-cell-group v-for="item in list "
                        :key="item.uid"
                        is-link
                        center>
          <van-swipe-cell>
            <template #left>
              <van-button square
                          type="danger"
                          text="删除"
                          @click="removePid(item)"
                          class="removePid" />
            </template>
            <van-cell :key="item.uid"
                      :title="item.realname"
                      :label="item.code"
                      :value="item.state"
                      is-link
                      center>
              <div style="padding-right:20px;"
                   slot="icon">
                <van-icon v-if="item.gender!='1'&& item.special=='1'"
                          class="iconfont women"
                          color="#ff0000"
                          size="30" />
                <van-icon v-if="item.gender!='1'&& item.special!='1' "
                          class="iconfont women"
                          color="#969799"
                          size="30" />
                <van-icon v-if="item.gender=='1'&& item.special=='1' "
                          name="contact"
                          color="#ff0000"
                          size="30" />
                <van-icon v-if="item.gender=='1'&& item.special!='1' "
                          name="contact"
                          color="#969799"
                          size="30" />

                <!-- <van-icon name="user-o" /> -->
                <!-- <van-icon name="user-circle-o" /> -->
                <!-- <van-icon name="contact" /> -->
                <!-- <van-icon name="manager" /> -->
              </div>
              <div>
                <van-button type="primary"
                            size="small"
                            @click="goHome(item)">查看</van-button>
                <van-button type="danger"
                            size="small"
                            v-if="item.lost==1"
                            @click="recoveryLost(item)">恢复</van-button>
              </div>
            </van-cell>
          </van-swipe-cell>
        </van-cell-group>
      </van-list>
      <div v-if="!loading && list.length<1"
           class="noData">
        <img src="../../assets/wushuju.png" />
        <div>暂无数据</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../public/app/static/css/common/icon.css'
export default {
  data() {
    return {
      loading: false,
      finished: false,
      pageNo: 1,
      page_size: 10,
      list: [],
      keyword: '',
      filter: 0,
      lost: '',
    }
  },
  created() {
    this.onLodeList()
  },
  methods: {

    yyHtml(){
      let num = this.$route.query.number;
      if(num == 1){
        let aaa = '<div class="center"  style="width:100%; text-align: center" >距离预约时间≤7天的患者</div>';
        return aaa;
      }else if (num == 2){
        let aaa = '<div class="center"  style="width:100%; text-align: center"  >距离预约时间一个月的患者</div>';
        return aaa;
      }else if (num == 3){
        let aaa = '<div class="center"  style="width:100%; text-align: center" >无诊断记录患者</div>';
        return aaa;
      }else if (num == 4){
        let aaa = '<div class="center"  style="width:100%; text-align: center" >未签署知情同意书患者</div>';
        return aaa;
      }else if (num == 5){
        let aaa = '<div class="center"  style="width:100%; text-align: center"  >未预约下一次诊疗患者</div>';
        return aaa;
      }else if (num == 6){
        let aaa = '<div class="center" style="width:60%;" >已预约未到诊患者</div>';
        return aaa;
      }
    },

    // 下拉加载list
    // eslint-disable-next-line no-unused-vars
    onLodeList(res) {
      this.list = []
      this.loading = false
      let aaa = this.$route.query.data.data
      this.list = this.list.concat(aaa)
      console.log(this.list, 'skgpipip')
      this.pageNo++
      // 如果没有数据，显示暂无数据
      if (this.list.length === 0 && this.pageNo === 0) {
        this.noData = true
        this.loading = false
      }
      // 如果加载完毕，显示没有更多了
      if (aaa.length === 0) {
        this.finished = true
      }
    },
    // 删除患者
    removePid(item) {
      let params = {
        pid: item.pid,
      }
      console.log(params)

      this.$api.post('app/patient/delete', params, (res) => {
        if (res.code == 0) {
          this.$dialog
            .alert({
              title: '提示',
              message: res.msg,
              confirmButtonColor: '#07c160',
            })
            .then(() => {
              this.pageNo = 1
              this.lost = ''
              this.list = []
              //   this.onLoad()
            })
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
    },
    // 改变tabs
    changeTabs() {
      if (this.filter == 0) {
        this.pageNo = 1
        this.list = []
        this.finished = false
        this.loading = true
        this.lost = ''
        this.onLoad()
      }
      if (this.filter == 1) {
        this.pageNo = 1
        this.list = []
        this.finished = false
        this.loading = true
        this.lost = '-1'
        this.onLoad()
      }
      if (this.filter == 2) {
        this.pageNo = 1
        this.list = []
        this.finished = false
        this.loading = true
        this.lost = '1'
        this.onLoad()
      }
      if (this.filter == 3) {
        this.pageNo = 1
        this.list = []
        this.finished = false
        this.loading = true
        this.lost = '3'
        this.onLoad()
      }
    },
    goHome(item) {
      console.log(item)
      this.$router.push({
        path: '/home',
        query: { pid: item.pid, realname: item.realname },
      })
    },
    onCancel() {
      this.$router.push("/home");
    },
    recoveryLost(item) {
      let params = {
        pid: item.pid,
      }
      this.$api.post('app/patient/resettingLost', params, (res) => {
        if (res.code == 0) {
          this.$dialog
            .alert({
              title: '提示',
              message: res.msg,
              confirmButtonColor: '#07c160',
            })
            .then(() => {
              this.pageNo = 1
              this.filter = 1
              this.lost = ''
              this.list = []
              //   this.onLoad()
            })
        } else {
          this.$dialog.alert({
            title: '提示',
            message: res.msg,
            confirmButtonColor: '#07c160',
          })
        }
      })
    },
  },
}
</script>

<style>
.removePid {
  height: 64px;
}
.r_title {
  color: #ff0000;
}
.btnyy {
  position: fixed;
  right: 0;
  bottom: 10%;
  width: 15px;
  padding: 8px;
  background: #ccc;
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
.top {
  display: flex;
  height: 46px;
  line-height: 46px;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
  width: 100%;
}
.yylist {
  padding-top: 46px;
}
</style>
