var userJson, dgId;
var start1 = new Date(),
    end1 = new Date();
$(function() {
    //initHeight(); 
    //var form = new CybVerification.Form("p_patientFormtb1");
    if (sessionStorage.getItem("gender") == '2') {
        $("#p_gender").show();
    } else {
        $("#p_gender").hide();
    }
    // $("body").prepend('<input type="text" id="focus" size="1" style="filter: alpha(opacity:0);opacity: 0;">');
    // $("body").prepend('<div id="focus" style="filter: alpha(opacity:0);opacity: 0;">');
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title);
        $("#p_docName").val(localStorage.getItem("realname"));
        //ajaxCommon("appointment/editAppointmentInforPage",{"pid":userJson.pid},initAppointmentText,"","");
        ajaxCommon("diagnose/zdDateRegion", { "pid": userJson.pid, "dgId": userJson.dgId }, initZdDate, "", "");
        if (userJson.type == "update" || userJson.uType == "update") {
            ajaxCommon("diagnose/editDiagnose", { "pid": userJson.pid, "dgId": userJson.dgId }, initForm, "", "");
        } else {
            ajaxCommon("diagnose/dgCount", { "pid": userJson.pid, "dgId": userJson.dgId }, initDgCount, "", "");
        }
    }
    // initBlDate();
    nullChange(".p_check_null");
    yesChange(".p_check_yes");
    othersChange(".p_others");
    othersRadioChange(".p_radio_others");
    // 未检查 select change事件
    nullSelectChange('.p_select_null');
    // 初始化 select 未检查 未勾选事件
    initNullSelectChange('.p_select_null');
    othersSelChange(".p_others_sel");
    otherSelectChange(".p_other_select");
    notOrYesChange(".p_checkbox", "h2_disease");
    allSelChange(".p_h3_checkbox");
    initNotOrYes(".p_checkbox");
    initradioNotOrYes(".p_radiobox");
    radioNotOrYes(".p_radiobox");
    initGender('.p_gender');
    // 是否遵医嘱用药
    radioSel('.radioSel');
    initRadioSel('.radioSel');
    selePoint("#myTab", userJson.href);
    checkSelect(".p_check_select");
    selectDirection(".p_select_direction");
    othersEquipment("#p_d_d_1");
    $("#p_dose").bind('input propertychange', function() {
        var val = $(this).val();
        if (val) {
            $(".p_page7_dose_2").val(val);
            $(".p_page7_dose_2").prop('checked', 'checked');
        } else {
            $(".p_page7_dose_2").val(1);
        }
    });
    $("input[name='dose']").change(function() {
        if ($(this).val() == 1) {
            $("#p_dose").val("");
        }
    })
    $("input.p_radio_checkbox").each(function() {
        $(this).click(function() {
            if ($(this).prop('checked')) {
                $('input.p_radio_checkbox').prop('checked', false);
                $(this).prop('checked', true);
                if ($(this).prop('name') == "d_e" || $(this).prop('name') == "d_f") {
                    $("#p_d_e_f_note").removeProp("readonly");
                    $("#p_d_e_f_note").parent().show();
                    $("#p_d_e_f_note").attr("check", "required");
                    $("#p_d_z").val("");
                    $("#p_d_z").hide();
                    $("#p_d_z").removeAttr("check");
                } else {
                    $("#p_d_e_f_note").parent().hide();
                    $("#p_d_e_f_note").prop("readonly", "readonly");
                    $("#p_d_e_f_note").removeAttr("check");
                    $("#p_d_e_f_note").val("");
                    $("#p_d_z").val("");
                    $("#p_d_z").hide();
                    $("#p_d_z").removeAttr("check");
                }

                //$(".p-ctr-b-zlju").hide();

                //d_c原发性骨质疏松,  d_d原发性骨质疏松症伴病理性骨折 王英海新增
               //d_e 继发性骨质疏松症 d_f继发性骨质疏松症伴病理性骨折 *导致骨质疏松的疾病
              // if($(this).prop('name') == "d_d" || $(this).prop('name') == "d_f"  ){
                 //  $(".gz-infor").show()
              //     $("tr[class*='-other']").hide(); 
             //  }  
             //  owner.clearData(".p-ctr-b-zlju");//不管点击什么，都需要把数据清理掉
            }
        });
    });
    initDate($(".p_birthday"), "", "");

    $('#p_nextDate').datetimepicker("setDate", new Date(parseInt('7776000000') + new Date().getTime()));
});
//  初始化就诊次数
function initDgCount(el, data) {
    $("#p_diagnosisNum").val(data.count);
    $("#p_height").val(data.height);
    $("#p_weight").val(data.weight);
    $("#p_BMI").val(data.BMI)
    $("#p_g2_a").val(data.g2_a)
    $("#p_g2_a_age").val(data.g2_a_age)
    $("#p_g2_b").val(data.g2_b)
    $("#p_g2_b_age").val(data.g2_b_age)
    $("#p_g2_b_note").val(data.g2_b_note)
    if (data.g2_a == 1) {
        $(".jj").show()
    }
    if (data.g2_b == 1) {
        $(".tj").show()
    }
}
// 初始化诊断时间
function initZdDate(el, data) {
    var startTime = data.startTime ? new Date(data.startTime) : "";
    var endTime = data.endTime ? new Date(data.endTime) : new Date();
    $(".p_zddate").datetimepicker({
        language: "zh-CN",
        use24hours: false,
        minView: "month",
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        startDate: startTime,
        endDate: endTime,
    });
}
// 根据男女进行婚育史的显示隐藏p_gender
function initGender(el) {
    var gender = sessionStorage.getItem("gender");
    if (gender == 1 || gender==2) {
        $(el).hide();
    } else {
        $(el).show();
    }
}
// 是否绝经的选中事件
function otherSelectChange(el) {
    $(el).change(function() {
        var name = $(this).attr("name");
        var id = $(this).attr("id");
        if (name == "diagnoseDrug") {
            if ($(this).val() == 1 || $(this).val() == "") {
                $(this).parent().parent().nextAll().hide();
                //$(this).nextAll().find("input").removeAttr("check");
                $(this).parent().parent().nextAll().find("input").val("");
            } else {
                $(this).parent().parent().nextAll().show();
                // $(this).nextAll().find("input").attr("check","required");
            }
        } else {
            if ($(this).val() == "" || $(this).val() == "0") {
                $(this).parent().next().hide();
                $(this).parent().parent().parent().find("." + id + "_box").hide();
                $(this).parent().next().find("input").removeAttr("check");
                $(this).parent().next().find("input").val("");
            } else {
                $(this).parent().next().show();
                $(this).parent().parent().parent().find("." + id + "_box").show();
                $(this).parent().next().find("input").attr("check", "required");
            }
        }

    });

    $.each($(el), function() {
        var name = $(this).attr("name");
        var id = $(this).attr("id");
        if (name == "diagnoseDrug") {
            if ($(this).val() == 1 || $(this).val() == "") {
                $(this).parent().parent().nextAll().hide();
                //$(this).nextAll().find("input").removeAttr("check");
                $(this).parent().parent().nextAll().find("input").val("");
            } else {
                $(this).parent().parent().nextAll().show();
                // $(this).nextAll().find("input").attr("check","required");
            }
        } else {
            if ($(this).val() == "" || $(this).val() == "0") {
                $(this).parent().next().hide();
                $(this).parent().parent().parent().find("." + id + "_box").hide();
                $(this).parent().next().find("input").removeAttr("check");
                $(this).parent().next().find("input").val("");
            } else {
                $(this).parent().next().show();
                $(this).parent().parent().parent().find("." + id + "_box").show();
                $(this).parent().next().find("input").attr("check", "required");
            }
        }
    })
}
// 初始化预约信息
function initAppointmentText(el, data) {
    $("#p_appointmentText").val(data);
    $("#p_appointmentText").after(data);
    ajaxCommon("diagnose/editDiagnose", { "pid": userJson.pid, "dgId": userJson.dgId }, initForm, "", "");

}

//新增骨折史事件
function h3ch(val){
     var chenckval= val.value;
	 if(chenckval == '1'){
		 $(".gz-infor").show()
		 $("tr[class*='-other']").hide(); 
	 }else{
		$(".gz-infor").hide()
		$(".gzbw-1").hide()
		$(".gzbw-2").hide()
		$(".gzbw-3").hide()
		$("tr[class*='-other']").hide(); 
	 }
	   owner.clearData(".p-ctr-b-zlju");
}


