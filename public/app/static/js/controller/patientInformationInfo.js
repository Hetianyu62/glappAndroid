/*
 * @Description: 患者基本信息 业务js
 * @Author: 杨志强
 * @Date: 2019-08-30 14:12:43
 * @LastEditTime: 2020-03-24 17:12:34
 * @LastEditors: Please set LastEditors
 */

var userJson, pid;
var boonJson;
var menopauseStatus;
var apid, age, examineResult, dataHid, userHid;
var oneData, qusData, ostaData;

$(function() {
    var token = decodeURI(getUrlParams('token'));
    sessionStorage.setItem("token", token);
    var p_realname = decodeURI(getUrlParams('realname'));
    sessionStorage.setItem("p_realname", p_realname);
    pid = decodeURI(getUrlParams('pid')).replace(/\"/g, '');
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        //examineResult=userJson.examineResult;
        PatientAjax("patient/detial", { "pid": pid }, initPatientForm);
    }
});
// 初始化患者表单信息
function initPatientForm(el, data) {
	debugger
    var lost = sessionStorage.getItem('lost');
    var flag = sessionStorage.getItem('flag');
    for (var key in data) {
        $("#p_" + key).text("");
        $("#p_" + key).text(data[key]);
    }
    $("#p_pid").val(data.pid);
    $("#p_gender").val(data.gender);
    $("#p_residence").text(data.residence.replace(/\//g, " "));
    if (data.btnState == 0) {
        $("#p_update").html("");
    } else if (data.btnState == 1 && lost == "-1" && flag == "4") {
        $("#p_update").html("");
        $("#p_update").append('<button type="button" class="btn btn-primary flag_btn" onclick="updatepatientInfo()">修改</button>');
    }
    if (data.gender == 1) {
        $("#p_ostaBox").hide();
    } else {
        $("#p_ostaBox").show();
        $(".p_riskTest_examine3Add").hide();
        $(".p_riskTest_examine3Update").hide();
    }

    $("#p_birthday").val(data.ageA);
    if (data.lastTreatment) {
        $("#p_lastTreatment").text(dateFormat(data.lastTreatment));
    } else {
        $("#p_lastTreatment").text("无");
    }
    if (data.create_date) {
        $("#p_create_date").text(dateFormat(data.create_date));
    } else {
        $("#p_create_date").text("无");
    }

    if (data.special == 1) {
        $("#p_special").text("是");
    } else {
        $("#p_special").text("否");
    }
    if (data.education == 1) {
        $("#p_education").text("小学");
    }
    if (data.education == 2) {
        $("#p_education").text("初中");
    }
    if (data.education == 3) {
        $("#p_education").text("高中或中专或技校");
    }
    if (data.education == 4) {
        $("#p_education").text("本科或大专");
    }
    if (data.education == 5) {
        $("#p_education").text("研究生及以上");
    }
    if (data.education == 6) {
        $("#p_education").text("文盲或半文盲");
    }
    if (data.education == 7) {
        $("#p_education").text("资料不详");
    }
    if (data.otherRelations == 1) {
        $("#p_otherRelations").text("配偶");
    }
    if (data.otherRelations == 2) {
        $("#p_otherRelations").text("子女");
    }
    if (data.otherRelations == 3) {
        $("#p_otherRelations").text("父母");
    }
    if (data.otherRelations == 4) {
        $("#p_otherRelations").text("其他亲属");
    }
    if (data.otherRelations == 5) {
        $("#p_otherRelations").text("朋友");
    }
    if (data.sign == 1) {
        $("#p_signDatas").text(dateFormat(data.signData));
    } else {
        $("#p_signDatas").text("未签署知情同意书");
    }
    apid = data.apid;
    age = data.age;
    /*
     1  是 首诊
     >1 是 随诊
     0  是 无诊断
    */
    if (data.countTreatment == 1) {
        $("#p_countTreatment").text("首诊");
    } else if (data.countTreatment > 1) {
        $("#p_countTreatment").text("随诊");
    } else if (data.countTreatment == 0) {
        $("#p_countTreatment").text("无诊断记录");
    }
    sessionStorage.setItem("gender", data.gender);
    sessionStorage.setItem("age", data.age);
	sessionStorage.setItem("verson", data.verson);


}
// 公共ajax
function PatientAjax(url, data, callback) {
    $("#editUserForm").publicAjax({
        url: globalUrl + url,
        type: "post",
        data: data,
        dataType: 'json',
        successFn: function(data) {
            if (data.code == "0") {
                callback("", data.data)
            } else {
                layer.alert(data.msg);
            }
        }
    })
}
// 点击修改按钮切换修改页面
function updatepatientInfo() {
    var json = JSON.stringify({ "pid": pid });
    window.open(src + '/patientUpdate.html?pid=' + json + '', "_self");
}
// 获取radio选中的值
function getRadioKey() {
    var val = $('#p_examineTimes li').find("input[type='radio']:checked").val();
    return val;
}
// 公共ajax
function ajaxCommon(url, data, callback, el, id) {
    $("#addPatientFrom").publicAjax({
        url: globalUrl + url,
        type: "post",
        data: data,
        dataType: "json",
        successFn: function(data) {
            if (data.code == "0") {
                if (id) {
                    parent.layer.close(id);
                }
                if (data.data) {
                    callback(el, data.data);
                } else {
                    callback(el, data);
                }

            } else {
                parent.layer.alert(data.msg);
            }
        }
    });
}
//  点击预约 弹框展示日期插件
 function mackAppointment() {

    parent.layer.open({
        type: 1,
        title: "预约",
        area: ['600px', '560px'], //宽高
        content: '<div style="padding:20px;"><div class="input-group date form_date " id="form_date"></div><div id="time_form">' +
            '<label class="checkbox-inline"><input type="radio" id="inlineCheckbox1" checked="checked" name="time" value="0">上午</label>' +
            '<label class="checkbox-inline"><input type="radio" id="inlineCheckbox1" name="time" value="1">下午</label></div></div>',
        btn: ["确定", "取消"],
        yes: function() {
            parent.layer.confirm('预约后无法撤销,请确认日期是否正确!', {
                icon: 3,
                title: '提示'
            }, function(index) {
                var id = window.parent.document.getElementById("form_date");
                var timeId = window.parent.document.getElementById("time_form");
                var val = $(id).data("datetimepicker").getDate();
                var timeVal = $(timeId).find("input[name='time']:checked").val();
                var data = { "adatestr": dateFormat(val), "pid": pid, "apm": timeVal };
                ajaxCommon("appointment/saveOrUpdate", data, initAppointmentResult, "", "");
            })
           
        },
        btn2: function() {

        }
    });
    var dom = window.parent.document.getElementById("form_date");
    $(dom).datetimepicker({
        language: "zh-CN",
        use24hours: false,
        minView: "3",
        format: "yyyy-mm-dd",
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1,
        startDate: new Date()
    });
}
// 转诊
function referral() {
    parent.layer.open({
        type: 1,
        title: "转诊",
        area: ['320px', '200px'], //宽高
        content: '<div class="form-inline" style="padding:20px;"><div class="form-group"><label for="">转诊到：</label><select name="" id="referralHospital" class="form-control"><option value="0">请选择</option></select></div></div>',
        btn: ["确定", "取消"],
        yes: function() {
            var id = window.parent.document.getElementById("referralHospital");
            var val = $(id).val();
            console.log(val);
            var data = { "hid": val, "pid": pid };
            ajaxCommon("appointment/changeHospital", data, initReferralResult, "", "");
            parent.layer.close();

        },
        btn2: function() {

        },

    });
    ajaxCommon("hospital/hospKeyValue", "", initHospitalSel, "", "");

}
// 脱失
// function deletion(){
//   parent.layer.open({
//     type: 1,
//     title:"是否脱失",
//     area: ['320px', '200px'], //宽高
//     content: '<div class="form-inline" style="padding:20px;"><div class="form-group" id="p_lost"><label><input type="radio" name="lost" value="2" />患者脱失</label><label><input type="radio" name="lost" value="3" />死亡</label></div></div>',
//     btn:["确定","取消"],
//     yes:function(){
//       var id=window.parent.document.getElementById("p_lost");
//       var val=$(id).find("input[name='lost']:checked").val() ? $(id).find("input[name='lost']:checked").val() :"";
//       if(val){
//         var data={"lost":val,"pid":pid};
//         ajaxCommon("patient/patientLost",data,initDeletionCallback,"","");
//       }else{
//         parent.layer.msg("请认真填写")
//       }

//       parent.layer.close();
//     },
//     btn2:function(){
//       parent.layer.close();
//     },

//   });
// }
// 恢复患者预约
function deletion() {
    parent.layer.confirm("确定要恢复预约患者吗？？", function(index) {
        ajaxCommon("patient/resettingLost", { "pid": pid }, initReferralResult1, "", "");
        parent.layer.close(index);
    })
}
// 恢复患者预约 患者列表页面
function initReferralResult1(el, data) {
    parent.parent.layer.alert(data.msg, function() {
        parent.layer.closeAll();
        window.open("../../../views/patientManagement.html?pathName=" + encodeURI('全部患者'), "_self");
    });
}
// 初始化转诊医院下拉框
function initHospitalSel(el, data) {
    var id = window.parent.document.getElementById("referralHospital");
    $(id).html("");
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        $(id).append("<option value='" + data[i].hid + "'>" + data[i].hname + "</option>");
    }
}

// 预约消息提示
function initAppointmentResult(el, data) {
    parent.parent.layer.alert(data.msg, function() {
        if (data.code == 0) { // 诊疗信息未完成  不可进行预约

        } else { // 诊疗信息完成  可进行预约
            window.location.reload();
            $('a[href=#messages]').tab('show');
            window.open("../../../views/patientAppointmentManagement.html?pathName=" + encodeURI("到诊患者"), "_self");

        }
        parent.layer.closeAll();
        // window.open("../../../views/patientAppointmentManagement.html","_self");
    });

}
// 转诊成功跳转 患者列表页面
function initReferralResult(el, data) {
    parent.parent.layer.alert(data.msg, function() {
        if (data.code == 0) { // 诊疗信息未完成  不可进行转诊

        } else { // 诊疗信息完成  可进行转诊
            window.open("../../../views/patientManagement.html?pathName=" + encodeURI('全部患者'), "_self");
        }
        parent.layer.closeAll();
    });
}

function initDeletionCallback(el, data) {
    parent.parent.layer.alert(data.msg, function() {
        if (data.code == 0) { // 诊疗信息未完成  不可进行转诊
            window.open("../../../views/patientManagement.html", "_self");
        }
        parent.layer.closeAll();
    });
}
// 到诊操作
function arrivalvisit() {
    top.layer.confirm("确定执行到诊操作吗？", function(index) {
        ajaxCommon("appointment/appintmentComplete", { "apid": apid }, initArrivalvisit, "", "");
        top.layer.close(index);
    })
}

// 到诊回调操作
function initArrivalvisit(el, data) {
    parent.parent.layer.alert(data.msg, function() {
        if (data.code == 0) {
            window.location.reload();
            if (data.complete == 1) {
                $("#p_btnGroup").html("");
            }
        } else {
            //$("#p_btnGroup").html("");
            //   $("#p_btnGroup").append(
            //     '<button id="p_deletion" class="btn btn-danger flag_btn" type="button"  onclick="deletion()">脱失</button>&nbsp;&nbsp;'+
            //     '<button id="p_arrivalvisit"class="btn btn-primary flag_btn" type="button" onclick="arrivalvisit()">到诊</button>'
            //  )
            window.location.reload();
            $('a[href=#messages]').tab('show');
        }
        parent.layer.closeAll();
        // window.open("../../../views/patientManagement.html","_self");
    });

}

function btnConfirm(diagnoseComplete, isReferral, flagCode) {
    /*
     诊疗状态 diagnoseComplete 1 诊疗开始
     是否转诊 isReferral 1 转诊 0 未转诊
     用户权限
   */
    if (flagCode == 1) {
        $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
    } else if (flagCode == 2) {
        $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
    } else if (flagCode == 3) {
        $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
    } else if (flagCode == 4) {
        if (diagnoseComplete == 1 && isReferral == 1) {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
        } else if (diagnoseComplete == 1 && isReferral == 0) {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
        } else if (diagnoseComplete == 0 && isReferral == 0) {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").show();
        } else if (diagnoseComplete == 0 && isReferral == 1) {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
        } else if (diagnoseComplete == undefined && isReferral == 0) {
            $("#delRiskScreen,#addRiskScreen").show();
        } else if (diagnoseComplete == undefined && isReferral == 1) {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
        } else {
            $("#delRiskScreen,#addRiskScreen").show();
        }
    } else {
        $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
    }

}
// 返回
function backLeft() {
    window.location.href = window.location.href.split("/app/")[0] + '/index.html#home?pid=' + pid + '&realname=' + sessionStorage.getItem("p_realname");
}