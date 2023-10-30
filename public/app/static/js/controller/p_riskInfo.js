/*
 * @Author: your name
 * @Date: 2020-03-06 21:00:01
 * @LastEditTime: 2020-03-20 15:37:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wjwgsh5\static\js\controller\p_riskInfo.js
 */
var userJson;
$(function(){
  var dataName = decodeURI(getUrlParams("pid"));
      if (dataName != "") {
        userJson = JSON.parse(dataName);
      }
    // 点击风险筛查列表加载数据
    ajaxCommon("examine/examineDetial",{"ckId":userJson.ckId,"pid":userJson.pid},initRiskResult1,"","","");
    if(sessionStorage.getItem("gender")==1){
      $("#p_ostaBox").hide();
    }else{
      $("#p_ostaBox").show();
      $(".p_riskTest_examine3Add").hide();
      $(".p_riskTest_examine3Update").hide();
    }
})
// 右侧风险筛查详情信息展示 修改
function initRiskResult1(el,data,type){
    
  $("#p_doctor_box,#p_risk_result").show();
  $(".p_riskTest_add,p_riskTest_update,#riskSubmit").hide();
  $("#p_menopauseStatus").attr("disabled","disabled");
  var str="";
  if(data){  // 风险筛查记录存在 可以
  var result=data;
  boonJson=data;
  //btnConfirm(diagnoseComplete,isReferral,flagCode);
  var examine2Check=["Ulna UD","手","足"];
  var examine2Region=["双侧","左侧","右侧"];
  var examine3Arr=['低危','中危','高危'];
  $(".p_tdVal").text("");
  $.each(result,function(name,value){
    $("#p_"+name).text(value);
  });
  dataHid=data.hid;
  if(result.examine1==-1){
    $("#p_examine1Val").html("");
    $("#p_riskTest_result p").html(str);
    //initCheckbox("00000000000000000000");
    initCheckbox(result.yesList);
    $("#p_charCode").val("");
    $("#p_riskTest_Tip0").hide();
    $("#p_riskTest_Tip1").hide();
    // 根据结果以及是否为最后一条展示测试按钮
    //confirmRiskBtn(".p_riskTest_examine1",type,result.examine1);
  }else if(result.examine1==1){ //  一分钟风险筛查测试全选的为否
    //confirmRiskBtn(".p_riskTest_examine1",type);
    $("#p_riskTest_result p").html("<font color='red'>您好！测试结果显示，您所有问题均选择“否”，表明您没有上述的风险因子，建议您与医生讨论一下您的骨骼健康，并在未来监测您的风险状况。如果您想要得到更多骨质疏松症的相关信息，以了解如何改善您的骨骼健康，可向医生进一步咨询。</font>");
    $("#p_riskTest_Tip0").hide();
    $("#p_riskTest_Tip1").hide();
    initCheckbox(result.yesList);
    $("#p_charCode").val(result.examine1_value,result.examine1);
    $("#p_examine1Val").html("（<font color='red'>"+result.examine1Val+"</font>）");
  }else if(result.examine1==2){ //  一分钟风险筛查测试全
    $("#p_riskTest_result p").html("");
    $("#p_riskTest_Tip0").show();
    $("#p_riskTest_Tip1").show();
    //initCheckbox(result.examine1_value);
    initCheckbox(result.yesList);
    $("#p_charCode").val(result.examine1_value);
    $("#p_examine1Val").html("（<font color='red'>"+result.examine1Val+"</font>）");
    //confirmRiskBtn(".p_riskTest_examine1",type,result.examine1);

  }


  if(result.examine2==-1){
    $("#p_boneTest_result p").html(str);
    $("#p_examine2Val").html("");
    $("#p_boneTest_result table").hide();
    //confirmRiskBtn(".p_riskTest_examine2",type,result.examine2);
  }else{
    //confirmRiskBtn(".p_riskTest_examine2",type,result.examine2);
    $("#p_boneTest_result table").show();
    $("#p_examine2Val").html("（<font color='red'>"+result.examine2Val+"</font>）");
    $("#p_examine2_check").text(examine2Check[(result.examine2_check)-1]);
    $("#p_examine2_region").text(examine2Region[(result.examine2_region)-1]);
    $("#p_boneTest_result p").html("");
    if(result.examine2_region==1){
      $(".left").show();
      $(".right").show();
    }
    if(result.examine2_region==2){
      $(".left").show();
      $(".right").hide();
    }
    if(result.examine2_region==3){
      $(".left").hide();
      $(".right").show();
    }
  }
  
  if(result.examine3==-1){
    $("#p_selfTest_result p").html("");
    $("#p_selfTest_result p").html(str);
    $("#p_selfTest_result table").hide();
    $("#p_examine3_result").text("");
    //confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
  }else if(result.examine3==0){
    $("#p_selfTest_result p").html("");
    $("#p_selfTest_result table").hide();
    $("#p_menopauseStatus").find('option[value="2"]').attr("selected",true);
    //confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
  }else{
    //confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
    $("#p_menopauseStatus").find('option[value="1"]').attr("selected",true);
    $("#p_selfTest_result p").html("");
    $("#p_selfTest_result table").show();
    $("#p_age").text(sessionStorage.getItem('age'));
    $("#p_examine3").text(examine3Arr[(result.examine3)-1]);
    $("#p_examine3_result").text(examine3Arr[(result.examine3)-1]);
  }
  $("#p_hrealname").text(result.realname);
  if(result.createTime){
    $("#p_createTime").text(dateFormat(result.createTime))
  }else{
    $("#p_createTime").text("暂无")

  }
}else{
 
  
} 
}
function  initCheckbox(data){ //charCode
  var checkArr=getAllCheckBox();
  // for(var i=0;i<checkArr.length;i++){
  //  codeIndex=charCode.charAt(checkArr[i]-1);
  //  if(codeIndex=="1"){
  //    $("#p_rick_"+checkArr[i]).prop("checked","checked");
  //    $("#p_rick_"+checkArr[i]).prop("disabled","disabled");
  //    $("#p_rick_"+checkArr[i]).parent().parent().show();
     
  //  }else{
  //    $("#p_rick_"+checkArr[i]).removeAttr("checked");
  //    $("#p_rick_"+checkArr[i]).removeAttr("disabled");
  //    $("#p_rick_"+checkArr[i]).parent().parent().hide();
    
  //  }
  // }
  if(data.length>0){
    $("#p_riskTest_result_list").html("");
    for(var i=0;i<data.length;i++){
      $("#p_riskTest_result_list").append("<li>"+(i+1)+"、"+data[i]+"</li>");
     }
  }else{
    $("#p_riskTest_result_list").html("");
  }
  
  // $("#p_riskTest_result input[type='checkbox']:checked").each(function(index){
  //   $(this).parent().find('span.sort').text((index+1)+"、");
  //  });
 } 
  // 获取所有的checkBox
  function getAllCheckBox(){
    var arr=[];
   $("#p_riskTest_result input[type='checkbox']").each(function(){
    arr.push($(this).val());
   });
   return arr
  }
  function backLeft(){
    var json = JSON.stringify({
      "pid": userJson.pid
    })
    var src = "./p_riskList.html?token=" + sessionStorage.getItem("token")+"&pid="+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;
    window.open(src, "_self");
  
  }