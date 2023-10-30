<template>
  <div>
    <!-- 预约患者 -->
    <van-sticky>
      <van-search
        class="leve-font3"
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </van-sticky>

    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-cell
        v-for="item in list"
        :title="item.realname"
        :key="item.uid"
        :label="item.code"
        :value="item.state"
        is-link
        center
      >
        <div style="padding-right: 20px" slot="icon">
          <van-icon
            v-if="item.gender != '1' && item.special == '1'"
            class="iconfont women"
            color="#ff0000"
            size="30"
          />
          <van-icon
            v-if="item.gender != '1' && item.special != '1'"
            class="iconfont women"
            color="#969799"
            size="30"
          />
          <van-icon
            v-if="item.gender == '1' && item.special == '1'"
            name="contact"
            color="#ff0000"
            size="30"
          />
          <van-icon
            v-if="item.gender == '1' && item.special != '1'"
            name="contact"
            color="#969799"
            size="30"
          />
          <!-- <van-icon name="user-o" /> -->
          <!-- <van-icon name="user-circle-o" /> -->
          <!-- <van-icon name="contact" /> -->
          <!-- <van-icon name="manager" /> -->
        </div>
        <div>
          <van-button
            type="primary"
            size="small"
            v-if="item.complete != 1"
            @click="arrivalvisit(item)"
            class="leve-font2"
            >到诊</van-button
          >
          <van-button
            type="primary"
            size="small"
            v-if="item.complete == 1"
            @click="goHome(item)"
            class="leve-font2"
            >诊疗</van-button
          >
          <van-button
            type="danger"
            size="small"
            v-if="item.complete != 1"
            @click="deletion(item)"
            class="leve-font2"
            >脱失</van-button
          >
        </div>
        <van-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          class="leve-font2"
          @cancel="onCancelSheet"
          @select="onSelect"
        />
      </van-cell>
    </van-list>

    <div v-if="!loading && list.length < 1" class="noData">
      <img src="../../assets/wushuju.png" />
      <div>暂无数据</div>
    </div>
  </div>
</template>

<script>
import "../../../public/app/static/css/common/icon.css";
export default {
  data() {
    return {
      loading: false,
      finished: false,
      pageNo: 1,
      page_size: 10,
      list: [],
      keyword: "",
      show: false,
      lost: "",
      p_apid: "",
      p_pid: "",
      actions: [
        { name: "患者脱失", value: "1" },
        { name: "死亡", value: "3" },
      ],
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
      };

      console.log(params);
      this.$api.post("app/appointment/appointmentPatientListPage", params, (res) => {
        this.loading = false;
        // 搜索 还是分页
        // if (this.pageNo == 0 || this.lastkeyword != this.keyword) {
        //   this.list = res.data;
        //   this.lastkeyword = this.keyword;
        // } else {
        //   this.list = this.list.concat(res.data);
        // }
        // // 是否完成
        // if (res.data.length < 20) {
        //   this.finished = true;
        // } else {
        //   this.pageNo = this.pageNo + 1;
        // }
        if (res.code === 0) {
		
          //this.page_size=res.pageSize;
          this.loading = false;
          this.onLodeList(res);
        }
        // console.log(this.list);
      });
    },
    onLodeList(res) {
      this.list = this.list.concat(res.data);
      this.pageNo++;
      // 如果没有数据，显示暂无数据
      if (this.list.length === 0 && this.pageNo === 0) {
        this.noData = true;
      }
      // 如果加载完毕，显示没有更多了
      if (res.data.length === 0) {
        this.finished = true;
      }
    },
    onSearch(val) {
      console.log(val);
      this.pageNo = 1;
      this.list = [];
      this.onLoad();
    },
    onCancel() {
      //   Toast('取消');
      //   this.$router.go(-1);
      this.$router.push("/home");
    },
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      this.lost = item.value;
      if (this.lost) {
        let params = {
          apid: this.p_apid,
          pid: this.p_pid,
          lost: this.lost,
        };
        this.$api.post("app/patient/patientLost", params, (res) => {
          if (res.code == 0) {
            this.$dialog
              .alert({
                title: "提示",
                message: res.msg,
                confirmButtonColor: "#07c160",
              })
              .then(() => {
                this.pageNo = 1;
                this.list = [];
                this.onLoad();
              });
          } else {
            this.$dialog.alert({
              title: "提示",
              message: res.msg,
              confirmButtonColor: "#07c160",
            });
          }
        });
      }
    },
    onCancelSheet() {
      this.show = false;
      console.log("取消");
    },
    goHome(item) {
	sessionStorage.setItem("age",item.age);
	sessionStorage.setItem("verson",item.verson)
      //console.log(item);
      let timec = new Date().getTime();
      this.$router.push({
        path: "/home",
        query: { pid: item.pid, realname: item.realname, time: timec },
      });
    },
    arrivalvisit(item) {
      //  到诊操作
      let params = {
        apid: item.apid,
      };
      this.$api.post("app/appointment/updateAppointmentComplete", params, (res) => {
        if (res.code == 0) {
          this.$dialog
            .alert({
              title: "提示",
              message: "到诊成功",
              confirmButtonColor: "#07c160",
            })
            .then(() => {
              this.pageNo = 1;
              this.list = [];
              this.onLoad();
            });
        } else {
          this.$dialog.alert({
            title: "提示",
            message: res.msg,
            confirmButtonColor: "#07c160",
          });
        }
      });
    },
    deletion(item) {
      // 脱失操作
      this.show = true;
      this.p_apid = item.apid;
      this.p_pid = item.pid;
    },
  },
};
</script>

<style>

  .van-cell__title span{
    color: #323233 !important;
  }
  .van-cell span{
     color: none !important;
  }
</style>
