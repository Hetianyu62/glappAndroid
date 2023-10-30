var userJson,mJson;
$(function(){
    var dataName = decodeURI(getUrlParams("pid"));
   // $("#s_manager").val(sessionStorage.getItem("realname"));
      if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title) ;
        $("#s_manager").val(sessionStorage.getItem("realname"));
        if(userJson.type=="update"){
          ajaxCommon("sample/sampleOption",{"pid":userJson.pid,"dgId":userJson.dgId},initIceSel,"","");
        }else if(userJson.type=="add"){
          ajaxCommon("sample/sampleOption",{"pid":userJson.pid,"dgId":userJson.dgId},initIceSel1,"","");

        }
      }
      $("#addPatientFrom").publicAjax({
        url: globalUrl+"doctor/personalData",
        type: "post",
        data: {"uid":sessionStorage.getItem("UID")},
        dataType: "json",
        successFn: function(data) {
          if (data.code == "0") {
            $("#s_manager").val(data.data.realname);
          } else {
            top.layer.alert(data.msg);

          }
        }
      });
      nullChange(".p_check_null");
      initDate($(".p_birthday"),parseInt(userJson.startTime),parseInt(userJson.endTime));

      initBlood();

});

function ajaxCommon(url,data,callback,el,id){
    $("#addPatientFrom").publicAjax({
        url: globalUrl+url,
        type: "post",
        data: data,
        dataType: "json",
        successFn: function(data) {
            if (data.code == "0") {
                callback(el,data.data);
            } else {
                layer.alert(data.msg);
            }
        }
    });
}

