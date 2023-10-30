var userJson,age,gender;
$(function(){
  var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
      userJson = JSON.parse(dataName);
    }
    age=sessionStorage.getItem("age");
    gender=sessionStorage.getItem("gender");
    if(sessionStorage.getItem("r1")){
      oneCallback("",JSON.parse(sessionStorage.getItem("r1")));
    }
    if(sessionStorage.getItem("r2")){
      QusCallback("",JSON.parse(sessionStorage.getItem("r2")));
    }
    if(gender==1){
      $("#p_ostaBox").hide();
    }else{
      $("#p_ostaBox").show();
      if(sessionStorage.getItem("r3")){
        ostaCallbak("",JSON.parse(sessionStorage.getItem("r3")));
      }
    }
})

// 风险筛查总体提交
function submitUpdate(){
  var gender=sessionStorage.getItem("gender");
  var json,data;
  var oneJson,qusJson,ostaJson;
  var comJson={"pid":userJson.pid};
  if(gender==1){ // 男提交判断两项至少填写一项;
   //json=$.extend(oneData,qusData);
  //  if($("#p_oneResult").val()=="" && $("#p_qusResult").val()==""){
  //   top.layer.msg("未做风险筛查,请至少填写一项");
  //   return false;
  //  }else{
     // 提交数据
     oneJson=$("#oneForm").serializeObject();
     qusJson=$("#qusForm").serializeObject();
     json=$.extend(oneJson,qusJson);
     data=$.extend(comJson,json);
     ajaxCommon("examine/optExamineSubmit",data,initHTml,"","");

   //}

  }else{ // 女检验三项中至少填写一项
  //  if($("#p_menopauseStatus").val()==""){
  //    top.layer.msg("请选择是否绝经");
  //    $("#p_menopauseStatus").focus();
  //    return false;
  //  }else{
     // 提交数据
     oneJson=$("#oneForm").serializeObject();
     qusJson=$("#qusForm").serializeObject();
     ostaJson=$("#ostaForm").serializeObject();
     var json1=$.extend(oneJson,qusJson);
     json=$.extend(json1,ostaJson);
     data=$.extend(comJson,json);
     ajaxCommon("examine/optExamineSubmit",data,initHTml,"","");

   //}
  }
}
function initHTml(){
  var json = JSON.stringify({
    "pid": userJson.pid
  })
  var src = "./p_riskList.html?token=" + sessionStorage.getItem("token")+"&pid="+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;
  window.open(src, "_self");
}
// 返回上一页
function backLeft(){
  var json = JSON.stringify({
    "pid": userJson.pid
  })
  var src = "./p_riskList.html?token=" + sessionStorage.getItem("token")+"&pid="+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;
  window.open(src, "_self");
}
 // 新增风险测试  一分钟分析测试  等等
 function addRiskTest(th,type){
  var title,url,data,area,callback;
  var length=$("#p_examineTimes li").length;
  //if(length>0){
    switch (type) {
      case '1':
        title="一分钟风险测试";
        data=JSON.stringify({"pid":userJson.pid,"gender":$("#p_gender").val(),"charCode":$("#p_charCode").val()}).replace(/\"/g, "'");
        url=src+'/template/p_riskTest.html?pid='+data;
        area=["320px","540px"];
        callback=getAddOneTisk;
        break;
      case '2':
      title="超声骨测量（QUS）";
      var json={"pid":userJson.pid};
      var val=$.extend(json);
      data=JSON.stringify(json).replace(/\"/g, "'");
      url=src+'/template/p_boneTest.html?pid='+data;
      area='["800px","360px"]';
      callback=getAddQusTisk;
        break;
      case '3':
      //if($("#p_menopauseStatus").val()==1){
        title="亚洲人骨质疏松自我筛查(体重/kg)";
        data=JSON.stringify({"pid":userJson.pid,"examine3Age":age,"examine3Weight":$("#p_examine3_weight").text()}).replace(/\"/g, "'");
        url=src+'/template/p_selfTest.html?pid='+data;
        area=["350px","200px"];
        callback=getAddOstaTisk;
      //}else{
       // layer.msg("请先选择是否绝经");
      //  return false;
     // }

        break;
    }
    //openLayer("addIndex", 2, title, url, area, callback,["确定","取消"]);
     window.open(url,"_self");
    //openLayerIframe("addIndex", 1, title, url, area, callback,["确定","取消"]);

  // }
  // else{
  // layer.msg("请先新增风险筛查记录然后再进行下一步的筛查");
  // }


}
// 新增一分钟检测回调
function getAddOneTisk(id, index, layero) {
  //得到iframe页的窗口对象
  var iframeWin = top.window[layero.find("iframe")[0]["name"]];
  var json;
  //执行iframe页的showMsg方法
  var data = iframeWin.getFormData();
  if (data) {
    if(data.examine3Age && data.examine3Weight){
      var ostaJson=osta(data.examine3Weight,data.examine3Age);
      $("#p_form_examine3Age").val(data.examine3Age);
      $("#p_form_examine3Weight").val(data.examine3Weight);
      $("#p_form_examine3").val(ostaJson.examine3);
      json = { pid: userJson.pid,ckId:"","examine3":ostaJson.examine3 };
      $.extend(data, json);
      ajaxCommon("examine/optExamineThree",data,ostaCallbak,"",id);
    }else{
      json = { pid: userJson.pid,ckId:"" };
      $.extend(data, json);
      ajaxCommon("examine/optExamineOne",data,oneCallback,"",id)
    }
  } else {
    layer.msg("请认真填写消息");
  }
}
// 新增一分钟检测回调
  function getAddOneTisk(id, index, layero) {
    //得到iframe页的窗口对象
    var iframeWin = top.window[layero.find("iframe")[0]["name"]];
    var json;
    //执行iframe页的showMsg方法
    var data = iframeWin.getFormData();
    if (data) {
      if(data.examine3Age && data.examine3Weight){
        var ostaJson=osta(data.examine3Weight,data.examine3Age);
        $("#p_form_examine3Age").val(data.examine3Age);
        $("#p_form_examine3Weight").val(data.examine3Weight);
        $("#p_form_examine3").val(ostaJson.examine3);
        json = { pid: userJson.pid,ckId:"","examine3":ostaJson.examine3 };
        $.extend(data, json);
        ajaxCommon("examine/optExamineThree",data,ostaCallbak,"",id);
      }else{
        json = { pid: userJson.pid,ckId:"" };
        $.extend(data, json);
        ajaxCommon("examine/optExamineOne",data,oneCallback,"",id)
      }
    } else {
      layer.msg("请认真填写消息");
    }
}
// 新增超声骨测量（QUS） 回调事件
function getAddQusTisk(id, index, layero){
  //得到iframe页的窗口对象
  var iframeWin = top.window[layero.find("iframe")[0]["name"]];
  var json;
  //执行iframe页的showMsg方法
  var data = iframeWin.getFormData();
  if (data) {
      json = { pid: userJson.pid,ckId:"" };
      $.extend(data, json);
      qusData=$.extend(data, json);
      ajaxCommon("examine/optExamineTwo",data,QusCallback,"",id)
    //initTable();
  } else {
    layer.msg("请认真填写消息");
  }
}
// 新增osta检测回调
function getAddOstaTisk(id, index, layero) {
  //得到iframe页的窗口对象
  var iframeWin = top.window[layero.find("iframe")[0]["name"]];
  var json;
  //执行iframe页的showMsg方法
  var data = iframeWin.getFormData();
  if (data) {
   // if(data.examine3Age && data.examine3Weight){
      if(data.menopauseStatus==1){
      var ostaJson=osta(data.examine3Weight,data.examine3Age);
      $("#p_form_examine3_age").val(data.examine3Age);
      $("#p_form_examine3_weight").val(data.examine3Weight);
      $("#p_form_examine3").val(ostaJson.examine3);
      json = { pid: userJson.pid,ckId:"","examine3":ostaJson.examine3 };
      $.extend(data, json);
      ajaxCommon("examine/optExamineThree",data,ostaCallbak,"",id);
    }else{
      // json={ pid: userJson.pid,ckId:"","examine3":"-2"}
      // $.extend(data, json);
      // ajaxCommon("examine/optExamineThree",json,ostaCallbak,"",id);
      $("#p_examine3_result").text("");
      $("#p_form_examine3_age").val("");
      $("#p_form_examine3_weight").val("");
      $("#p_form_examine3").val("");
      $("#p_selfTest_result table").hide();
      $("#p_selfTest_result p").html("患者未绝经。无需测试。");
      top.layer.close(id);
    }
  } else {
    layer.msg("请认真填写消息");
  }
}
 // 一分钟数据回显回调
 function oneCallback(el,data){
  if(data){
  //<p class='text-center' style='color:red;'>无测试结果！请认真填写筛查信息！！！
  var str="";
  oneData=data.exa1;
  if(data){  // 风险筛查记录存在 可以
  var result=data;
  boonJson=data;
  //btnConfirm(diagnoseComplete,isReferral,flagCode);
  $(".p_tdVal").text("");
  $.each(result,function(name,value){
    $("#p_"+name).text(value);
    $("#p_form_"+name).val(value);
  });
  dataHid=data.hid;
  if(result.examine1==-1){
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
    $("#p_examine1Val").html("（<font color='red'>低危</font>）");
  }else if(result.examine1==2){ //  一分钟风险筛查测试全
    $("#p_riskTest_result p").html("");
    $("#p_riskTest_Tip0").show();
    $("#p_riskTest_Tip1").show();
    //initCheckbox(result.examine1_value);
    initCheckbox(result.yesList);
    $("#p_charCode").val(result.examine1_value);
    $("#p_examine1Val").html("（<font color='red'>高危</font>）");
    //confirmRiskBtn(".p_riskTest_examine1",type,result.examine1);

  }
  }
}
}
// QUS数据回调显示
function QusCallback(el,data){
  if(data){
  var result=data;
  qusData=data;
  var examine2Check=["Ulna UD","手","足"];
  var examine2Region=["双侧","左侧","右侧"];
  $.each(data,function(name,value){
    $("#p_"+name).text(value);
    $("#p_form_"+name).val(value);
  })
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
}
}
// OSTA 数据回调显示
function ostaCallbak(el,data){
  if(data){
  var result=data;
  console.log(result);

  ostaData=data;
  var examine3Arr=['低危','中危','高危'];
  $.each(result,function(name,value){
    $("#p_"+name).text(value);
    $("#p_form_"+name).val(value);
  });
  if(result.examine3==-1){
    $("#p_selfTest_result p").html(str);
    $("#p_selfTest_result table").hide();
    confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
  }else if(result.examine3==0){
    $("#p_selfTest_result p").html("患者未绝经。无需测试。");
    $("#p_selfTest_result table").hide();
    $("#p_menopauseStatus").find('option[value="2"]').attr("selected",true);
    //confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
  }else if(result.examine3==""){
    $("#p_selfTest_result p").html("患者未绝经。无需测试。");
    $("#p_selfTest_result table").hide();
    confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
  }
  else{
    //confirmRiskBtn(".p_riskTest_examine3",type,result.examine3);
    //$("#p_menopauseStatus").find('option[value="1"]').attr("selected",true);
    $("#p_selfTest_result p").html("");
    //$("#p_selfTest_result").html("");
    $("#p_selfTest_result table").show();
    $("#p_age").text(age);
    $("#p_examine3").text(examine3Arr[(result.examine3)-1]);
    $("#p_examine3_result").text(examine3Arr[(result.examine3)-1]);
  }}
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
// OSTA 计算
function osta(weight,age){
  $("#p_examine3_result").val();
  //获得输入的体重和年龄
  var weight = weight;
  var age = age;
  //判断是否有空值
  if (weight==""||age=="") {
      layer.alert("请输入完整的数据");
      return;
  }
  //验证两个框的值是否是数字
  var reg = /^\d+$/;
  var re1 = weight.match( reg );
  var re2 = age.match( reg );

  if( re1==null || re2==null){
      layer.alert("请输入整数");
      return;
  }
  if(weight<40||weight>94||age<40||age>99){
      layer.alert("数据超出范围：年龄(40~99) 体重(40~94)");
      return;
  }

  var result = (weight - age)*0.2;
  result = result.toFixed(2);

  var ost = 'OSTA评分为：'+result+'，患骨质疏松症的风险级别为：';
  var rel;
  var key;
  if(result>-1)
  {
      ost += '低';
      rel='低';
      key=1;
  }
  else if(result<-4)
  {
      ost += '高';
      rel='高';
      key=3;
  }

  else{
      ost += '中';
      rel='中';
      key=2;
  }
  return {"ost":ost,"examine3":key,"result":result};
}
