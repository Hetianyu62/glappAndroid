 $(window).resize(function() {
    $(".p_child_iframe").height($(window).height() * 2);
  });
  var userJson;
  $(function() {
    $(".p_child_iframe").height($(window).height() * 2);
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
      userJson = JSON.parse(dataName);
      ajaxCommon("diagnose/initDiag",{"pid":userJson.pid},initRiskScreening,"","")
    }
    toTop();

  });
// 新增记录列表
function addRecodeList(th,el){
   var json=JSON.stringify({"pid":userJson.pid,"dgId":userJson.dgId,"type":"add"});
   var src="./sampleForm.html?pid="+json;
   $(el).prop("src",src)
  //ajaxCommon("examine/buildExamine",{"pid":$("#p_pid").val()},initHTml,"")
}
  //  初始化记录列表
function initRiskScreening(el,data){
  if(data.diagRecord.length>0){
  $("#p_d_diagnosisList").html("");
  var liStr='';
  for(var i=0; i<data.diagRecord.length;i++){
    liStr+="<li class='list-group-item'><label data-type='"+data.diagRecord[i].dgType+"' data-apid='"+data.diagRecord[i].apid+"' data-hid='"+data.diagRecord[i].hid+"' data-chid='"+data.chid+"'><input type='radio' name='examineTimes' data-apid='"+data.diagRecord[i].apid+"' data-type='"+data.diagRecord[i].dgType+"' data-value='"+data.diagRecord[i].str+"' value='"+data.diagRecord[i].dgId+"'/>"+data.diagRecord[i].str+"</label></li>"
  }
  $("#p_d_diagnosisList").append(liStr);
  $('#p_d_diagnosisList li').find('input:radio:last').attr('checked', 'true');
  initExamineTimes("");
  $('#p_d_diagnosisList li').find('input[type=radio]').click(function(){
      var id=$(this).val();
      var type=$(this).parent().attr("data-type");
      var apid=$(this).parent().attr('data-apid');
      var userHid=$(this).parent().attr('data-chid');
      var dataHid=$(this).parent().attr('data-hid');
      var title=$(this).parent().text();
      //var pType=$("#myTab").find("li.active").find("a").attr("href").replace("#", "");
      //initExamineTimes(id,type,apid,title,"");
      initExamineTimes(id,type,apid,title,"",dataHid,userHid);

    });
}
}
// 初始化列表选中最后一条数据 加载相应的右侧内容
function initExamineTimes(id,type,apid,title,pType,dataHid,userHid){
  var dgId,title,dgType,apid,src,dataHid,userHid;
  var val=getRadioKey();
  if(id){
    dgId=id;
    dgType=type;
    apid=apid;
    title=title;
    dataHid=val.dataHid;
    userHid=val.userHid;
  }else{
    var val=getRadioKey();
    dgId=val.id;
    title=val.str;
    dgType=val.type;
    apid=val.apid;
    dataHid=val.dataHid;
    userHid=val.userHid;
  }
  //var data={"dgId":dgId,"pid":userJson.pid,"title":title,"type":"info"};
  var data={"dgId":dgId,"pid":userJson.pid,"apid":apid,"dgtype":dgType,"title":title,"type":"info","dataHid":dataHid,"userHid":userHid};
  var json=JSON.stringify(data);
  var src="./sampleInfo.html?pid="+json;
  $("#p_sample_iframe").prop("src",src);
}

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
          parent.layer.close(id);
        }
        callback(el,data.data);
      } else {
        layer.alert(data.msg);
      }
    }
  });
}
// 获取radio选中的值
function  getRadioKey(){
  var val=$('#p_d_diagnosisList li').find("input[type='radio']:checked").val();
  var str=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().text();
  return {"id":val,"str":str};
}
function  getRadioKey(){
  var val=$('#p_d_diagnosisList li').find("input[type='radio']:checked").val();
  var str=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().text();
  var type=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr("data-type");
  var apid=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr("data-apid");
  var userHid=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr('data-chid');
  var dataHid=$('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr('data-hid');
  return {"id":val,"str":str,"type":type,"apid":apid,"userHid":userHid,"dataHid":dataHid};
}