// 点击选中 无 其子集隐藏
function nullChange(el){
    $(el).change(function(){
        if($(this).val()=="" || $(this).val()==0){
            $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
            $(this).parent().parent().nextAll().find("select#s_container option:first").prop("selected","selected");
            $(this).parent().parent().nextAll().find("select#s_containerLayer option:first").prop("selected","selected");
            $(this).parent().parent().nextAll().find("select#s_containerFrame option:first").prop("selected","selected");
            $(this).parent().parent().nextAll().find("select#s_containerBox option:first").prop("selected","selected");
            $(this).parent().parent().nextAll().find("input[type='radio']").prop("checked",false);
            $(this).parent().parent().nextAll().find("input[type='text']").val("");
            $(this).parent().parent().nextAll().find("input[type='number']").val("");
            $(this).parent().parent().nextAll().hide();
            $(this).parent().parent().nextAll().find("input[type='text']").removeAttr("check");
            $(this).parent().parent().nextAll().find("select").removeAttr("check");
            $(this).parent().parent().nextAll().find(".p_requiredRadio").removeClass("check");
        }else {
            $(this).parent().parent().nextAll().show();
            $(this).parent().parent().nextAll().find("input[type='text']").attr("check", "required");
            $(this).parent().parent().nextAll().find("select").attr("check", "required");
            $(this).parent().parent().nextAll().find(".p_requiredRadio").addClass("check");
            $(".p_collectDate").val(dateFormat(userJson.defTime));
            $(".s_containDate").val('');
            initContainDate($(".s_containDate"), $(".p_collectDate").val(), "");
        }
    });
    //  初始化本次样本是否登记

    $.each($(el), function () {
        if ($(this).val() == "" || $(this).val() == 0) {
            $(this).parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().nextAll().find("select#s_container option:first").prop("selected", "selected");
            $(this).parent().parent().nextAll().find("select#s_containerLayer option:first").prop("selected", "selected");
            $(this).parent().parent().nextAll().find("select#s_containerFrame option:first").prop("selected", "selected");
            $(this).parent().parent().nextAll().find("select#s_containerBox option:first").prop("selected", "selected");
            $(this).parent().parent().nextAll().find("input[type='radio']").prop("checked", false);
            $(this).parent().parent().nextAll().find("input[type='text']").val("");
            $(this).parent().parent().nextAll().find("input[type='number']").val("");
            $(this).parent().parent().nextAll().hide();
            $(this).parent().parent().nextAll().find("input[type='text']").removeAttr("check");
            $(this).parent().parent().nextAll().find("select").removeAttr("check");
            $(this).parent().parent().nextAll().find(".p_requiredRadio").removeClass("check");
        } else {
            $(this).parent().parent().nextAll().show();
            $(this).parent().parent().nextAll().find("input[type='text']").attr("check", "required");
            $(this).parent().parent().nextAll().find("select").attr("check", "required");
            $(this).parent().parent().nextAll().find(".p_requiredRadio").addClass("check");
            $(".p_collectDate").val(dateFormat(userJson.defTime));
            $(".s_containDate").val('');
            initContainDate($(".s_containDate"), $(".p_collectDate").val(), "");
        }
    })

}
/*function nullChange(el){
  $(el).change(function(){
        if($(this).val()=="" || $(this).val()==0){
          $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
          $(this).parent().parent().nextAll().find("select#s_container option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerLayer option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerFrame option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerBox option:first").prop("selected","selected");
          $(this).parent().parent().next().find("input[type='radio']").prop("checked",false);
          $(this).parent().parent().next().find("input[type='text']").val("");
          $(this).parent().parent().next().find("input[type='number']").val("");
          $(this).parent().parent().next().hide();
          $(this).parent().parent().next().find("input[type='text']").removeAttr("check");
          $(this).parent().parent().next().find("select").removeAttr("check");
          $(this).parent().parent().next().find(".p_requiredRadio").removeClass("check");
        }else{
          $(this).parent().parent().next().show();
          $(this).parent().parent().next().find("input[type='text']").attr("check","required");
          $(this).parent().parent().next().find("select").attr("check","required");
          $(this).parent().parent().next().find(".p_requiredRadio").addClass("check");
          //$(".p_collectDate").val(dateFormat(parseInt(userJson.dgDate)));
          $("#p_collectDate").val(dateFormat(userJson.defTime));
          initContainDate($("#s_containDate"),$("#p_collectDate").val(),"");
        }
      });
  //  初始化本次样本是否登记
  $.each($(el),function(){
    if($(this).val()=="" || $(this).val()==0){
          $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
          $(this).parent().parent().nextAll().find("select#s_container option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerLayer option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerFrame option:first").prop("selected","selected");
          $(this).parent().parent().nextAll().find("select#s_containerBox option:first").prop("selected","selected");
          $(this).parent().parent().next().find("input[type='radio']").prop("checked",false);
          $(this).parent().parent().next().find("input[type='text']").val("");
          $(this).parent().parent().next().find("input[type='number']").val("");
          $(this).parent().parent().next().hide();
          $(this).parent().parent().next().find("input[type='text']").removeAttr("check");
          $(this).parent().parent().next().find("select").removeAttr("check");
          $(this).parent().parent().next().find(".p_requiredRadio").removeClass("check");
        }else{
          $(this).parent().parent().next().show();
          $(this).parent().parent().next().find("input[type='text']").attr("check","required");
          $(this).parent().parent().next().find("select").attr("check","required");
          $(this).parent().parent().next().find(".p_requiredRadio").addClass("check");
          //$(".p_collectDate").val(dateFormat(parseInt(userJson.dgDate)));
          initContainDate($("#s_containDate"),$("#p_collectDate").val(),"");

        }
  })

}*/

// 点击确定提交数据
/*function submitUpdate(type){
  var data,url,callback,json; //
  var form=new CybVerification.FirstVisitForm("p_sampleForm");
  var state=form.submit();
  if(state){
    var json={
    "dgId":userJson.dgId,
    "id":userJson.id,
    // "pageSample":JSON.stringify($("#p_sampleForm").serializeObject())
   }
   $.extend(json,$("#p_sampleForm").serializeObject());
    ajaxCommon("diagnoseSample/dsSaveOrUpdate",json,initHtml,'','');
  }else{
    //top.layer.msg("请认真填写样本信息全部为必填项")
  }
}*/

function validateRadio(el) {
    var checkRadios = $(el).find("[check='radio']");
    for (var j = 0; j < checkRadios.length ; j++) {
        var radios = $(checkRadios[j]).find("input[type='radio']");
        var rVal = "";
        {
            for( var key=0; key<radios.length;key++ ){
                if(radios[key].checked){
                    rVal = $(radios[key]).val();
                }
            }
        }
        if(rVal == ""){
            alert($(checkRadios[j]).attr("tip-msg"))
            return false;
        }
    }
    return  true;
}

