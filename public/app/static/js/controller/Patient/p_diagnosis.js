$(window).resize(function() {
    $(".p_child_iframe").height($(window).height() * 2);
});
var userJson;
var diagnoseComplete, isReferral;
$(function() {
    //initHeight();
    toTop();
    $(".p_child_iframe").height($(window).height() * 2);
    //initRiskScreening()
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $(".nav_title").text(userJson.title);
        isReferral = userJson.isReferral;
        var hrefId = location.hash;
        if (userJson.page != "p_page1") {
            $("#delDiag,#addDiag").hide();
            $("#delDiag,#addDiag").remove();
        } else {
            $("#delDiag,#addDiag").show();
        }
        tabsChange(hrefId);
        ajaxCommon("diagnose/initDiag", { "pid": userJson.pid }, initRiskScreening, "", "")
    }
    $("#myTab li")
        .find("a")
        .click(function() {
            var id = $(this).attr("href");
            tabsChange(id);
        });
    $('#p_d_diagnosisList li').click(function() {
        var id = $(this).find('input[type=radio]').val();
        var type = $(this).find('label').attr("data-type");
        var apid = $(this).find('label').attr('data-apid');
        var title = $(this).find('label').text();
        //var pType=$("#myTab").find("li.active").find("a").attr("href").replace("#", "");
        initExamineTimes(id, type, apid, title, userJson.page);
    });
    referralConfirm("", "", userFlag);

});
//  tabs  切换 按需加载
function tabsChange(id) {
    var url, callback, el, dgId, title, dgType, apid, data, json;
    var val = getRadioKey();
    dgId = val.id;
    title = val.str;
    dgType = val.type;
    apid = val.apid;
    data = { "dgId": dgId, "pid": userJson.pid, "apid": apid, "dgtype": dgType, "title": title, "type": "info" };
    json = JSON.stringify(data);
    if (id != "") {
        var id = id.replace("#", "");
        switch (id) {
            case "p_page1": // 诊疗记录-诊疗记录
                $("#addDiag,#delDiag").parent().show();
                initExamineTimes(dgId, dgType, apid, title, "p_page1");
                break;
            case "p_page2": // 诊疗记录-检查记录
                $("#addDiag,#delDiag").parent().hide();
                //var src = "./p_sampleForm.html?pid="+ 1;
                //$("#p_p_page2_iframe").prop("src", src);
                initExamineTimes(dgId, dgType, apid, title, "p_page2");
                break;
            case "p_page3": // 诊疗记录-用药记录
                initExamineTimes(dgId, dgType, apid, title, "p_page3");
                $("#addDiag,#delDiag").parent().hide();

                break;
        }
    } else {
        //url = "./p_diagnosisInfo.html?pid=" + 1;
    }
    // $("#p_p_page1_iframe").prop("src", url);
}
/* // 检查记录 || 用药记录  || 诊疗记录 交互回调
function tabsChangeCallback(el,data){

} */
// 新增记录列表
function addRecodeList(th, el) {
    var data = { "pid": userJson.pid };
    ajaxCommon("diagnose/addCtrl", data, initGetStatus, el, "", "")
}
// 新增得到返回状态  判断是否可以添加首诊 || 随诊
function initGetStatus(el, data) {
    var json, src, data, lastPid;
    if ($("#p_d_diagnosisList li").length > 0) {
        lastPid = $("#p_d_diagnosisList li:last-child").find("input[type='radio']").val();
        json = JSON.stringify({ "pid": userJson.pid, "dgId": "", "apid": userJson.apid, "type": "add", "lastPid": lastPid });
        src = "./p_followupForm.html?pid=" + json;
    } else {
        json = JSON.stringify({ "pid": userJson.pid, "dgId": "", "apid": userJson.apid, "type": "add" }); //"createDate":data.createDate
        src = "./p_diagnosisForm.html?pid=" + json;
    }

    //if(data.state==1){ // state ==1  可以添加 || state==0  不可以添加
    //$(el).prop("src",src);
    window.open(src, "_self");
    //  }else{
    //   parent.layer.alert(data.msg);
    //   return false;
    //  }
}
// 初始化记录列表
function initRiskScreening(el, data) {
    //var data={diagRecord: [{str: "首诊", dgId: 301, hid: 28, dgType: 1, apid: 396}], chid: 28};
    if (data.diagRecord.length > 0) {
        $(".null-data").hide();
        $("#p_d_diagnosisList").html("");
        //btnConfirm(sessionStorage.getItem("isReferral"),userFlag);
        var liStr = '';
        for (var i = 0; i < data.diagRecord.length; i++) { // chid 当前医院的id hid为诊疗记录的医院id
            if (i == (data.diagRecord.length - 1)) {
                liStr += "<li class='list-group-item' data-type='update'><label data-storage='" + data.diagRecord[i].storage + "' data-type='" + data.diagRecord[i].dgType + "' data-apid='" + data.diagRecord[i].apid + "' data-hid='" + data.diagRecord[i].hid + "' data-chid='" + data.chid + "'><input type='radio' name='examineTimes' data-storage='" + data.diagRecord[i].storage + "' data-apid='" + data.diagRecord[i].apid + "' data-type='" + data.diagRecord[i].dgType + "' data-value='" + data.diagRecord[i].str + "' value='" + data.diagRecord[i].dgId + "'/>" + data.diagRecord[i].str + "</label></li>"
            } else {
                liStr += "<li class='list-group-item' data-type='update'><label data-storage='" + data.diagRecord[i].storage + "' data-type='" + data.diagRecord[i].dgType + "' data-apid='" + data.diagRecord[i].apid + "' data-hid='" + data.diagRecord[i].hid + "' data-chid='" + data.chid + "'><input type='radio' name='examineTimes' data-storage='" + data.diagRecord[i].storage + "' data-apid='" + data.diagRecord[i].apid + "' data-type='" + data.diagRecord[i].dgType + "' data-value='" + data.diagRecord[i].str + "' value='" + data.diagRecord[i].dgId + "'/>" + data.diagRecord[i].str + "</label></li>"
            }
        }
        $("#p_d_diagnosisList").append(liStr);
        //$('#p_d_diagnosisList li').find('input:radio:last').attr('checked', 'true');
        //initExamineTimes("");
        $('#p_d_diagnosisList li').click(function() {
            //var id=$(this).find('input[type=radio]').val();
            var id = $(this).attr('data-value');
            var type = $(this).find('label').attr("data-type");
            var apid = $(this).find('label').attr('data-apid');
            var userHid = $(this).find('label').attr('data-chid');
            var dataHid = $(this).find('label').attr('data-hid');

            var title = $(this).find('label').text();
            var storage = $(this).parent().attr("data-storage");
            // var id=$(this).find('input[type=radio]').val();
            // var type=$(this).find('label').attr("data-type");
            // var apid=$(this).find('label').attr('data-apid');
            // var title=$(this).find('label').text();
            // var pType=$("#myTab").find("li.active").find("a").attr("href").replace("#", "");

            initExamineTimes(id, type, apid, title, userJson.page, dataHid, userHid, storage);
        });
        $('#p_d_diagnosisList li').find('input[type=radio]').click(function(e) {
            e.stopPropagation()
        })
    } else {
        $(".null-data").show();
    }
}
// 初始化列表选中最后一条数据 加载相应的右侧内容
function initExamineTimes(id, type, apid, title, pType, dataHid, userHid, storage) {
    var dgId, title, dgType, apid, src, dataHid, userHid, lastDgid, uType, nextDgid, storages;
    var val = getRadioKey();
    if (id) {
        dgId = id;
        dgType = type;
        apid = apid;
        title = title;
        dataHid = val.dataHid;
        userHid = val.userHid;
        lastDgid = val.lastDgid;
        uType = val.uType;
        nextDgid = val.nextDgid;
        storages = val.storage
    } else {
        dgId = val.id;
        title = val.str;
        dgType = val.type;
        apid = val.apid;
        dataHid = val.dataHid;
        userHid = val.userHid;
        uType = val.uType;
        //pType=$("#myTab").find("li.active").find("a").attr("href").replace("#", "");
        pType = userJson.page;
        lastDgid = val.lastDgid;
        nextDgid = val.nextDgid;
        storages = val.storage
    }

    if (dgId && apid && dgType && title) {
        var data = { "dgId": dgId, "pid": userJson.pid, "apid": apid, "dgtype": dgType, "title": title, "type": "info", "dataHid": dataHid, "userHid": userHid, "lastDgid": lastDgid, "uType": uType, "nextDgid": nextDgid, "storage": storages };
        //ajaxCommon("examine/detial",data,initRiskResult,"","");
        // var json = JSON.stringify(data);
        var json = JSON.stringify(data);
        var arr1 = storages.split("")
        switch (pType) {
            case "p_page1":

                if (dgType == 1) { // dgType == 1 首诊
                    if (arr1[0] == 1&&arr1[1] == 1&&arr1[2] == 1&&arr1[3] == 1) {
                        src = "./p_diagnosisInfo.html?pid=" + json;

                    } else {
                        src = "./p_diagnosisForm.html?pid=" + json;

                    }
                    // src = "./p_diagnosisInfo.html?pid=" + json;
                } else if (dgType > 1) { //dgType > 1 随诊
                    if (arr1[0] == 1) {
                        src = "./p_followupInfo.html?pid=" + json;

                    } else {
                        src = "./p_followupForm.html?pid=" + json;

                    }
                    // src = "./p_followupInfo.html?pid=" + json;
                }
                // //$("#p_p_page1_iframe").prop("src",src);
                window.open(src, "_self");
                break;
            case "p_page2":
                src = "./p_sampleForm.html?pid=" + json;
                //$("#p_p_page2_iframe").prop("src", src);
                window.open(src, "_self");
                break;
            case "p_page3":
                src = "./p_medicineInfo.html?pid=" + json;
                //$("#p_p_page3_iframe").prop("src", src);
                window.open(src, "_self");
                break;
            case "p_page4":
                src = "./sample/sampleInfo.html?pid=" + json;
                //$("#p_p_page3_iframe").prop("src", src);
                window.open(src, "_self");
                break;
            default:
                break;
        }

    } else {
        $('#myTab a[href="#p_page1"]').tab('show');
        //return false;
    }
}
// 公共ajax
function ajaxCommon(url, data, callback, el, id, src) {
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
                callback(el, data.data, src);
            } else {
                parent.layer.alert(data.msg);
            }
        }
    });
}
// 获取radio选中的值
function getRadioKey() {
    var val = $('#p_d_diagnosisList li').find("input[type='radio']:checked").val();
    var str = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().text();
    var type = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr("data-type");
    var apid = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr("data-apid");
    var userHid = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr('data-chid');
    var dataHid = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr('data-hid');
    var lastDgid = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().parent().prev().find('input[name="examineTimes"]').val();
    var nextDgid = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().parent().next().find('input[name="examineTimes"]').val();
    var uType = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().parent().attr("data-type");
    var index = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().parent().index();
    var storage = $('#p_d_diagnosisList li').find("input[type='radio']:checked").parent().attr("data-storage");
    return { "id": val, "str": str, "type": type, "apid": apid, "userHid": userHid, "dataHid": dataHid, "lastDgid": lastDgid, "uType": uType, "nextDgid": nextDgid, "index": index, "storage": storage };
}
// 删除诊疗记录
function delRecodeList() {
    top.layer.confirm('若删除患者的诊疗记录，则将诊疗记录以及与之相关的检查记录、用药记录、样本信息删除，是否确认删除？', { icon: 3, title: '提示' }, function(index) {
        //var ckId=getRadioKey();
        if (userJson) {
            var data = { "pid": userJson.pid };
            ajaxCommon("diagnose/delete", data, initHtml, "");
            top.layer.close(index);
        }
    });

}

function initHtml() {
    window.location.reload();
    var hrefId = location.hash;
    tabsChange(hrefId);
}
// 按钮控制
// function btnConfirm(isReferral,flagCode){
//    /*
//     诊疗状态 diagnoseComplete 1 诊疗开始
//     是否转诊 isReferral 1 转诊 0 未转诊
//     用户权限
//   */
// //  if(flagCode==1){
// //   $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //  }else if(flagCode==2){
// //   $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //  }else if(flagCode==3){
// //   $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //  }else if(flagCode==4){
// //   if(diagnoseComplete==1 && isReferral==1){
// //     $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //   }else if(diagnoseComplete==1 && isReferral==0){
// //     $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //   }else if(diagnoseComplete==0 && isReferral==0){
// //     $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").show();
// //   }else{
// //     $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").show();
// //   }
// //  }else{
// //   $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
// //  }

// }
// 点击返回按钮返回
function backLeft() {
    window.location.href = src + '/index.html?token=' + sessionStorage.getItem('token') + '&pid=' + userJson.pid + '&realname=' + sessionStorage.getItem("p_realname");

}