// 公用ajax
function ajaxCommon(url, data, callback, el, id) {
    $("#addPatientFrom").publicAjax({
        url: globalUrl + url,
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
// 点击选中 无 其子集隐藏
function nullChange(el) {
    $(el).change(function() {
        if ($(this).is(':checked')) {
            $(this).parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().next().find("input[type='text']").val("0");
            $(this).parent().parent().next().find("input[type='number']").val("0");
            $(this).parent().parent().next().hide();
        } else {
            $(this).parent().parent().next().show();

        }
    })
}
// 是否既往体健
function yesChange(el) {
    $(el).change(function() {
        if ($(this).is(':checked')) {
            $(this).parent().nextAll().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().nextAll().find("input[type='text']").val("0");
            $(this).parent().nextAll().find("input[type='number']").val("0");
            $(this).parent().nextAll().hide();
        } else {
            $(this).parent().nextAll().show();

        }
    })
}
// 点击其他激活input 输入框
function othersChange(el) {
    $(el).change(function() {
        if ($(this).is(":checked")) {
            $(this).nextAll().removeProp("readonly");
        } else {
            $(this).nextAll().prop("readonly", "readonly");
            $(this).nextAll().val("");
        }
    })
}

function othersRadioChange(el) {
    $(el).change(function() {
        if ($(this).is(":checked")) {
            $(this).nextAll().removeProp("readonly");
            $(this).nextAll().show();
            $(this).nextAll().attr("check", 'required');
        } else {
            $(this).nextAll().prop("readonly", "readonly");
            $(this).nextAll().hide();
            $(this).nextAll().removeAttr("check");
            $(this).nextAll().val("");
        }
    });

    $.each($(el), function() {
        if ($(this).next().val() != 0) {
            $(this).prop("checked", "checked");
            $(this).next().removeProp("readonly");
            $(this).next().show();
            $(this).nextAll().attr("check", 'required');

        } else {
            $(this).removeProp("checked");
            $(this).next().prop("readonly", "readonly");
            $(this).nextAll().removeAttr("check");
            $(this).next().hide();
        }
    })
}

function othersSelChange(el) {
    $(el).change(function() {
        if ($(this).is(":checked")) {
            $(this).nextAll().removeProp("disabled");
        } else {
            $(this).nextAll().prop("disabled", "disabled");
            $(this).nextAll().val("0");
        }
    })
}
// 点击确定提交数据
function submitUpdate(type, el) {
    var data, url, callback, json, id ,excludeClass=""; //排除的class 
    var DGID;
    if (userJson.dgId) {
        DGID = userJson.dgId;
    } else {
        DGID = dgId;
    }
    switch (type) {
        case "page6":
            if ($("#p_h1_check").val() == 1) {
                if (!$("#p_h1_a").val()) {
                    top.layer.msg("请填写本次健康量表");
                    return false;
                }
            }
            var healthData = {
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "health": {
                    "h1_check": $("#p_h1_check").val(),
                    "h1_a": $("#p_h1_a").val()
                },
                "adrsbtn": {
                    "d_2": $("#d_2").val(),
                    "getbadList": getHistoryArr('#adrshow'),
                } 
            }
            console.log($("#p_serious").serializeObject())
            data = $.extend($("#p_page6").serializeObject(), healthData);
            url = 'diagnose/optFollowUp';
            json = {
                "pid": userJson.pid,
                "apid": userJson.apid,
                "dgtype": 2,
                "apid": userJson.apid,
                "dgId": DGID,
                "height": $("#p_height").val(),
                "weight": $("#p_weight").val(),
                "bmi": $("#p_BMI").val(),
                "zddate": $("#p_zddate").val(),
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "page1": JSON.stringify(data),
            };
            var gender = sessionStorage.getItem("gender");
            if (gender == 1 || gender==2) {
                id = "page8";
            } else {
                id = "page8";
            }
            break;
        case "page7":
            data = { "genetic_2": $("#p_genetic_2").serializeObject() };

            url = 'diagnose/optFollowUp';
            json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": 2, "apid": userJson.apid, "dgId": DGID, "page3": JSON.stringify(data) };
            id = "page8";
            break;
        case "page8":
            data = {
                "d_diagnose": {
                    "d_d_a": {
                        "d_d_check": $("#p_d_d_check").val(),
                        "d_d_date": $("#p_d_d_date").val(),
                        "d_d_1": $("#p_d_d_1").val(),
                        "d_d_1_z": $("#p_d_d_1_z ").val(),
                        "d_d_2": $("#p_d_d_2").serializeObject(),
                        "d_d_3": $("#p_d_d_3").serializeObject(),
                        "d_d_4": $("#p_d_d_4").serializeObject(),
                    },
                    "history_3": {
                        "h3_check": $("#p_h3_check").val(),
                        "lastNum_check": $("#p_lastNum_check").val(),
                        "h3_lastyear": $("#p_h3_lastyear").val(),
                        "h3_fracture": getHistoryArr('#p_page2_tb4'),
                    },

                },
                "diagnose": $("#p_diagnose").serializeObject(),
                "zdtype": 1, //getzdType("#p_diagnose")
                "docName": $("#p_docName").val(),
                "zddate": $("#p_zddate").val(),
                //"nextDate":$("#p_nextDate").val()
                "qct":{},
                "diagnoseGzbw":{},
            };

            var qctData = owner.getFormData(".in-qct-form-data");
            if(qctData.qct3 != "0"){ //如果勾选的不是其他型号，排除其他型号的填写的值
                excludeClass +="exclude-qct-other,"; 
            }
            qctData.qct1 = $("input[type=radio][name=qct1]:checked").val()==null?"":$("input[type=radio][name=qct1]:checked").val();
            data.qct = qctData;
            data.diagnoseGzbw =  owner.getFormData(".p-ctr-b-zlju");
            //勾选了 原发、继发骨脂疏松症病理性骨折 
            excludeClass += owner.excludeValidata();
            //判断 QCT骨密度检查 是否勾选 是 == 1
            if( qctData.qct1 != "1"){ // 
                excludeClass += "in-qct-form-data,"; //勾选否，就排除qct部分数据的校验功能
            }
			
			
			      
			
			
			
			var page2_tb4=getHistoryArr('#p_page2_tb4')
			var qtid =document.getElementById('Qtid')
			
			if(qtid !=null && qtid !=undefined){
                if(qtid.checked){
                    
                    if(page2_tb4[0].h3_z== ""){
                    top.layer.msg("请填写其他骨折部位描述信息",{ icon: 5, anim: 6 })
                    return false
                    }
                }		 
			}
				
			
			var dd3= $("#p_d_d_3").serializeObject();
			debugger
			var d_d2checkval=$("#p_d_d_3").serializeObject();
			if(d_d2checkval.d_d3_check1==1){
				console.log("关闭app随诊dax腰椎校验")
			//  if(dd3.d_d3_13=="" && dd3.d_d3_14=="" && dd3.d_d3_15=="" && dd3.d_d3_23=="" ){
			// 	 if( dd3.d_d3_16 == "" && dd3.d_d3_17=="" && dd3.d_d3_18=="" && dd3.d_d3_24==""){
			// 		 top.layer.msg("DXA检查部分里腰椎里的L1-L4和L2-L4至少需要填写其中一个",{ icon: 5, anim: 6 })
			// 		 return false;
					 
			// 		  if(dd3.d_d3_16 != "" && dd3.d_d3_17=="" && dd3.d_d3_18==""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18 !=""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		 }else if(dd3.d_d3_16 == "" || dd3.d_d3_17 !="" || dd3.d_d3_18 !=""){
			// 		 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 		 					 return false;
			// 		              }
					 
			// 	 }else if(dd3.d_d3_16 != "" && dd3.d_d3_17=="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			//              }
				 
				
			//  }// }
			//  else if(dd3.d_d3_16 == "" && dd3.d_d3_17=="" && dd3.d_d3_18=="" && dd3.d_d3_24 !=""){
			// 			 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 			 return false;}
			
			// else if(dd3.d_d3_16 != "" && dd3.d_d3_17=="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 !="" && dd3.d_d3_18==""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 != "" && dd3.d_d3_17 =="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18 !=""){
			// 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }
			
			
			// else if(dd3.d_d3_13=="" || dd3.d_d3_14=="" || dd3.d_d3_15==""){
			//     top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			//     return false;
			// }else if(dd3.d_d3_13 != "" && dd3.d_d3_14 =="" && dd3.d_d3_15 ==""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_13 == "" && dd3.d_d3_14 !="" && dd3.d_d3_15==""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_13 == "" && dd3.d_d3_14 =="" && dd3.d_d3_15 !=""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_13 != "" && dd3.d_d3_14 !="" && dd3.d_d3_15 ==""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_13 != "" && dd3.d_d3_14 =="" && dd3.d_d3_15 !=""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// }else if(dd3.d_d3_13 == "" && dd3.d_d3_14 !="" && dd3.d_d3_15 !=""){
			// 					 top.layer.msg("L1-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
			// 					 return false;
			// } 
			
			}
			
            var zdtype;
            if ($("#p_d_c").is(":checked") || $("#p_d_d").is(":checked")) {
                zdtype = 1;
            } else if ($("#p_d_e").is(":checked") || $("#p_d_f").is(":checked")) {
                zdtype = 2;
            } else if ($("#p_d_z_check").is(":checked")) {
                zdtype = 3;
            }
            url = 'diagnose/optFollowUp';
            json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": 2, "apid": userJson.apid, "dgId": DGID, "zdtype": zdtype, "zddate": $("#p_zddate").val(), "page4": JSON.stringify(data) };
            id = "page9";
            break;
        default:
            break;
    }

    // var form = new CybVerification.FirstVisitForm(el);
    // var state = form.submit(excludeClass);
    //if (state) {
        // clearInterval(TIME);  // 先清除掉原来的定时器
        // TIME = setInterval(getMsgNum,3000);  // 开启定时器 名字  TIME 
        ajaxCommon(url, json, initHtml, '#myTab', id);
        $("#focus").focus();

    //}
}
//暂存数据
function submitzc(type, el) {
    var data, url, callback, json, id;
    // var form = new CybVerification.FirstVisitForm(el);
    // var state = $(el).submit();
    var DGID;
    if (userJson.dgId) {
        DGID = userJson.dgId;
    } else {
        DGID = dgId;
    }
    switch (type) {
        case "page6":
            // if ($("#p_h1_check").val() == 1) {
            //     if (!$("#p_h1_a").val()) {
            //         top.layer.msg("请填写本次健康量表");
            //         return false;
            //     }
            // }
            // var fractureRate = $("#p_fractureRate").val()
            // var osteoporticFracture = $("#p_osteoporticFracture").val()
            // if (Number(fractureRate) > Number(osteoporticFracture)) {
            //     top.layer.msg("未来10年髋部骨折概率不得大于未来10年主要骨质疏松性骨折概率，请核对！");
            //     return false;
            // }
            var healthData = {
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "isDensity": $("#p_isDensity").val(),
                "health": {
                    "h1_check": $("#p_h1_check").val(),
                    "h1_a": $("#p_h1_a").val()
                },
                "adrsbtn": {
                    "d_2": $("#d_2").val(),
                    "getbadList": getHistoryArr('#adrshow'),
                }
                // "adrsbtn": {
                //     "d_2": $("#d_2").val(),
                //     "d_2_note": $("#d_2_note").val(),
                //     "d_3": $("#d_3").val(),
                //     "d_2_date": $("#d_2_date").val(),
                //     "d_4_7": $("#d_4_7").val(),
                //     "d_4_7_note": $("#d_4_7_note").val(),
                //     "d_5": $("#d_5").val(),
                //     "serious": $("#p_serious").serializeObject(),
                // }
            }
            data = $.extend($("#p_page6").serializeObject(), healthData);
            url = 'diagnose/optFollow';
            json = {
                "pid": userJson.pid,
                "apid": userJson.apid,
                "dgtype": 2,
                "apid": userJson.apid,
                "dgId": DGID,
                "height": $("#p_height").val(),
                "weight": $("#p_weight").val(),
                "bmi": $("#p_BMI").val(),
                "zddate": $("#p_zddate").val(),
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "isDensity": $("#p_isDensity").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "page1": JSON.stringify(data),

            };

            var gender = sessionStorage.getItem("gender");
            if (gender == 1 || gender==2) {
                id = "page8";
            } else {
                id = "page7";
            }
            break;
        case "page7":
            // data={
            //   "movement_1":{
            //     "dose":$("input[name='dose']:checked").val(),
            //     "improvement":$("#p_improvement").serializeObject(),
            //   },
            //   "movement_a":$("input[name='movement_a']:checked").val() ? $("input[name='movement_a']:checked").val() : "",
            //   "movement_b":$("input[name='movement_b']:checked").val() ? $("input[name='movement_b']:checked").val() : "",
            //   "history_3":{
            //     "h3_fracture":getHistoryArr('#p_page2_tb4'),
            //   },
            // }
            data = { "genetic_2": $("#p_genetic_2").serializeObject() };
            url = 'diagnose/optFollow';
            json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": 2, "apid": userJson.apid, "dgId": DGID, "page3": JSON.stringify(data) };
            id = "page8";
            break;
        case "page8":
            data = {
                "d_diagnose": {
                    "d_d_a": {
                        "d_d_check": $("#p_d_d_check").val(),
                        "d_d_date": $("#p_d_d_date").val(),
                        "d_d_1": $("#p_d_d_1").val(),
                        "d_d_1_z": $("#p_d_d_1_z ").val(),
                        "d_d_2": $("#p_d_d_2").serializeObject(),
                        "d_d_3": $("#p_d_d_3").serializeObject(),
                        "d_d_4": $("#p_d_d_4").serializeObject(),
                    },
                    "history_3": {
                        "h3_check": $("#p_h3_check").val(),
                        "lastNum_check": $("#p_lastNum_check").val(),
                        "h3_lastyear": $("#p_h3_lastyear").val(),
                        "h3_fracture": getHistoryArr('#p_page2_tb4'),
                    },

                },
                "diagnose": $("#p_diagnose").serializeObject(),
                "zdtype": 1, //getzdType("#p_diagnose")
                "docName": $("#p_docName").val(),
                "zddate": $("#p_zddate").val(),
                //"nextDate":$("#p_nextDate").val()
                "qct":{},
                "diagnoseGzbw":{},  //新增的诊断 骨折部位
            };

            var qctData = owner.getFormData(".in-qct-form-data"); 
           qctData.qct1 = $("input[type=radio][name=qct1]:checked").val()==null?"":$("input[type=radio][name=qct1]:checked").val();
            data.qct = qctData;
            data.diagnoseGzbw = owner.getFormData(".p-ctr-b-zlju");//新增诊断骨折部位

            var zdtype;
            if ($("#p_d_c").is(":checked") || $("#p_d_d").is(":checked")) {
                zdtype = 1;
            } else if ($("#p_d_e").is(":checked") || $("#p_d_f").is(":checked")) {
                zdtype = 2;
            } else if ($("#p_d_z_check").is(":checked")) {
                zdtype = 3;
            }
            url = 'diagnose/optFollow';
            json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": 2, "apid": userJson.apid, "dgId": DGID, "zdtype": zdtype, "zddate": $("#p_zddate").val(), "page4": JSON.stringify(data) };
            id = "page9";
            break;
        default:
            break;
    }
    //if (state) {
        //clearInterval(TIME);  // 先清除掉原来的定时器
        //TIME = setInterval(getMsgNum,3000);  // 开启定时器 名字  TIME
        ajaxCommon(url, json, initzcHtml, '#myTab', id);
        $("#focus").focus();
    //}
}
// 其他检查设备
function othersEquipment(el) {
    $(el).change(function() {
        var val = $(this).val();
        if (val == "3") {
            $(this).parent().parent().next().show();
            $(this).parent().parent().next().find('input[type="text"]').attr("check", "required");
        } else {
            $(this).parent().parent().next().hide();
            $(this).parent().parent().next().find('input[type="text"]').removeAttr("check");
            $(this).parent().parent().next().find('input[type="text"]').val("");
        }
    });
    //  初始化
    $.each($(el), function() {
        var val = $(this).val();
        if (val == "3") {
            $(this).parent().parent().next().show();
            $(this).parent().parent().next().find('input[type="text"]').attr("check", "required");
        } else {
            $(this).parent().parent().next().hide();
            $(this).parent().parent().next().find('input[type="text"]').removeAttr("check");
            $(this).parent().parent().next().find('input[type="text"]').val("");
        }
    })
}
// 计算 BMI
function countBmi(th) {
    var height = $("#p_height").val();
    var weight = $("#p_weight").val();
    if (height && weight) {
        var bmiResult = (weight / ((height / 100) * (height / 100))).toFixed(2);
        $("#p_BMI").val(bmiResult);
        $("input[name='BMI']").val(bmiResult);
    } else {
        //layer.msg("请认真填写身高以及体重！！！");
    }
}

function initHtml(el, data, id) {
    console.log(data, "asdasda")
    if (id == "page9") {
        //parent.location.reload();
        var json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": userJson.dgtype, "dgId": data.dgId, "title": userJson.title, "type": "info" };
        window.open(src + "/p_followupInfo.html?pid=" + JSON.stringify(json), "_self");
    } else {
        dgId = data.dgId;
        $(el).find('a[href="#' + id + '"]').tab('show');
        // var gender=sessionStorage.getItem("gender");
        // if(gender==1){
        //   $(el).find('a[href="#page8"]').tab('show');
        // }else{
        //   $(el).find('a[href="#'+id+'"]').tab('show');
        // }
    }
}
// 暂存
function initzcHtml(el, data, id) {
    console.log(data, "asdasda")
    if (id == "page9") {
        //parent.location.reload();
        var json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": userJson.dgtype, "dgId": data.dgId, "title": userJson.title, "type": "info" };
        window.open(src + "/p_followupForm.html?pid=" + JSON.stringify(json), "_self");
    } else {
        dgId = data.dgId;
        $(el).find('a[href="#' + id + '"]').tab('show');
        // var gender=sessionStorage.getItem("gender");
        // if(gender==1){
        //   $(el).find('a[href="#page8"]').tab('show');
        // }else{
        //   $(el).find('a[href="#'+id+'"]').tab('show');
        // }
    }
}
// 点击返回按钮返回
function backLeft() {
    var json = JSON.stringify({ "pid": userJson.pid, "page": "p_page1" });
    //fram.src="./p_diagnosisForm.html?pid="+json;//Iframe--SRC
    var src = "./p_diagnosis.html?pid=" + json;
    window.open(src, '_self');
}
// 数据回显
function initForm(el, data) {
    // console.log(data, "这是数据吗")
    var abc = data.storage 
    var arr1 = abc.split("")
    $.each(arr1, function(si, ki) {
        console.log(arr1, "啊送发票佛【【啊【佛奥")
        if (arr1[0] == 1) {
            $("#page6 .zcBtn").hide()
        } else {
            // $("#home .zcBtn,#page2 .zcBtn,#page3 .zcBtn,#page4 .zcBtn").show()
            $("#page6 .zcBtn").show()
        }
        if (arr1[2] == 1) {
            $("#page7 .zcBtn").hide()
        } else {
            $("#page7 .zcBtn").show()
        }
        if (arr1[3] == 1) {
            $("#page8 .zcBtn").hide()
        } else {
            $("#page8 .zcBtn").show()
        } 
    })
    //用于回显健康量表勾选的数据
    if(data.fallRiskAssessment){   $("#morseResult").text(data.fallRiskAssessment); }
    $.each(data, function(name, value) {
        if (isString(value) && value != "") {
            if (name == "page1" || name == "page2" || name == "page3" || name == "page4" || name == "page5") {
                var cData = JSON.parse(value);
                if(name == "page4"){  
                    //如果 QCT骨密度检查勾选 是   则显示
                    if(cData.hasOwnProperty('qct')  && cData.qct && cData.qct.qct1 == '1'){
                         $(".in-qct-form-data").show();
                    } 
                }

                $.each(cData, function(name1, value1) {
                    $("input[type='radio'][name='" + name1 + "'][value='" + value1 + "']").prop("checked", true);
                    $("input[type='checkbox'][name='" + name1 + "'][value='" + value1 + "']").prop("checked", true);
                    $("input[type='hidden'][name='" + name1 + "']").val(value1);
                    $("select[name='" + name1 + "'] option[value='" + value1 + "']").prop("selected", "selected");
                    if (cData.isFrax == 1) {
                        $("#fraxShow").show()
                        $("#fraxShow input").attr("check", "required")
                    } else {
                        $("#fraxShow").hide()
                        $("#fraxShow input").removeAttr("check", "required")
                    }
                    //console.log("1:"+name1+":"+value1);

                    if (isObject(value1)) {
                        $.each(value1, function(name2, value2) {
                            //王英海新增的代码20220325 用户checkbox回显 开始
                            $("input[type='checkbox'][name='" + name2 + "'][value='" + value2 + "']").prop("checked", true);
                            //王英海新增的代码20220325 用户checkbox回显 结束
                            // console.log("2:"+name2+":"+value2);
                            if (name2 == "h1_a") {
                                if (value2 != "无") {
                                    var h2Val = value2.split(";");
                                    for (var hIndex = 0; hIndex < h2Val.length; hIndex++) {
                                        $("#p_" + name + "_" + name2 + "_" + hIndex).text(h2Val[hIndex]);
                                    }
                                } else {
                                    for (var hhIndex = 0; hhIndex < 5; hhIndex++) {
                                        $("#p_" + name + "_" + name2 + "_" + hhIndex).text("无");
                                    }
                                }

                            }
                            $("input[type='radio'][name='" + name2 + "'][value='" + value2 + "']").prop("checked", true);
                            $("input[type='hidden'][name='" + name2 + "']").val(value2);
                            $("input[type='text'][name='" + name2 + "']").val(value2);
                            $("input[type='number'][name='" + name2 + "']").val(value2);
                            $("select[name='" + name2 + "'] option[value='" + value2 + "']").prop("selected", "selected");
                            $("textarea[name='" + name2 + "']").val(value2);
                            if (value2 == "1") {
                                $("#p_" + name2).prop("checked", true);
                            } else {
                                $("#p_" + name2).removeProp("checked");
                            }
                            if (isObject(value2)) {
                                $.each(value2, function(name3, value3) {

                                    //console.log("3:"+name3+":"+value3);
                                    $("input[type='radio'][name='" + name3 + "'][value='" + value3 + "']").prop("checked", true);
                                    $("input[type='checkbox'][name='" + name3 + "'][value='" + value3 + "']").prop("checked", true);
                                    $("select[name='" + name3 + "'] option[value='" + value3 + "']").prop("selected", "selected");
                                    $("input[type='number'][name='" + name3 + "']").val(value3);
                                    if (value3 == "1") {
                                        $("#p_" + name3).prop("checked", true);
                                    } else {
                                        $("#p_" + name3).removeProp("checked");
                                        $("input[type='text'][name='" + name3 + "']").val(value3);
                                        $("input[type='number'][name='" + name3 + "']").val(value3);
                                        $("select[name='" + name3 + "'] option[value='" + value3 + "']").prop("selected", "selected");
                                    }

                                    if (isObject(value3)) {
                                        $.each(value3, function(name4, value4) {
                                            //console.log("4:"+name4+":"+value4);
                                            $("input[type='radio'][name='" + name4 + "'][value='" + value4 + "']").prop("checked", true);
                                            $("input[type='checkbox'][name='" + name4 + "'][value='" + value4 + "']").prop("checked", true);
                                            $("select[name='" + name4 + "'] option[value='" + value4 + "']").prop("selected", "selected");
                                            $("input[type='number'][name='" + name4 + "']").val(value4);
                                        })
                                    } else if (isArray(value3)) {
                                        if (name3 == 'h3_fracture') {
                                            initfracturHistory("h3_fracture", value3);


                                        }
                                        if (name3 == "getbadList") {
                                            initbadStatus("badStatus", value3);
                                        }
                                    }
                                })
                            } else if (isArray(value2)) {
                                if (name2 == 'h3_fracture') {
                                    initfracturHistory("h3_fracture", value2);
                                }
                                if (name2 == "getbadList") {
                                    initbadStatus("badStatus", value2);
                                }
                            }
                        });
                    } else {
                        $("input[type='text'][name='" + name1 + "']").val(value1);
                        $("input[type='number'][name='" + name1 + "']").val(value1);
                        $("textarea[name='" + name1 + "']").val(value1);
                    }
                });
            }
        }
    });

    initShowByData();//wyhai20220316
    owner.initByInDomVal();

    initNullChange(".p_check_null");
    othersRadioChange(".p_radio_others");
    // initNullChange(".p_check_null");
    initNotOrYes(".p_checkbox");
    initradioNotOrYes(".p_radiobox");
    initNullSelectChange(".p_select_null");
    otherSelectChange(".p_other_select");
    var g1 = $("#p_dose").val();
    zyx1 = $("#d_3").val();
    zyx2 = $("#d_4_7").val();
    zyx3 = $("#d_2").val();
    if (zyx1 == "2") {
        $("#d3show").show();
    }
    if (zyx2 == "1") {
        $("#d_4_7_note").show();
    }
    if (zyx3 == "1") {
        $("#adrshow").show();
        $("#addButton").removeProp("disabled");
        $("#thisAdrs").addClass("check");
        $("#thisAdrs").attr("check", "adrs")
    }
    if (g1) {
        $(".p_page7_dose_2").prop('checked', 'checked');
    } else {
        $(".p_page7_dose_2").removeProp('checked');
        checkSelect(".p_check_select");
        selectDirection(".p_select_direction");
    }
    $("input.p_radio_checkbox").each(function() {
        if ($(this).prop('checked')) {
            $('input.p_radio_checkbox').prop('checked', false);
            $(this).prop('checked', true);
            if ($(this).prop('name') == "d_e" || $(this).prop('name') == "d_f") {
                $("#p_d_e_f_note").removeProp("readonly");
                $("#p_d_e_f_note").parent().show();
                $("#p_d_e_f_note").attr("check", "required");
            } else {
                $("#p_d_e_f_note").parent().hide();
                $("#p_d_e_f_note").prop("readonly", "readonly");
                $("#p_d_e_f_note").removeAttr("check");
                $("#p_d_e_f_note").val("");
            }
        }
    });
}


//
function  initShowByData(){ 
    checkArea($("input[type=radio][name=qct4]:checked"));
    checkArea($("input[type=radio][name=qct8]:checked"));
    checkArea($("input[type=radio][name=qct12]:checked"));
 }
 
 
 //QCT骨密度检查 -区域
 function checkArea(e){
     var ipts =  $(e).parent().parent().parent();
     if($(e).val() == '0'){
         ipts.find("input[type=number][tip-msg]").removeAttr("check")
         ipts.find("input[type=number]").prop("disabled" ,true);
         ipts.find("input[type=number]").val("");
     }else{
         ipts.find("input[type=number]").prop("disabled" ,false);
         ipts.find("input[type=number][tip-msg]").attr("check" ,"required");
     }
 }


// 初始化 无
function initNullChange(el) {

    $.each($(el), function(j, checkbox) {
        if ($(this).is(':checked')) {
            $(this).parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().next().find("input[type='text']").val("");
            $(this).parent().parent().next().hide();
        } else {
            $(this).parent().parent().next().show();

        }
    });

    $.each($(".p_others"), function() {
        if ($(this).next().val() != 0) {
            $(this).prop("checked", "checked");
            $(this).next().removeProp("readonly");
        } else {
            $(this).removeProp("checked");
            $(this).next().prop("readonly", "readonly");
        }
    })


}
// 绝经年龄校验
function checkg2Age(th) {
    var newVal = $(th).val();
    var age = sessionStorage.getItem("age");
    if (newVal * 1 > age * 1) {
        top.layer.msg("\“绝经年龄\”不得大于其\“当前年龄\”，请核实!");
        $(th).val("");
        //$(th).select();
        return;
    }
    if (newVal * 1 < 30 || newVal * 1 > 65) {
        top.layer.msg("绝经年龄超出填写范围（30-65），请核实!");
        $(th).val("");
        //$(th).select();
        return;
    }
    if (newVal * 1 < 40 || newVal * 1 > 55) {
        top.layer.confirm("绝经年龄超出正常值范围（40-55），请与患者确认！", function(index) {
                //$(th).focus();
                //$(th).select();
                top.layer.close(index);
            }, function(index) {
                $(th).val("");
                top.layer.close(index);
            })
            // top.layer.confirm("绝经年龄超出正常值范围（40-55），是否修改？",function(index){
            //   // $(th).focus();
            //   // $(th).select();
            //   top.layer.close(index);
            // })
            // top.layer.msg("绝经年龄超出正常值范围（40-55），请与患者确认！!");

        return;
    }
    $(th).val(newVal);
}

//序号处理
function sortTrNumber() {
    $('#p_page2_tb4 tbody tr.p_fracture_list').each(function(index, obj) {
        //$(obj).attr("class", "add-tr"+(index+1));
        // console.log($(obj).attr("class", "add-tr" + (index + 1)));
        $(obj).find("td span.p_fracture_num").html(index + 1);
    });
    $('.badStatus').each(function(index, obj) {
        //$(obj).attr("class", "add-tr"+(index+1));
        // console.log($(obj).attr("class", "add-tr" + (index + 1)));
        $(obj).find("td span.adsNum").html(index + 1);
    });
}
// 是  否  不确定  拒绝回答 切换事件
function notOrYesChange(el, name) {
    $(el).find('input[type=radio][name^=' + name + ']').change(function() {
        var index = $(this).attr("data-index");
        if (this.value != 1) {
            $(this).parent().find("button").prop("disabled", "disabled");
            $(this).parent().parent().parent().nextAll().remove();
            if (index == "addI") {
                addI = 0;
            } else {
                addK = 0;
            }
        } else {
            $(this).parent().find("button").removeProp("disabled");
        }
    });
}
// 初始化 是  否  不确定  拒绝回答
function initNotOrYes(el) {
    $(el).find('input[type=radio]').each(function() {
        if ($(this).is(':checked')) {
            var index = $(this).attr("data-index");
            if (this.value != 1) {
                $(this).parent().find("button").prop("disabled", "disabled");
                $(this).parent().parent().parent().nextAll().remove();
                if (index == "addI") {
                    addI = 0;
                } else {
                    addK = 0;
                }
            } else {
                $(this).parent().find("button").removeProp("disabled");
            }
        }
    })
}
// 是 否 拒绝回答 显示隐藏
function radioNotOrYes(el) {
    $(el).find("input[type='radio']").change(function() {
        if ($(this).val() < 0) {
            $(this).parent().parent().parent().parent().next().hide();
            $(this).parent().parent().parent().parent().next().find("input[type='radio']").prop("checked", false);
            $(this).parent().parent().parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().parent().parent().next().find("input[type='number']").prop("value", 1);
        } else {

            $(this).parent().parent().parent().parent().next().show();
        }
    });
}
// 初始化 是 否 拒绝回答 显示隐藏
function initradioNotOrYes(el) {
    $(el).find('input[type=radio]').each(function() {
        if ($(this).is(':checked')) {
            if ($(this).val() < 0) {
                $(this).parent().parent().parent().parent().next().hide();
                $(this).parent().parent().parent().parent().next().find("input[type='radio']").prop("checked", false);
                $(this).parent().parent().parent().parent().next().find("input[type='checkbox']").prop("checked", false);
                $(this).parent().parent().parent().parent().next().find("input[type='number']").prop("value", -1);
                $("#p_g1_s_a").val(1);
                $("#p_g1_a_quit").val(1);
            } else {

                $(this).parent().parent().parent().parent().next().show();
            }
        }
    })
}
// 是否遵医嘱用药
function radioSel(el) {
    $(el).find('input[type="radio"]').change(function() {
        if ($(this).val() == -1) {
            $(this).parent().parent().parent().find("div.radioSelInput").show();
            $(this).parent().parent().parent().find("div.radioSelInput").find("input[type=text]").attr('check', 'required age');
        } else {
            $(this).parent().parent().parent().find("div.radioSelInput").hide();
            $(this).parent().parent().parent().find("div.radioSelInput").find("input[type=text]").removeAttr('check');

        }
    })
}
// 初始化是否遵医嘱用药
function initRadioSel(el) {
    $.each($(el).find('input[type="radio"]'), function() {
        if ($(this).is(':checked')) {
            if ($(this).val() == -1) {
                $(this).parent().parent().parent().find("div.radioSelInput").show();
                $(this).parent().parent().parent().find("div.radioSelInput").find("input[type=text]").attr('check', 'required age');
            } else {
                $(this).parent().parent().parent().find("div.radioSelInput").hide();
                $(this).parent().parent().parent().find("div.radioSelInput").find("input[type=text]").removeAttr('check');

            }
        }
    })
}

// 锚点选中
function selePoint(el, id) {
    $(el).find('a[href="#' + id + '"]').tab('show');
}

function initHeight() {
    //parent.document.getElementByIdx("t1").height=document.body.scrollHeight;
    //没有style也可以
    parent.document.getElementById("p_home1_iframe").style.height = document.body.scrollHeight + "px";
    parent.parent.document.getElementById("p_messages_iframe").style.height = parent.document.body.scrollHeight + "px";
}

function getHistoryArr(el) {
    var jsonArr = [];
    $(el).find("form").each(function() {
        jsonArr.push($(this).serializeObject());
    });
    return jsonArr;
}

function allSelChange(el) {
    $(el).find("input:first").change(function() {
        var name = $(this).attr('name'); //
        if ($(this).is(":checked")) {                 //$(this).nextAll().prop("checked",true);
            $(this).parent().next(".check_child").show();
            $(this).parent().next(".check_child").find(".p_checkRadio").addClass("check");
            $(this).parent().next(".check_child").find(".p_checkRadio").attr("check", "radio");

                        
        } else {              
            $(this).nextAll().removeProp("checked");
            $(this).parent().next(".check_child").hide();
            $(this).parent().next(".check_child").find(".p_checkRadio").removeClass("check");
            $(this).parent().next(".check_child").find(".p_checkRadio").removeAttr("check");            
        }
    });

    $.each($(el).find("input:first"), function() {
        if ($(this).is(":checked")) {                 //$(this).nextAll().prop("checked",true);
            $(this).parent().next(".check_child").show();
            $(this).parent().next(".check_child").find(".p_checkRadio").addClass("check");
            $(this).parent().next(".check_child").find(".p_checkRadio").attr("check", "radio");

                        
        } else {              
            $(this).nextAll().removeProp("checked");
            $(this).parent().next(".check_child").hide();
            $(this).parent().next(".check_child").find(".p_checkRadio").removeClass("check");
            $(this).parent().next(".check_child").find(".p_checkRadio").removeAttr("check");            
        }
    });  //当改变子选项时，需要判断子选项是否全部被选中，如果全部被选中，那么全选被选中；否则全选不被选中
            
    $(el).find("input").not(":first").change(function() {              if ($(this).parent().find("input[name^='h3_']:checked").length > 0) {                  $(this).parent().find("input:first").prop("checked", true);              } else {                 $(this).parent().find("input:first").removeProp("checked");              }         });
}

function ajaxCommonTest(url, data, callback, el, id) {
    $("#addPatientFrom").publicAjax({
        url: "../../mock/p_002.json",
        type: "get",
        data: {},
        dataType: "json",
        successFn: function(data) {
            if (data.code == "0") {
                callback(el, data.data);
            } else {
                layer.alert(data.msg);
            }
        }
    });
}

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isObject(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
}

function isString(obj) {
    return (typeof obj == 'string') && obj.constructor == String;
}


function initHistoryForm(el, data) {
    //console.log(data);
    for (var i = 0; i < data.length; i++) {

        $.each(data[i], function(name, value) {
            //console.log(name+":"+value);
            if (value == 1) {
                $("#" + el + i).find('input[type="checkbox"][name="' + name + '"]').prop("checked", "checked");
            } else {
                $("#" + el + i).find('input[type="checkbox"][name="' + name + '"]').removeProp("checked");
            }

            $("#" + el + i).find("select[name='" + name + "'] option[value='" + value + "']").prop("selected", "selected");
            $("#" + el + i).find("input[name='" + name + "'][value='" + value + "']").attr("checked", "checked");
            $("#" + el + i).find("input[type='number'][name='" + name + "']").val(value);
            $("#" + el + i).find("input[type='text'][name='" + name + "']").val(value);
            $("#" + el + i).find("textarea[name='" + name + "']").val(value);
            var h3pattern = $("#" + el + i).find("select[name=h3_pattern]").val();
            if (h3pattern == 2) {
                $("#" + el + i).find($("#pattern_show" + i)).show()
            }
            var h3input = $("#" + el + i).find("select[name=h3_1]").val();
            if (h3input == 2) {
                $("#" + el + i).find($("#h3_0SHQK_" + i)).show()
            }
            var h3select0 = $("#" + el + i).find("select[name=d_3]").val();
            if (h3select0 == 2) {
                $("#" + el + i).find($("#d3show" + i)).show()
            }
            var h3select1 = $("#" + el + i).find("select[name=d_4_7]").val();
            if (h3select1 == 1) {
                $("#" + el + i).find($("#d_4_7_note" + i)).show()
            }
            var h3sj = $("#" + el + i).find("select[name=h3_qt]").val();
            if (h3sj == 1) {
                $("#" + el + i).find($("#sj" + i)).show()
            }
        });
    }
    initUnknown(".p_check_unknown");
    allSelChange(".p_h3_checkbox");
}
// 获取去除空后的数据
function Trim(str) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    result = result.replace(/\s/g, "");
    return result;
}
// 不详check 切换事件
function unknownChange(th) {
    var name = ($(th).prop("name")).substring(0, 4);
    if ($(th).is(':checked')) {
        $(th).parent().nextAll().find('input[type=checkbox][name^="' + name + '"]').prop("disabled", "disabled");
        $(th).parent().nextAll().find('input').prop("disabled", "disabled");
        $(th).parent().nextAll().find('input').prop("checked", false);
        $(".check_child").hide()
        $(".check_child table").removeAttr("check", "")
    } else {
        $(th).parent().nextAll().find('inputinput[type=checkbox][name^="' + name + '"]').removeProp("disabled");
        $(th).parent().nextAll().find('input').removeProp("disabled");
    }
}
// 初始化不详
function initUnknown(el) {
    $.each($(el), function(j, checkbox) {
        var name = ($(this).prop("name")).substring(0, 4);
        if ($(this).is(':checked')) {
            $(this).parent().nextAll().find('input[type=checkbox][name^="' + name + '"]').prop("disabled", "disabled");
            $(this).parent().nextAll().find('input').prop("disabled", "disabled");
            $(this).parent().nextAll().find('input').prop("checked", false);
        } else {
            $(this).parent().nextAll().find('inputinput[type=checkbox][name^="' + name + '"]').removeProp("disabled");
            $(this).parent().nextAll().find('input').removeProp("disabled");
        }
    });
    allSelChange(".p_h3_checkbox");

}
// 公共日期
function initDate(el, sDate, eDate) {
    el.datetimepicker({
        language: "zh-CN",
        use24hours: false,
        minView: "month",
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        //startDate:new Date(),
        //endDate:new Date(parseInt("86400000")+new Date().getTime())
        endDate: new Date()
    });
    el.datetimepicker("setDate", new Date(parseInt(new Date().getTime())));
}

// 未检查 select change事件
// 是否select 选中
function nullSelectChange(el) {
    $(el).change(function() {
        if ($(this).val() == "" || $(this).val() == 0) { // 空 0 都是 无
            $(this).parent().parent().next().find("input[type='radio']").prop('checked', false);
            $(this).parent().parent().next().find("input[type='checkbox']").prop('checked', false);
            $(this).parent().parent().next().find("input[type='number'],input[type='text']").prop('value', " ");
            $(this).parent().parent().next().find("select").val("");
            $(this).parent().parent().next().slideUp();
            //$(this).parent().next().removeClass("check");
            $(this).parent().parent().next().find(".p_required").removeAttr("check");
            $(this).parent().parent().next().find(".inputLeast").removeAttr("check");
            $(this).parent().parent().next().find(".inputLeast").removeClass("check");
        } else {
            $(this).parent().parent().next().slideDown();
            //$(this).parent().next().addClass("class","check");
            $(this).parent().parent().next().find(".p_required").attr("check", "required");
            $(this).parent().parent().next().find(".inputLeast").attr("check", "inputLeast");
            $(this).parent().parent().next().find(".inputLeast").addClass("check");

        }
        selectDirection(".p_select_direction");

    });
}
// 初始化 select 未检查 未勾选事件
function initNullSelectChange(el) {
    $.each($(el), function() {
        if ($(this).val() == "" || $(this).val() == 0) { // 空 0 都是 无
            $(this).parent().parent().next().find("input[type='radio']").prop('checked', false);
            $(this).parent().parent().next().find("input[type='checkbox']").prop('checked', false);
            $(this).parent().parent().next().find("input[type='number'],input[type='text']").prop('value', " ");
            $(this).parent().parent().next().find("select").val("");
            $(this).parent().parent().next().slideUp();
            //$(this).parent().next().removeClass("check");
            $(this).parent().parent().next().find(".p_required").removeAttr("check");
            $(this).parent().parent().next().find(".inputLeast").removeAttr("check");
            $(this).parent().parent().next().find(".inputLeast").removeClass("check");
        } else {
            $(this).parent().parent().next().slideDown();
            //$(this).parent().next().attr("class","check");
            $(this).parent().parent().next().find(".p_required").attr("check", "required");
            $(this).parent().parent().next().find(".inputLeast").attr("check", "inputLeast");
            $(this).parent().parent().next().find(".inputLeast").addClass("check");
        }
        selectDirection(".p_select_direction");

    })
}
// DXA 切换事件
function checkSelect(el) {
    $(el).change(function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().parent().nextAll().hide();
            $(this).parent().parent().nextAll().find(".check1,.p_required").removeAttr("check");
            $(this).parent().parent().nextAll().find("select").val("");
            $(this).parent().parent().next().find("select:first").removeAttr("check");
            $(this).parent().parent().nextAll().find("input[type='text'],input[type='number']").val("");
            $(this).parent().parent().nextAll().find("#p_page2_tb4").find("tbody").html("");

            //$(this).next().find(".p_required").removeAttr("check");
        } else {
            $(this).parent().parent().nextAll().show();
            $(this).parent().parent().nextAll().find(".check1,.p_required").attr("check", "required");
            $(this).parent().parent().next().find("select:first").attr("check", "required");
            //$(this).next().find(".p_required").attr("check","required");
        }
        selectDirection(".p_select_direction");
        othersEquipment("#p_d_d_1");
        initNullSelectChange(".p_select_null");
    });
    $.each($(el), function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().parent().nextAll().hide();
            $(this).parent().parent().nextAll().find(".check1,.p_required").removeAttr("check");
            $(this).parent().parent().nextAll().find("select").val("");
            $(this).parent().parent().next().find("select:first").removeAttr("check");
            $(this).parent().parent().nextAll().find("input[type='text'],input[type='number']").val("");
            $(this).parent().parent().nextAll().find("#p_page2_tb4").find("tbody").html("");
            //$(this).next().find(".p_required").removeAttr("check");
        } else {
            $(this).parent().parent().nextAll().show();
            $(this).parent().parent().nextAll().find(".check1,.p_required").attr("check", "required");
            $(this).parent().parent().next().find("select:first").attr("check", "required");

            //$(this).next().find(".p_required").attr("check","required");
        }
        //selectDirection(".p_select_direction");
        selectDirection(".p_select_direction");
        othersEquipment("#p_d_d_1");
        initNullSelectChange(".p_select_null");
    });
    // othersEquipment("#p_d_d_1");
    // initNullSelectChange(".p_select_null");
    // selectDirection(".p_select_direction");
}
//  左侧  右侧 双侧切换 以及初始化
function selectDirection(el) {
    $(el).change(function() {
        var val = $(this).val()
        if (val == '') {
            $(this).parent().parent().find(".d_d2_check2_left").hide();
            $(this).parent().parent().find(".d_d2_check2_right").hide();
            $(this).parent().parent().find(".d_d2_check2_right").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").find("input[type='number']").val("");
            $(this).parent().parent().find(".d_d2_check2_right").find("input[type='number']").val("");
        } else if (val == 1) { // 左侧
            $(this).parent().parent().find(".d_d2_check2_left").show();
            $(this).parent().parent().find(".d_d2_check2_left").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_right").hide();
            $(this).parent().parent().find(".d_d2_check2_right").find("input[type='number']").val("");
        } else if (val == 2) { // 右侧
            $(this).parent().parent().find(".d_d2_check2_right").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").show();
            $(this).parent().parent().find(".d_d2_check2_left").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").hide();
            $(this).parent().parent().find(".d_d2_check2_left").find("input[type='number']").val("");
        } else if (val == 3) { // 双侧
            $(this).parent().parent().find(".d_d2_check2_right").show();
            $(this).parent().parent().find(".d_d2_check2_left").show();
            $(this).parent().parent().find(".d_d2_check2_left").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").attr("check", "inputLeast");
        }
    });

    $.each($(el), function() {
        var val = $(this).val();
        if (val == '') {
            $(this).parent().parent().find(".d_d2_check2_left").hide();
            $(this).parent().parent().find(".d_d2_check2_right").hide();
            $(this).parent().parent().find(".d_d2_check2_right").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").find("input[type='number']").val("");
            $(this).parent().parent().find(".d_d2_check2_right").find("input[type='number']").val("");
        } else if (val == 1) { // 左侧
            $(this).parent().parent().find(".d_d2_check2_left").show();
            $(this).parent().parent().find(".d_d2_check2_left").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_right").hide();
            $(this).parent().parent().find(".d_d2_check2_right").find("input[type='number']").val("");
        } else if (val == 2) { // 右侧
            $(this).parent().parent().find(".d_d2_check2_right").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").show();
            $(this).parent().parent().find(".d_d2_check2_left").removeClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").removeAttr("check");
            $(this).parent().parent().find(".d_d2_check2_left").hide();
            $(this).parent().parent().find(".d_d2_check2_left").find("input[type='number']").val("");
        } else if (val == 3) { // 双侧
            $(this).parent().parent().find(".d_d2_check2_right").show();
            $(this).parent().parent().find(".d_d2_check2_left").show();
            $(this).parent().parent().find(".d_d2_check2_left").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_left").attr("check", "inputLeast");
            $(this).parent().parent().find(".d_d2_check2_right").addClass("check");
            $(this).parent().parent().find(".d_d2_check2_right").attr("check", "inputLeast");
        }
    })
}
// 骨折次数
function fractureNum(th) {
    var val = $(th).val();
    var length;
    if (val == "") {
        length = "0";
    } else {
        length = val;
    }
    initfracturHistoryVal("h3_fracture", length);

}