var datas;
function submitUpdate(type){
    var trs = $(".sampleDataTable").find("tr");
    var array   = new Array();
    var obj = {};
    if($("#p_isCheck").val()==1){
        for(var i=1; i<trs.length; i++){
            obj = {id:0};
            datas = $(trs[i]).find("input ,select");
            if(!validateRadio(trs[i])){
                return
            }
            for ( var key=0; key<datas.length;key++){
                if( $(datas[key]).prop("tagName")== 'INPUT'){
                    if( $(datas[key]).attr("type") == "radio"){
                        console.log(datas[key].checked);
                        if(datas[key].checked){
                            obj[ $(datas[key]).attr("alias") ]=$(datas[key]).val();
                        }
                    }else{
                        if ($(datas[key]).attr("check")=="required" ){
                            if($(datas[key]).val() ==""){
                                if($(datas[key]).attr("alias") != "id"){
                                    top.layer.alert($(datas[key]).attr("tip-msg"));
                                    return;
                                }
                            }
                        }
                        obj[ $(datas[key]).attr("alias") ]=$(datas[key]).val();
                    }
                }else {
                    if($(datas[key]).val() =="") {
                        if ($(datas[key]).attr("check")=="required" ){
                            top.layer.alert($(datas[key]).attr("tip-msg"));
                            return;
                        }
                    }else {
                        obj[ $(datas[key]).attr("alias") ]=$(datas[key]).val();
                    }
                }
            }
            obj.isCheck =1
            obj.pid = userJson.pid
            obj.dgId = userJson.dgId
            array[i-1] = obj;
        }
    }else {
        $(".samplesList").css("display","none")
        obj.id = $("#d_id").val()
        obj.isCheck = 0
        obj.pid = userJson.pid
        obj.dgId = userJson.dgId
        array[0] = obj;
    }
    console.log(JSON.stringify(array))

    ajaxCommon("diagnoseSample/dsSaveOrUpdate", {str: JSON.stringify(array)},initHtml,'','');
    window.location.href=src+'/sampleDiagnosis.html?token='+sessionStorage.getItem('token')+'&pid='+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;

}
function initHtml(){
  //  parent.location.reload()
  window.location.href=src+'/sampleDiagnosis.html?token='+sessionStorage.getItem('token')+'&pid='+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;
}
function backLeft(){
  window.location.href=src+'/sampleDiagnosis.html?token='+sessionStorage.getItem('token')+'&pid='+userJson.pid+'&realname='+sessionStorage.getItem("p_realname");;

}
/*// 数据回显
function initForm(el,data){
  $.each(data.diagnoseSample,function(name1,value1){
      $("input[type='radio'][name='"+name1+"'][value='"+value1+"']").prop("checked", true);
      $("input[type='checkbox'][name='"+name1+"'][value='"+value1+"']").prop("checked", true);
      $("select[name='"+name1+"'] option[value='"+value1+"']").prop("selected", true);
      $("input[type='text'][name='"+name1+"']").val(value1);
      $("#s_"+name1).val(value1);
     });

  var str=data.diagnoseSample;
  var apiData=str;
  //$(".p_collectDate").val(dateFormat(parseInt(userJson.dgDate)));
  $(".p_collectDate").val(dateFormat(data.diagnoseSample.collectDate));
  $(".s_containDate").val(dateFormat(data.diagnoseSample.containDate));
  f1("","",$("#s_container"),apiData);
  nullChange(".p_check_null");
  initBlood()
}
// 获取去除空后的数据
function Trim(str){
     var result;
      result = str.replace(/(^\s+)|(\s+$)/g,"");
      result = result.replace(/\s/g,"");
     return result;
 }
function initDate(el,sDate,eDate) {
  el.datetimepicker({
     language: "zh-CN",
     use24hours: false,
     minView:"month",
     format:"yyyy-mm-dd",
     weekStart: 1,
     todayBtn: 1,
     autoclose: 1,
     todayHighlight: 1,
     startView: 2,
     forceParse: 0,
     showMeridian: 1,
     startDate:new Date(sDate),
     endDate:new Date(eDate)
   }).on('changeDate', function (ev) {
    if (ev.date) {
        $("#s_containDate").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
        $("#s_containDate").val("");
    } else {
        $("#s_containDate").datetimepicker('setStartDate', null);
    }
    });

 }
 function initContainDate(el,sDate,eDate) {
  el.datetimepicker({
     language: "zh-CN",
     use24hours: false,
     minView:"month",
     format:"yyyy-mm-dd",
     weekStart: 1,
     todayBtn: 1,
     autoclose: 1,
     todayHighlight: 1,
     startView: 2,
     forceParse: 0,
     showMeridian: 1,
     startDate:new Date(sDate),
     endDate:new Date()
   })
 }
// 修改时初始化冰箱一级数据回调
function initIceSel(el,data){
 // mList=data.list;
  mJSon=data.listAll;
  $("#s_container").html("");
  $("#s_container").append("<option value=''>请选择</option>")
  for(var i=0;i<mJSon.length;i++){
    $("#s_container").append("<option value='"+mJSon[i].containerName+"'>"+mJSon[i].containerName+"</option>");
  };
  ajaxCommon("diagnoseSample/selectByDsId",{"pid":userJson.pid,"dgId":userJson.dgId},initForm,"","");


}
// 新增时初始化冰箱一级数据回调
function initIceSel1(el,data){
 // mList=data.list;
  mJSon=data.listAll;
  $("#s_container").html("");
  $("#s_container").append("<option value=''>请选择</option>")
  for(var i=0;i<mJSon.length;i++){
    $("#s_container").append("<option value='"+mJSon[i].containerName+"'>"+mJSon[i].containerName+"</option>");
  };

  //$(".p_collectDate").val(dateFormat(parseInt(userJson.dgDate)));
  $("#s_manager").val(sessionStorage.getItem("realname"));

}
// 冰箱一级数据change事件
function f1(city,country,el,apiData) {
  var d1=$(el);
  var d2=$(el).parent().siblings().find("select#s_containerFrame");
  var d3=$(el).parent().siblings().find("select#s_containerLayer");
  var d4=$(el).parent().siblings().find("select#s_containerBox");
  var data=getSelctOne("",$(d1).val(),mJSon);
  var op;
  for (var key in data) {
    if (data.hasOwnProperty(key)) {
      $("#s_"+key).empty();
      $("#s_"+key).append("<option value=''>请选择</option>");
      if(key=="containerBox"){
        for (var i=0; i<data[key];i++) {
          if((i+1)<=9){
            op = $("<option value='0"+(i+1)+"'>0"+(i+1)+"</option>");
          }else{
            op = $("<option value='"+(i+1)+"'>"+(i+1)+"</option>");
          }
          $("#s_"+key).append(op);
       }
      }else{
        for (var i=0; i<data[key];i++) {
          op = $("<option value='"+(i+1)+"'>"+(i+1)+"</option>");
          $("#s_"+key).append(op);
       }
      }


    }
  }

  if(apiData){
    $.each(apiData,function(name1,value1){
      $("select[name='"+name1+"'] option[value='"+value1+"']").prop("selected", true);
     });
  }

  if(!$(el).val()==""){
    var boxVal=$(el).val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val()+$("#s_collectNum").val();
    $("#s_boxId").val(boxVal);
  }

}
// 得到冰箱二级 三级 四级数据
function getSelctOne(key,val,data){
  var jsonLength={};
  for(var i=0;i<data.length;i++){
  if(data[i].containerName == val){
    jsonLength={"containerLayer":data[i].containerP1,"containerFrame":data[i].containerP2,"containerBox":data[i].containerP3,};
  }
 }
 return jsonLength;
}
//冰箱层号：
function f2(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  var boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val()+$("#s_collectNum").val();
    $("#s_boxId").val(boxVal);
}
// 架子号
function f3(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  var boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val()+$("#s_collectNum").val();
    $("#s_boxId").val(boxVal);
}
// 放盒号
function f4(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  var boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val()+$("#s_collectNum").val();
    $("#s_boxId").val(boxVal);
}

// 流水号
function checkd9(id, th, m) {
  var val=$.trim($(th).val());
  var reg=/^\d{0,4}$/;
  var boxVal,str;

  if(reg.test(val)){
  if (val == '0' || val == '00') {
          top.layer.alert("盒内样本流水号为2位非零正整数");
          //$("#"+id).focus();
          $(th).val('');
          boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val();
          str=boxVal+val;
      return;
  }
  if (val == 0) {
          top.layer.alert("盒内样本流水号为2位非零正整数");
          //$("#"+id).focus();
          $(th).val('');
          boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val();
  str=boxVal+val;
      return;
  }
  if (val.length < 2)
      val = '0' + val;
      $("#s_collectNum").val(val);
  if (val.length > 2) {
          top.layer.alert("盒内样本流水号为2位非零正整数");
          //$("#"+id).focus();
          $(th).val('');
          boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val();
          str=boxVal+val;
      return;
  }else{
    boxVal=$("#s_container").val()+$("#s_containerLayer").val()+$("#s_containerFrame").val()+$("#s_containerBox").val();
    str=boxVal+val;
  }
  $("#s_boxId").val(str);
}else{
  top.layer.alert("盒内样本流水号为2位非零正整数");
  $(th).val('');
  //$("#"+id).focus();
}
}
// 样本类型
function initBlood(){
  $("input[name='blood']").change(function(){
    var val= $("input[name='blood']:checked").val();
    if(val=="其他"){
      $("#s_blood_z").show();
      $("#s_blood_z").attr("check","required");
    }else{
      $("#s_blood_z").hide();
      $("#s_blood_z").removeAttr("check");
    }
  });
  $.each($("input[name='blood']"),function(){
    var val= $("input[name='blood']:checked").val();
    if(val=="其他"){
      $("#s_blood_z").show();
      $("#s_blood_z").attr("check","required");
    }else{
      $("#s_blood_z").hide();
      $("#s_blood_z").removeAttr("check");
    }
  })
}*/
var copyTrObject = null;

