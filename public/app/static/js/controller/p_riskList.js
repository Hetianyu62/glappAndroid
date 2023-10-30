var userJson,pid;
$(function(){
  var token = decodeURI(getUrlParams('token'));
    sessionStorage.setItem("token", token);
    var p_realname = decodeURI(getUrlParams('realname'));
  sessionStorage.setItem("p_realname", p_realname);
   pid = decodeURI(getUrlParams('pid')).replace(/\"/g, '');
  var dataName = decodeURI(getUrlParams("pid"));
      if (dataName != "") {
        userJson = JSON.parse(dataName);
      }
  ajaxCommon("examine/examineItem",{"pid":pid},initRiskScreening,"");
  ajaxCommon("patient/patientInfor",{"pid":pid},initData,"");

})
// 初始化患者信息
function initData(el,data){
  sessionStorage.setItem('gender',data.gender);
  sessionStorage.setItem('age',data.age);
}
// 风险筛查列表
function initRiskScreening(el,data){
  if(data){
  flagCode=sessionStorage.getItem("flag");
  var data=data.examineItems;
  //btnConfirm(diagnoseComplete,isReferral,flagCode);
  $("#p_examineTimes").html("");
  var liStr=''; 
  for(var i=0; i<data.length;i++){
    if(i==(data.length-1)){
      liStr+="<li class='list-group-item' data-type='update' data-hid='"+data[i].hid+"'><label><input type='radio' name='examineTimes'   value='"+data[i].ckId+"'/>"+data[i].pm+"</label><span class='glyphicon glyphicon-menu-right'></span></li>"
    }else{
      liStr+="<li class='list-group-item' data-type='info'   data-hid='"+data[i].hid+"'><label><input type='radio' name='examineTimes'   value='"+data[i].ckId+"'/>"+data[i].pm+"</label><span class='glyphicon glyphicon-menu-right'></span></li>"

    }
   }
   $("#p_examineTimes").append(liStr);
  // $('#p_examineTimes li').find('input:radio:last').attr('checked', 'true');
   ;
    //initExamineTimes("",$('#p_examineTimes li:last').attr("data-type"));
   $('#p_examineTimes li').click(function(){
       //$(this).parent().parent().addClass("active");
       var id=$(this).find('input[type=radio]:checked').val();
       var type=$(this).attr("data-type");
       initExamineTimes(id,type);
     });
     $('#p_examineTimes li').find('input[type=radio]').click(function(e){
      e.stopPropagation()
    })
    }
}
// 点击列表页查看数据
function  initExamineTimes(id,type){
  //window.location.reload();
  var ckId,type;
  var val=getRadioKey();
  var type;
  if(id){
    ckId=id;
    type=$('#p_examineTimes li').find("input[type='radio']:checked").parent().parent().attr("data-type");

  }else{
    type=$('#p_examineTimes li').find("input[type='radio']:checked").parent().parent().attr("data-type");
    ckId=val;
  }

  // 判断列表值是否存在
  if(ckId){
    var data={"ckId":ckId,"pid":pid};
    // 点击风险筛查列表加载数据
    //ajaxCommon("examine/examineDetial",data,initRiskResult1,"","",type);
    var json=JSON.stringify(data);
    var src='./p_riskInfo.html?pid='+json;
    window.open(src,"_self");
  }
}
// 新增风险筛查记录
 function addRiskScreen1(){
  ajaxCommon("examine/buildExamine",{"pid":pid},initaddForm,"");
  //initaddForm();
}
// 新增初始化
function initaddForm(){
  sessionStorage.removeItem("r1");
  sessionStorage.removeItem("r2");
  sessionStorage.removeItem("r3");
  var json=JSON.stringify({"pid":pid})
  var src="./p_riskForm.html?pid="+ json;
  window.open(src,"_self");
}
// 删除风险筛查记录
function delRiskScreen1(){
var ckId=getRadioKey();
  //layer.confirm('确定要删除风险筛查记录吗？', {icon: 3, title:'提示'}, function(index){
    if(ckId){
      layer.confirm('确定要删除风险筛查记录吗？', {icon: 3, title:'提示'}, function(index){
      var data={"ckId":ckId,"pid":pid};
      ajaxCommon("examine/deleteExamine",data,initHTml,"");
        layer.close(index);
      });
    }else{
      top.layer.msg("请选中一条风险筛查记录",function(){
        top.layer.close(index);
      });
    }
 
  
}
function initHTml(){
  window.location.reload();
}
// 返回上一页
function backLeft(){
  // var json = JSON.stringify({
  //   "pid": userJson.pid
  // })
  // var src = "./p_riskList.html?token=" + sessionStorage.getItem("token")+"&pid="+userJson.pid;
  // window.open(src, "_self");
  window.location.href=window.location.href.split("/app/")[0]+'/index.html#home?pid='+pid+'&realname='+sessionStorage.getItem("p_realname");

}
 // 获取radio选中的值
 function  getRadioKey(){
  var val=$('#p_examineTimes li').find("input[type='radio']:checked").val();
  return val;
}