function initfracturHistoryVal(key, data) {
    var arr, str, el;
    if (key == "h3_fracture") {
	 
        el = "#p_page2_tb4";
        $(el).html("");
        for (var k = 0; k < data; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(

               // '<tr id="p_h3_fracture_list_'+k+'" class="p_fracture_list">'+
                '<tr id="p_h3_fracture_list_' + k + '" class="p_fracture_list">' +
                // '<td class="text-center" style="width:100px;"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>'+
                '<td class="" colspan="2">' +
                // '<button class="btn btn-danger btn-sm text-center p_del_btn" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-remove"></span></button>'+
                '<form class="h3_form p_c_form">' +
                '<div role="separator" class="van-divider van-divider--hairline van-divider--content-center"><p>第<span class="p_fracture_num"></span>次骨折</p></div>' +
                '<div class="form-horizontal"><div class="form-group">' +
                '<label class="col-xs-4 control-label"><span class="red">*</span>骨折日期</label>' +
                
                '<div  class="col-xs-8" style="display: inline-block;position: relative;">' +
                
                '<label style="margin-right: 20px; width:100%"><select name="h3_qt" id="h3_qt' + k + '" check="required"   class="form-control p_d_select" style="width:100%;display: inline-block" onchange="selectQt(this,' + k + ')">' +
                '<option value="">请选择</option>' +
                '<option value="1">时间详细</option>' +
                '<option value="2">时间不详</option>' +
                '</select> </label>' +
                '</label>' +
                '</div>' +
                //年 月
                '<div  class="col-xs-4 col-xs-offset-4" id="sj'+ k + '" style="display: none">'+
                '<select name="h3_year" id="p_year' + k + '" class="form-control" style="width:auto;display: inline-block" ></select>年' +
                
                '<div style="display: inline-block;position: relative;">' +
                '<select name="h3_mouth" id="p_mouth' + k + '" class="form-control" style="width:auto;display: inline-block" >' +
                '<option value="">请选择</option>' +
                '<option value="01">01</option>' +
                '<option value="02">02</option>' +
                '<option value="03">03</option>' +
                '<option value="04">04</option>' +
                '<option value="05">05</option>' +
                '<option value="06">06</option>' +
                '<option value="07">07</option>' +
                '<option value="08">08</option>' +
                '<option value="09">09</option>' +
                '<option value="10">10</option>' +
                '<option value="11">11</option>' +
                '<option value="12">12</option>' +
                '</select>月' +
                '</div></div>' +
                '</div></div>' +
                '<div class="form-group"><label class="col-xs-4 control-label">骨折治疗方式</label> <div  class="col-xs-8">' +
                '<select class="form-control input-inline" onchange="selectPatter(this,' + k + ')"  name="h3_pattern" id="p_h3_pattern" ><option value="">请选择</option><option value="1">保守治疗</option><option value="2">手术治疗</option></select></div></div>' +
                '<div class="form-group ispattern"  id="pattern_show' + k + '" style="display:none">' +
                '<div class="sh" style="overflow: hidden">' +
                '<label class="col-xs-4 control-label">术式:</label> ' +
                '<div class="col-xs-8"><input type="text" name="h3_0" placeholder="请输入内容" id="pstternType' + k + '" class="form-control"></input></div>' +
                '</div>' +
                '<div  class="qk" style="overflow: hidden">' +
                '<label class="col-xs-4 control-label">术后情况:</label>  ' +
                '<div class="col-xs-8"><select name="h3_1" onchange="selectSHQK(this,' + k + ')" class="col-xs-9 form-control" tip-msg="请输入术后情况">' +
                '<option value="">请选择</option>' +
                '<option value="1">正常/愈合情况良好 </option>' +
                '<option value="2">其他</option>' +
                '</select>' +
                '<input type="text" name="h3_0_other" id="h3_0SHQK_' + k + '" placeholder="请描述" class="form-control" style="display: none;"></div></div></div > </div>' +
                // '<input type="number" name="h3_age" class="form-control input-inline p_h3_age" check="required"/>'+
                '<div class="form-horizontal">' +
                '<div class="check form-group" tip-msg="请选择骨折原因" data-class="p_e1_3_check_00" check="radio"><div class="p_e1_3_check_00"><label class="col-xs-4 control-label"><span class="must">*</span>骨折原因：</label>' +
                '<div  class="col-xs-8"><input type="radio" name="h3_reason" value="1">脆性' +
                '<input type="radio" name="h3_reason" value="2">暴力</div></div></div>' +
                '<p style="font-size: 14px;"><span class="must">*</span>骨折部位：</p>' +
                '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="请选择骨折位置" data-class="p_h3_0000_' + k + '">' +
                ' <tbody class="p_h3_0000_' + k + '">' +
                '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">请选择骨折部位</div></td></tr>' +
                ' <tr>' +
                
               '<td >' +
                 '<input type="checkbox" name="h3_a_6_check" id="h3_a_6_check" value="1" onclick="Ztcheck1(this,'+k+')"/>椎体'+
                '<div style="display: none;" class="Ztclass" id="pztclass'+k+'">' +
                '<div ><input type="checkbox" name="h3_a_1" id="p_h3_a_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_1_check" id="h3_a_1_check" value="1">颈椎' +
                 '<div style="display: none;">'+
                 '（' +
                 '<input type="checkbox"  name="h3_a_2" id="p_h3_a_2" value="1">C1' +
                 '<input type="checkbox"  name="h3_a_3" id="p_h3_a_3" value="1">C2' +
                 '<input type="checkbox"  name="h3_a_4" id="p_h3_a_4" value="1">C3' +
                 '<input type="checkbox"  name="h3_a_5" id="p_h3_a_5" value="1">C4' +
                 '<input type="checkbox"  name="h3_a_6" id="p_h3_a_6" value="1">C5' +
                 '<input type="checkbox"  name="h3_a_7" id="p_h3_a_7" value="1">C6' +
                 '<input type="checkbox"  name="h3_a_8" id="p_h3_a_8" value="1">C7）' +
                '</div></div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_2_check" id="h3_a_2_check" value="1" class="">胸椎' +
                '</div>' +
                '<div class="h3_a_2'+k+'_check_child check_child" style="display:none">' +
               '<div>胸椎骨折程度</div>' +
               '<div class="p_h3_a_2_1"><table class="table table-bordered text-left p_checkRadio" tip-msg="请选择胸椎骨折程度" data-class="h3_a_2_1_1_00"><tbody class="h3_a_2_1_1_00">' +
               '<tr><td style="width:50px;">T1</td><td><label><input type="radio"  name="h3_a_2_1_1" value="0" onclick="deselect(this)" id="xz1'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_1" value="1"  onclick="deselect(this)" id="xz2'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_1" value="2" onclick="deselect(this)" id="xz3'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_1" value="3" onclick="deselect(this)" id="xz4'+"1"+k+'" >III度</label></td>' +
               '<tr><td>T2</td><td><label><input type="radio"  name="h3_a_2_1_2" value="0" onclick="deselect(this)" id="xz5'+"1"+k+'" >无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_2" value="1" onclick="deselect(this)" id="xz6'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_2" value="2" onclick="deselect(this)" id="xz7'+"1"+k+'" >II度</label><label><input type="radio"  name="h3_a_2_1_2" value="3" onclick="deselect(this)" id="xz8'+"1"+k+'">III度</label></td>' +
               '<tr><td>T3</td><td><label><input type="radio"  name="h3_a_2_1_3" value="0" onclick="deselect(this)" id="xz9'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_3" value="1" onclick="deselect(this)" id="xz10'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_3" value="2" onclick="deselect(this)" id="xz11'+"1"+k+'" >II度</label><label><input type="radio"  name="h3_a_2_1_3" value="3" onclick="deselect(this)" id="xz12'+"1"+k+'">III度</label></td>' +
               '</tr>' +
               '<tr><td>T4</td><td><label><input type="radio"  name="h3_a_2_1_4" value="0" onclick="deselect(this)" id="xz13'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_4" value="1" onclick="deselect(this)" id="xz14'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_4" value="2" onclick="deselect(this)" id="xz15'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_4" value="3" onclick="deselect(this)" id="xz16'+"1"+k+'">III度</label></td>' +
               '<tr><td>T5</td><td><label><input type="radio"  name="h3_a_2_1_5" value="0" onclick="deselect(this)" id="xz17'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_5" value="1">I度</label><label><input type="radio" name="h3_a_2_1_5" value="2" onclick="deselect(this)" id="xz18'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_5" value="3" onclick="deselect(this)" id="xz19'+"1"+k+'">III度</label></td>' +
               '<tr><td>T6</td><td><label><input type="radio"  name="h3_a_2_1_6" value="0" onclick="deselect(this)" id="xz20">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_6" value="1" onclick="deselect(this)" id="xz21'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_6" value="2" onclick="deselect(this)" id="xz22'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_6" value="3" onclick="deselect(this)" id="xz23'+"1"+k+'">III度</label></td>' +
               '</tr>' +
               '<tr><td>T7</td><td><label><input type="radio"  name="h3_a_2_1_7" value="0" onclick="deselect(this)" id="xz24'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_7" value="1" onclick="deselect(this)" id="xz25'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_7" value="2" onclick="deselect(this)" id="xz26'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_7" value="3" onclick="deselect(this)" id="xz27'+"1"+k+'">III度</label></td>' +
               '<tr><td>T8</td><td><label><input type="radio"  name="h3_a_2_1_8" value="0" onclick="deselect(this)" id="xz28">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_8" value="1" onclick="deselect(this)" id="xz29'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_8" value="2" onclick="deselect(this)" id="xz30'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_8" value="3" onclick="deselect(this)" id="xz31'+"1"+k+'">III度</label></td>' +
               '<tr><td>T9</td><td><label><input type="radio"  name="h3_a_2_1_9" value="0" onclick="deselect(this)" id="xz32'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_9" value="1" onclick="deselect(this)" id="xz33'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_9" value="2" onclick="deselect(this)" id="xz34'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_9" value="3" onclick="deselect(this)" id="xz35'+"1"+k+'">III度</label></td>' +
               '</tr>' +
               '<tr><td>T10</td><td><label><input type="radio"  name="h3_a_2_1_10" value="0" onclick="deselect(this)" id="xz36'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_10" value="1" onclick="deselect(this)" id="xz37'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_10" value="2" onclick="deselect(this)" id="xz38'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_10" value="3" onclick="deselect(this)" id="xz39'+"1"+k+'">III度</label></td>' +
               '<tr><td>T11</td><td><label><input type="radio"  name="h3_a_2_1_11" value="0" onclick="deselect(this)" id="xz40'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_11" value="1" onclick="deselect(this)" id="xz41'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_11" value="2" onclick="deselect(this)" id="xz42'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_11" value="3" onclick="deselect(this)" id="xz43'+"1"+k+'">III度</label></td>' +
               '<tr><td>T12</td><td><label><input type="radio"  name="h3_a_2_1_12" value="0" onclick="deselect(this)" id="xz44'+"1"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_2_1_12" value="1" onclick="deselect(this)" id="xz45'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_12" value="2" onclick="deselect(this)" id="xz46'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_12" value="3" onclick="deselect(this)" id="xz47'+"1"+k+'">III度</label></td>' +
               '</tr>' +
                '<tr><td colspan="2"><div>椎体骨折程度判断标准示意图见下:</div><img src="' + src + '/static/images/jt.png' + '"  style="width:100%"/></td></tr>' +
                '</tbody></table></div>' +
                '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_3_check" id="h3_a_3_check" value="1">腰椎' +
                 '<div style="display: none;">'+
                 '（'+
                 '<input type="checkbox"  name="h3_a_21" id="p_h3_a_21" value="1">L1'+
                 '<input type="checkbox"  name="h3_a_22" id="p_h3_a_22" value="1">L2'+
                 '<input type="checkbox"  name="h3_a_23" id="p_h3_a_23" value="1">L3'+
                 '<input type="checkbox"  name="h3_a_24" id="p_h3_a_24" value="1">L4'+
                 '<input type="checkbox"  name="h3_a_25" id="p_h3_a_25" value="1">L5'+
                 '）'+
                '</div></div>' +
                '<div class="h3_a_3'+k+'_check_child check_child" style="display:none;">' +
               '<div>腰椎骨折程度</div>' +
               '<div class="p_h3_a_3_1"><table class="table table-bordered text-left p_checkRadio" tip-msg="请选择腰椎骨折程度" data-class="h3_a_3_1_1_00"><tbody class="h3_a_3_1_1_00"' +
               '<tr><td style="width:50px;">L1</td><td><label><input type="radio"  name="h3_a_3_1_1" value="0" onclick="deselect(this)" id="yz1'+"2"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_3_1_1" value="1" onclick="deselect(this)" id="yz2'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_1" value="2" onclick="deselect(this)" id="yz3'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_1" value="3" onclick="deselect(this)" id="yz4'+"2"+k+'">III度</label></td>' +
               '<tr><td>L2</td><td><label><input type="radio"  name="h3_a_3_1_2" value="0" onclick="deselect(this)" id="yz5'+"2"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_3_1_2" value="1" onclick="deselect(this)" id="yz6'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_2" value="2" onclick="deselect(this)" id="yz7'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_2" value="3" onclick="deselect(this)" id="yz8'+"2"+k+'">III度</label></td>' +
               '<tr><td>L3</td><td><label><input type="radio"  name="h3_a_3_1_3" value="0" onclick="deselect(this)" id="yz9'+"2"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_3_1_3" value="1" onclick="deselect(this)" id="yz10'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_3" value="2" onclick="deselect(this)" id="yz11'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_3" value="3" onclick="deselect(this)" id="yz12'+"2"+k+'">III度</label></td>' +
               '</tr>' +
               '<tr><td>L4</td><td><label><input type="radio"  name="h3_a_3_1_4" value="0" onclick="deselect(this)" id="yz13'+"2"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_3_1_4" value="1" onclick="deselect(this)" id="yz14'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_4" value="2" onclick="deselect(this)" id="yz15'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_4" value="3" onclick="deselect(this)" id="yz16'+"2"+k+'">III度</label></td>' +
               '<tr><td>L5</td><td><label><input type="radio"  name="h3_a_3_1_5" value="0" onclick="deselect(this)" id="yz17'+"2"+k+'">无压缩</label>' +
               '<label><input type="radio"  name="h3_a_3_1_5" value="1" onclick="deselect(this)" id="yz18'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_5" value="2" onclick="deselect(this)" id="yz19'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_5" value="3" onclick="deselect(this)" id="yz20'+"2"+k+'">III度</label></td>' +
               '</tr>' +
                '<tr><td colspan="2"><div>椎体骨折程度判断标准示意图见下:</div><img src="' + src + '/static/images/jt.png' + '"  style="width:100%"/></td></tr>' +
                '</tbody></table></div>' +
                '</div>' +
                '<div>' +
                '<input type="checkbox" name="h3_a_26" id="p_h3_a_26" value="1" >骶椎' +
                '</div>' +
                '</div></br>' +
                '<input type="checkbox" name="h3_b_1_check" id="h3_b_1_check" value="1" />肋骨'+
                '<div  style="display: none;" class="Lgclass">' +
                '<div><input type="checkbox" id="p_h3_b_1" name="h3_b_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_b_1_check3" id="h3_b_1_check3" value="1">左侧' +
                '<div style="display: none;">'+
                 '（' +
                 '<input type="checkbox"  name="h3_b_2" id="p_h3_b_2" value="1">1' +
                 '<input type="checkbox"  name="h3_b_3" id="p_h3_b_3" value="1">2' +
                 '<input type="checkbox"  name="h3_b_4" id="p_h3_b_4" value="1">3' +
                 '<input type="checkbox"  name="h3_b_5" id="p_h3_b_5" value="1">4' +
                 '<input type="checkbox"  name="h3_b_6" id="p_h3_b_6" value="1">5' +
                 '<input type="checkbox"  name="h3_b_7" id="p_h3_b_7" value="1">6' +
                 '<input type="checkbox"  name="h3_b_8" id="p_h3_b_8" value="1">7' +
                 '<input type="checkbox"  name="h3_b_9" id="p_h3_b_9" value="1">8' +
                 '<input type="checkbox"  name="h3_b_10" id="p_h3_b_10" value="1">9' +
                 '<input type="checkbox"  name="h3_b_11" id="p_h3_b_11" value="1">10' +
                 '<input type="checkbox"  name="h3_b_12" id="p_h3_b_12" value="1">11' +
                 '<input type="checkbox"  name="h3_b_13" id="p_h3_b_13" value="1">12' +
                 '）' +
                '</div></div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_b_2_check" id="h3_b_2_check" value="1">右侧' +
                '<div style="display: none;">'+
                 '（' +
                 '<input type="checkbox"  name="h3_b_14" id="p_h3_b_14" value="1">1' +
                 '<input type="checkbox"  name="h3_b_15" id="p_h3_b_15" value="1">2' +
                 '<input type="checkbox"  name="h3_b_16" id="p_h3_b_16" value="1">3' +
                 '<input type="checkbox"  name="h3_b_17" id="p_h3_b_17" value="1">4' +
                 '<input type="checkbox"  name="h3_b_18" id="p_h3_b_18" value="1">5' +
                 '<input type="checkbox"  name="h3_b_19" id="p_h3_b_19" value="1">6' +
                 '<input type="checkbox"  name="h3_b_20" id="p_h3_b_20" value="1">7' +
                 '<input type="checkbox"  name="h3_b_21" id="p_h3_b_21" value="1">8' +
                 '<input type="checkbox"  name="h3_b_22" id="p_h3_b_22" value="1">9' +
                 '<input type="checkbox"  name="h3_b_23" id="p_h3_b_23" value="1">10' +
                 '<input type="checkbox"  name="h3_b_24" id="p_h3_b_24" value="1">11' +
                 '<input type="checkbox"  name="h3_b_25" id="p_h3_b_25" value="1">12' +
                 '）' +
                '</div></div>' +
                '</div></br>' +
                
                '<input type="checkbox" name="h3_c_7_check" id="h3_c_7_check" value="1" onclick="Szcheck1(this,'+k+')">上肢'+
                '<div style="display: none;" class="Szclass" id="pSzclass'+k+'">' +
                '<div><input type="checkbox" name="h3_c_1" id="p_h3_c_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                 '<div class="p_h3_checkbox" style="display: none;">' +
                 '<input type="checkbox" name="h3_c_1_check" id="h3_c_1_check" value="1">左侧' +
                 '（ ' +
                 '<input type="checkbox"  name="h3_c_2" id="p_h3_c_2" value="1">指骨' +
                 '<input type="checkbox"  name="h3_c_3" id="p_h3_c_3" value="1">掌骨' +
                 '<input type="checkbox"  name="h3_c_4" id="p_h3_c_4" value="1">舟骨' +
                 '<input type="checkbox"  name="h3_c_5" id="p_h3_c_5" value="1">尺骨' +
                 '<input type="checkbox"  name="h3_c_6" id="p_h3_c_6" value="1">桡骨' +
                 '<input type="checkbox"  name="h3_c_7" id="p_h3_c_7" value="1">肱骨' +
                 '<input type="checkbox"  name="h3_c_8" id="p_h3_c_8" value="1">锁骨' +
                 '）' +
                 '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_c_2_check" id="h3_c_2_check" value="1">肩关节' +
                '<div style="display: none;">'+
                 '（' +
                 '<input type="checkbox"  name="h3_c_9"  id="p_h3_c_9"  value="1">指骨' +
                 '<input type="checkbox"  name="h3_c_10" id="p_h3_c_10" value="1">掌骨' +
                 '<input type="checkbox"  name="h3_c_11" id="p_h3_c_11" value="1">舟骨' +
                 '<input type="checkbox"  name="h3_c_12" id="p_h3_c_12" value="1">尺骨' +
                 '<input type="checkbox"  name="h3_c_13" id="p_h3_c_13" value="1">桡骨' +
                 '<input type="checkbox"  name="h3_c_14" id="p_h3_c_14" value="1">肱骨' +
                 '<input type="checkbox"  name="h3_c_15" id="p_h3_c_15" value="1">锁骨' +
                 '）' +
                '</div></div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_c_3_check" id="h3_c_3_check" value="1">肘关节' +
                '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_c_4_check" id="h3_c_4_check" value="1">腕关节' +
                '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_c_5_check" id="h3_c_5_check" value="1">其他' +
                '</div>' +
                '</div></br>' +
                
                '<input type="checkbox" name="h3_d_1" id="p_h3_d_1" value="1"">骨盆及髋部'+
                '<div style="display: none;" class="Pgclass">' +
                '<div><input type="checkbox" name="h3_d_12" id="p_h3_d_12" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div>' +
                '<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
                '<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
                '<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
                '<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
                '</div>' +
                '</div></br>' +
                
                  '<input type="checkbox" onclick="Xzcheck1(this,'+k+')" name="h3_e_6_check" id="h3_e_6_check" value="1">下肢'+
                  '<div style="display: none;" class="Xzclass" id="pXzclass'+k+'">' +
                  '<div><input type="checkbox" name="h3_e_1" id="p_h3_e_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                   '<div class="p_h3_checkbox" style="display: none;">' +
                   '<input type="checkbox" name="h3_e_1_check" id="h3_e_1_check" value="1">左侧' +
                   '（   ' +
                   '<input type="checkbox"  name="h3_e_2" id="p_h3_e_2" value="1">足趾' +
                   '<input type="checkbox"  name="h3_e_3" id="p_h3_e_3" value="1">髌骨' +
                   '<input type="checkbox"  name="h3_e_4" id="p_h3_e_4" value="1">胫骨' +
                   '<input type="checkbox"  name="h3_e_5" id="p_h3_e_5" value="1">腓骨' +
                   '<input type="checkbox"  name="h3_e_6" id="p_h3_e_6" value="1">踝部' +
                    '<input type="checkbox"  name="h3_e_7" id="p_h3_e_7" value="1">股骨' +
                    '）' +
                   '</div>' +
                   '<div class="p_h3_checkbox" style="display: none;">' +
                   '<input type="checkbox" name="h3_e_2_check" id="h3_e_2_check" value="1">右侧' +
                   '</div>' +
                  
                  '<div class="p_h3_checkbox">' +
                  '<input type="checkbox" name="h3_e_3_check" id="h3_e_3_check" value="1">膝关节</input>' +
                  '</div>' +
                  '<div class="p_h3_checkbox">' +
                  '<input type="checkbox" name="h3_e_4_check" id="h3_e_4_check" value="1">踝关节' +
                  '</div>' +
               				  '<div  class="p_h3_checkbox">'+
               				  	 '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" value="1">其他'+
               				  '</div>'+
                   '<div>'+
                  //     '<input type="checkbox" name="h3_z" id="p_h3_z" class="p_others">其他'+
                  //     // '<input type="text" name="h3_z_note"  class="form-control"  id="p_h3_z_note" value="测试你">'+
                 // '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
               				   '</div>'+
                  '</div></br>' +
                
               
                '</tr>' +
                //<!-- 上一个版本的代码全部注释 -->
                
                // // '<tr><td>其他</td></tr>'+
                // '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">其他</div></td></tr>' +
                
                // '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
               
                '<tr><td><div><input type="checkbox"  onclick="Qtcheck1(this)"  name="h3_z_1" id="Qtid"/>其他</div></td></tr>' +
               
               '<tr><td><input type="text" name="h3_z"  class="form-control1"  id="p_h3_z" value="" placeholder="请描述"  style="display: none;"></td></tr>' +
               
               				// '<tr><td><inupt type="checkbox"  onclick="Qtcheck1(this)>其他</td></tr>' +
               				
               				// '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述" style="display: none;"></td></tr>' +
               				'</td>' +
                '</tbody>' +
                '</table>' +
                '</form>' +
                '</td>' +
               
                '</tr>'
            );
            initYearSelect("#p_year"+ k);
        }
        // sortTrNumber();
        // initHistoryForm("p_h3_fracture_list_",data);
        // allSelChange(".p_h3_checkbox");
        // initDate($(".p_birthday"),"","");
        sortTrNumber();
        if (isArray(data)) {
            initHistoryForm("p_h3_fracture_list_", data);
        }
        allSelChange(".p_h3_checkbox");
        initYMDate($(".p_birthday"), start1, end1);
    }
}
// 初始化骨折历史
function initfracturHistory(key, data) {
    var arr, str, el;
    if (key == "h3_fracture") {
        el = "#p_page2_tb4";
        $(el).html("");
        for (var k = 0; k < data.length; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(

             // '<tr id="p_h3_fracture_list_'+k+'" class="p_fracture_list">'+
             '<tr id="p_h3_fracture_list_' + k + '" class="p_fracture_list">' +
             // '<td class="text-center" style="width:100px;"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>'+
             '<td class="" colspan="2">' +
             // '<button class="btn btn-danger btn-sm text-center p_del_btn" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-remove"></span></button>'+
             '<form class="h3_form p_c_form">' +
             '<div role="separator" class="van-divider van-divider--hairline van-divider--content-center"><p>第<span class="p_fracture_num"></span>次骨折</p></div>' +
             '<div class="form-horizontal"><div class="form-group">' +
             '<label class="col-xs-4 control-label"><span class="red">*</span>骨折日期</label>' +
             
             '<div class="col-xs-8" style="display: inline-block;position: relative;">' +
             
             '<label  style="margin-right: 20px; width: 100%;"><select name="h3_qt" id="h3_qt' + k + '" check="required"   class="form-control p_d_select" style="display: inline-block; width: 100%;" onchange="selectQt(this,' + k + ')">' +
             '<option value="">请选择</option>' +
             '<option value="1">时间详细</option>' +
             '<option value="2">时间不详</option>' +
             '</select> </label>' +
             '</label>' +
             '</div>' +
             //年 月
             '<div  class="col-xs-4 col-xs-offset-4" id="sj'+ k + '">'+
             '<select name="h3_year" id="p_year' + k + '" class="form-control" style="width:auto;display: inline-block" ></select>年' +
             
             '<div style="display: inline-block;position: relative;">' +
             '<select name="h3_mouth" id="p_mouth' + k + '" class="form-control" style="width:auto;display: inline-block" >' +
             '<option value="">请选择</option>' +
             '<option value="01">01</option>' +
             '<option value="02">02</option>' +
             '<option value="03">03</option>' +
             '<option value="04">04</option>' +
             '<option value="05">05</option>' +
             '<option value="06">06</option>' +
             '<option value="07">07</option>' +
             '<option value="08">08</option>' +
             '<option value="09">09</option>' +
             '<option value="10">10</option>' +
             '<option value="11">11</option>' +
             '<option value="12">12</option>' +
             '</select>月' +
             '</div></div>' +
             '</div></div>' +
             '<div class="form-group"><label class="col-xs-4 control-label">骨折治疗方式:</label> <div  class="col-xs-8">' +
             '<select class="form-control input-inline" onchange="selectPatter(this,' + k + ')"  name="h3_pattern" id="p_h3_pattern" ><option value="">请选择</option><option value="1">保守治疗</option><option value="2">手术治疗</option></select></div></div>' +
             '<div class="form-group ispattern"  id="pattern_show' + k + '" style="display:none">' +
             '<div class="sh" style="overflow: hidden">' +
             '<label class="col-xs-4 control-label">术式:</label> ' +
             '<div class="col-xs-8"><input type="text" name="h3_0" placeholder="请输入内容" id="pstternType' + k + '" class="form-control"></input></div>' +
             '</div>' +
             '<div  class="qk" style="overflow: hidden">' +
             '<label class="col-xs-4 control-label">术后情况:</label>  ' +
             '<div class="col-xs-8"><select name="h3_1" onchange="selectSHQK(this,' + k + ')" class="col-xs-9 form-control" tip-msg="请输入术后情况">' +
             '<option value="">请选择</option>' +
             '<option value="1">正常/愈合情况良好 </option>' +
             '<option value="2">其他</option>' +
             '</select>' +
             '<input type="text" name="h3_0_other" id="h3_0SHQK_' + k + '" placeholder="请描述" class="form-control" style="display: none;"></div></div></div > </div>' +
             // '<input type="number" name="h3_age" class="form-control input-inline p_h3_age" check="required"/>'+
             '<div class="form-horizontal">' +
             '<div class="check form-group" tip-msg="请选择骨折原因" data-class="p_e1_3_check_00" check="radio"><div class="p_e1_3_check_00"><label class="col-xs-4 control-label"><span class="must">*</span>骨折原因：</label>' +
             '<div  class="col-xs-8"><input type="radio" name="h3_reason" value="1">脆性' +
             '<input type="radio" name="h3_reason" value="2">暴力</div></div></div>' +
             '<p style="font-size: 14px;"><span class="must">*</span>骨折部位：</p>' +
             '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="请选择骨折位置" data-class="p_h3_0000_' + k + '">' +
             ' <tbody class="p_h3_0000_' + k + '">' +
             '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">请选择骨折部位</div></td></tr>' +
             ' <tr>' +
             
            '<td >' +
              '<input type="checkbox" name="h3_a_6_check" id="h3_a_6_check" value="1" onclick="Ztcheck1(this,'+k+')"/>椎体'+
             '<div style="display: none;" class="Ztclass" id="pztclass'+k+'">' +
             '<div ><input type="checkbox" name="h3_a_1" id="p_h3_a_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_a_1_check" id="h3_a_1_check" value="1">颈椎' +
              '<div style="display: none;">'+
              '（' +
              '<input type="checkbox"  name="h3_a_2" id="p_h3_a_2" value="1">C1' +
              '<input type="checkbox"  name="h3_a_3" id="p_h3_a_3" value="1">C2' +
              '<input type="checkbox"  name="h3_a_4" id="p_h3_a_4" value="1">C3' +
              '<input type="checkbox"  name="h3_a_5" id="p_h3_a_5" value="1">C4' +
              '<input type="checkbox"  name="h3_a_6" id="p_h3_a_6" value="1">C5' +
              '<input type="checkbox"  name="h3_a_7" id="p_h3_a_7" value="1">C6' +
              '<input type="checkbox"  name="h3_a_8" id="p_h3_a_8" value="1">C7）' +
             '</div></div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_a_2_check" id="h3_a_2_check" value="1" class="">胸椎' +
             '</div>' +
             '<div class="h3_a_2'+k+'_check_child check_child" style="display:none">' +
            '<div>胸椎骨折程度</div>' +
            '<div class="p_h3_a_2_1"><table class="table table-bordered text-left p_checkRadio" tip-msg="请选择胸椎骨折程度" data-class="h3_a_2_1_1_00"><tbody class="h3_a_2_1_1_00">' +
            '<tr><td style="width:50px;">T1</td><td><label><input type="radio"  name="h3_a_2_1_1" value="0" onclick="deselect(this)" id="xz1'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_1" value="1"  onclick="deselect(this)" id="xz2'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_1" value="2" onclick="deselect(this)" id="xz3'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_1" value="3" onclick="deselect(this)" id="xz4'+"1"+k+'" >III度</label></td>' +
            '<tr><td>T2</td><td><label><input type="radio"  name="h3_a_2_1_2" value="0" onclick="deselect(this)" id="xz5'+"1"+k+'" >无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_2" value="1" onclick="deselect(this)" id="xz6'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_2" value="2" onclick="deselect(this)" id="xz7'+"1"+k+'" >II度</label><label><input type="radio"  name="h3_a_2_1_2" value="3" onclick="deselect(this)" id="xz8'+"1"+k+'">III度</label></td>' +
            '<tr><td>T3</td><td><label><input type="radio"  name="h3_a_2_1_3" value="0" onclick="deselect(this)" id="xz9'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_3" value="1" onclick="deselect(this)" id="xz10'+"1"+k+'" >I度</label><label><input type="radio" name="h3_a_2_1_3" value="2" onclick="deselect(this)" id="xz11'+"1"+k+'" >II度</label><label><input type="radio"  name="h3_a_2_1_3" value="3" onclick="deselect(this)" id="xz12'+"1"+k+'">III度</label></td>' +
            '</tr>' +
            '<tr><td>T4</td><td><label><input type="radio"  name="h3_a_2_1_4" value="0" onclick="deselect(this)" id="xz13'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_4" value="1" onclick="deselect(this)" id="xz14'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_4" value="2" onclick="deselect(this)" id="xz15'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_4" value="3" onclick="deselect(this)" id="xz16'+"1"+k+'">III度</label></td>' +
            '<tr><td>T5</td><td><label><input type="radio"  name="h3_a_2_1_5" value="0" onclick="deselect(this)" id="xz17'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_5" value="1">I度</label><label><input type="radio" name="h3_a_2_1_5" value="2" onclick="deselect(this)" id="xz18'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_5" value="3" onclick="deselect(this)" id="xz19'+"1"+k+'">III度</label></td>' +
            '<tr><td>T6</td><td><label><input type="radio"  name="h3_a_2_1_6" value="0" onclick="deselect(this)" id="xz20">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_6" value="1" onclick="deselect(this)" id="xz21'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_6" value="2" onclick="deselect(this)" id="xz22'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_6" value="3" onclick="deselect(this)" id="xz23'+"1"+k+'">III度</label></td>' +
            '</tr>' +
            '<tr><td>T7</td><td><label><input type="radio"  name="h3_a_2_1_7" value="0" onclick="deselect(this)" id="xz24'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_7" value="1" onclick="deselect(this)" id="xz25'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_7" value="2" onclick="deselect(this)" id="xz26'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_7" value="3" onclick="deselect(this)" id="xz27'+"1"+k+'">III度</label></td>' +
            '<tr><td>T8</td><td><label><input type="radio"  name="h3_a_2_1_8" value="0" onclick="deselect(this)" id="xz28">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_8" value="1" onclick="deselect(this)" id="xz29'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_8" value="2" onclick="deselect(this)" id="xz30'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_8" value="3" onclick="deselect(this)" id="xz31'+"1"+k+'">III度</label></td>' +
            '<tr><td>T9</td><td><label><input type="radio"  name="h3_a_2_1_9" value="0" onclick="deselect(this)" id="xz32'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_9" value="1" onclick="deselect(this)" id="xz33'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_9" value="2" onclick="deselect(this)" id="xz34'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_9" value="3" onclick="deselect(this)" id="xz35'+"1"+k+'">III度</label></td>' +
            '</tr>' +
            '<tr><td>T10</td><td><label><input type="radio"  name="h3_a_2_1_10" value="0" onclick="deselect(this)" id="xz36'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_10" value="1" onclick="deselect(this)" id="xz37'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_10" value="2" onclick="deselect(this)" id="xz38'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_10" value="3" onclick="deselect(this)" id="xz39'+"1"+k+'">III度</label></td>' +
            '<tr><td>T11</td><td><label><input type="radio"  name="h3_a_2_1_11" value="0" onclick="deselect(this)" id="xz40'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_11" value="1" onclick="deselect(this)" id="xz41'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_11" value="2" onclick="deselect(this)" id="xz42'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_11" value="3" onclick="deselect(this)" id="xz43'+"1"+k+'">III度</label></td>' +
            '<tr><td>T12</td><td><label><input type="radio"  name="h3_a_2_1_12" value="0" onclick="deselect(this)" id="xz44'+"1"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_2_1_12" value="1" onclick="deselect(this)" id="xz45'+"1"+k+'">I度</label><label><input type="radio" name="h3_a_2_1_12" value="2" onclick="deselect(this)" id="xz46'+"1"+k+'">II度</label><label><input type="radio"  name="h3_a_2_1_12" value="3" onclick="deselect(this)" id="xz47'+"1"+k+'">III度</label></td>' +
            '</tr>' +
             '<tr><td colspan="2"><div>椎体骨折程度判断标准示意图见下:</div><img src="' + src + '/static/images/jt.png' + '"  style="width:100%"/></td></tr>' +
             '</tbody></table></div>' +
             '</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_a_3_check" id="h3_a_3_check" value="1">腰椎' +
              '<div style="display: none;">'+
              '（'+
              '<input type="checkbox"  name="h3_a_21" id="p_h3_a_21" value="1">L1'+
              '<input type="checkbox"  name="h3_a_22" id="p_h3_a_22" value="1">L2'+
              '<input type="checkbox"  name="h3_a_23" id="p_h3_a_23" value="1">L3'+
              '<input type="checkbox"  name="h3_a_24" id="p_h3_a_24" value="1">L4'+
              '<input type="checkbox"  name="h3_a_25" id="p_h3_a_25" value="1">L5'+
              '）'+
             '</div></div>' +
             '<div class="h3_a_3'+k+'_check_child check_child" style="display:none;">' +
            '<div>腰椎骨折程度</div>' +
            '<div class="p_h3_a_3_1"><table class="table table-bordered text-left p_checkRadio" tip-msg="请选择腰椎骨折程度" data-class="h3_a_3_1_1_00"><tbody class="h3_a_3_1_1_00"' +
            '<tr><td style="width:50px;">L1</td><td><label><input type="radio"  name="h3_a_3_1_1" value="0" onclick="deselect(this)" id="yz1'+"2"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_3_1_1" value="1" onclick="deselect(this)" id="yz2'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_1" value="2" onclick="deselect(this)" id="yz3'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_1" value="3" onclick="deselect(this)" id="yz4'+"2"+k+'">III度</label></td>' +
            '<tr><td>L2</td><td><label><input type="radio"  name="h3_a_3_1_2" value="0" onclick="deselect(this)" id="yz5'+"2"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_3_1_2" value="1" onclick="deselect(this)" id="yz6'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_2" value="2" onclick="deselect(this)" id="yz7'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_2" value="3" onclick="deselect(this)" id="yz8'+"2"+k+'">III度</label></td>' +
            '<tr><td>L3</td><td><label><input type="radio"  name="h3_a_3_1_3" value="0" onclick="deselect(this)" id="yz9'+"2"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_3_1_3" value="1" onclick="deselect(this)" id="yz10'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_3" value="2" onclick="deselect(this)" id="yz11'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_3" value="3" onclick="deselect(this)" id="yz12'+"2"+k+'">III度</label></td>' +
            '</tr>' +
            '<tr><td>L4</td><td><label><input type="radio"  name="h3_a_3_1_4" value="0" onclick="deselect(this)" id="yz13'+"2"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_3_1_4" value="1" onclick="deselect(this)" id="yz14'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_4" value="2" onclick="deselect(this)" id="yz15'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_4" value="3" onclick="deselect(this)" id="yz16'+"2"+k+'">III度</label></td>' +
            '<tr><td>L5</td><td><label><input type="radio"  name="h3_a_3_1_5" value="0" onclick="deselect(this)" id="yz17'+"2"+k+'">无压缩</label>' +
            '<label><input type="radio"  name="h3_a_3_1_5" value="1" onclick="deselect(this)" id="yz18'+"2"+k+'">I度</label><label><input type="radio" name="h3_a_3_1_5" value="2" onclick="deselect(this)" id="yz19'+"2"+k+'">II度</label><label><input type="radio"  name="h3_a_3_1_5" value="3" onclick="deselect(this)" id="yz20'+"2"+k+'">III度</label></td>' +
            '</tr>' +
             '<tr><td colspan="2"><div>椎体骨折程度判断标准示意图见下:</div><img src="' + src + '/static/images/jt.png' + '"  style="width:100%"/></td></tr>' +
             '</tbody></table></div>' +
             '</div>' +
             '<div>' +
             '<input type="checkbox" name="h3_a_26" id="p_h3_a_26" value="1" >骶椎' +
             '</div>' +
             '</div></br>' +
             '<input type="checkbox" name="h3_b_1_check" id="h3_b_1_check" value="1" />肋骨'+
             '<div  style="display: none;" class="Lgclass">' +
             '<div><input type="checkbox" id="p_h3_b_1" name="h3_b_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_b_1_check3" id="h3_b_1_check3" value="1">左侧' +
             '<div style="display: none;">'+
              '（' +
              '<input type="checkbox"  name="h3_b_2" id="p_h3_b_2" value="1">1' +
              '<input type="checkbox"  name="h3_b_3" id="p_h3_b_3" value="1">2' +
              '<input type="checkbox"  name="h3_b_4" id="p_h3_b_4" value="1">3' +
              '<input type="checkbox"  name="h3_b_5" id="p_h3_b_5" value="1">4' +
              '<input type="checkbox"  name="h3_b_6" id="p_h3_b_6" value="1">5' +
              '<input type="checkbox"  name="h3_b_7" id="p_h3_b_7" value="1">6' +
              '<input type="checkbox"  name="h3_b_8" id="p_h3_b_8" value="1">7' +
              '<input type="checkbox"  name="h3_b_9" id="p_h3_b_9" value="1">8' +
              '<input type="checkbox"  name="h3_b_10" id="p_h3_b_10" value="1">9' +
              '<input type="checkbox"  name="h3_b_11" id="p_h3_b_11" value="1">10' +
              '<input type="checkbox"  name="h3_b_12" id="p_h3_b_12" value="1">11' +
              '<input type="checkbox"  name="h3_b_13" id="p_h3_b_13" value="1">12' +
              '）' +
             '</div></div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_b_2_check" id="h3_b_2_check" value="1">右侧' +
             '<div style="display: none;">'+
              '（' +
              '<input type="checkbox"  name="h3_b_14" id="p_h3_b_14" value="1">1' +
              '<input type="checkbox"  name="h3_b_15" id="p_h3_b_15" value="1">2' +
              '<input type="checkbox"  name="h3_b_16" id="p_h3_b_16" value="1">3' +
              '<input type="checkbox"  name="h3_b_17" id="p_h3_b_17" value="1">4' +
              '<input type="checkbox"  name="h3_b_18" id="p_h3_b_18" value="1">5' +
              '<input type="checkbox"  name="h3_b_19" id="p_h3_b_19" value="1">6' +
              '<input type="checkbox"  name="h3_b_20" id="p_h3_b_20" value="1">7' +
              '<input type="checkbox"  name="h3_b_21" id="p_h3_b_21" value="1">8' +
              '<input type="checkbox"  name="h3_b_22" id="p_h3_b_22" value="1">9' +
              '<input type="checkbox"  name="h3_b_23" id="p_h3_b_23" value="1">10' +
              '<input type="checkbox"  name="h3_b_24" id="p_h3_b_24" value="1">11' +
              '<input type="checkbox"  name="h3_b_25" id="p_h3_b_25" value="1">12' +
              '）' +
             '</div></div>' +
             '</div></br>' +
             
             '<input type="checkbox" name="h3_c_7_check" id="h3_c_7_check" value="1" onclick="Szcheck1(this,'+k+')">上肢'+
             '<div style="display: none;" class="Szclass" id="pSzclass'+k+'">' +
             '<div><input type="checkbox" name="h3_c_1" id="p_h3_c_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
              '<div class="p_h3_checkbox" style="display: none;">' +
              '<input type="checkbox" name="h3_c_1_check" id="h3_c_1_check" value="1">左侧' +
              '（ ' +
              '<input type="checkbox"  name="h3_c_2" id="p_h3_c_2" value="1">指骨' +
              '<input type="checkbox"  name="h3_c_3" id="p_h3_c_3" value="1">掌骨' +
              '<input type="checkbox"  name="h3_c_4" id="p_h3_c_4" value="1">舟骨' +
              '<input type="checkbox"  name="h3_c_5" id="p_h3_c_5" value="1">尺骨' +
              '<input type="checkbox"  name="h3_c_6" id="p_h3_c_6" value="1">桡骨' +
              '<input type="checkbox"  name="h3_c_7" id="p_h3_c_7" value="1">肱骨' +
              '<input type="checkbox"  name="h3_c_8" id="p_h3_c_8" value="1">锁骨' +
              '）' +
              '</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_c_2_check" id="h3_c_2_check" value="1">肩关节' +
             '<div style="display: none;">'+
              '（' +
              '<input type="checkbox"  name="h3_c_9"  id="p_h3_c_9"  value="1">指骨' +
              '<input type="checkbox"  name="h3_c_10" id="p_h3_c_10" value="1">掌骨' +
              '<input type="checkbox"  name="h3_c_11" id="p_h3_c_11" value="1">舟骨' +
              '<input type="checkbox"  name="h3_c_12" id="p_h3_c_12" value="1">尺骨' +
              '<input type="checkbox"  name="h3_c_13" id="p_h3_c_13" value="1">桡骨' +
              '<input type="checkbox"  name="h3_c_14" id="p_h3_c_14" value="1">肱骨' +
              '<input type="checkbox"  name="h3_c_15" id="p_h3_c_15" value="1">锁骨' +
              '）' +
             '</div></div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_c_3_check" id="h3_c_3_check" value="1">肘关节' +
             '</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_c_4_check" id="h3_c_4_check" value="1">腕关节' +
             '</div>' +
             '<div class="p_h3_checkbox">' +
             '<input type="checkbox" name="h3_c_5_check" id="h3_c_5_check" value="1">其他' +
             '</div>' +
             '</div></br>' +
             
             '<input type="checkbox" name="h3_d_1" id="p_h3_d_1" value="1"">骨盆及髋部'+
             '<div style="display: none;" class="Pgclass">' +
             '<div><input type="checkbox" name="h3_d_12" id="p_h3_d_12" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
             '<div>' +
             '<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
             '<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
             '<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
             '<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
             '</div>' +
             '</div></br>' +
             
               '<input type="checkbox" onclick="Xzcheck1(this,'+k+')" name="h3_e_6_check" id="h3_e_6_check" value="1">下肢'+
               '<div style="display: none;" class="Xzclass" id="pXzclass'+k+'">' +
               '<div><input type="checkbox" name="h3_e_1" id="p_h3_e_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox" style="display: none;">' +
                '<input type="checkbox" name="h3_e_1_check" id="h3_e_1_check" value="1">左侧' +
                '（   ' +
                '<input type="checkbox"  name="h3_e_2" id="p_h3_e_2" value="1">足趾' +
                '<input type="checkbox"  name="h3_e_3" id="p_h3_e_3" value="1">髌骨' +
                '<input type="checkbox"  name="h3_e_4" id="p_h3_e_4" value="1">胫骨' +
                '<input type="checkbox"  name="h3_e_5" id="p_h3_e_5" value="1">腓骨' +
                '<input type="checkbox"  name="h3_e_6" id="p_h3_e_6" value="1">踝部' +
                 '<input type="checkbox"  name="h3_e_7" id="p_h3_e_7" value="1">股骨' +
                 '）' +
                '</div>' +
                '<div class="p_h3_checkbox" style="display: none;">' +
                '<input type="checkbox" name="h3_e_2_check" id="h3_e_2_check" value="1">右侧' +
                '</div>' +
               
               '<div class="p_h3_checkbox">' +
               '<input type="checkbox" name="h3_e_3_check" id="h3_e_3_check" value="1">膝关节</input>' +
               '</div>' +
               '<div class="p_h3_checkbox">' +
               '<input type="checkbox" name="h3_e_4_check" id="h3_e_4_check" value="1">踝关节' +
               '</div>' +
            				  '<div  class="p_h3_checkbox">'+
            				  	 '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" value="1">其他'+
            				  '</div>'+
                '<div>'+
               //     '<input type="checkbox" name="h3_z" id="p_h3_z" class="p_others">其他'+
               //     // '<input type="text" name="h3_z_note"  class="form-control"  id="p_h3_z_note" value="测试你">'+
              // '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
            				   '</div>'+
               '</div></br>' +
             
            
             '</tr>' +
             //<!-- 上一个版本的代码全部注释 -->
             
             // // '<tr><td>其他</td></tr>'+
             // '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">其他</div></td></tr>' +
             
             // '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
            
             '<tr><td><div><input type="checkbox"  onclick="Qtcheck1(this)"  name="h3_z_1" id="Qtid"/>其他</div></td></tr>' +
            
            '<tr><td><input type="text" name="h3_z"  class="form-control1"  id="p_h3_z'+k+'" value="" placeholder="请描述"  style="display: none;"></td></tr>' +
            
            				// '<tr><td><inupt type="checkbox"  onclick="Qtcheck1(this)>其他</td></tr>' +
            				
            				// '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述" style="display: none;"></td></tr>' +
            				'</td>' +
             '</tbody>' +
             '</table>' +
             '</form>' +
             '</td>' +
             '</tr>'
          

           
            );
            initYearSelect("#p_year"+ k);
			
			
			for(var i=0;i<data.length;i++){
			if(data[i].h3_z == ""){
				$("#p_h3_z"+i).hide();
			}else if(data[i].h3_z != ""){
				$("#p_h3_z"+i).show();
			}
			if(data[i].h3_e_4_check =="1" || data[i].h3_e_3_check =="1" || data[i].h3_e_5_check =="1" || data[i].h3_e_1 =="1"){
				$("#pXzclass"+i).show();
			}else {
				$("#pXzclass"+i).hide();
			}
			if(data[i].h3_c_3_check == "1" || data[i].h3_c_2_check == "1"|| data[i].h3_c_4_check == "1"|| data[i].h3_c_5_check == "1"|| data[i].h3_c_1 == "1"){
					$("#pSzclass"+i).show();
			}else{
				$("#pSzclass"+i).hide();
			}
			if(data[i].h3_a_1_check =="1"|| data[i].h3_a_2_check =="1"|| data[i].h3_a_3_check =="1"|| data[i].h3_a_26 =="1"|| data[i].h3_a_1 =="1" ){
					$("#pztclass"+i).show();
			}else{
					$("#pztclass"+i).hide();
			}
			if(data[i].h3_a_2_check == '1'){
				$("#xzzl"+i).show();
			}
			if(data[i].h3_a_3_check== '1'){
				$("#yzzl"+i).show();
			}
			}
			
        }
        // sortTrNumber();
        // initHistoryForm("p_h3_fracture_list_",data);
        // allSelChange(".p_h3_checkbox");
        // initDate($(".p_birthday"),"","");
        sortTrNumber();
        if (isArray(data)) {
            initHistoryForm("p_h3_fracture_list_", data);
        }
        allSelChange(".p_h3_checkbox");
        initYMDate($(".p_birthday"), start1, end1);
    }
}
var badLength = 0
    // 初始化不良反应