// 数据回显
function initForm(el,data){

    initEmptyTr();// 初始化一个空的tr对象
    if(data.diagnoseSample){
        for (let i = 1; i < data.diagnoseSample.length; i++) {
            if(data.diagnoseSample[i].isCheck != 0){
                copyTrObject = copyTrObject.replaceAll("bloods","bloods"+i)
                copyTrObject = copyTrObject.replaceAll("amounts","amounts"+i)
                $("#addSampleFrom").append(copyTrObject);
                for (var j = 0; j < $(".samplesList").length-1; j++) {
                    $($("#addSampleFrom").find(".jianhao")[j]).hide();
                    $($("#addSampleFrom").find(".jianhao")[$(".samplesList").length-1]).show();
                }
                initDate($(".p_birthday"),parseInt(userJson.startTime),parseInt(userJson.endTime));
                initDate($(".s_containDate"),parseInt(userJson.startTime),parseInt(userJson.endTime));
            }
        }
        for (let i = 0; i < data.diagnoseSample.length; i++) {
            var tag = $($("#addSampleFrom tr")[i+1]).find("input ,select");
            for ( var key=0; key<tag.length;key++){
                if( $(tag[key]).attr("type") == "radio"){
                    if($(tag[key]).val() ==  data.diagnoseSample[i][$(tag[key]).attr("alias")] ){
                        tag[key].checked = true
                    }
                }else{
                    $(tag[key]).val(  data.diagnoseSample[i][$(tag[key]).attr("alias")] );
                }
            }
            var str=data.diagnoseSample[i];
            var apiData=str;
            $($("#addSampleFrom tr")[i+1]).find('input[ids="p_collectDate"]').val(dateFormat(parseInt(data.diagnoseSample[i].collectDate)))
            $($("#addSampleFrom tr")[i+1]).find('input[ids="s_containDate"]').val(dateFormat(parseInt(data.diagnoseSample[i].containDate)))
            var selectICE = $($("#addSampleFrom tr")[i+1]).find('select[ids="s_container"]');
            //var sss = $(this).parent().siblings().find("select[ids='s_container']");
            f1("","",selectICE,apiData);

            if (data.diagnoseSample[0].isCheck == 0){
                $(".samplesList").css("display","none")
            }
            //   nullChange(".p_check_null");
        }
    }
    initBlood();
}
function  initEmptyTr() {
    $(".samplesList").css("display","")
    copyTrObject = '<tr class="samplesList" >'+ $(".samplesList").html() +'</tr>';
    var trs = $(".sampleDataTable").find("tr");
    for (var i = trs.length ; i < 6; i++) {
        copyTrObject = copyTrObject.replaceAll("第1","第"+i)
    }
}


