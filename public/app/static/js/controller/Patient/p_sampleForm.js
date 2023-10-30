/*
 * @Author: 样本登记
 * @Date: 2019-11-27 11:10:13
 * @LastEditTime: 2020-04-23 12:28:41
 * @LastEditors: Please set LastEditors
 * @Description: 诊疗记录核心业务逻辑-- 样本登记
 * @FilePath: \wjw_gs\static\js\controller\Patient\p_sampleForm.js
 */
var userJson;
var loadmsg;
var reg_check2=/^0\.\d{1,2}$|^[1-9]+(.?\d{1,2})?$|^[1-9]\d+(.?\d{1,2})?$/; //正数，允许录入两位小数，不允许录入0或负数
var reg_check3=/^0\.\d{1,3}$|^[1-9]+(.?\d{1,3})?$|^[1-9]\d+(.?\d{1,3})?$/; //正数，允许录入三位小数，不允许录入0或负数
var reg_check4=/^[\-\+]?\d+(\.\d)?$/; //允许录入一位小数 可为正数 负数 以及0
var reg_check5=/^[1-9]\d*$/; //正整数，不允许录入负数或0或小数
var reg_check6=/^\d.\d$|^\d/; //正数，允许录入0和小数，不允许录入负数
var reg_check7=/^0\.\d{1,1}$|^0\.[1-9]\d{1,1}$|^[1-9]+(.?\d{1,1})?$|^[1-9]\d+(.?\d{1,1})?$/;// 正数，允许录入一位小数，不允许录入0或负数
var reg_check8=/^[0-9]\d*$/; //整数，允许录入0，不允许录入小数或负数
var reg_check9=/^0\.\d$|^0\.[1-9]\d}$|^[1-9]+(.?\d)?$|^[1-9]\d+(.?\d)?$/; //正数，允许录入小数，不允许录入0或负数
//var reg_check10=/^[\-\+]?\d?$/; //允许录入正数、负数、0
var reg_check10=/^[\-\+]?\d?/; //允许录入正数、负数、0

