<template>
  <div  style="background-color:gray;padding-top:1px"  :style="{backgroundImage:'url(' + bg + ')' , backgroundRepeat:'no-repeat',
        backgroundSize:'100% 100%'  , height: hsize+'px' }  ">
      <div class = "top100 login-module " >
      <div class="bigTitle">
        <img src="@/assets/login/gltitle.png" alt="" class="title-logo-img">
        <p class= "leve-font1"> 中国脆性骨折高风险患者管理系统(安卓版)</p>
      </div>
      <!-- eee <div>
        <img src="../../assets/logo.png" />
      </div>-->
      <van-field v-model="userName" label="用户名" placeholder="请输入用户名"  :input="userName"   class="leve-font2  content-in ipt-title" />
      <van-field v-model="password" label="密码" type="password" placeholder="请输入密码"  class="leve-font2 content-in" />
      <van-field 
        class="leve-font2 content-in"
        v-model="sms"
        center
        clearable
        label="验证码"
        placeholder="请输入短信验证码"
      >
      <template #button>
        <van-button
                slot="button"
                :disabled="!show"
                round
                @click="sendSms"
                size="small"
                type="primary" style="display:flex">
                <span v-if="show"   class="leve-font2" >发送验证码</span>
                <span v-else  class="leve-font2" >{{ count }} s</span>
        </van-button>
      </template>
      </van-field>

      <div class="content-in van-cell van-field" >
        <van-button type="primary"  @click="clkLogin" block size="normal"   class="leve-font2 custom-class"  >登录</van-button>
      </div>

      <div class="content-in van-cell van-field" >
        <van-button type="primary" style="background-color: orange;"  @click="onReg" block size="normal"   class="leve-font2 custom-class" >注册</van-button>
      </div>

<!--
      <div style="padding:0 16px; padding-top:20px; ">
        <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"  @click="onReg">
          <a href="javscript:void(0)"  class="leve-font2" style = "color: #fbfbfb" > 注册</a>
        </van-divider>
      </div> -->
 </div>
  </div>
</template>

<script>
// import { Dialog } from 'vant';
export default {
  mounted(){
    //alert(window.screenTop +"work hright" +  window.innerHeight )
    this.hsize = window.innerHeight-2;
	

  },
  data() {
    return {
      // userName: "CS0000002",
      // password: "654321"
      hsize:1024,
      userName:this.$route.query.name !=null ?this.$route.query.name :'',
      password: "",
      sms:"",
      show: true,
      count: "",
      timer: null,
      bg: require('@/assets/login/bj-login.png'),
	  smuserName:'',
	  smpassword:''
	  
    };
  },
  methods: {
    onReg(){
      this.$router.push('/register')
    },
    // 登录
    clkLogin() {

      // let pwdss = window.$rsaEncrypt("abc");
      // alert("abc加密后的字符串："+pwdss);
      // return
      if (!this.userName) {
        this.$dialog.alert({
          title: "提示",
          message: "用户名不能空！",
          confirmButtonColor: "#07c160"
        });
        // return;
      }
      if (!this.password) {
        this.$dialog.alert({
          title: "提示",
          message: "密码不能空！",
          confirmButtonColor: "#07c160"
        });
        return;
      }
      if (!this.sms) {
        this.$dialog.alert({
          title: "提示",
          message: "验证码不能空！",
          confirmButtonColor: "#07c160"
        });
        return;
      }
	  
	   this.smuserName=window.$rsaEncrypt(this.userName);
	   this.smpassword=window.$rsaEncrypt(this.password);
      let params = { userName: this.smuserName , password: this.smpassword ,sms:this.sms };
      let _this = this;
      this.$api.post("app/login/userLogin", params, res => { 
        localStorage.setItem("firstLogin", res.data.firstLogin);
        localStorage.setItem("msg", res.data.msg);
        localStorage.setItem("sessionId", res.data.token);
        localStorage.setItem("realname", res.data.realName);
        localStorage.setItem("hospName", res.data.hospName);
        _this.$router.push("/home");
      });
    },
    // 发送验证码
    sendSms() {
      if (!this.userName) {
        this.$dialog.alert({
          title: "提示",
          message: "用户名不能空！",
          confirmButtonColor: "#ff976a"
        });
        return;
      }
      if (!this.password) {
        this.$dialog.alert({
          title: "提示",
          message: "密码不能空！",
          confirmButtonColor: "#ff976a"
        });
        return;
      }
      this.sms="";
      //this.show = false;
      let params = {userName: this.userName , password: this.password };
      let url = "app/login/checkCode";
      this.$api.post(url, params, res => {
        if (res.code) {
          this.show = false;
          this.$dialog.alert({
            title: "提示",
            message: res.err,
            confirmButtonColor: "#ff976a"
          });
          return;
        } else {
          // 倒计时
          this.getCode();
        }
      });
    },
    // 60秒倒计时
    getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

	
  }
};
</script>

<style scope>

.custom-class{
   height:35px!important;
   width:100%!important;
   margin-left:auto;
   margin-right: auto;
   border:0;
   border-radius: 11px;
}

.bigTitle {
  text-align: center;
  color:#fbfbfb;;
  /* height: 150px;
  line-height: 150px;
  font-size: 20px;
   color: #888;
  font-weight: bold; */

}
.top100{
  margin-top: 15%;
  padding: 10px;
}


/* 如果文档宽度小于 300 像素则修改背景颜色(background-color) */
@media screen and (max-width:767px) {
  .login-module{
     width: 310px;
     margin-right: auto;
     margin-left: auto;
  }
  .content-in{
    background: initial;
  }
  .title-logo-img{
    height:50px
  }
}


/* 小屏幕（平板，大于等于 768px） */
@media screen and (min-width: 768px) and (max-width:1024px ){
  .content-in{
    background: initial;
    line-height: 51px;
  }

  .login-module{
     width: 500px;
     margin-right: auto;
     margin-left: auto;
  }

}


.van-cell span{
  color: #eaeaea
}

.van-cell input{
  background-color: #fbfbfba6;
  border-radius: 0px 5px 5px 0px; 
  text-indent: 10px;
}

.van-cell__title{
  background-color: #f0f8ff61;
  text-indent: 0.2cm;
  margin-right:0px;
  border-radius: 5px 0px 0px 5px;
}
.van-field__control::-webkit-input-placeholder{
  color: #fbfbfb;
}

.van-cell{
   background: initial;
}
</style>