// 获取去除空后的数据
function Trim(str){
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g,"");
    result = result.replace(/\s/g,"");
    return result;
}
function initDate(el,sDate,eDate) {
    el.datetimepicker({
        language: "zh-CN",
        use24hours: false,
        minView:"month",
        format:"yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        startDate:new Date(sDate),
        endDate:new Date(eDate)
    }).on('changeDate', function (ev) {
        if (ev.date) {
            $(el).parent().siblings().find("input[ids='"+s_containDate+"']").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
            // $(".s_containDate").datetimepicker('setStartDate', new Date(ev.date.valueOf()));
            // $(".s_containDate").val("");
            $(el).parent().siblings().find("input[ids='"+s_containDate+"']").val("");
        } else {
            // $(".s_containDate").datetimepicker('setStartDate', null);
            $(el).parent().siblings().find("input[ids='"+s_containDate+"']").datetimepicker('setStartDate', null);
        }
    });

}
function initContainDate(el,sDate,eDate) {
    el.datetimepicker({
        language: "zh-CN",
        use24hours: false,
        minView:"month",
        format:"yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        startDate:new Date(sDate),
        endDate:new Date()
    })
}
// 修改时初始化冰箱一级数据回调
function initIceSel(el,data){
    // mList=data.list;
    mJSon=data.listAll;
    $("#s_container").html("");
    $("#s_container").append("<option value=''>请选择</option>")
    for(var i=0;i<mJSon.length;i++){
        $("#s_container").append("<option value='"+mJSon[i].containerName+"'>"+mJSon[i].containerName+"</option>");
    };
    ajaxCommon("diagnoseSample/selectByDsId",{"pid":userJson.pid,"dgId":userJson.dgId},initForm,"","");
}
// 新增时初始化冰箱一级数据回调
function initIceSel1(el,data){
    // mList=data.list;
    mJSon=data.listAll;
    $("#s_container").html("");
    $("#s_container").append("<option value=''>请选择</option>")
    for(var i=0;i<mJSon.length;i++){
        $("#s_container").append("<option value='"+mJSon[i].containerName+"'>"+mJSon[i].containerName+"</option>");
    };

    $(".p_collectDate").val(dateFormat(parseInt(userJson.dgDate)));

    $("#s_manager").val(sessionStorage.getItem("realname"));

}
// 冰箱一级数据change事件
function f1(city,country,el,apiData) {
    el = el==null?this:el;
    var d1=$(el); //""
    //var d2=$(el).parent().siblings().find("select#s_containerFrame");
    //var d3=$(el).parent().siblings().find("select#s_containerLayer");
    //var d4=$(el).parent().siblings().find("select#s_containerBox");
    var d2=$(el).parent().siblings().find("select[ids='s_containerFrame']");
    var d3=$(el).parent().siblings().find("select[ids='s_containerLayer']");
    var d4=$(el).parent().siblings().find("select[ids='s_containerBox']");
    var data=getSelctOne("",$(d1).val(),mJSon);
    var op;
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var item = "select[ids='s_"+key+"']";
            /* $("#s_"+key).empty();
             $("#s_"+key).append("<option value=''>请选择</option>");*/

            $(el).parent().siblings().find(item).empty();
            $(el).parent().siblings().find(item).append("<option value=''>请选择</option>");

            if(key=="containerBox"){
                for (var i=0; i<data[key];i++) {
                    if((i+1)<=9){
                        op = $("<option value='0"+(i+1)+"'>0"+(i+1)+"</option>");
                    }else{
                        op = $("<option value='"+(i+1)+"'>"+(i+1)+"</option>");
                    }
                    $(el).parent().siblings().find(item).append(op);
                    //$("#s_"+key).append(op);
                }
            }else{
                for (var i=0; i<data[key];i++) {
                    op = $("<option value='"+(i+1)+"'>"+(i+1)+"</option>");
                    //$("#s_"+key).append(op);
                    $(el).parent().siblings().find(item).append(op);
                }
            }
        }
    }

    if(apiData){
        $.each(apiData,function(name1,value1){
            $("select[name='"+name1+"'] option[value='"+value1+"']").prop("selected", true);
        });
    }

    if(!$(el).val()==""){

        var boxVal=findByIds('',el).val()+
        findByIds(this,'s_containerLayer').val() == undefined ?'':findByIds(this,'s_containerLayer').val()+
        findByIds(this,'s_containerFrame').val() == undefined ?'':findByIds(this,'s_containerFrame').val()+
        findByIds(this,'s_containerBox').val() == undefined ?'':findByIds(this,'s_containerBox').val()+
        findByIds(this,'s_collectNum').val() == undefined ?'':findByIds(this,'s_collectNum').val();
        findInputByIds(this,'s_boxId').val(boxVal);
    }

}
// 得到冰箱二级 三级 四级数据
function getSelctOne(key,val,data){
    var jsonLength={};
    for(var i=0;i<data.length;i++){
        if(data[i].containerName == val){
            jsonLength={"containerLayer":data[i].containerP1,"containerFrame":data[i].containerP2,"containerBox":data[i].containerP3,};
        }
    }
    return jsonLength;
}