$(function(){
    //loadmsg = top.layer.load(1,{shade: [0.8, '#000000']});
  //initHeight();
//var form = new CybVerification.Form("p_patientFormtb1");
 //  初始化单位
   ajaxCommon("doctor/inspectDataPage","",initDWForm,"","");
    // $("#p_currentDate1").val(dateFormat(new Date()))
    // $("#p_currentDate2").val(dateFormat(new Date()))
    // $("#p_currentDate3").val(dateFormat(new Date()))
    // $("#p_currentDate4").val(dateFormat(new Date()))
    var dataName = decodeURI(getUrlParams("pid"));
      if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title);
        ////referralConfirm(userJson.dataHid,userJson.userHid,userFlag);
        ajaxCommon("diagnose/examineDetial",{"pid":userJson.pid,"dgId":userJson.dgId},initForm,"","");
        if(userJson.type=="update"){
        }
      }
        // 未检查 checkbox change事件
        nullCheckboxChange('.p_check_null');
        // 初始化 checkbox 未检查 未勾选事件
        initNullCheckboxChange('.p_check_null');
        // 未检查 select change事件
        nullSelectChange('.p_select_null');
        // 初始化 select 未检查 未勾选事件
        initNullSelectChange('.p_select_null');
        // 未检查 radio change事件
        nullRadioChange('.p_radio_null');
        // 初始化 radio 未检查 未勾选事件
        initNullRadioChange('.p_radio_null');
        // 本次检查 checkbox 勾选change 事件
        currentChange("#p_current");
        // 初始化 本次检查 checkbox 勾选change 事件
        initCurrentChange("#p_current");
        // 未做任何检查的切换事件
        nullInspect('.p_null_check');
        // 验证input number 输入框的值为正实数 最小为0
        //numberReplace("input[type='number']");
         // 验证input number 输入框的值为正实数 最小为1
        //numberReplace1("input[type='number'][name^='e2_1']");
        // 文件上传初始化
        fileUpload('.p_file');
        // 文件删除
        delFile(".img-btn");
       // //referralConfirm();

        $("#update").click(function(){


          $("#page7").find("input,select,textarea,button.img-btn,button#submitUpdate").prop("disabled",false);
          $("#page7").find("button#submitUpdate").show();
          initNullInspect(".p_null_check");
          

            if(obj == undefined){
                $("#p_e1_1").prop("disabled",true)
                $("#p_e1_2").prop("disabled",true)
                $("#p_e1_3").prop("disabled",true)
                $("#p_e1_4").prop("disabled",true)
                $("#p_e1_5").prop("disabled",true)
                $("#p_e1_6").prop("disabled",true)
                $("#p_e1_7").prop("disabled",true)
                $("#p_e1_8_1").prop("disabled",true)
                $("#p_e1_8_2").prop("disabled",true)
                $("#p_e1_8_3").prop("disabled",true)
                $("#p_e1_8_4").prop("disabled",true)
                $("#p_e1_8_5").prop("disabled",true)
                $("#p_e1_9_1").prop("disabled",true)
                $("#p_e1_9_2").prop("disabled",true)
                $("#p_e1_9_3").prop("disabled",true)
                $("#p_e1_9_4").prop("disabled",true)
                $("#p_e1_10_1").prop("disabled",true)
                $("#p_e1_10_2").prop("disabled",true)
                $("#p_e1_10_3").prop("disabled",true)
                $("#p_e1_10_4").prop("disabled",true)
                $("#p_e1_10_5").prop("disabled",true)
                $("#p_e1_10_6").prop("disabled",true)
                $("#p_e2_1").prop("disabled",true)
                $("#p_e2_3").prop("disabled",true)
                $("#p_e2_4").prop("disabled",true)
                $("#p_e3_1").prop("disabled",true)
                $("#p_e3_2").prop("disabled",true)
                $("#p_e4_1").prop("disabled",true)
                $("#p_e4_2").prop("disabled",true)
                $("#p_e4_3").prop("disabled",true)
                $("#p_e4_4").prop("disabled",true)
                $("#p_e2_2").prop("disabled",true)
            }else {
                if (obj.e1_1_min == "null" && obj.e1_1_max == "null"){
                    $("#p_e1_1").prop("disabled",true)
                }
                if (obj.e1_2_min == "null" && obj.e1_2_max == "null"){
                    $("#p_e1_2").prop("disabled",true)
                }
                if (obj.e1_3_min == "null" && obj.e1_3_max == "null"){
                    $("#p_e1_3").prop("disabled",true)
                }
                if (obj.e1_4_min == "null" && obj.e1_4_max == "null"){
                    $("#p_e1_4").prop("disabled",true)
                }
                if (obj.e1_5_min == "null" && obj.e1_5_max == "null"){
                    $("#p_e1_5").prop("disabled",true)
                }
                if (obj.e1_6_min == "null" && obj.e1_6_max == "null"){
                    $("#p_e1_6").prop("disabled",true)
                }
                if (obj.e1_7_min == "null" && obj.e1_7_max == "null"){
                    $("#p_e1_7").prop("disabled",true)
                }
                if (obj.e1_8_1_min == "null" && obj.e1_8_1_max == "null"){
                    $("#p_e1_8_1").prop("disabled",true)
                }
                if (obj.e1_8_2_min == "null" && obj.e1_8_2_max == "null"){
                    $("#p_e1_8_2").prop("disabled",true)
                }
                if (obj.e1_8_3_min == "null" && obj.e1_8_3_max == "null"){
                    $("#p_e1_8_3").prop("disabled",true)
                }
                if (obj.e1_8_4_min == "null" && obj.e1_8_4_max == "null"){
                    $("#p_e1_8_4").prop("disabled",true)
                }
                if (obj.e1_8_5_min == "null" && obj.e1_8_5_max == "null"){
                    $("#p_e1_8_5").prop("disabled",true)
                }
                if (obj.e1_9_1_min == "null" && obj.e1_9_1_min == "null"){
                    $("#p_e1_9_1").prop("disabled",true)
                }
                if (obj.e1_9_2_min == "null" && obj.e1_9_2_min == "null"){
                    $("#p_e1_9_2").prop("disabled",true)
                }
                if (obj.e1_9_3_min == "null" && obj.e1_9_3_min == "null"){
                    $("#p_e1_9_3").prop("disabled",true)
                }
                if (obj.e1_9_4_min == "null" && obj.e1_9_4_min == "null"){
                    $("#p_e1_9_4").prop("disabled",true)
                }
                if (obj.e1_10_1_min == "null" && obj.e1_10_1_max == "null"){
                    $("#p_e1_10_1").prop("disabled",true)
                }
                if (obj.e1_10_2_min == "null" && obj.e1_10_2_max == "null"){
                    $("#p_e1_10_2").prop("disabled",true)
                }
                if (obj.e1_10_3_min == "null" && obj.e1_10_3_max == "null"){
                    $("#p_e1_10_3").prop("disabled",true)
                }
                if (obj.e1_10_4_min == "null" && obj.e1_10_4_max == "null"){
                    $("#p_e1_10_4").prop("disabled",true)
                }
                if (obj.e1_10_5_min == "null" && obj.e1_10_5_max == "null"){
                    $("#p_e1_10_5").prop("disabled",true)
                }
                if (obj.e1_10_6_min == "null" && obj.e1_10_6_max == "null"){
                    $("#p_e1_10_6").prop("disabled",true)
                }
                if (obj.e2_1_min == "null" && obj.e2_1_max == "null"){
                    $("#p_e2_1").prop("disabled",true)
                }
                if (obj.e2_2_min == "null" && obj.e2_2_max == "null"){
                    $("#p_e2_2").prop("disabled",true)
                }
                if (obj.e2_3_min == "null" && obj.e2_3_max == "null"){
                    $("#p_e2_3").prop("disabled",true)
                }
                if (obj.e2_4_min == "null" && obj.e2_4_max == "null"){
                    $("#p_e2_4").prop("disabled",true)
                }
                if (obj.e3_1_min == "null" && obj.e3_1_max == "null"){
                    $("#p_e3_1").prop("disabled",true)
                }
                if (obj.e3_2_min == "null" && obj.e3_2_max == "null"){
                    $("#p_e3_2").prop("disabled",true)
                }
                if (obj.e4_1_min == "null" && obj.e4_1_max == "null"){
                    $("#p_e4_1").prop("disabled",true)
                }
                if (obj.e4_2_min == "null" && obj.e4_2_max == "null"){
                    $("#p_e4_2").prop("disabled",true)
                }
                if (obj.e4_3_min == "null" && obj.e4_3_max == "null"){
                    $("#p_e4_3").prop("disabled",true)
                }
                if (obj.e4_4_min == "null" && obj.e4_4_max == "null"){
                    $("#p_e4_4").prop("disabled",true)
                }
            }


        });
        //$("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",true);

   $("#p_exam_8").change(function(){
     if($(this).is(":checked")){
       $("#p_exam_note").show();
     }else{
      $("#p_exam_note").hide();
      $("#p_exam_note").val("");

     }
   });
});
// 初始化单位
var obj;
function initDWForm(el,data){
  if(data){
    for (var key in data) {
     if (data[key]!="") {
       $("#p_d_"+key).text(data[key]);
     }
   }
      console.log(data)
      obj = data;
  }

}
// 公用ajax
function ajaxCommon(url,data,callback,el,id){
  $("#addPatientFrom").publicAjax({
    url: globalUrl+url,
    type: "post",
    data: data,
    dataType: "json",
    successFn: function(data) {
      if (data.code == "0") {
        callback(el, data.data, id);
      }else if (data.code == "2"){ 
          shakes(data);
      }else {
        layer.alert(data.msg);
      } 
    }
  });
}
// 点击确定提交数据
function submitUpdate(type){

    //exam_1  基本生化指标  p_currentDate1
    //exam_2  骨形成指标   p_currentDate1
    //exam_3  骨吸收指标   p_currentDate3
    //exam_4  性激素水平   p_currentDate4
    if(checkData("p_exam_1" , "基本生化指标" , "p_currentDate1")){return false;}
    if(checkData("p_exam_2" , "骨形成指标" , "p_currentDate2")){return false;}
    if(checkData("p_exam_3" , "骨吸收指标" , "p_currentDate3")){return false;}
    if(checkData("p_exam_4" , "性激素水平" , "p_currentDate4")){return false;}


    var data,url,callback,json;
  data={
    "current":{
        "currentDate1":$("#p_currentDate1").val(),
        "currentDate2":$("#p_currentDate2").val(),
        "currentDate3":$("#p_currentDate3").val(),
        "currentDate4":$("#p_currentDate4").val(),
      "exam_1":{
        "e1_1":$("#p_e1_1").val(),
          "p_1":$("#p_1").val(),
        "e1_2":$("#p_e1_2").val(),
          "p_2":$("#p_2").val(),
        "e1_3":$("#p_e1_3").val(),
        "e1_4":$("#p_e1_4").val(),
        "e1_5":$("#p_e1_5").val(),
        "e1_6":$("#p_e1_6").val(),
          "p_3":$("#p_3").val(),
        "e1_7":$("#p_e1_7").val(),
        "e1_8":$("#p_e1_8_form").serializeObject(),
        "e1_9":$("#p_e1_9_form").serializeObject(),
        "e1_10":$("#p_e1_10_form").serializeObject(),
      },
      "exam_2":$("#p_exam_2").serializeObject(),
      "exam_3":$("#p_exam_3").serializeObject(),
      "exam_4":$("#p_exam_4").serializeObject(),
      "exam_5":$("#p_exam_5").val(),
    }
  }
   //var form=new CybVerification.FirstVisitForm("page7");
   //Var state=form.submit();

 var _tempData = getFormData("#appendPart1");
  $.each(_tempData , function( key ,index ){
    data.current[key] = _tempData[key];
 })  
 var _tempData0 = getFormData("#appendPart0");
  $.each(_tempData0 , function( key ,index ){
    data.current[key] = _tempData0[key]; 
 })  


   //王英海 首先确定 其它相关检查及结果 选择的是 name="d5p5"  
  var form=new CybVerification.FirstVisitForm("appendPart0"); 
  var state=form.submit(onwerObj.excludeClass1());//传入排除的样式
  if(!state){  return false } //校验胸腰椎侧位X线片

  var form=new CybVerification.FirstVisitForm("appendPart1");
  var state1=form.submit(onwerObj.excludeClass1()); //传入排除的样式
  if(!state1){  return false } //其他相关检查及结果




  json={"pid":userJson.pid,"apid":userJson.apid,"dgtype":userJson.dgtype,"dgId":userJson.dgId,"pageExamine":JSON.stringify(data)};
  if(state){
    if (($("#p_e1_1").val()).trim() == '' && ($("#p_1").val()).trim() == ''){
        top.layer.msg("指标血总Ca，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e1_2").val()).trim() == '' && ($("#p_2").val()).trim() == ''){
        top.layer.msg("指标P，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e1_6").val()).trim() == '' && ($("#p_3").val()).trim() == ''){
        top.layer.msg("指标总25(OH)VitD，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e1_8_4").val()).trim() == '' && ($("#p_4").val()).trim() == ''){
        top.layer.msg("指标Alb，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e1_9_1").val()).trim() == '' && ($("#p_5").val()).trim() == ''){
        top.layer.msg("指标Cr，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e2_1").val()).trim() == '' && ($("#p_6").val()).trim() == ''){
        top.layer.msg("指标ALP，没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e2_4").val()).trim() == '' && ($("#p_7").val()).trim() == ''){
        top.layer.msg("指标P1NP（1型原胶原N-端前肽），没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
    if (($("#p_e3_1").val()).trim() == '' && ($("#p_8").val()).trim() == ''){
        top.layer.msg("指标β-CTX（β胶原降解产物），没有填写任何内容，请确认填写；如果该指标没有检查，请在该指标下面的备注里填写原因。")
        return false;
    }
	
	 ajaxCommon("diagnose/savePageExamine",json,initHtml,'','');
	
 
  }
}
function initHtml(){
  window.location.reload();
  ajaxCommon("diagnose/examineDetial",{"pid":userJson.pid,"dgId":userJson.dgId},initForm,"","");

}
// 数据回显
function initForm(el,data){
  if(data){
  $("#update").show();
  // if(data.nextTime){
  //   var currentData=data.nextTime;
  //   for (var key in currentData) {
  //     if (currentData.hasOwnProperty(key)) {
  //       var cindex=key.split("_")[1];
  //          $("input[type='checkbox'][name='e"+cindex+"_check'][value='"+currentData[key]+"']").prop("checked", true);
  //     }
  //   };
  //   //$("#update").hide();
  //   //$("#submitUpdate").show();
  //   //$("#submitUpdate").removeAttr("disabled");
  //   $("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",false);

  // }else{
  //   ////referralConfirm(userJson.dataHid,userJson.userHid,userFlag);

  //   //$("#update").show();
  //   //$("#submitUpdate").attr("disabled","disabled");
  //   $("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",true);

  // }
  // $.each(data.diagnose,function(name,value){
    if(data.diagnose.pageexamine){
        $.each(JSON.parse(data.diagnose.pageexamine),function(name1,value1){
         //console.log("2"+name1+":"+value1);
         $("input[type='radio'][name='"+name1+"'][value='"+value1+"']").prop("checked", true);
         $("input[type='checkbox'][name='"+name1+"'][value='"+value1+"']").prop("checked", true);
         $("input[type='hidden'][name='"+name1+"']").val(value1);
         $("input[type='number'][name='"+name1+"']").val(value1);
         if(isObject(value1)){
         $.each(value1,function(name2,value2){
          console.log("3"+name2+":"+value2);
           $("input[type='radio'][name='"+name2+"'][value='"+value2+"']").prop("checked", true);
           $("input[type='checkbox'][name='"+name2+"'][value='"+value2+"']").prop("checked", true);
           $("input[type='text'][name='"+name2+"']").val(value2);
           $("input[type='number'][name='"+name2+"']").val(value2);
           $("textarea[name='"+name2+"']").val(value2);
           $("select[name='"+name2+"'] option[value='"+value2+"']").attr("selected","selected");

           if(isObject(value2)){
            $.each(value2,function(name3,value3){
            //console.log("4"+name3+":"+value3);
             $("input[type='radio'][name='"+name3+"'][value='"+value3+"']").prop("checked", true);
             $("input[type='checkbox'][name='"+name3+"'][value='"+value3+"']").prop("checked", true);
             $("input[type='number'][name='"+name3+"']").val(value3);
             $("select[name='"+name3+"'] option[value='"+value3+"']").attr("selected","selected");
             $("textarea[name='"+name3+"']").val(value3);
             $("input[type='text'][name='"+name3+"']").val(value3);
             if(isObject(value3)){
               $.each(value3,function(name4,value4){
                 //console.log("5"+name4+":"+value4);
                 $("input[type='radio'][name='"+name4+"'][value='"+value4+"']").prop("checked", true);
                 $("input[type='checkbox'][name='"+name4+"'][value='"+value4+"']").prop("checked", true);
                 $("input[type='number'][name='"+name4+"']").val(value4);
                 $("input[type='text'][name='"+name4+"']").val(value4);
                 $("textarea[name='"+name4+"']").val(value4);
                 $("select[name='"+name4+"'] option[value='"+value4+"']").attr("selected","selected");
                 initImg(name4,value4);
                 if(isObject(value4)){
                   $.each(value4,function(name5,value5){
                 $("input[type='radio'][name='"+name5+"'][value='"+value5+"']").prop("checked", true);
                 $("input[type='checkbox'][name='"+name5+"'][value='"+value5+"']").prop("checked", true);
                 $("input[type='number'][name='"+name5+"']").val(value5);
                 $("input[type='text'][name='"+name5+"']").val(value5);
                 $("textarea[name='"+name5+"']").val(value5);
                 $("select[name='"+name5+"'] option[value='"+value5+"']").attr("selected","selected");
               })
                 }
               });
             }else if(isArray(value3)){
               //console.log("数组"+value3);//  得到的数图片的列表数据
               initImg(name3,value3);
             }else{

             }
            })
           }else if(isArray(value2)){

           }else{
           }
         });
         }else{
          // $("#p_"+name1).val(value1);
           $("input[type='text'][name='"+name1+"']").val(value1);
           $("input[type='number'][name='"+name1+"']").val(value1);
           $("textarea[name='"+name1+"']").val(value1);
         }
        })
        onwerObj.initByInDomVal();
    }else{

    }
    //  });

        // 未检查 checkbox change事件
        nullCheckboxChange('.p_check_null');
        // 初始化 checkbox 未检查 未勾选事件
        initNullCheckboxChange('.p_check_null');
        // 未检查 radio change事件
        nullRadioChange('.p_radio_null');
        // 初始化 radio 未检查 未勾选事件
        initNullRadioChange('.p_radio_null');
        // 本次检查 checkbox 勾选change 事件
        currentChange("#p_current");
        // 初始化 本次检查 checkbox 勾选change 事件
        initCurrentChange("#p_current");
        // 未做任何检查的切换事件
        nullInspect('.p_null_check');
        initNullInspect(".p_null_check");

          // 文件删除
        delFile(".img-btn");
        $("#page7").find("input,select,textarea,button#submitUpdate,button.img-btn").prop("disabled",true);
        //initDate($("#p_currentDate"),data.diagnose.dgDate);
      initDate($(".p_stopTime"),data.diagnose.dgDate);
  }else{
    $("#update").hide();
  }
  top.layer.close(loadmsg);

}
function getHistoryArr(el){
  var jsonArr=[];
  $(el).find("form").each(function(){
    jsonArr.push($(this).serializeObject());
  });
  return jsonArr;
}
function ajaxCommonTest(url,data,callback,el,id){
  $("#addPatientFrom").publicAjax({
    url: "../../mock/p_004.json",
    type: "get",
    data: {},
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
function isArray(obj){
return (typeof obj=='object')&&obj.constructor==Array;
}
function isObject(obj){
return (typeof obj=='object')&&obj.constructor==Object;
}
function isString(obj){
return (typeof obj=='string')&&obj.constructor==String;
}
// 获取去除空后的数据
function Trim(str){
     var result;
      result = str.replace(/(^\s+)|(\s+$)/g,"");
      result = result.replace(/\s/g,"");
     return result;
 }
// 时间插件初始化
function initDate(el,sData){
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
     //startDate:new Date(sData),
     endDate:new Date(),
     pickerPosition:"bottom-left"//控件显示位置
   })
   //el.find("input").val("00:01:00");

 }
// 未检查 checkbox change事件
function nullCheckboxChange(el){
$(el).change(function(){
if($(this).is(':checked')){
$(this).parent().parent().parent().next().find("input[type='radio']").prop('checked',false);
$(this).parent().parent().parent().next().find("input[type='checkbox']").prop('checked',false);
$(this).parent().parent().parent().next().find("input[type='number']").prop('value'," ");
$(this).parent().parent().parent().next().slideUp();
}else{
$(this).parent().parent().parent().next().slideDown();

}
});
}
// 初始化 checkbox 未检查 未勾选事件
function initNullCheckboxChange(el){
  $.each($(el),function(){
    if($(this).is(':checked')){
     $(this).parent().parent().parent().next().slideUp();
     }else{
     $(this).parent().parent().parent().next().slideDown();
     }
  })
}
// 未检查 select change事件
function nullSelectChange(el){
$(el).change(function(){
if($(this).val()=="" || $(this).val()== 0 ){ // 空 0 都是未检查
$(this).parent().parent().next().find("input[type='radio']").prop('checked',false);
$(this).parent().parent().next().find("input[type='checkbox']").prop('checked',false);
$(this).parent().parent().next().find("input[type='number'],input[type='text']").prop('value'," ");
$(this).parent().parent().next().slideUp();
$(this).parent().parent().next().removeClass("check");
$(this).parent().parent().next().find(".p_required").removeAttr("check");
$(this).parent().parent().next().removeAttr("check");
$(this).parent().parent().next().find(".p_requiredImg").removeClass("check");
$(this).parent().parent().next().removeAttr("check");


}else{
$(this).parent().parent().next().slideDown();
$(this).parent().parent().next().attr("class","check");
$(this).parent().parent().next().find(".p_requiredImg").addClass("check");
$(this).parent().parent().next().find(".p_required").attr("check","required");
$(this).parent().parent().next().attr("check","inputLeast");


}
});
}
// 初始化 select 未检查 未勾选事件
function initNullSelectChange(el){
  $.each($(el),function(){
    if($(this).val()==0 || $(this).val()==""){
      $(this).parent().parent().next().find("input[type='radio']").prop('checked',false);
      $(this).parent().parent().next().find("input[type='checkbox']").prop('checked',false);
      $(this).parent().parent().next().find("input[type='number'],input[type='text']").prop('value'," ");
      $(this).parent().parent().next().slideUp();
      $(this).parent().parent().next().removeClass("check");
      $(this).parent().parent().next().find(".p_required").removeAttr("check");
      $(this).parent().parent().next().removeAttr("check");
      $(this).parent().parent().next().find(".p_requiredImg").removeClass("check");
      $(this).parent().parent().next().removeAttr("check");

     }else{
     $(this).parent().parent().next().slideDown();
     $(this).parent().parent().next().attr("class","check");
     $(this).parent().parent().next().find(".p_requiredImg").addClass("check");
     $(this).parent().parent().next().find(".p_required").attr("check","required");
     $(this).parent().parent().next().attr("check","inputLeast");


     }
  })
}

// 未检查 radio change事件
function nullRadioChange(el){
$(el).change(function(){
var name=$(this).prop("name");
if($(this).val()==0){
  $("#"+name+"_right").hide();
  $("#"+name+"_left").hide();
  $("#"+name+"_left").removeClass("check");
  $("#"+name+"_left").removeAttr("check");
  $("#"+name+"_right").removeClass("check");
  $("#"+name+"_right").removeAttr("check");
$(this).parent().parent().next().removeClass("check");
$(this).parent().parent().next().removeAttr("check","inputLeast");
}else{
if($(this).val()==1){

  $("#"+name+"_right").hide();
  $("#"+name+"_left").show();

  $("#"+name+"_left").find("input[type='number']").removeProp("readonly");

  $("#"+name+"_left").addClass("check");
  $("#"+name+"_left").attr("check","inputLeast");


  $("#"+name+"_right").removeClass("check");
  $("#"+name+"_right").removeAttr("check");
  $("#"+name+"_right").find("input[type='number']").prop("readonly","readonly");
  $("#"+name+"_right").find("input[type='number']").val("");
}else if($(this).val()==2){

  $("#"+name+"_left").hide();
  $("#"+name+"_right").show();
  $("#"+name+"_right").find("input[type='number']").removeProp("readonly");

  $("#"+name+"_right").addClass("check");
  $("#"+name+"_right").attr("check","inputLeast");

  $("#"+name+"_left").removeClass("check");
  $("#"+name+"_left").removeAttr("check");
  $("#"+name+"_left").find("input[type='number']").prop("readonly","readonly");
  $("#"+name+"_left").find("input[type='number']").val("");
}else if($(this).val()==3){
  $("#"+name+"_right").show();
  $("#"+name+"_left").show();

  $("#"+name+"_left").addClass("check");
  $("#"+name+"_left").attr("check","inputLeast");
  $("#"+name+"_right").addClass("check");
  $("#"+name+"_right").attr("check","inputLeast");

  $("#"+name+"_right").find("input[type='number']").removeProp("readonly");
  $("#"+name+"_left").find("input[type='number']").removeProp("readonly");
  $("#"+name+"_right").find("input[type='number']").val("");
  $("#"+name+"_left").find("input[type='number']").val("");
}

}
});
}
// 初始化 Radio 未检查 未勾选事件
function initNullRadioChange(el){
  $.each($(el),function(){
    var name=$(this).prop("name");
    if($(this).is(":checked")){
      if($(this).val()==0){
  $("#"+name+"_right").hide();
  $("#"+name+"_left").hide();
  $("#"+name+"_left").removeClass("check");
  $("#"+name+"_left").removeAttr("check");
  $("#"+name+"_right").removeClass("check");
  $("#"+name+"_right").removeAttr("check");
$(this).parent().parent().next().removeClass("check");
$(this).parent().parent().next().removeAttr("check","inputLeast");
}else{
if($(this).val()==1){

  $("#"+name+"_right").hide();
  $("#"+name+"_left").show();

  $("#"+name+"_left").find("input[type='number']").removeProp("readonly");

  $("#"+name+"_left").addClass("check");
  $("#"+name+"_left").attr("check","inputLeast");


  $("#"+name+"_right").removeClass("check");
  $("#"+name+"_right").removeAttr("check");
  $("#"+name+"_right").find("input[type='number']").prop("readonly","readonly");
  //$("#"+name+"_right").find("input[type='number']").val("");
}else if($(this).val()==2){

  $("#"+name+"_left").hide();
  $("#"+name+"_right").show();
  $("#"+name+"_right").find("input[type='number']").removeProp("readonly");

  $("#"+name+"_right").addClass("check");
  $("#"+name+"_right").attr("check","inputLeast");

  $("#"+name+"_left").removeClass("check");
  $("#"+name+"_left").removeAttr("check");
  $("#"+name+"_left").find("input[type='number']").prop("readonly","readonly");
  //$("#"+name+"_left").find("input[type='number']").val("");
}else if($(this).val()==3){
  $("#"+name+"_right").show();
  $("#"+name+"_left").show();

  $("#"+name+"_left").addClass("check");
  $("#"+name+"_left").attr("check","inputLeast");
  $("#"+name+"_right").addClass("check");
  $("#"+name+"_right").attr("check","inputLeast");

  $("#"+name+"_right").find("input[type='number']").removeProp("readonly");
  $("#"+name+"_left").find("input[type='number']").removeProp("readonly");
  //$("#"+name+"_right").find("input[type='number']").val("");
  //$("#"+name+"_left").find("input[type='number']").val("");
}

}
}
  })
}
// 本次检查 checkbox 勾选change 事件
function currentChange(el){
 $(el).find('input[type="checkbox"]').change(function(){
  var name=$(this).prop("name");
  if($(this).prop("checked")){
    $("#p_s_"+name).show();
    $("#p_s_"+name).find(".p_required").attr("check","required");  // 带有 .p_required 的是select input必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio").attr("check","radio");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio,.p_requiredImg").addClass("check");
    $("#p_s_"+name).find(".p_inputLeast").attr("check","inputLeast");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_requiredSel").addClass("check");
    if(name=="e8_check"){
      $("#p_e8_note").show();
    }
    if(name=="exam_8"){
      $("#p_exam_note").show();
    }

  }else{
    $("#p_s_"+name).hide();
    $("#p_s_"+name).find('input[type="checkbox"]').prop("checked",false);
    $("#p_s_"+name).find('input[type="radio"]').prop("checked",false);
    $("#p_s_"+name).find('select option[value=""]').prop("selected","selected");
    $("#p_s_"+name).find('input[type="number"]').val("");
    $("#p_s_"+name).find('input[type="number"]').removeProp("readonly");
    $("#p_s_"+name).find('input[type="text"]').val("");
    $("#p_s_"+name).find('textarea').val("");
    $("#p_s_"+name).find("ul.img-warp").html("");
    $("#p_s_"+name).find(".p_required").removeAttr("check");  // 带有 .p_required 的是select input必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio").removeAttr("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio,p_requiredImg").removeClass("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_inputLeast").removeAttr("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_requiredSel").removeClass("check");
    $("#p_s_"+name).find(".check").removeClass("check");
    if(name=="e8_check"){
      $("#p_e8_note").hide();
      $("#p_e8_note").val("");
    }
    if(name=="exam_8"){
      $("#p_exam_note").hide();
      $("#p_exam_note").val("");
    }
  }
  initNullSelectChange('.p_select_null');
 });

}
// 初始化 本次检查 checkbox 勾选change 事件
function initCurrentChange(el){
  $.each($(el).find('input[type="checkbox"]'),function(){
    var name=$(this).prop("name");
  if($(this).prop("checked")){
    $("#p_s_"+name).show();
    $("#p_s_"+name).find(".p_required").attr("check","required");  // 带有 .p_required 的是select input必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio").attr("check","radio");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_inputLeast").attr("check","inputLeast");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio,.p_requiredImg").addClass("check");
    if(name=="e8_check"){
      $("#p_e8_note").show();
    }
    if(name=="exam_8"){
      $("#p_exam_note").show();
    }

  }else{
    $("#p_s_"+name).hide();
    $("#p_s_"+name).find('input[type="checkbox"]').prop("checked",false);
    $("#p_s_"+name).find('input[type="radio"]').prop("checked",false);
    $("#p_s_"+name).find('select option[value=""]').prop("selected","selected");
    $("#p_s_"+name).find('input[type="number"]').val("");
    $("#p_s_"+name).find('input[type="number"]').removeProp("readonly");
    $("#p_s_"+name).find('input[type="text"]').val("");
    $("#p_s_"+name).find('textarea').val("");
    $("#p_s_"+name).find("ul.img-warp").html("");
    $("#p_s_"+name).find(".p_required").removeAttr("check");  // 带有 .p_required 的是select input必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio").removeAttr("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_checkRadio,p_requiredImg").removeClass("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_inputLeast").removeAttr("check");  // 带有 .p_checkRadio 的是radio必填校验动态添加；
    $("#p_s_"+name).find(".p_requiredSel").removeClass("check");
    $("#p_s_"+name).find(".check").removeClass("check");
    if(name=="e8_check"){
      $("#p_s_"+name).parent().next().hide();
      $("#p_e8_note").val("");
    }
    if(name=="exam_8"){
      $("#p_s_"+name).parent().next().hide();
      $("#p_exam_note").val("");
    }
  }
  });
  initNullSelectChange('.p_select_null');

}
// 未做任何检查的切换事件
function nullInspect(el){
  $(el).change(function(){
    if($(this).prop("checked")){
      $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
      $(this).parent().parent().next().find("input[type='checkbox']").prop("disabled","disabled");
      $(this).parent().parent().next().find("input[type='text']").val("");
      $(this).parent().parent().next().find("input[type='text']").hide();
      initCurrentChange("#p_current");
    }else{
      $(this).parent().parent().next().find("input[type='checkbox']").removeProp("disabled");
      initCurrentChange("#p_current");

    }
  })
}
// 初始化未做任何检查的初始化事件
function initNullInspect(el){
  $.each($(el),function(){
    if($(this).prop("checked")){
      $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
      $(this).parent().parent().next().find("input[type='checkbox']").prop("disabled","disabled");
      $(this).parent().parent().next().find("input[type='text']").val("");
      $(this).parent().parent().next().find("input[type='text']").hide();
      initCurrentChange("#p_current");
    }else{
      $(this).parent().parent().next().find("input[type='checkbox']").removeProp("disabled");
      initCurrentChange("#p_current");

    }
  })
}
// 不详check 切换事件
function unknownChange(th){
  var name=($(th).prop("name")).substring(0,4);
  if($(th).is(':checked')){
    $(th).parent().parent().nextAll().find('input[type=radio],input[type=checkbox]').prop("disabled","disabled");
    $(th).parent().parent().nextAll().find('input').prop("checked",false);
  }else{
    $(th).parent().parent().nextAll().find('input[type=radio],input[type=checkbox]').removeProp("disabled");
  }
}
// 初始化不详
function initUnknown(el){
  $.each($(el),function(j,checkbox){
    var name=($(this).prop("name")).substring(0,4);
    if($(this).is(':checked')){
    $(this).parent().nextAll().find('input[type=checkbox][name^="'+name+'"]').prop("disabled","disabled");
    $(this).parent().nextAll().find('input').prop("disabled","disabled");
    $(this).parent().nextAll().find('input').prop("checked",false);
  }else{
    $(this).parent().nextAll().find('inputinput[type=checkbox][name^="'+name+'"]').removeProp("disabled");
    $(this).parent().nextAll().find('input').removeProp("disabled");
  }
        });
}
/** 获取表单值重写jq */
$.fn.serializeObjectSample = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        if (this.name == "password" || this.name == "oldpassword") {
          this.value = $.md5($.trim(this.value));
        }
        o[this.name] = $.trim(this.value) || "";
      }
    });
    var $radio = $('input[type=radio]',this);
    $.each($radio,function(){
        if(!o.hasOwnProperty(this.name) && this.name!=""){
            o[this.name] = '';
        }
    });
    var $checkbox = $('input[type=checkbox]',this);
    $.each($checkbox,function(){
      if(!o.hasOwnProperty(this.name) && this.name!=""){
          o[this.name] = '0';
      }
  });
    return o;
  };