function initbadStatus(key, data) {
    var arr, str, el;
    if (key == "badStatus") {
        el = "#adrshow";
        $(el).html("");
        for (var k = 0; k < data.length; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(
                '<tr class="badStatus" id="badStatus_' + k + '">' +
                // '<td></td>' +
                '<td colspan="6" style="height: 930px;" ><form>' +
                '<div style="text-align: center;">第<span class="adsNum"></span>次不良反应/事件</div>' +
                '<button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button>' +
                '<div class="form-group">' +
                '<label><span class="must">*</span> 不良反应/事件描述： </label>' +
                '<textarea placeholder="包括发生场所、症状、体征、临床检验等" check="required" class="form-control" name="d_2_note" id="d_2_note" cols="30" rows="10" style="width: 100%;"></textarea>' +
                '</div>' +
                '<div class="form-group">' +
                '<label><span class="must">*</span> 不良反应发生时间： <input check="required" type="text" name="d_2_date" tip-msg="请填写不良反应发生时间" id="d_2_date" class="form-control c-blfysj  notime' + k + '" data-date-format="yyyy-mm-dd" readonly="readonly"></label>' +

                '</div>' +
                '<div class="form-group">' +
                '<label><span class="must">*</span> 不良反应/事件的严重性：' +
                '<img src="../app/static/images/tip.png" onmouseover="message(' + k + ')"  width="15px" class="tips1_' + k + '">  <select name="d_3" id="d_3'+k+'" class="form-control" check="required" onchange="d_3_select(this,' + k + ')" tip-msg="请选择不良反应/事件的严重性" style="display: inline-block;width: 100px;">' +
                '<option value="">请选择</option>' +
                '<option value="2">严重</option>' +
                '<option value="1">不严重</option>' +
                '</select></label>' +

                '</div>' +
                '<div class="form-group" id="d3show' + k + '" style="display: none;">' +
                '<label><span class="must">*</span> 严重性: </label>' +
                '<div id="p_serious" check="checkbox" tip-msg="请选择不良反应/事件的严重性结果" data-class="p_diagnose_03_' + k + '">' +
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_1" id="d_4_1" value="1">导致死亡' +
                '</div>' +
                '</div>' +

                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_2" id="d_4_2" value="1">危及生命' +
                '</div>' +
                '</div>' +
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_3" id="d_4_3" value="1">导致住院或住院时间延长' +
                '</div>' +
                '</div>' +
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_4" id="d_4_4" value="1">导致永久或显著的残疾/功能丧失' +
                '</div>' +
                '</div>' +
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_5" id="d_4_5" value="1">先天性异常/出生缺陷' +
                '</div>' +
                '</div>' +
                '<div class="form-inline">' +
                '<div class="form-group">' +
                '<input type="checkbox" check="checkbox" class="" name="d_4_6" id="d_4_6" value="1">导致其他重要医学事件，如不进行治疗可能出现上述所列情况' +
                '</div>' +
                '</div>' +
                '</div>' +

                '</div>' +
                '<div class="form-group">' +
                '<label><span class="must">*</span> 是否处理： <select check="required" name="d_4_7" id="d_4_7" class="form-control" onchange="d_4_7select(this,' + k + ')" tip-msg="请选择是否处理" style="display: inline-block;width: 100px;">' +
                '<option value="">请选择</option>' +
                '<option value="0">否</option>' +
                '<option value="1">是</option>' +
                '<option value="2">不详</option>' +
                '</select>' +
                '<input type="text" class="p_radio_checkbox111 form-control" placeholder="请描述" name="d_4_7_note" id="d_4_7_note' + k + '" value="" style="display:none;"></label>' +

                '</div>' +
                '<div class="form-group">' +
                '<label><span class="must">*</span> 不良反应/事件结果：' +
                '<img src="../app/static/images/tip.png" width="15px" onmouseover="messages(' + k + ')" class="tips2_' + k + '"> <select check="required" name="d_5" id="d_5" class="form-control" tip-msg="请选择一项" style="display: inline-block;width: 100px;">' +
                '<option value="">请选择</option>' +
                '<option value="1">治愈</option>' +
                '<option value="2">好转</option>' +
                '<option value="3">未好转</option>' +
                '<option value="4">有后遗症</option>' +
                '<option value="5">死亡</option>' +
                '<option value="6">不详</option>' +
                '</select></label>' +
                //    '</div></form>' +
                
                //    '</td>' +
                //    '</tr>'
                '</div>'+
                '<div class="form-group">' +
                '<label><span class="must">*</span> 不良反应与药物治疗关系： <select check="required" name="adverse" id="adverse" class="form-control" onchange="adverseselect(this,' + badLength + ')" tip-msg="请选择是否相关" style="display: inline-block;width: 100px;">' +
                '<option value="">请选择</option>' +
                '<option value="0">否</option>' +
                '<option value="1">是</option>' +
                '<option value="2">无法判断</option>' +
                '<option value="3">不详</option>' +
                '</select>' +
                '<input type="text" class="p_radio_checkbox111 form-control" placeholder="请描述(药物名称)" name="adverse_note" id="adverse_note' + badLength + '" value="" style="display:none;"></label>' +
                
                '</div>'+
                    '<div class="form-group">' +
                				 '<label><span>不良反应相关化验及检查:</span></label>' +
                				 '<textarea placeholder="请描述不良反应"  class="form-control" name="inspect" id="inspect" cols="30" rows="10" style="width: 100%; margin-bottom: 35px;"></textarea>' +
                				 '</div>'+
                				 '</form>' +
                  '<div class="signdataShow" style="text-align: left;padding: 20px;">'+
                     ' <div>'+
                      '<button class="btn btn-primary" type="button" check="required" onclick="openFileUploadModule(this)">上传不良反应相关化验及检查</button>'+
                      '</div>'+
                      '<!-- <label class="col-sm-2 control-label layui-btn"><span class="must">*</span>上传知情同意书：</label> -->'+
                      '<div  id="tysContentId" class="" style="padding-left:10xp;padding-right:10xp;padding-top:7px;font-size: 15px;">'+
                  
                      '</div>'+
                  '</div>'+
                '</td>' +
                '</tr>'
            );

        }
        // sortTrNumber();
        // initHistoryForm("p_h3_fracture_list_",data);
        // allSelChange(".p_h3_checkbox");
        // initDate($(".p_birthday"),"","");
        // sortTrNumber();
        badLength = $("#adrshow .badStatus").length
        console.log(badLength, "不良反应次数")
        if (isArray(data)) {
            initHistoryForm("badStatus_", data);
        }
        initDate( $(".c-blfysj") , null , null );
        // allSelChange(".p_h3_checkbox");
        // initYMDate($(".p_birthday"), start1, end1);
    }
}