//当前tr下ids
function findByIds(el,tagstr) {
    return $(el).parent().siblings().find("select[ids='"+tagstr+"']");
}

//当前tr下select
function findSelectByIds(el,tagstr) {
    return $(el).parent().siblings().find("select[ids='"+tagstr+"']").find("option:selected").val();
}
//当前tr下input
function findInputByIds(el,tagstr) {
    return $(el).parent().siblings().find("input[ids='"+tagstr+"']");
}

/*监听事件*/
function watchInput(el){
    $(el).on('input propertychange',function() {
        var result = $(this).val();
        console.log(result);
        $inputwrapper.find('.result').html(result);
    });
}

function  toBoxVal(th) {
    var boxVal=findByIds(th,'s_container').val()== undefined ?'':findByIds(th,'s_container').val()+
    findByIds(th,'s_containerLayer').val() == undefined ?'':findByIds(th,'s_containerLayer').val()+
    findByIds(th,'s_containerFrame').val()== undefined ?'':findByIds(th,'s_containerFrame').val()+
    findByIds(th,'s_containerBox').val()== undefined ?'':findByIds(th,'s_containerBox').val()+
    findInputByIds(th,'s_collectNum').val()== undefined ?'':findInputByIds(th,'s_collectNum').val();


    var a1  = findByIds(th,'s_container').val()== undefined ?'':findByIds(th,'s_container').val()
    var a2  = findByIds(th,'s_containerLayer').val()== undefined ?'':findByIds(th,'s_containerLayer').val()
    var a3  = findByIds(th,'s_containerFrame').val()== undefined ?'':findByIds(th,'s_containerFrame').val()
    var a4  = findByIds(th,'s_containerBox').val()== undefined ?'':findByIds(th,'s_containerBox').val()
    var a5  = findInputByIds(th,'s_collectNum').val()== undefined ?'':findInputByIds(th,'s_collectNum').val()
    var a6  = a1 + a2 + a3 + a4 + a5;

    findInputByIds(th,'s_boxId').val(a6);

}
//冰箱层号：select[ids='s_container']
function f2(th){
    toBoxVal(th);
}
// 架子号
function f3(th){
    toBoxVal(th);
}
// 放盒号
function f4(th){
    toBoxVal(th);

}
// 流水号  select[ids='s_container']
function checkd9(id, th, m) {
    var val=$.trim($(th).val());
    var reg=/^\d{0,4}$/;
    var boxVal,str;

    if(reg.test(val)){
        if (val == '0' || val == '00') {
            top.layer.alert("盒内样本流水号为2位非零正整数");
            boxVal=findByIds(th,'s_container').val()+
                findByIds(th,'s_containerLayer').val()+
                findByIds(th,'s_containerFrame').val()+
                findByIds(th,'s_containerBox').val();
            str=boxVal+val;
            return;
        }
        if (val == 0) {
            top.layer.alert("盒内样本流水号为2位非零正整数");
            boxVal=findByIds(th,'s_container').val()+
                findByIds(th,'s_containerLayer').val()+
                findByIds(th,'s_containerFrame').val()+
                findByIds(th,'s_containerBox').val();
            str=boxVal+val;
            return;
        }
        if (val.length < 2)
            val = '0' + val;
        findInputByIds(th,'s_collectNum').val(val);
        if (val.length > 2) {
            top.layer.alert("盒内样本流水号为2位非零正整数");
            boxVal=findByIds(th,'s_container').val()+
                findByIds(th,'s_containerLayer').val()+
                findByIds(th,'s_containerFrame').val()+
                findByIds(th,'s_containerBox').val();
            str=boxVal+val;
            return;
        }else{
            boxVal=findByIds(th,'s_container').val()+
                findByIds(th,'s_containerLayer').val()+
                findByIds(th,'s_containerFrame').val()+
                findByIds(th,'s_containerBox').val();
            str=boxVal+val;
        }
        if(boxVal.indexOf("undefined") != -1){
            findInputByIds(th,'s_boxId').val("");
        }else {
            findInputByIds(th,'s_boxId').val(str);
        }

    }else{
        top.layer.alert("盒内样本流水号为2位非零正整数");
        $(th).val('');
    }
}
// 样本类型
function initBlood(){

    $("input[name='bloods']").change(function(){
        var val= $("input[name='bloods']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
            //$(this).parent().last().removeAttr("check");
        }
    });
    $.each($("input[name='bloods']"),function(){
        var val= $("input[name='bloods']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
        }
    });
    $("input[name='bloods1']").change(function(){
        var val= $("input[name='bloods1']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
            //$(this).parent().last().removeAttr("check");
        }
    });
    $.each($("input[name='bloods1']"),function(){
        var val= $("input[name='bloods1']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
        }
    });
    $("input[name='bloods2']").change(function(){
        var val= $("input[name='bloods2']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
            //$(this).parent().last().removeAttr("check");
        }
    });
    $.each($("input[name='bloods2']"),function(){
        var val= $("input[name='bloods2']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
        }
    });
    $("input[name='bloods3']").change(function(){
        var val= $("input[name='bloods3']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
            //$(this).parent().last().removeAttr("check");
        }
    });
    $.each($("input[name='bloods3']"),function(){
        var val= $("input[name='bloods3']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
        }
    });
    $("input[name='bloods4']").change(function(){
        var val= $("input[name='bloods4']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
            //$(this).parent().last().removeAttr("check");
        }
    });
    $.each($("input[name='bloods4']"),function(){
        var val= $("input[name='bloods4']:checked").val();
        if(val=="其他"){
            $(this).parent().parent().find("input[type='text']").show();
            $(this).parent().parent().find("input[type='text']").attr("check","required");
        }else{
            $(this).parent().parent().find("input[type='text']").val("");
            $(this).parent().parent().find("input[type='text']").hide();
            $(this).parent().parent().find("input[type='text']").removeAttr("check");
        }
    });
}