// 正实数的正则校验  正实数 可以为 0 /[^0-9.]/g
function numberReplace(el){
  $(el).each(function() {
      $(this).blur(function() {
        var val = $(this).val();
        var that1 = $(this);
        var reg=/^[0-9]+(.[0-9]{1,3})?$/;
        var flag=reg.test(val);
        if(!flag){
          //top.parent.layer.msg("请输入正实数");
          $(this).val("");
        }
      });
    });
}
// 正实数正则校验 大于1 /[^1-9.]/g
function numberReplace1(el){
  $(el).each(function() {
      $(this).blur(function() {
        var val = $(this).val();
        var that1 = $(this);
        var reg=/^[1-9]+(.[0-9]{1,3})?$/;
        var flag=reg.test(val);
        if(!flag){
          top.parent.layer.msg("请输入正实数");
          $(this).val("");
        }
      });
    });
}
// 初始化图片列表数据
function initImg(name,value){
  //$("#p_"+name).html("");
  for(var i=0;i<value.length;i++){
      var item = value[i];
      // $("#p_"+name).append(
      //   "<form>"+
      //   "<li><img src=''/><input type='text' id='p_"+name+"_description'value='"+item[name+'_desciption']+"'name='"+name+"_description'/><input type='hidden' id='p_"+name+"_filename' name='"+name+"_filename' value='"+item[name+'_filename']+"'/></li>"+
      //   "</form>"
      //   );
      $("#p_"+name).append(
        '<li>'+
          '<form>'+
              '<div class="img-info">'+
                '<div class="img-box">'+
                    '<img src="'+globalUrl+item[name+'_filename']+'" alt="">'+
                    '<button class="img-btn" type="button"><span class="glyphicon glyphicon-remove"></span></button>'+
                '</div>'+
               '<div>'+
                    '<input type="hidden" name="'+name+'_filename"    value="'+item[name+'_filename']+'" class="p_'+name+'_filename">'+
                    '<input type="text"   name="'+name+'_description" value="'+item[name+'_description']+'" class="form-control p_'+name+'_description">'+
                '</div>'+

              '</div> '+

              '</form>'+
        '</li>'
      );
      $("#p_"+name).next().find("input[type='file']").val('');

  }
  $("#page7").find("button.img-btn").prop("disabled",true);

}
// 图片文件上传
function fileUpload(el){
  $(el).change(function(){
  var formData = new FormData($(this).parent());
  formData.append("file",$(this).prop('files')[0]);
  formData.append("sessionId",sessionStorage.getItem("token"));
  formData.append("pid",userJson.pid);
  var el=$(this).parent().parent().prev().attr("id");
  var name=$(this).parent().parent().prev().attr("id").substring(2);
        //   $.ajax({
        //     url: globalUrl+'diagnoseImg/upload',
        //     type: 'POST',
        //     data: formData,
        //     processData: false,
        //     contentType : false,
        //     success: function () {
        //     },
        //     error: function () {}
        //   })
        // });
  //XMLHttpRequest对象
var xmlobj = new XMLHttpRequest();

 //指定提交类型和选择要发送的地址
 xmlobj.open('post',globalUrl+'diagnoseImg/upload');

 //发送数据
 xmlobj.send(formData);

 xmlobj.onload = function()
 {
     var data=JSON.parse(xmlobj.responseText);
     if(data.code==0){
       layer.msg(data.msg);
       layer.closeAll();
      // initPatientTable("patient/listPage",data);

      imgUploadCallback("#"+el,data.data,name);
     }else{
       layer.msg(data.msg);
     }
 }
})
}
// 图片文件删除
function delFile(el){
  $(el).click(function(){
    var that=$(this);
    top.layer.confirm("确定要删除图片吗？？？",function(index){
      var val=that.parent().next().find("input[type='hidden']").val();
      var id=that.parent().parent().parent().parent();
      ajaxCommon("diagnoseImg/drop",{"file":val},imgDelCallback,id,"");
      top.layer.close(index);
    })

  });
};
// 上传图片回调事件
function imgUploadCallback(el,data,name){
  $(el).append(
    '<li>'+
          '<form>'+
              '<div class="img-info">'+
                '<div class="img-box">'+
                    '<img src="'+globalUrl+data.path+'" alt="">'+
                    '<button class="img-btn" type="button"><span class="glyphicon glyphicon-remove"></span></button>'+
                '</div>'+
               '<div>'+
                    '<input type="hidden" name="'+name+'_filename"    value="'+data.path+'" class="p_'+name+'_filename">'+
                    '<input type="text"   name="'+name+'_description" value="" class="form-control p_'+name+'_description">'+
                '</div>'+

              '</div> '+

              '</form>'+
        '</li>'
        );

         // 文件删除
         delFile(".img-btn");
}
// 删除图片的回调事件
function imgDelCallback(el,data){
  $(el).remove();
}
/* 校验 数值输入框 */
// 请输入正数，允许录入两位小数，不允许录入0或负数
function check2(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(val!=0){
    if(!reg_check2.test(val)){
      top.layer.msg("请输入正数，允许录入两位小数，不允许录入0或负数", { icon: 5, anim: 6 });
      //$("#"+id).focus();
      $("#"+id).val("");
      return false;
    }
  }else{
    top.layer.msg("请输入正数，允许录入两位小数，不允许录入0或负数", { icon: 5, anim: 6 });
    $("#"+id).val("");
      return false;
  }

}
// 请输入正数，允许录入两位小数，不允许录入0或负数
function check3(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(val!=0){
  if(!reg_check3.test(val)){
    top.layer.msg("请输入正数，允许录入三位小数，不允许录入0或负数", { icon: 5, anim: 6 });
    //$("#"+id).focus();
    $("#"+id).val("");
    return false;
  }
  }else{
    top.layer.msg("请输入正数，允许录入三位小数，不允许录入0或负数", { icon: 5, anim: 6 });
    $("#"+id).val("");
      return false;
  }
}
// 允许录入一位小数可为负数、正数以及0
function check4(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(!reg_check4.test(val)){
    top.layer.msg("允许录入一位小数可为负数、正数以及0", { icon: 5, anim: 6 });
    //$("#"+id).focus();
    $("#"+id).val("");
    return false;
  }
}
// 正整数，不允许录入负数或0或小数
function check5(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(val!=0){
  if(!reg_check5.test(val)){
    top.layer.msg("正整数，不允许录入负数或0或小数", { icon: 5, anim: 6 });
    //$("#"+id).focus();
    $("#"+id).val("");
    return false;
  }
}else{
  top.layer.msg("正整数，不允许录入负数或0或小数", { icon: 5, anim: 6 });
  $("#"+id).val("");
      return false;
  }
}
// 正数，允许录入0和小数，不允许录入负数
function check6(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(!reg_check6.test(val)){
    top.layer.msg("正数，允许录入0和小数，不允许录入负数", { icon: 5, anim: 6 });
   //$("#"+id).focus();
   $("#"+id).val(" ");
    return false;
  }
}
// 正数，允许录入一位小数，不允许录入0或负数
function check7(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(val!=0){
    if(!reg_check7.test(val)){
      top.layer.msg("正数，允许录入一位小数，不允许录入0或负数", { icon: 5, anim: 6 });
      //$("#"+id).focus();
      $("#"+id).val("");
      return false;
    }
  }else{
    top.layer.msg("正数，允许录入一位小数，不允许录入0或负数", { icon: 5, anim: 6 });
    $("#"+id).val("");
    return false;
  }

}
// 整数，允许录入0，不允许录入小数或负数
function check8(th){
  var val=$(th).val();
  var id=$(th).attr("id");
    if(!reg_check8.test(val)){
      top.layer.msg("正数，允许录入一位小数，不允许录入0或负数", { icon: 5, anim: 6 });
      //$("#"+id).focus();
      $("#"+id).val("");
      return false;
    }
}
// 正数，允许录入小数，不允许录入0或负数
function check9(th){
  var val=$(th).val();
  var id=$(th).attr("id");
  if(val!=0){
    if(!reg_check9.test(val)){
      top.layer.msg("正数，允许录入小数，不允许录入0或负数", { icon: 5, anim: 6 });
      //$("#"+id).focus();
      $("#"+id).val("");
      return false;
    }
  }else{
    top.layer.msg("正数，允许录入小数，不允许录入0或负数", { icon: 5, anim: 6 });
    $("#"+id).val("");
    return false;
  }
}
//
function check10(th){
  var val=$(th).val();
  var id=$(th).attr("id");
    if(!reg_check10.test(val)){
      top.layer.msg("允许录入正数、负数、0", { icon: 5, anim: 6 });
      //$("#"+id).focus();
      $("#"+id).val("");
      return false;
    }
}