function initYMDate(el, sDate, eDate) {
    el.datetimepicker({
        language: "zh-CN",
        use24hours: false,
        //minView:"3",
        format: "yyyy-mm",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 'year',
        minView: 'year',
        forceParse: 0,
        showMeridian: 1,
        //  startDate:new Date(),
        //  endDate:new Date(parseInt("86400000")+new Date().getTime())
        endDate: new Date()

    });
}
// 删除骨折历史
function delFracture(th) {
    layer.confirm('确定要删除记录吗？？', { icon: 3, title: '提示' }, function(index) {
        $(th).parent().parent().remove();
        layer.close(index);
        sortTrNumber();
    });

}
// 健康量表的填写
// 健康量表的填写
function health(th) {
    var val = $(th).val();
    if (val == "" || val == 0) {
        // $(".health-form").hide();
        // $(".health-form").find("input[type='radio']").attr("checked",false);
        // $(".health-form").find('.checkRadio').removeAttr("check");
        $(".health-reault").html("");
        $("#p_h1_a").val("");
        $("#p_page1_h1_a_0").text("");
        $("#p_page1_h1_a_1").text("");
        $("#p_page1_h1_a_2").text("");
        $("#p_page1_h1_a_3").text("");
        $("#p_page1_h1_a_4").text("");
    } else {
        // $(".health-form").show();
        // $(".health-form").find('.checkRadio').attr("check","radio");
        // var updateUrl=src+"/p_heathForm.html";
        // openCommonLayer("healthId", 2, "健康量表",updateUrl,["300px","500px"], healthCallback,["确定"])
        var json = JSON.stringify({ "pid": userJson.pid, "dgId": userJson.dgId });
        var updateUrl = src + "/p_heathForm.html?pid=" + json;
        openCommonLayer("healthId", 1, "健康量表", $("#healBox"), ["300px", "500px"], healthCallback, ["确定"], function() {
            var aaab = $("#p_page1_h1_a_0").text();
            if (aaab == "") {
                $("#p_h1_check").val("0")
            }
        });
        //window.open(updateUrl,"_self");
    }

}
// 提交健康量表数据
function submitHealth() {
    var h1 = $("#h1_1").find("input[type='radio']:checked").val();
    var h2 = $("#h1_2").find("input[type='radio']:checked").val()
    var h3 = $("#h1_3").find("input[type='radio']:checked").val()
    var h4 = $("#h1_4").find("input[type='radio']:checked").val()
    var h5 = $("#h1_5").find("input[type='radio']:checked").val();
    if (h1 && h2 && h3 && h4 && h5) {
        var stateVal = h1 + h2 + h3 + h4 + h5;
        ajaxCommon("healthResult/result", { "state": stateVal }, healthCallback, '', "");
    } else {
        top.layer.msg("请认真勾选健康量表", { icon: 5, anim: 3 });
        return false;
    }

}

