$(window).resize(function() {
    $(".p_child_iframe").height($(window).height() * 2);
  });
  var userJson,sampleId;
  var startTime,endTime,defTime;
  $(function() {
    $(".p_child_iframe").height($(window).height() * 2);
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
      userJson = JSON.parse(dataName);
      referralConfirm(userJson.dataHid,userJson.userHid,userFlag);
      $("#p_title").text(userJson.title) ;
      ajaxCommon("patient/detial",{"pid":userJson.pid},initPatientForm);
      ajaxCommon1("diagnoseSample/selectByDsId",{"pid":userJson.pid,"dgId":userJson.dgId},initSampleInfo,"","");

      }
  });
// 公共ajax
function ajaxCommon(url,data,callback,el,id){
  $("#addPatientFrom").publicAjax({
    url: globalUrl + url,
    type: "post",
    data: data,
    dataType: "json",
    successFn: function(data) {
      if (data.code == "0") {
        if(id){
          top.layer.close(id);
        }
        callback(el,data.data);
      } else {
        top.layer.alert(data.msg);
      }
    }
  });
}
function ajaxCommon1(url,data,callback,el,id){
  $("#addPatientFrom").publicAjax({
    url: globalUrl + url,
    type: "post",
    data: data,
    dataType: "json",
    successFn: function(data) {
        callback(el,data);
    }
  });
}
// 获取radio选中的值
function tabsParentSrc(type){
  var fram = parent.document.getElementById("p_sample_iframe");
  var type= (type == "1") ? "add" :"update";
  var json=JSON.stringify({"pid":userJson.pid,"dgId":userJson.dgId,"dgtype":userJson.dgtype,"apid":userJson.apid,"title":userJson.title,"type":type,"dgDate":$("#s_dgDate").val(),"startTime":startTime,"endTime":endTime,'defTime':defTime,'id':sampleId});
  //fram.src="./sampleForm.html?pid="+json;//Iframe--SRC
  var src="./sampleForm.html?pid="+json;
  window.open(src,'_self');
}
// 初始化患者表单信息
function initPatientForm(el,data){
  var lost=sessionStorage.getItem('lost');
  var flag=sessionStorage.getItem('flag');
  for (var key in data) {
    $("#p_" + key).text("");
    $("#p_" + key).text(data[key]);
      }
  $("#p_pid").val(data.pid);
  $("#p_gender").val(data.gender);
  $("#p_residence").text(data.residence.replace(/\//g," "));
  if(data.btnState==0){
    $("#p_update").html("");
   }else if(data.btnState==1 && lost=="-1" && flag=="4"){
    $("#p_update").html("");
    $("#p_update").append('<button type="button" class="btn btn-primary flag_btn" onclick="updatepatientInfo()">修改</button>');
   }
  if(data.gender==1){
    $("#p_ostaBox").hide();
  }else{
    $("#p_ostaBox").show();
    $(".p_riskTest_examine3Add").hide();
    $(".p_riskTest_examine3Update").hide();
  }

  $("#p_birthday").val(data.ageA);
  if(data.lastTreatment){
    $("#p_lastTreatment").text(dateFormat(data.lastTreatment));
  }else{
    $("#p_lastTreatment").text("无");
  }
  if(data.create_date){
    $("#p_create_date").text(dateFormat(data.create_date));
  }else{
    $("#p_create_date").text("无");
  }
  $("#p_signDatas").text(dateFormat(data.signData)?dateFormat(data.signData):"无");
  defTime = dateFormat(data.create_date)
  if(data.special==1){
  $("#p_special").text("是");
  }else{
  $("#p_special").text("否");
  }
  apid=data.apid;
  age=data.age;
  /*
   1  是 首诊
   >1 是 随诊
   0  是 无诊断
  */
 if(data.countTreatment==1){
  $("#p_countTreatment").text("首诊");
 }else if(data.countTreatment>1){
  $("#p_countTreatment").text("随诊");
 }else if(data.countTreatment==0){
  $("#p_countTreatment").text("无诊断记录");
 }
  sessionStorage.setItem("gender",data.gender);
  sessionStorage.setItem("age",data.age);
}
// 初始化 样本记录
/*function initSampleInfo(el,data){
  //$("#s_dgDate").val(data.data.dgDate);
  if(data.code==0){
  var result=data.data;
  startTime=result.startTime;
  endTime=result.endTime;
  defTime=result.defTime;
  if(result.diagnoseSample){

    $.each(result.diagnoseSample,function(name,value){
    if(name=="isCheck"){
      if(value=="1"){
        $("#p_"+name).text("是");
        $("#addSample").hide();
        $("#updateSample").show();
        $("#p_sampleInfo table").show();
        $("#p_sampleIn_none").text("");

      }else{
        $("#p_"+name).text("否");
        $("#addSample").hide();
        $("#p_sampleInfo table").hide();
        $("#updateSample").show();
        $("#p_sampleIn_none").text("暂无样本保存");
      }
    }else{
      if(value==""){
        $("#p_"+name).text("无");
      }else{
        $("#p_"+name).text(value);

      }
    }
  });
  sampleId=result.diagnoseSample.id;
  $("#p_collectDate").text(result.diagnoseSample.collectDate ? dateFormat(result.diagnoseSample.collectDate) : "");
  $("#p_containDate").text(result.diagnoseSample.containDate ? dateFormat(result.diagnoseSample.containDate) : "");
  }else{
    $("#p_sampleInfo").hide();
    $("#addSample").show();
    $("#updateSample").hide();
  }
}else{
  $("#addSample,#updateSample").hide();
  top.layer.alert(data.msg,function(){
    backLeft();
  });
}
}*/
function initSampleInfo(el,data){
  //$("#s_dgDate").val(data.data.dgDate);
  if(data.code==0){
    for (let i=0;i<data.data.diagnoseSample.length;i++){
      let str = '';
      str = '<tbody class="sampleInfo"  >'+
          '<tr><td colspan="2" style="text-align: center;font-size: 20px">第' + (i+1) + '个样本信息</td></tr>'+
          '<tr>'+
          '<td>样本类型</td>'+
          '<td id="p_blood' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>样本容量</td>'+
          '<td id="p_amount' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>冰箱号 </td>'+
          '<td id="p_container' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>冰箱层号</td>'+
          '<td id="p_containerLayer' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>冰箱架子号</td>'+
          '<td id="p_containerFrame' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>存放盒号</td>'+
          '<td id="p_containerBox' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>盒内样本流水号</td>'+
          '<td id="p_collectNum' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>样本编号</td>'+
          '<td id="p_boxId' + i + '"></td>'+
          '</tr>'+

          '<tr>'+
          '<td>采样日期</td>'+
          '<td id="p_collectDate' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>采样人签名</td>'+
          '<td id="p_collector' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>入库日期</td>'+
          '<td id="p_containDate' + i + '"></td>'+
          '</tr>'+
          '<tr>'+
          '<td>样本管理员签名</td>'+
          '<td id="p_manager' + i + '"></td>'+
          '</tr>'+
          '</tbody>'

      // var info = $(".panel-body").html();
      $("#sampleInfo").append(str);
      let result=data.data.diagnoseSample[i];
      startTime=data.data.startTime;
      endTime=data.data.endTime;
      defTime=data.data.defTime;
      if(result){
        $.each(result,function(name,value){
          if(name=="isCheck"){
            if(value=="1"){
              $("#p_"+name+i).text("是");
              //  $("input[ids='p_"+name+"']").text("是");
              $("#addSample").hide();
              $("#updateSample").show();
              $("#sampleInfo").show();//-----------
              $("#p_sampleIn_none + i").text("");//-----------
            }else{
              $("#p_"+name).text("否");
              $("#addSample").hide();
              $("#sampleInfo").hide();
              $("#updateSample").show();//-----------
              $("#p_sampleIn_none").text("暂无样本保存");//-----------
            }
          }else{
            if(value==""){
              $("#p_"+name + i).text("无");
              // $("td[ids='p_"+name+"']").text("无");
            }else{
              $("#p_"+name + i).text(value);
              //  $("td[ids='p_"+name+"']").text(value);
            }
          }
        });
        sampleId=result.id;
        $("#p_collectDate" + i).text(dateFormat(parseInt(result.collectDate)));
        $("#p_containDate" + i).text(dateFormat(parseInt(result.containDate)));
      }
    }
    if(data.data.diagnoseSample == ''){
      $("#sampleInfo").hide();
      $("#addSample").show();
      $("#updateSample").hide();
    }

  }else{
    $("#addSample,#updateSample").hide();
    top.layer.alert(data.msg,function(){
      backLeft();
    });
  }
}
function backLeft(){
  window.location.href=src+'/sampleDiagnosis.html?token='+sessionStorage.getItem('token')+'&pid='+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;

}