//校验检查记录日期是否填写
function checkData(eId , altInfor , eDataId ){
    var pExam4s = $("#"+eId).find("input");//
    var b = true;
    for(var index =0 ; index<pExam4s.length; index++){ //第一步判断表单是否填写完整。
        if(pExam4s[index].value != null  && pExam4s[index].value != "" && pExam4s[index].value != undefined){// 如果其中一个有值，
            b = false;
        }
    }
    if(b==false){  //b=true说明一个值都没有填写，不校验时间是否填写。 b=false说明已经填写内容，校验时间是否填写。
        if($("#"+eDataId).val() == null || $("#"+eDataId).val()  == ""){  // 第二步 表单中已经有值， 判断日期是否填写。如果等于null，说明日期没有填写
            top.layer.msg("请填写"+altInfor+"检查日期");
            return true;
        }
    }

    return false;
}

/**
 * 基本生化指标
 */
function p_e1_1(){
    console.log(obj)
	debugger
	sampCheck('p_e1_1');	
    if (obj.e1_1_min != "null" && $("#p_e1_1").val() < (obj.e1_1_min / 3) && $("#p_e1_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_1_max != "null" && $("#p_e1_1").val() > (obj.e1_1_max * 3) && $("#p_e1_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_2(){
	sampCheck('p_e1_2');
    if (obj.e1_2_min != "null" && $("#p_e1_2").val() < (obj.e1_2_min / 3) && $("#p_e1_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_2_max != "null" && $("#p_e1_2").val() > (obj.e1_2_max * 3) && $("#p_e1_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_3(){
	sampCheck('p_e1_3');
    if (obj.e1_3_min != "null" && $("#p_e1_3").val() < (obj.e1_3_min / 3) && $("#p_e1_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_3_max != "null" && $("#p_e1_3").val() > (obj.e1_3_max * 3) && $("#p_e1_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_4(){
	sampCheck('p_e1_4');
    if (obj.e1_4_min != "null" && $("#p_e1_4").val() < (obj.e1_4_min / 3) && $("#p_e1_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_4_max != "null" && $("#p_e1_4").val() > (obj.e1_4_max * 3) && $("#p_e1_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_5(){
	sampCheck('p_e1_5');
    if (obj.e1_5_min != "null" && $("#p_e1_5").val() < (obj.e1_5_min / 3) && $("#p_e1_5").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_5_max != "null" && $("#p_e1_5").val() > (obj.e1_5_max * 3) && $("#p_e1_5").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_6(){
	sampCheck('p_e1_6');
    if (obj.e1_6_min != "null" && $("#p_e1_6").val() < (obj.e1_6_min / 3) && $("#p_e1_6").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_6_max != "null" && $("#p_e1_6").val() > (obj.e1_6_max * 3) && $("#p_e1_6").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function p_e1_7(){
	sampCheck('p_e1_7');
    if (obj.e1_7_min != "null" && $("#p_e1_7").val() < (obj.e1_7_min / 3) && $("#p_e1_7").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_7_max != "null" && $("#p_e1_7").val() > (obj.e1_7_max * 3) && $("#p_e1_7").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}

/**
 *肝功
 */
function pe181(){
	
	sampCheck('p_e1_8_1');
    console.log(obj)
    if (obj.e1_8_1_min != "null" && $("#p_e1_8_1").val() < (obj.e1_8_1_min / 3)&& $("#p_e1_8_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_8_1_max != "null" && $("#p_e1_8_1").val() > (obj.e1_8_1_max * 3)&& $("#p_e1_8_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe182(){
	sampCheck('p_e1_8_2');
    if (obj.e1_8_2_min != "null" && $("#p_e1_8_2").val() < (obj.e1_8_2_min / 3)&& $("#p_e1_8_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_8_2_max != "null" && $("#p_e1_8_2").val() > (obj.e1_8_2_max * 3)&& $("#p_e1_8_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe183(){
	sampCheck('p_e1_8_3');
    if (obj.e1_8_3_min != "null" && $("#p_e1_8_3").val() < (obj.e1_8_3_min / 3)&& $("#p_e1_8_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_8_3_max != "null" && $("#p_e1_8_3").val() > (obj.e1_8_2_max * 3)&& $("#p_e1_8_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe184(){
	sampCheck('p_e1_8_4');
    if (obj.e1_8_4_min != "null" && $("#p_e1_8_4").val() < (obj.e1_8_4_min / 3)&& $("#p_e1_8_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_8_4_max != "null" && $("#p_e1_8_4").val() > (obj.e1_8_4_max * 3)&& $("#p_e1_8_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe185(){
	sampCheck('p_e1_8_5');
    if (obj.e1_8_5_min != "null" && $("#p_e1_8_5").val() < (obj.e1_8_5_min / 3)&& $("#p_e1_8_5").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_8_5_max != "null" && $("#p_e1_8_5").val() > (obj.e1_8_5_max * 3)&& $("#p_e1_8_5").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}

/**
 *
 肾功+电解质
 */
function pe191(){
	sampCheck('p_e1_9_1');
    if (obj.e1_9_1_min != "null" && $("#p_e1_9_1").val() < (obj.e1_9_1_min / 3)&& $("#p_e1_9_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_9_1_max != "null" && $("#p_e1_9_1").val() > (obj.e1_9_1_max * 3)&& $("#p_e1_9_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe192(){
	sampCheck('p_e1_9_2');
    if (obj.e1_9_2_min != "null" && $("#p_e1_9_2").val() < (obj.e1_9_2_min / 3)&& $("#p_e1_9_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_9_2_max != "null" && $("#p_e1_9_2").val() > (obj.e1_9_2_max * 3)&& $("#p_e1_9_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe193(){
	sampCheck('p_e1_9_3');
    if (obj.e1_9_3_min != "null" && $("#p_e1_9_3").val() < (obj.e1_9_3_min / 3)&& $("#p_e1_9_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_9_3_max != "null" && $("#p_e1_9_3").val() > (obj.e1_9_3_max * 3)&& $("#p_e1_9_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe194(){
	sampCheck('p_e1_9_4');
    if (obj.e1_9_4_min != "null" && $("#p_e1_9_4").val() < (obj.e1_9_4_min / 3)&& $("#p_e1_9_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_9_4_max != "null" && $("#p_e1_9_4").val() > (obj.e1_9_4_max * 3) && $("#p_e1_9_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
/*
血气分析
 */

function pe1101(){
	sampxCheck('p_e1_10_1')
    if (obj.e1_10_1_min != "null" && $("#p_e1_10_1").val() < (obj.e1_10_1_min / 3) && $("#p_e1_10_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_1_max != "null" && $("#p_e1_10_1").val() > (obj.e1_10_1_max * 3) && $("#p_e1_10_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe1102(){
	sampxCheck('p_e1_10_2')
    if (obj.e1_10_2_min != "null" && $("#p_e1_10_2").val() < (obj.e1_10_2_min / 3) && $("#p_e1_10_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_2_max != "null" && $("#p_e1_10_2").val() > (obj.e1_10_2_max * 3) && $("#p_e1_10_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe1103(){
	sampxCheck('p_e1_10_3')
    if (obj.e1_10_3_min != "null" && $("#p_e1_10_3").val() < (obj.e1_10_3_min / 3) && $("#p_e1_10_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_3_max != "null" && $("#p_e1_10_3").val() > (obj.e1_10_3_max * 3) && $("#p_e1_10_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe1104(){
	sampxCheck('p_e1_10_4')
    if (obj.e1_10_4_min != "null" && $("#p_e1_10_4").val() < (obj.e1_10_4_min / 3) && $("#p_e1_10_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_4_max != "null" && $("#p_e1_10_4").val() > (obj.e1_10_4_max * 3) && $("#p_e1_10_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe1105(){
    if (obj.e1_10_5_min != "null" && $("#p_e1_10_5").val() < (obj.e1_10_5_min / 3) && $("#p_e1_10_5").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_5_max != "null" && $("#p_e1_10_5").val() > (obj.e1_10_5_max * 3) && $("#p_e1_10_5").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe1106(){
	sampxCheck('p_e1_10_6')
    if (obj.e1_10_6_min != "null" && $("#p_e1_10_6").val() < (obj.e1_10_6_min / 3) && $("#p_e1_10_6").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e1_10_6_max != "null" && $("#p_e1_10_6").val() > (obj.e1_10_6_max * 3) && $("#p_e1_10_6").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
<!-- 骨形成指标 -->
function pe21(){
    if (obj.e2_1_min != "null" && $("#p_e2_1").val() < (obj.e2_1_min / 3) && $("#p_e2_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e2_1_max != "null" && $("#p_e2_1").val() > (obj.e2_1_max * 3) && $("#p_e2_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe22(){
	sampxCheck('p_e2_2')
    if (obj.e2_2_min != "null" && $("#p_e2_2").val() < (obj.e2_2_min / 3) && $("#p_e2_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e2_2_max != "null" && $("#p_e2_2").val() > (obj.e2_2_max * 3) && $("#p_e2_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe23(){
	sampxCheck('p_e2_3')
    if (obj.e2_3_min != "null" && $("#p_e2_3").val() < (obj.e2_3_min / 3) && $("#p_e2_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e2_3_max != "null" && $("#p_e2_3").val() > (obj.e2_3_max * 3) && $("#p_e2_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe24(){
    if (obj.e2_4_min != "null" && $("#p_e2_4").val() < (obj.e2_4_min / 3) && $("#p_e2_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e2_4_max != "null" && $("#p_e2_4").val() > (obj.e2_4_max * 3) && $("#p_e2_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
<!-- 骨吸收指标 -->

function pe31(){
	sampxCheck('p_e3_1')
    if (obj.e3_1_min != "null" && $("#p_e3_1").val() < (obj.e3_1_min / 3) && $("#p_e3_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e3_1_max != "null" && $("#p_e3_1").val() > (obj.e3_1_max * 3) && $("#p_e3_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe32(){
	sampxCheck('p_e3_2')
    if (obj.e3_2_min != "null" && $("#p_e3_2").val() < (obj.e3_2_min / 3) && $("#p_e3_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e3_2_max != "null" && $("#p_e3_2").val() > (obj.e3_2_max * 3) && $("#p_e3_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
<!-- 性激素水平 -->
function pe41(){
    if (obj.e4_1_min != "null" && $("#p_e4_1").val() < (obj.e4_1_min / 3) && $("#p_e4_1").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e4_1_max != "null" && $("#p_e4_1").val() > (obj.e4_1_max * 3) && $("#p_e4_1").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe42(){
    if (obj.e4_2_min != "null" && $("#p_e4_2").val() < (obj.e4_2_min / 3) && $("#p_e4_2").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e4_2_max != "null" && $("#p_e4_2").val() > (obj.e4_2_max * 3) && $("#p_e4_2").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe43(){
    if (obj.e4_3_min != "null" && $("#p_e4_3").val() < (obj.e4_3_min / 3) && $("#p_e4_3").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e4_3_max != "null" && $("#p_e4_3").val() > (obj.e4_3_max * 3) && $("#p_e4_3").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}
function pe44(){
    if (obj.e4_4_min != "null" && $("#p_e4_4").val() < (obj.e4_4_min / 3) && $("#p_e4_4").val()!= ''){
        alert("检测结果低于参考值范围下限的三分之一，是否确认继续填写？");
    }
    if (obj.e4_4_max != "null" && $("#p_e4_4").val() > (obj.e4_4_max * 3) && $("#p_e4_4").val()!= ''){
        alert("检测结果高于参考值范围上限的三倍，是否确认继续填写？");
    }
}



function getFormData(clazzs){
  var obj = new Object;
  var checks = $(clazzs).find("input[type='radio'] ,input[type='checkbox'] ");
   $.each(checks , function(index , ckObj){
      if($(ckObj).is(":checked")){
       obj[$(ckObj).attr('name')] = $(ckObj).val();
      }
     
   });
 
   var texts = $(clazzs).find("input[type='text']");
   $.each(texts , function(index , text){ 
      obj[$(text).attr('name')] = $(text).val();
   });
   return obj;
}


function sampCheck(id){
	var val=$("#"+id).val()
	
	debugger
	if(val !='0'){
		if(val.indexOf('0') == 0){
			if(val.indexOf('.') !=1){
				top.layer.msg("请输入正确数值!")
				$("#"+id).val('');
				return false;
			}
		}
	}
	

	var reg=/^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/;
	if(!reg.test(val)){
     top.layer.msg("该字段不允许录入负数,请重新填写!")
	 $("#"+id).val('');
	 return false;
	}
	return true;
	
}

function sampxCheck(id){
	var val=$("#"+id).val()
	var reg=/^[0-9]\d{1,1}$|^[0-9]\d{1,1}$|^[0-9]+(.?\d{1,2})?$|^[0-9]\d+(.?\d{1,2})?$/;
	if(val =='0'){
	top.layer.msg("该字段仅允许录入小数点后两位,且不允许录入负数和零,请重新填写!")
	$("#"+id).val('');
	return false;	
	}
	if(val !='0'){
		if(val.indexOf('0') == 0){
			if(val.indexOf('.') !=1){
				top.layer.msg("请输入正确数值!")
				$("#"+id).val('');
				return false;
			}
		}
	}
	
	if(!reg.test(val)){
	 top.layer.msg("该字段仅允许录入小数点后两位,且不允许录入负数和零,请重新填写!")
	 $("#"+id).val('');
	 return false;
	}
	return true;
	
}