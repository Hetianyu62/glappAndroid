/*
 * @Description: 页面主业务公共js
 * @Author: 杨志强
 * @Date: 2019-06-14 15:47:36
 * @LastEditTime: 2020-05-08 12:13:40
 * @LastEditors: Please set LastEditors
 */
 // 风险筛查集合
var  riskJson={
  r1:'',
  r2:'',
  r3:'',
}
$(function() {
  init ();
  $("#page1").load(src + "/views/template/header.html");
  // $("#nav_menu").load(src + "/views/template/nav.html");
  $("#validate_text").val("");
  var pathName=decodeURI(getUrlParams("pathName"));
  $("#m_title").text(pathName);
  var pid,josn;
  var p_pid = decodeURI(getUrlParams('pid')).replace(/\'/g, '"');
  if(p_pid){
    if(typeof JSON.parse(p_pid) != "object"){
      pid=p_pid;
  }else{
    pid=JSON.parse(p_pid).pid;
  }
  }
  if(pid){
    $("#patientDetial").publicAjax({
      url: globalUrl + "patient/detial",
      type: "post",
      data: {"pid":pid},
      successFn: function(data) {
       if(data.code==0){
         sessionStorage.setItem("lost",data.data.lost);
         sessionStorage.setItem("gender",data.data.gender);
         sessionStorage.setItem("age",data.data.age);
         //flagConfirm();
         lostConfirm(data.data.lost);
  
       }
      }
    });
  }
  
  flagConfirm();

});
function isArray(obj){ 
  return (typeof obj=='object')&&obj.constructor==Array; 
  } 
  function isObject(obj){ 
  return (typeof obj=='object')&&obj.constructor==Object; 
  }
  function isString(obj){ 
  return (typeof obj=='string')&&obj.constructor==String; 
  }
/* 退出登录 */

function checkOut() {
  $("#checkOut").publicAjax({
    url: globalUrl + "sys/logout",
    type: "post",
    data: {},
    successFn: function(data) {
    if(data.code="0"){
      window.location.href = src + "/views/login.html";
      }
    }
  });
}
/* 验证码获取 */
function getCode(url, method) {
  $("#validate_text").val("");
  $("#validate").val("");
  $("#registerForm").publicAjax({
    url: url,
    type: method,
    successFn: function(data) {
      if ((data.code = "100004")) {
        $("#codeImg").attr("src", data.data.validate_img);
        $("#validate_id").val(data.data.validate_id);
      }else{
        layer.msg("验证码书写错误请认真填写", {icon: 2});
        $("#validate_text").val("");
      }
    }
  });
}
// 权限控制
function flagConfirm(){
  var flag=sessionStorage.getItem("flag");
  var lost=sessionStorage.getItem("lost");
  if(flag==1){ 
    /*
     1超级管理员 2国家级用户 3 科室管理员 4医师 5 科研人员
     1、超级管理员(患者信息只可查看)
     .f_p_updateBtn // 患者操作按钮
     .f_p_delBtn    // 删除按钮
     .f_p_upload    // 信息上传
     .f_p_pupload   // 批量上传
     .f_p_download   // 批量上传
     .f_p_cAdd       // 参数管理操作
    */ 
    $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,.f_p_cAdd,#deletion,#delDiag,#addDiag").remove();
    $("#marquee").remove();
    if(lost){lostConfirm(lost);}
  }else if(flag==2){
    $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,.f_p_cAdd,#deletion,#delDiag,#addDiag").remove();
    if(lost){lostConfirm(lost);}
  }else if(flag==3){
    $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,#deletion,#delDiag,#addDiag").remove();
    $(".f_p_cAdd").show();
    if(lost){lostConfirm(lost);}

  }else if(flag==4){
    $(".f_p_cAdd").remove();
    $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,#delDiag,#addDiag").show();
    if(lost){lostConfirm(lost);}
  }
}
// 脱失患者按钮控制
function lostConfirm(lost){
  if(lost){
    if(lost==1 || lost==3){ // 脱失患者
      $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,.f_p_cAdd,#delDiag,#addDiag").remove();
      $(".flag_btn").hide();
      $(".flag_btn").remove();
      $("#marquee").remove();
      $("#deletion").show();
    }else{
      $("#deletion").hide();
      // $(".f_p_cAdd").remove();
      // $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,#delDiag,#addDiag").show();
    }
  }
  
}
// 转诊过后的按钮控制
function referralConfirm(dataHid,userHid,flagCode,mtype,haveEdit){
  var referralstatus=sessionStorage.getItem("referralstatus");
  // if(referralstatus==1){
  //   $(".flag_btn").remove();
  // }else{
  //   $(".flag_btn").show();
  // }
 /*
    诊疗状态 dataHid 1 诊疗id  userHid 用户hid
    用户权限 
  */ 
 if(flagCode==1){
  $(".flag_btn").remove();
 }else if(flagCode==2){
  $(".flag_btn").remove();
 }else if(flagCode==3){
  $(".flag_btn").remove();
 }else if(flagCode==4){
  if(dataHid!="" && userHid!=""){
    if(dataHid==userHid){
      if(mtype){
        if(mtype=="update"){
          $("#updateMrdicine").fadeIn(0);
        }else{
          $("#updateMrdicine").fadeOut(0);

          // if(haveEdit==1){ // 最新药物信息无新增上一条药物信息可以修改
          //   $("#updateMrdicine").text("修改");
          //   $("#updateMrdicine").fadeIn(0);
          // }else{
          //   $("#updateMrdicine").fadeOut(0);
          // }
        }

      }else{
        $(".flag_btn").show();
      }
    //   $("#update").hide();
    // $("#submitUpdate").show();
    // $("#submitUpdate").removeAttr("disabled");
    //$("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",true);           

    }else{
      $(".flag_btn").hide();
      $(".flag_btn").remove();
     // $("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",true);           
    }
  }else{
    $(".flag_btn").hide();
      $(".flag_btn").remove();
  } 
  
  // if(referralstatus==1){
  //   $("#addDiag").remove();
  // }else{
  //   $("#addDiag").show();
  // }
 }else{
  //$(".flag_btn").remove();
 } 
}

// 诊疗记录回调刷新问题
// function initOperation(finishcode,lasthospital,chid){
//   if(finishcode==0){ // 0 未完成 1 已完成
//     $("#p_btnGroup", parent.parent.document).html("");
//   }else{
//     if(lasthospital==chid){  // 本院患者 ‘hid’ 建档医院转诊之前的医院  ‘chid’转诊之后的医院
//       $("#p_btnGroup", parent.parent.document).html("");
//       $("#p_btnGroup", parent.parent.document).append(
//                 '<button id="p_referral" class="btn btn-success flag_btn " type="button" onclick="referral()">转诊</button>&nbsp;&nbsp;'+
//                 '<button id="p_mackAppointment" class="btn btn-primary flag_btn" type="button" onclick="mackAppointment()">预约</button>'
//               )
//     }else{  // 转院患者  进行判断是在哪个医院 如果为转诊后的医院是B医院可以进行操作 转诊之前的A医院不能进行操作
  
//       /* 现在的判断 转诊之前的医院 转诊到的医院 现在可以操作患者得医院 */
//       $("#p_btnGroup", parent.parent.document).html("");
//      // referralConfirm();
//     }
//   }
// }

// iframe 多层嵌套置顶
function toTop(){
  var obj=window.parent.document.getElementById('focus');
  $(obj).focus();
  parent.scrollTo(0,0);

}
// 公共ajax
function ajaxCommon(url,data,callback,el,id,src){
  $("#addPatientFrom").publicAjax({
    url: globalUrl + url,
    type: "post",
    data: data,
    dataType: "json",
    successFn: function(data) {
      if (data.code == "0") {
        if(id){
          parent.layer.close(id);
        }
        callback(el,data.data,src);
      } else {
        parent.layer.alert(data.msg);
      }
    }
  });
}
function init () {
  /*
    页面加载后添加Cordva生命周期事件监听
    */
  document.addEventListener('deviceready', onDeviceReady, false)
  document.addEventListener('pause', onPause, false)
  document.addEventListener('resume', onResume, false)
}

function onPause(){
  console.log('===进入后台===')
  //添加监听
  document.addEventListener('backbutton', appPause, false)
  //移除监听
  document.removeEventListener('backbutton', pageBack, false)
}

function onResume(){
  console.log('===恢复到前台===')
  // 恢复到前台cordova的物理按键0毫秒恢复
  setTimeout(() => {
    document.addEventListener('backbutton', pageBack, false)
    document.removeEventListener('backbutton', appPause, false)
  }, 0)
}
//禁止cordova物理按键后返回上页
function appPause (event) {
  console.log('禁止cordova物理按键后返回上页');
  event.preventDefault();
}
//按物理按键返回上页
function pageBack (event) {
  window.history.back()
}

 //Cordova加载完毕
 function onDeviceReady() {
    //监听返回键按钮事件
    document.addEventListener("backbutton", eventBackButton, false);
  }
   //返回键点击响应(核心代码)
   function eventBackButton() {
   //进入后台
  //   navigator.Backbutton.goHome(function() {
  //   alert('go home success');
  // }, function() {
  //   alert('go home fail');
  //   });
  e.preventDefault();
  console.log('Back Button is Pressed!');
}