function addYb(key ,el){
    initEmptyTr()
    if ($(".samplesList").length < 5) {

        var len = $(".samplesList").length;
        for (var i = len; i <= len; i++) {
            copyTrObject = copyTrObject.replaceAll("bloods","bloods"+i)
            copyTrObject = copyTrObject.replaceAll("amounts","amounts"+i)
            $("#addSampleFrom").append(copyTrObject);
            for (var j = 0; j < $(".samplesList").length-1; j++) {
                $($("#addSampleFrom").find(".jianhao")[j]).hide();
                $($("#addSampleFrom").find(".jianhao")[$(".samplesList").length-1]).show();
            }
            initDate($(".p_birthday"),parseInt(userJson.startTime),parseInt(userJson.endTime));
            initDate($(".s_containDate"),parseInt(userJson.startTime),parseInt(userJson.endTime));
            initBlood();
        }

    }else {
        top.layer.alert("最多增加5次")
    }
}

/**
 * 删除样本登记
 * @param th
 */

function removeTr(index) {
    var trs = $(".sampleDataTable").find("tr");
    $(trs[index]).remove();
}

function delSpoMedicine(th) {
    var idss;
    var trs = $(".sampleDataTable").find("tr");
    if($("#p_isCheck").val()==1) {
        if (trs.length>2){
            var indexs=$('.jianhao').index($(th));
            //  removeTr(index+1);// document.getElementsByTagName("button");//共多少btn
            parent.parent.layer.confirm('确定要删除记录吗？？', {icon: 3, title: '提示'}, function (index) {
                removeTr(indexs+1);
                parent.parent.layer.close(index);
                for (var j = 0; j < $(".samplesList").length-1; j++) {
                    $($("#addSampleFrom").find(".jianhao")[$(".samplesList").length-1]).show();
                }
            });
            for (var i = indexs+1; i < trs.length; i++) {
                datas = $(trs[i]).find("input");
                for (var key = 0; key < datas.length; key++) {
                    if ($(datas[key]).attr("alias") == "id") {
                        idss = $(datas[key]).val()
                    }
                    if (idss != '') {
                        ajaxCommon("diagnoseSample/deleteById", {"id": idss}, '', "", "");
                    }
                }
            }
            /*parent.parent.layer.confirm('确定要删除记录吗？？', {icon: 3, title: '提示'}, function (index) {
                $($(th).parent().parent()).remove();
                parent.parent.layer.close(index);
            });
             var btns = document.getElementsByTagName("button");//共多少btn
            for (var j=0; j<btns.length; j++) {
                var btn = btns[j];
                //将btn所对应的下标保存在btn上
                btn.index = j;
                btn.onclick = function () {
                   // alert('第'+(this.index+1)+'个');
                };
            }*/

        }else {
            top.layer.alert("样本信息至少保留一次")
        }
    }

}
