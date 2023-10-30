<template>
  <div class="app" id="app"> 
   <van-nav-bar 
        title="用户注册"
        left-text=""
        right-text=""
        left-arrow
        @click-left="onClickLeft"
        />


  <van-form @submit="onSubmit">
   <van-field
        v-model="realname"
        name="realname"
        label="姓名"
        placeholder="姓名"
        :rules="[{ required: true, message: '请填写真实姓名' }]"
    />
     <van-field
        v-model="phone"
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ pattern ,   message: '请填写手机号' }]"
    />

    <van-field v-model="password" name="password" label="密码" type="password" placeholder="密码"
               :rules="telRules"/>

    <van-field v-model="password1" name="password1"  label="确认密码" type="password" placeholder="确认密码"
    :rules="telRules"/>
    <van-field
      v-model="sms" name="RANDOMVALIDATECODEKEY"
      center
      clearable
      label="验证码"
      placeholder="请输入验证码"
    >
     <template #button>
       <van-image
         width="80px"
         height="30px"
         fit="contain"
         :src='img64'
         @click="refreshCode"
       />


      <!-- <van-button
              slot="button"
              :disabled="!show"
              @click="sendSms"
              size="small"
              type="warning" > -->
        <!-- <span v-if="show">发送验证码</span>
              <span v-else>{{ count }} script</span>
      </van-button>-->


    </template>

    </van-field>

     <div style="margin: 16px;">
        <van-button  block type="info" native-type="submit" round  >提交</van-button>
    </div>
    </van-form>
  </div>
</template>

<script>


export default {
  created(){
     this.refreshCode();
  },
  data() {
    return {
        img64: '',
        show:true,
        phone:"",
        realname:"",
        username: "",
        password: "",
        password1:"",
        sms:"",
        pattern:  /^[0-9]*$/,
        telRules: [{
            required: true,
            message: '密码不能为空',
            trigger: 'onBlur'
        }, {
            // 自定义校验规则
            validator: value => {
                return /(?!^([0-9]+|[a-zA-Z]+|[!#*_]+)$)^[a-zA-Z0-9!#*_]{6,16}$/
                    .test(value)
            },
            message: '请输入正确格式的密码(请输入6-20位大、小写字母、数字或特殊字符至少包含其中两种类型)',
            trigger: 'onBlur'
        }],
        passWord2: /\d{6}/,

  };
  },
  methods: {
    refreshCode(){
      let time3 = new Date().valueOf(); //1603009495724.精确到毫秒
      this.img64 = this.$common.webUrl+"/app/login/getShearCaptcha?utt"+time3;
    },
   onSubmit(formData) {
     if( this.password !='' && this.password == this.password1 ){
        this.$api.post("/app/login/insertUser", formData,
        res => {
           this.$dialog.alert({
            title: "您的账号:"+res.data,
            message: "您好,我们会在3~5个工作日内给您审核,请您耐心等待。",
          }).then(() => {
             this.$router.push({
               name:'login',
               query:{
                 name:res.data
               }
             })
          });
        } ,
        err => {
          this.$toast(err.msg);
          this.refreshCode();
        });
     }else{
       this.$toast('两次密码不一致');
     }

    },
    onClickLeft(){
       this.$router.go(-1)
    },
    sendSms(){
        alert("发送验证码");
    }

  }
};

</script>



<style>
.bigTitle {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #888;
}
.bg-top{margin-top: 10px;padding: 20px;}

.van-cell span{
  color: #646566;
}

</style>