function healthCallback(id, index, layero) {
    //得到iframe页的窗口对象
    // var iframeWin = top.window[layero.find("iframe")[0]["name"]];
    // var json;
    // //执行iframe页的showMsg方法
    var data = getFormData();
    if (data) {
        ajaxCommon("healthResult/result", data, healthResultCallback, '', id);
        //initTable();
    } else {
        layer.msg("请认真填写消息");
    }
}

function getFormData() {
    var h1 = $("#h1_1").find("input[type='radio']:checked").val();
    var h2 = $("#h1_2").find("input[type='radio']:checked").val()
    var h3 = $("#h1_3").find("input[type='radio']:checked").val()
    var h4 = $("#h1_4").find("input[type='radio']:checked").val()
    var h5 = $("#h1_5").find("input[type='radio']:checked").val();
    var data;
    if (h1 && h2 && h3 && h4 && h5) {
        var stateVal = h1 + h2 + h3 + h4 + h5;
        data = { "state": stateVal };
    } else {
        top.layer.msg("请认真勾选健康量表", { icon: 5, anim: 3 });
        return false;
    }
    return data;

}
// 回显健康量表的得分
function healthResultCallback(el, data) {
    //console.log(data);
    //$(".health-form").hide();
    //$(".health-form").find('input[type="radio"]').attr("checked",false);
    top.layer.closeAll();
    $(".health-reault").html("");
    for (var key in data) {
        // $("#h_"+key).text("");
        // $("#h_"+key).text(data[key]);
        $(".health-reault").append("<span>" + data[key] + "</span>;")
    }
    $("#p_h1_a").val(data.mult8re25Percentile + ";" + data.mult8re95PercentageCiWidth + ";" + data.mult8re975Percentile + ";" + data.mult8reRescaled + ";" + data.mult8reSe);
    $("#p_page1_h1_a_0").text(data.mult8re25Percentile);
    $("#p_page1_h1_a_1").text(data.mult8re95PercentageCiWidth);
    $("#p_page1_h1_a_2").text(data.mult8re975Percentile);
    $("#p_page1_h1_a_3").text(data.mult8reRescaled);
    $("#p_page1_h1_a_4").text(data.mult8reSe);
}
/* 公共弹框 */
function openCommonLayer(id, type, title, el, areaArr, callback, btnArr, closee) {
    var rx = /^https?:\/\//i;
    var con;
    if (rx.test(el)) {
        con = el;
    } else {
        con = $(el);
    }
    var area, btn;
    if (areaArr) {
        area = areaArr;
    } else {
        area = ["500px", "550px"];
    }
    if (btnArr) {
        btn = btnArr;
    } else {
        btnArr = ["确定", "取消"];
    }
    id = top.layer.open({
        type: type,
        title: title,
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 0, //不显示关闭按钮
        anim: 2,
        shadeClose: false, //开启遮罩关闭
        area: area,
        move: ".layui-layer-title",
        closeBtn: 1,
        content: con,
        scrollbar: false,
        maxmin: false,
        btn: btn,
        yes: function(index, layero) {
            callback(id, index, layero);
        },
        btn2: function() {
            top.layer.close(id)
        },
        end: function() {
            if (closee != null) {
                closee()
            }
        }

    });
}

