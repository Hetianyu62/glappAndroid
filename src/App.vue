<template>
  <div id="app">
    <!-- <router-view /> -->
    <router-view v-if="isRouterAlive" />
  </div>

</template>

<script>
export default {
  name: "app",
 //components: {},
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
/* body {
  padding-top: 45px;
} */
/* .css-green.van-nav-bar{
  background-color:#42bd56;
  color:#fff;
}
.css-green .van-nav-bar__title {
  color:#fff;
} */

body {
  margin:0 auto;
  padding:0 auto;
  /* padding-bottom: 45px; */
}

.top46 {
  padding-top: 50px;   /* 原来45 改成 */
  
}
#app .van-nav-bar .van-icon {
  color: #323233;
}
/*  */
.model-body .van-picker__cancel,
.model-body .van-picker__confirm {
  color: #07c160;
}
/* 暂无数据 */
.noData {
  color: #cacaca;
  width: 100%;
  text-align: center;
  font-size: 14px;
  padding-top: 200px;
}
.noData image {
  width: 64px;
  height: 42rpx;
}

/* .leve-font1{ 
  font-size:35px 
  
  }
.leve-font2{ 
  font-size:25px!important; 
 }
.leve-font3{ font-size:20px } */


/* 如果文档宽度小于 300 像素则修改背景颜色(background-color) */
@media screen and (max-width:767px) { 
  .leve-font1{   font-size:20px   }
  .leve-font2{ 
    font-size:10px!important; 
  }
  .leve-font3{ font-size:10px!important; } 
}

/* 小屏幕（平板，大于等于 768px） */
 @media screen and (min-width: 768px) and (max-width:1024px ){ 
  .leve-font1{   font-size:32px   }
  .leve-font2{ 
    font-size:21px!important; 
  }
  .leve-font3{ font-size:20px!important; } 
}


/* 中等屏幕（桌面显示器，大于等于 992px） 
@media (min-width: @screen-md-min) { 

 }

/* 大屏幕（大桌面显示器，大于等于 1200px） 
@media (min-width: @screen-lg-min) { 

 }*/



</style>
