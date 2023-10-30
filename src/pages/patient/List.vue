<template>
  <div>
    <!-- 预约患者 -->
    <van-sticky>
      <van-search
        v-model="keyword"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
      <van-tabs color="#07c160" @change="changeTabs" v-model="filter">
        <van-tab title="全部"></van-tab>
        <van-tab title="未脱失"></van-tab>
        <van-tab title="脱失"></van-tab>
        <van-tab title="死亡"></van-tab>
      </van-tabs>
    </van-sticky>

    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-cell-group v-for="item in list" :key="item.uid" is-link center>
        <van-swipe-cell>
          <template #left>
            <van-button
              square
              type="danger"
              text="删除"
              @click="removePid(item)"
              class="removePid"
            />
          </template>
          <van-cell
            :key="item.uid"
            :title="item.realname"
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
                class="leve-font2"
                @click="goHome(item)"
                >查看</van-button
              >
              <van-button
                type="danger"
                size="small"
                class="leve-font2"
                v-if="item.lost == 1"
                @click="recoveryLost(item)"
                >恢复</van-button
              >
            </div>
          </van-cell>
        </van-swipe-cell>
      </van-cell-group>
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
      filter: 0,
      lost: "",
    };
  },
  methods: {
    onLoad() {
      this.loading = true;
      let params = {
        page_pn: this.pageNo,
        page_size: this.page_size,
        keywords: this.keyword,
        lost: this.lost,
      };
      console.log(params);
      this.$api.post("app/patient/listPage", params, (res) => {
        this.loading = false;
	
        // 搜索 还是分页
        // if (this.pageNo == 0 || this.lastkeyword != this.keyword) {
        //   this.list = res.data;
        //   //this.page_size=res.pageSize;
        //   this.lastkeyword = this.keyword;
        // } else {
        //   this.list = this.list.concat(res.data);
        // }
        // // 是否完成
        // if (res.data.length <20 ) {
        //   this.finished = true;
        // } else {
        //   this.pageNo = this.pageNo + 1;
        // }
        if (res.code === 0) {
          //this.page_size=res.pageSize;
          this.loading = false;
          if (this.filter == 3) {
            this.onLodeList(res);
          } else if (this.filter == 2) {
            this.onLodeList(res);
          } else if (this.filter == 1) {
            this.onLodeList(res);
          } else if (this.filter == 0) {
            this.onLodeList(res);
          }
        }

        // }
        console.log(this.list);
      });
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
    // 下拉加载list
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
    // 删除患者
    removePid(item) {
      let params = {
        pid: item.pid,
      };
      console.log(params);

      this.$api.post("app/patient/delete", params, (res) => {
        if (res.code == 0) {
          this.$dialog
            .alert({
              title: "提示",
              message: res.msg,
              confirmButtonColor: "#07c160",
            })
            .then(() => {
              this.pageNo = 1;
              this.lost = "";
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
    // 改变tabs
    changeTabs() {
      if (this.filter == 0) {
        this.pageNo = 1;
        this.list = [];
        this.finished = false;
        this.loading = true;
        this.lost = "";
        this.onLoad();
      }
      if (this.filter == 1) {
        this.pageNo = 1;
        this.list = [];
        this.finished = false;
        this.loading = true;
        this.lost = "-1";
        this.onLoad();
      }
      if (this.filter == 2) {
        this.pageNo = 1;
        this.list = [];
        this.finished = false;
        this.loading = true;
        this.lost = "1";
        this.onLoad();
      }
      if (this.filter == 3) {
        this.pageNo = 1;
        this.list = [];
        this.finished = false;
        this.loading = true;
        this.lost = "3";
        this.onLoad();
      }
    },
    goHome(item) {
      console.log(item);
	  sessionStorage.setItem("age",item.age);
	  sessionStorage.setItem("verson",item.verson)
      this.$router.push({
        path: "/home",
        query: { pid: item.pid, realname: item.realname },
      });
    },
    recoveryLost(item) {
      let params = {
        pid: item.pid,
      };
      this.$api.post("app/patient/resettingLost", params, (res) => {
        if (res.code == 0) {
          this.$dialog
            .alert({
              title: "提示",
              message: res.msg,
              confirmButtonColor: "#07c160",
            })
            .then(() => {
              this.pageNo = 1;
              this.filter = 1;
              this.lost = "";
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
  },
};
</script>

<style>
.removePid {
  height: 64px;
}
.r_title {
  color: #ff0000;
}
</style>