var reg_check3 = /^0\.\d{1,3}$|^[1-9]+(.?\d{1,3})?$|^[1-9]\d+(.?\d{1,3})?$/; //正数，允许录入三位小数，不允许录入0或负数
var reg_check4 = /^[\-\+]?\d+(\.\d)?$/; //允许录入一位小数 可为正数 负数 以及0
// 请输入正数，允许录入三位小数，不允许录入0或负数
function check3(th) {
    var val = $(th).val();
    var id = $(th).attr("id");
    if (val) {
        if (val != 0) {
            if (!reg_check3.test(val)) {
                top.layer.msg("请输入正数，允许录入三位小数，不允许录入0或负数", { icon: 5, anim: 6 });
                $("#" + id).focus();
                $("#" + id).val("");
                $("#" + id).select();
                return false;
            }
        } else {
            $("#" + id).focus();
            $("#" + id).val("");
            $("#" + id).select();
            top.layer.msg("请输入正数，允许录入三位小数，不允许录入0或负数", { icon: 5, anim: 6 });
        }
    }
}
// 允许录入一位小数可为负数、正数以及0
function check4(th) {
    var val = $(th).val();
    var id = $(th).attr("id");
    if (val) {
        if (!reg_check4.test(val)) {
            top.layer.msg("允许录入一位小数", { icon: 5, anim: 6 });
            $("#" + id).focus();
            $("#" + id).val("");
            $("#" + id).select();
            return false;
        }
    }
}

// FRAX骨折风险测评
function frax(th) {
    var val = $(th).val();
    if (val == "" || val == 0) {
        $("#p_fractureRate").val("")
        $("#p_osteoporticFracture").val("")
        $("#p_isDensity").val("")
        $("#fraxShow").hide()
        $("#fraxShow input").removeAttr("check", "required")
        $("#fraxShow select").removeAttr("check", "required")
    } else {
        $("#fraxShow").show()
        $("#fraxShow input").attr("check", "required checkz1");
        $("#fraxShow select").attr("check", "required")
            // window.location = "https://www.sheffield.ac.uk/FRAX/tool.aspx?country=2"
        layer.open({
            title: "FRAX骨折风险测评系统 ",
            zIndex: "99999999999",
            type: 2,
            // offset: '45px',
            area: ['100%', '100%'],
            content: 'https://www.sheffield.ac.uk/FRAX/tool.aspx?country=2' //这里content是一个URL，如果你不想让iframe出现滚动条，你还可以content: ['http://sentsin.com', 'no']
        });
        // window.open("https://www.sheffield.ac.uk/FRAX/tool.aspx?lang=chs", "_blank");
    }

}


// morse跌倒风险评估
function morse(th) {
    var val = $(th).val();
    if (val == "" || val == 0) {
        $("#morseResult").text('');
    } else {
        var updateUrl = src + "/p_morseForm.html";
        openCommonLayer("morseId", 1, "Morse跌倒风险评估量表", $("#morseBox"), ["300px", "500px"], morseCallback, ["确定"], function() {
            var aaab = $("#morseResult").text()
            if (aaab == "") {
                $("#p_isMorse").val("0")
            }
        })
    }

}
// morse跌倒风险评估回调

function morseCallback(id, index, layero) {
    //得到iframe页的窗口对象
    // var iframeWin = top.window[layero.find("iframe")[0]["name"]];
    // var json;
    //执行iframe页的showMsg方法
    var data = getFormData1();
    console.log(data, "asfkaoi")
    if (data == false) {
        return
    }
    top.layer.closeAll();
    $("#morseResult").text(data.fallRiskAssessment);
}


function d_2_select(th) {
    var val = $(th).val();
    if (val == "" || val == 0) {
        $("#adrshow").html('')
        $("#addButton").prop("disabled", "disabled");
        $("#thisAdrs").removeClass("check");
        $("#thisAdrs").removeAttr("check");
        badLength = 0
            // $("#adrshow").hide()
            // $("#adrshow").find($("d_2_note")).val("")
            // $("#adrshow select,#adrshow input,#adrshow textarea").val("")
            // $("#d3show input[type='checkbox']").prop("checked", false);
            // $("#d_4_7_note").hide()
            // $("#d3show").hide()
            // $("#p_serious").removeAttr("check", "")
            // $("#d_2_note").removeAttr("check", "required")
            // $("#d_2_date").removeAttr("check", "required")
            // $("#adrshow select").removeAttr("check", "required")
    } else {
        $("#addButton").removeProp("disabled");
        $("#thisAdrs").addClass("check");
        $("#thisAdrs").attr("check", "adrs")
            // $("#adrshow").show()
            // $("#d_2_note").attr("check", "required")
            // $("#d_2_date").attr("check", "required")
            // $("#adrshow select").attr("check", "required")
    }

}


// function d_3_select(th) {
//     var val = $(th).val();
//     if (val == "" || val == 1) {
//         $("#d3show").hide()
//         $("#d3show input[type='checkbox']").prop("checked", false);
//         $("#p_serious").removeAttr("class", "check p_diagnose_03")
//     } else {
//         $("#d3show").show()
//         $("#p_serious").attr("class", "check p_diagnose_03")
//     }
// }

// function d_4_7select(th) {
//     var val = $(th).val();
//     if (val == 1) {
//         $("#d_4_7_note").show()
//         $("#d_4_7_note").attr("check", "required")
//     } else {
//         $("#d_4_7_note").hide()
//         $("#d_4_7_note").removeAttr("check", "required")
//     }
// }

// 初始化不良反应发生时间
// function initBlDate(el, data, num) {
//     // var startTime = data.startTime ? new Date(data.startTime) : "";
//     // var endTime = data.endTime ? new Date(data.endTime) : new Date();
//     $('.notime' + num + '').datetimepicker({
//         language: "zh-CN",
//         use24hours: false,
//         minView: "month",
//         format: "yyyy-mm-dd",
//         weekStart: 1,
//         todayBtn: 1,
//         autoclose: 1,
//         todayHighlight: 1,
//         startView: 2,
//         forceParse: 0,
//         showMeridian: 1,
//         // startDate: startTime,
//         endDate: new Date(),
//     });
// }


var reg_heck5 =  /^[+-]?\d*\.?\d{1,3}$/; //允许录入三位小数
function check5(th) {
    var val = $(th).val();
    var id = $(th).attr("id");
    if (val) {
        if (val != 0) {
            if (!reg_heck5.test(val)) {
                top.layer.msg("允许录入三位小数", { icon: 5, anim: 6 });
                $("#" + id).focus();
                $("#" + id).val("");
                $("#" + id).select();
                return false;
            }
        }
    }
}


function selectPatter(e, k) {
    var val = $(e).val();
    if (val == "1" || val == "") {
        $('#pattern_show' + k + '').hide()
            // $('#pattern_show' + k + '').find("select[name=h3_1]").removeAttr("check", "required");
    } else {
        $('#pattern_show' + k + '').show()
        $('#pattern_show' + k + '').find("select").val("");
        $('#pattern_show' + k + '').find("input[name=h3_0_other]").val("").hide();
        // $('#pattern_show' + k + '').find("select[name=h3_1]").attr("check", "required");
        $('#pstternType' + k + '').val("")
    }
}

function selectSHQK(e, i) {
    if ($(e).val() === "2") {
        $("#h3_0SHQK_" + i).css('display', '');
    } else {
        $("#h3_0SHQK_" + i).css('display', 'none');
        $("#h3_0SHQK_" + i).val("");
    }
}

function d_3_select(th, num) {
    var val = $(th).val();
    if (val == "" || val == 1) {
        // $("#adrshow").show()
        // $("#p_osteoporticFracture").val("")
        $('#d3show' + num + '').hide()
        $('#d3show' + num + ' input[type="checkbox"]').prop("checked", false);
        $('#d3show' + num + ' #p_serious').removeAttr("class", 'check p_diagnose_03_' + num + '')
            // $("#fraxShow input").removeAttr("check", "required")
    } else {
        $('#d3show' + num + '').show()
        $('#d3show' + num + ' #p_serious').attr("class", 'check p_diagnose_03_' + num + '')
            // $("#d3show").show()
            // $("#fraxShow input").attr("check", "required")
            // window.open("http://www.shef.ac.uk/FRAX/tool.aspx?", "_blank");
    }

}

function d_4_7select(th, num) {
    var val = $(th).val();
    if (val == 1) {
        // $("#adrshow").show()
        // $("#p_osteoporticFracture").val("")
        $('#d_4_7_note' + num + '').show()
        $('#d_4_7_note' + num + '').attr("check", "required")

    } else {

        $('#d_4_7_note' + num + '').hide()
        $('#d_4_7_note' + num + '').removeAttr("check", "required")
            // window.open("http://www.shef.ac.uk/FRAX/tool.aspx?", "_blank");
    }

}
// var addb = 0;

function addBadStatus(el, type) {
    var str = "";
    if (badLength == 0) {
        badLength++;
    } else if (badLength > 0) {
        badLength = badLength - 1
        badLength++;
    } 
	var badLengthi=0;
	// $('.badStatus').each(function(index, obj) {
	//     //$(obj).attr("class", "add-tr"+(index+1));
	//     // console.log($(obj).attr("class", "add-tr" + (index + 1)));
	//    var badLengthi=index+1;
	// });
	if($(".badStatus").length >=1){
		badLengthi+=$(".badStatus").length+1
	}
debugger
    console.log(badLength, "不良反应次数")
    if ($(".badStatus").length < 10) {
        str = '<tr class="badStatus" id="badStatus_' + badLengthi + '">' +
            // '<td><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button></td>' +
            '<td colspan="6" style="height: 900px;"><form>' +
            '<div style="text-align: center;">第<span class="adsNum"></span>次不良反应/事件</div>' +
            '<button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button>' +
            '<div class="form-group">' +
            '<label><span class="must">*</span> 不良反应/事件描述： </label>' +
            '<textarea placeholder="包括发生场所、症状、体征、临床检验等" check="required" class="form-control" name="d_2_note" id="d_2_note" cols="30" rows="10" style="width: 100%;"></textarea>' +
            '</div>' +
            '<div class="form-group">' +
            '<label><span class="must">*</span> 不良反应发生时间： <input check="required" type="text" name="d_2_date" tip-msg="请填写不良反应发生时间" id="d_2_date" class="form-control c-blfysj notime' + badLengthi + '" data-date-format="yyyy-mm-dd" readonly="readonly"></label>' +

            '</div>' +
            '<div class="form-group">' +
            '<label><span class="must">*</span> 不良反应/事件的严重性：' +
            '<img src="../app/static/images/tip.png" width="15px" onmouseover="message(' + badLengthi + ')" class="tips1_' + badLengthi + '">  <select name="d_3" id="d_3'+badLengthi+'" class="form-control" check="required" onchange="d_3_select(this,' + badLengthi + ')" tip-msg="请选择不良反应/事件的严重性" style="display: inline-block;width: 100px;">' +
            '<option value="">请选择</option>' +
            '<option value="2">严重</option>' +
            '<option value="1">不严重</option>' +
            '</select></label>' +

            '</div>' +
            '<div class="form-group" id="d3show' + badLengthi + '" style="display: none;">' +
            '<label><span class="must">*</span> 严重性: </label>' +
            '<div id="p_serious" check="checkbox" tip-msg="请选择不良反应/事件的严重性结果" data-class="p_diagnose_03_' + badLengthi + '">' +
            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_1" id="d_4_1" value="1">导致死亡' +
            '</div>' +
            '</div>' +

            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_2" id="d_4_2" value="1">危及生命' +
            '</div>' +
            '</div>' +
            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_3" id="d_4_3" value="1">导致住院或住院时间延长' +
            '</div>' +
            '</div>' +
            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_4" id="d_4_4" value="1">导致永久或显著的残疾/功能丧失' +
            '</div>' +
            '</div>' +
            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_5" id="d_4_5" value="1">先天性异常/出生缺陷' +
            '</div>' +
            '</div>' +
            '<div class="form-inline">' +
            '<div class="form-group">' +
            '<input type="checkbox" check="checkbox" class="" name="d_4_6" id="d_4_6" value="1">导致其他重要医学事件，如不进行治疗可能出现上述所列情况' +
            '</div>' +
            '</div>' +
            '</div>' +

            '</div>' +
            '<div class="form-group">' +
            '<label><span class="must">*</span> 是否处理： <select check="required" name="d_4_7" id="d_4_7" class="form-control" onchange="d_4_7select(this,' + badLengthi + ')" tip-msg="请选择是否处理" style="display: inline-block;width: 100px;">' +
            '<option value="">请选择</option>' +
            '<option value="0">否</option>' +
            '<option value="1">是</option>' +
            '<option value="2">不详</option>' +
            '</select>' +
            '<input type="text" class="p_radio_checkbox111 form-control" placeholder="请描述" name="d_4_7_note" id="d_4_7_note' + badLengthi + '" value="" style="display:none;"></label>' +

            '</div>' +
            '<div class="form-group">' +
            '<label><span class="must">*</span> 不良反应/事件结果：' +
            '<img src="../app/static/images/tip.png" width="15px" onmouseover="messages(' + badLengthi + ')" class="tips2_' + badLengthi + '"> <select check="required" name="d_5" id="d_5" class="form-control" tip-msg="请选择一项" style="display: inline-block;width: 100px;">' +
            '<option value="">请选择</option>' +
            '<option value="1">治愈</option>' +
            '<option value="2">好转</option>' +
            '<option value="3">未好转</option>' +
            '<option value="4">有后遗症</option>' +
            '<option value="5">死亡</option>' +
            '<option value="6">不详</option>' +
            '</select></label>' +
           //    '</div></form>' +
           
           //    '</td>' +
           //    '</tr>'
           '</div>'+
           '<div class="form-group">' +
           '<label><span class="must">*</span> 不良反应与药物治疗关系： <select check="required" name="adverse" id="adverse" class="form-control" onchange="adverseselect(this,' + badLengthi + ')" tip-msg="请选择是否相关" style="display: inline-block;width: 100px;">' +
           '<option value="">请选择</option>' +
           '<option value="0">否</option>' +
           '<option value="1">是</option>' +
           '<option value="2">无法判断</option>' +
           '<option value="3">不详</option>' +
           '</select>' +
           '<input type="text" class="p_radio_checkbox111 form-control" placeholder="请描述(药物名称)" name="adverse_note" id="adverse_note' + badLengthi + '" value="" style="display:none;"></label>' +
           
           '</div>'+
               '<div class="form-group" >' +
           				 '<label><span>不良反应相关化验及检查:</span></label>' +
           				 '<textarea placeholder="请描述不良反应"  class="form-control" name="inspect" id="inspect" cols="30" rows="10" style="width: 100%;"></textarea>' +
           				 '</div>'+
           				 '</form>' +
                 '<div class="signdataShow" style="text-align: left;padding: 20px;">'+
                 '<button class="btn btn-primary" type="button" style="position: unset;" check="required" onclick="openFileUploadModule(this)">上传不良反应相关化验及检查</button>'+
                 
                 '<!-- <label class="col-sm-2 control-label layui-btn"><span class="must">*</span>上传知情同意书：</label> -->'+
                 '<div  id="tysContentId" class="" style="padding-left:10xp;padding-right:10xp;padding-top:7px;font-size: 15px;">'+
             
                 '</div>'+
             '</div>'+
           '</td>' +
           '</tr>'
    } else {
        // console.log("5554")
        layer.alert("最多创建10条历史!");
        return false;
    }
    $(el).append(str);
    // initBlDate("", "", badLengthi);
    initDate( $(".c-blfysj") , null , null );
    sortTrNumber();
}

function message(num) {
    var layer_tips = 0;
    $(document).on('mouseenter', '.tips1_' + num + '', function() {

        layer_tips = layer.tips("注：不符合任何一项严重性标准时，选择非严重。严重性不是严重程度。比如头痛可以程度很重，但不是严重事件 存在以下损害情形之一的不良反应应当被判定为严重药品不良反应： <br/>（1）导致死亡；<br/>（2）危及生命；<br/>（3）导致住院或住院时间延长；<br/>（4）导致永久或显著的残疾/功能丧失；<br/>（5）先天性异常/出生缺陷；<br/>（6）导致其他重要医学事件，如不进行治疗可能出现上述所列情况的", '.tips1_' + num + '', {
            time: 0,
            tips: [1, '#3595CC'],
            // tipsMore: true
        });

    }).on('mouseleave', '.tips1_' + num + '', function() {
        layer.close(layer_tips);

    });
}

function messages(num) {
    var layer_tips = 0;
    $(document).on('mouseenter', '.tips2_' + num + '', function() {

        layer_tips = layer.tips("填写不良反应的结果信息，而非原患疾病的结果。<br/> 1）治愈：指不良反应消失。<br/> 2）好转：不良反应明显减轻或缓解，在报告时尚未痊愈。<br/> 3）未好转：至报告时不良反应仍未减轻或缓解。<br/> 4）有后遗症：不良反应导致长期的或永久的生理机能障碍。后遗症临床表现应填写在 “不良反应过程描述”部分。注意不应将恢复期或恢复阶段的某些症状视为后遗症。<br/> 5）死亡：指患者因该不良反应导致死亡。如果患者同时报告有多个不良反应，其中仅一个不良反应导致死亡，其它未导致死亡的不良反应的结果不应选择死亡。", '.tips2_' + num + '', {
            time: 0,
            tips: [1, '#3595CC'],
        });

    }).on('mouseleave', '.tips2_' + num + '', function() {
        layer.close(layer_tips);

    });
}

// 初始年
function initYearSelect(el) {
    $(el).html();
    var date = new Date();
    $(el).append("<option value=''>请选择</option>");
    for (var i = 1950; i <= date.getFullYear(); i++) {
        $(el).append("<option value='" + i + "'>" + i + "</option>");
    };

}
function selectQt(e,k) {
    if($("#h3_qt"+ k).val() == 2){
        $("#sj"+ k).hide();
        $("#p_year"+ k).removeAttr("check");
        $("#p_year"+ k).val("");
        $("#p_mouth"+ k).val("");
    }else if ($("#h3_qt"+ k).val() == 1){
        $("#sj"+ k).show();
        $("#p_year"+ k).attr("check","required");
    }else {
        $("#sj").hide();
        $("#p_year"+ k).removeAttr("check");
        $("#p_year"+ k).val("");
        $("#p_mouth"+ k).val("");
    }
}

function openFileUploadModule(){
    console.log(src)
    var url=src+"/template/checkinfoUploda.html?pid="+userJson.pid;
    open333(url);
}

function open333(el) {
    var rx = /^https?:\/\//i;
    var con;
    if (rx.test(el)) {
        con = el;
    } else {
        con = $(el);
    }
	console.log(con)
    var iframe = '<iframe id = "iframeContentId" style="width: 99%;height: 420px;border: 1px solid red" src="'+con+'" ></iframe>'
  //  var commit = '<div id = "commit" style="width: 99%;height: 20px;border: 1px solid yellowgreen" " ></div>'
    layer.open({
         id:"abcdefg"
        ,type: 1
        ,content: iframe
        ,anim: 'up'
		,title: '不良反应检查结果图片上传'
        ,btn: ['确定','取消']
        ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 72%; padding:10px 0; border:none;margin:0 auto'
        ,closeSucc: closeOk
    });
}
function closeOk() {
    //  checkTys()
    var fileUUid = 'ee454w5454e5r4w5'
    if(fileUUid != null){
       // $("#tysId1").show();
        //$("#tysId2").css("width","50%");
       // localStorage.setItem("uuid",fileUUid)
        $("#fileTeamUuid").val(fileUUid)
    }
}function adverseselect(th,num){
	var val = $(th).val();
	if (val == 1) {
	    // $("#adrshow").show()
	    // $("#p_osteoporticFracture").val("")
	    $('#adverse_note' + num + '').show()
	    $('#adverse_note' + num + '').attr("check", "required")
	
	} else {
	
	    $('#adverse_note' + num + '').hide()
	    $('#adverse_note' + num + '').removeAttr("check", "required")
	        // window.open("http://www.shef.ac.uk/FRAX/tool.aspx?", "_blank");
	}
	
}


function Ztcheck1(val,k){
    $(".h3_a_3"+k+"_check_child").hide();//隐藏 腰椎骨折程度
    $(".h3_a_2"+k+"_check_child").hide();//隐藏 胸椎骨折程度
    gzCheckBus(val); 


}
		
function Lgchenck1(val){
    let val2=val
    let Lgclass=document.getElementsByClassName('Lgclass')
    if(val2.checked){
        for(let i=0;i<Lgclass.length;i++){
            Lgclass[i].style.display='block';
        }
    }else{
        for(let i=0;i<Lgclass.length;i++){
            Lgclass[i].style.display='none';
        }
    }
    
}

function Szcheck1(val){ gzCheckBus(val);} 
function Xzcheck1(val){ gzCheckBus(val);} 

function gzCheckBus(e){ //骨折勾选bus 公共总线
    if(e.checked){ 
        $(e).next().show();
    }else{ 
        $(e).next().find("input[type='radio']").prop("checked",false);
        $(e).next().find("input[type='radio']").removeAttr("disabled");
        $(e).next().find("input[type='checkbox']").removeAttr("checked");
        $(e).next().find("input[type='checkbox']").removeAttr("disabled");
        $(e).next().hide(); 
    }
}

// function Szcheck1(val,k){
//     let val3=val
//     let Szclass=document.getElementsByClassName('Szclass'+k)
//     if(val3.checked){
//         for(let i=0;i<Szclass.length;i++){
//             Szclass[i].style.display='block';
//         }
//     }else{
//         for(let i=0;i<Szclass.length;i++){
//             Szclass[i].style.display='none';
//         }
//     }
    
// }
function Pgcheck1(val){
    let val4=val
    let Pgclass=document.getElementsByClassName('Pgclass')
    if(val4.checked){
        for(let i=0;i<Pgclass.length;i++){
            Pgclass[i].style.display='block';
        }
    }else{
        for(let i=0;i<Pgclass.length;i++){
            Pgclass[i].style.display='none';
        }
    }
    
}
// function Xzcheck1(val,k){
//     let val5=val
//     let Xzclass=document.getElementsByClassName('Xzclass'+k)
//     if(val5.checked){
//         for(let i=0;i<Xzclass.length;i++){
//             Xzclass[i].style.display='block';
//         }
//     }else{
//         for(let i=0;i<Xzclass.length;i++){
//             Xzclass[i].style.display='none';
//         }
//     }
 
// }
		
function Qtcheck1(val){ 
    let val6=val
    let h3zid=document.getElementsByClassName('form-control1')
    if(val6.checked){
        for(let i=0;i<h3zid.length;i++){
                h3zid[i].style.display='block';
            }
        }else{
            for(let i=0;i<h3zid.length;i++){
                h3zid[i].style.display='none';
            }
			$("#p_h3_z").val("")
        }
}
		
function qtbtn(val){
    let qtval=val
    debugger
    var Qtgzon=document.getElementById('Qtgzon');
    
    if(!qtval.checked){
            Qtgzon.style.display='none'
    
    }else{
        
            Qtgzon.style.display='block'
        
    }

    
}
function deselect(e){

	var deval=e;
          
 var $radio = $('input[id="'+deval.id+'"]')
 // if this was previously checked
 if ($radio.data('waschecked') == true){
	  $radio.prop('checked', false);
	  $radio.data('waschecked', false);
  } else {
		$radio.prop('checked', true);
		$radio.data('waschecked', true);
	  }
		
			
}
		