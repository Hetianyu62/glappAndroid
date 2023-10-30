var userJson, mJSon;
$(function() {
    //initHeight();
    //var form = new CybVerification.Form("p_patientFormtb1");
    //initDate($(".p_stopTime"));
    //ajaxCommonTest("appointment/editAppointmentInforPage",{"pid":""},initForm,"","");
    $("#p_docName").val(sessionStorage.getItem("realname"));
    $("#p_lastTime_tb").hide();
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title);
        // ajaxCommon("diagnose/medicineShow",{"pid":userJson.pid,"dgId":userJson.dgId,},initAppointmentText,"","");
        if (userJson.type == "update") {
            ajaxCommon("drug/drugCategory", { "pid": userJson.pid, "dgId": userJson.dgId, type: 1 }, initMedicineSel, "", "");
        } else if (userJson.type == "add") {
            ajaxCommon("drug/drugCategory", { "pid": userJson.pid, "dgId": userJson.dgId, type: 1 }, initMedicineSel, "", "");
        }
        $("#addPatientFrom").publicAjax({
            url: globalUrl + "doctor/personalData",
            type: "post",
            data: { "uid": sessionStorage.getItem("UID") },
            dataType: "json",
            successFn: function(data) {
                if (data.code == "0") {
                    $("#p_hospname").val(data.data.hname);
                    $("#p_docname").val(data.data.realname);

                } else {
                    top.layer.alert(data.msg);

                }
            }
        });
    }
});
// 初始化开药时间限制
function initMedicineDate(el, data) {
    // var startTime = data.startTime ? new Date(data.startTime) : "";
    // var endTime = data.endTime ? new Date(data.endTime) : new Date();
    $(".p_dateTime").datetimepicker({
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
        // startDate: startTime,
        // endDate: new Date(),
        pickerPosition: "bottom-left" //控件显示位置
    });
    // if(userJson.type=="add"){
    // $(".p_dateTime").val(data.checkTime);
    // }
}

function initMrdicineHtml(el, data, id) {
    top.layer.close(id);
    ajaxCommon("diagnose/medicineShow", { "pid": userJson.pid, "dgId": userJson.dgId }, initForm, "", "");
}
// 初始化预约信息
function initAppointmentText(el, data) {
    $("#p_appointmentText").val(data);
    $("#p_appointmentText").after(data);
    ajaxCommon("diagnose/modifyDiag", { "pid": userJson.pid, "dgId": userJson.dgId }, initForm, "", "");

}
// 公用ajax
function ajaxCommon(url, data, callback, el, id, mData) {
    $("#addPatientFrom").publicAjax({
        url: globalUrl + url,
        type: "post",
        data: data,
        dataType: "json",
        successFn: function(data) {
            // if (data.code == "0") {
            //     callback(el, data.data, id, mData);
            // } else {
            //     top.layer.alert(data.msg);
            // }

            if (data.code == "0") {
                callback(el, data.data, id, mData);
            }else if (data.code == "2"){ 
                  shakes(data);
             }else {
                layer.alert(data.msg);
            } 

        }
    });
}
// 点击确定提交数据
function submitUpdate(type) {
    var data, url, callback, json;
    var form = new CybVerification.FirstVisitForm("m_page1_Form");
    var state = form.submit();
    data = {
        "current": getHistoryArr("#m_page1_tb1"),
        "docName": $("#p_docName").val(),
        "dateTime": $("#p_dateTime").val(),
        "note": filterXSS($("#p_note").val())
    }
    json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": userJson.dgtype, "dgId": userJson.dgId, "pageMedicine": JSON.stringify(data) };
    if (state) {
        //   if(userJson.type=="add"){ // 新增
        //   ajaxCommon("diagnose/saveMedicine",json,initHtml,'','');

        // }else if(userJson.type=="update"){ // 修改
        ajaxCommon("diagnose/updateCurrentMedicine", json, initHtml, '', '');

        //}
    }

}

function initHtml() {
    var json = { "pid": userJson.pid, "apid": userJson.apid, "dgtype": userJson.dgtype, "dgId": userJson.dgId, "title": userJson.title, "type": "info", "lastDgid": userJson.lastDgid };
    window.open(src + "/p_medicineInfo.html?pid=" + JSON.stringify(json), "_self");
}
// 数据回显
function initForm(el, data) {
    ajaxCommon("diagnose/startTimeRegion", { "pid": userJson.pid, "dgId1": userJson.dgId, "dgId2": data.preDgid ? data.preDgid.dgId : "" }, initMedicineDate, "", "");
    var m_dateTime, m_currentDoc,m_note;
    if (data.currentDate) {
        m_dateTime = dateFormat(data.currentDate)
    } else {
        m_dateTime = ""
    }
    if (data.currentDoc) {
        m_currentDoc = data.currentDoc;
    } else {
        m_currentDoc = sessionStorage.getItem("realname");
    }
    if (data.m_note) {
        m_note = data.m_note;
    } else {
        m_note = "";
    }
    $("#p_dateTime").val(m_dateTime);
    $("#p_docName").val(m_currentDoc);
    $("#p_note").val(m_note);
    if (data.preDate) {
        m_preDate = dateFormat(data.preDate)
    } else {
        m_preDate = "无"
    }
    if (data.preDoc) {
        m_preDoc = data.preDoc;
    } else {
        m_preDoc = "无"
    }

    if (data.preNote) {
        m_preNote = data.preNote;
    } else {
        m_preNote = ""
    }

    $("#m_preDate").append("<b>开药时间：" + m_preDate + "</b>");
    $("#m_preDoc").append("<b>开药医生：" + m_preDoc + "</b>");
    $("#m_note").append("<b>备注：" + m_preNote + "</b>");

    $.each(data, function(name, value) {
        if (isArray(value)) {
            if (name == "preMedicine") {
                initLastTimeList("preMedicine", value, data.preDgid.dgId, userJson.dgId);
            } else if (name == "currentMedicine") {
                initHistoryFormList("currentMedicine", value);
            }
        }
    });

}
// el 为像某个固定的元素内部添加节点  type 为药品名称类型区分 1 为抗骨质疏松类药物；2为肾上腺糖皮质激素
var addI = 0,
    addK = 0,
    addG = 0;

function addSpoMedicine(el, type) {
    addG++;
    var html = $("#p_list tbody tr").clone(true).attr("id", "m_page1_tb_list_" + addG);
    $(el).find("tbody").append(html);
    //ajaxCommon("drug/findActivedCategory",{"pid":userJson.pid,"dgId":userJson.dgId},initMedicineSel,"","");
}
// 删除用药记录
function delSpoMedicine(th) {
    parent.parent.layer.confirm('确定要删除记录吗？？', { icon: 3, title: '提示' }, function(index) {
        $(th).parent().parent().remove();
        parent.parent.layer.close(index);
    });

}

function getHistoryArr(el) {
    var jsonArr = [];
    $(el).find("form").each(function(index) {
        jsonArr.push({
            "medicine": {
                "id": $(this).find("#m_name").find("option:checked").val(),
                "category": $(this).find("#m_category").val(),
                "chemical": $(this).find("#m_chemical").val(),
                "name": $(this).find("#m_name").find("option:checked").text(),
            },
            "index": (index + 1),
            "dose": $(this).find("#m_dose").val(),
            "doseUnit": $(this).find("#m_doseUnit").val(),
            "frequency": $(this).find("#m_frequency").val(),
            "method": $(this).find("#m_method").val(),
            "m_method_other": $(this).find("#m_method_other").val(),
            "course": $(this).find("#m_course").val(),
            "courseUnit": $(this).find("#m_courseUnit").val(),
            "status": {
                "discard": 1,
                "d_1": 0,
                "d_2": 0,
                "d_2_1": "",
                "d_2_2": "",
                "d_3": 0,
                "d_4": 0,
                "d_5": 0,
                "d_6": 0,
                "d_7": 0,
                "d_8": 0,
                "d_9": 0,
                "d_10": 0,
                "d_11": 0,
                "d_12": 0,
                "d_13": 0
            }
        });
    });
    return jsonArr;
}

function ajaxCommonTest(url, data, callback, el, id) {
    $("#addPatientFrom").publicAjax({
        url: "../../mock/p_003.json",
        type: "get",
        data: {},
        dataType: "json",
        successFn: function(data) {
            // if (data.code == "0") {
            //     callback(el, data.data);
            // } else {
            //     top.layer.alert(data.msg);
            // }
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

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isObject(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
}

function isString(obj) {
    return (typeof obj == 'string') && obj.constructor == String;
}
// 上次用药记录列表展示
function initLastTimeList(key, data, preDgid, currentDgid) {
    $("#p_lastTime_tb").show();
    $("#p_page7_tb2 tbody").html("");
    var strName;
    for (var i = 0; i < data.length; i++) {
        strName = "'" + encodeURI(data[i].medicine.chemical) + "'";
        $("#p_page7_tb2 tbody").append(
            '<tr>' +
            '<td>' + data[i].medicine.category + '/' + data[i].medicine.chemical + '/' + data[i].medicine.name + '</td>' +
            '<td>' + data[i].dose + data[i].doseUnit + '</td>' +
            '<td>' + data[i].frequency + '</td>' +
            '<td>' + data[i].method + '</td>' +
            '<td>' + data[i].course + data[i].courseUnit + '</td>' +
            '<td><button class="btn btn-primary btn-sm sampleUpdate" onclick="continueDrug(' + JSON.stringify(data[i]).replace(/"/g, '&quot;') + ')">继续</button>&nbsp;&nbsp;<button class="btn btn-danger btn-sm" onclick="stopUsing(' + data[i].index + ',' + preDgid + ',' + currentDgid + "," + JSON.stringify(data[i].status).replace(/"/g, '&quot;') + ',' + strName + ')">停用</button></td>' +
            '</tr>'
        )

    }
}
var continueIndex = 0;
var el = "#m_page1_tb1";
var lenth = $('.m_page1_tb_list').length;

function getCode(el, data, {}, mData) {
    var el = $("#m_page1_tb1");
    if (data.actived == "1") {
        if (mData.status.discard == 1) { // 药物未停用
            continueIndex++;
            var html = $("#p_list tbody tr").clone(true).attr("id", "m_page1_tb_list_continue" + continueIndex);
            $(el).find("tbody").append(html);
            initContinueForm("m_page1_tb_list_continue" + continueIndex, mData);
        } else if (mData.status.discard == 0) { // 药物已停用
            top.layer.msg("该药物已停用请先点击右侧是否停用按钮改变药物状态！！！");
            return false;
        }

    } else {
        top.layer.msg("该药物已经作废请管理员查看药物信息");
        return false;
    }
}
// 点击继续用药
function continueDrug(data) {
    ajaxCommon("drug/activedState", { "id": data.medicine.id, }, getCode, '', '', data);
}
// 停用药物
function stopUsing(id, preDgid, currentDgid, data, name) {
    var title = "停用药物";
    var data = JSON.stringify({ "id": id, "status": data, "preDgid": preDgid, "currentDgid": currentDgid, "cateName": name, "pid": userJson.pid }).replace(/\"/g, "'");
    var url = src + '/stopMedicine.html?pid=' + data;
    var area = ["1000px", "540px"];
    var callback = getOneTisk;
    top.layer.confirm("是否要停用该药物？", function(index) {
        // var sIndex=top.layer.open({
        //   type:2,
        //   title:'停用',
        //   btn:['确定','取消'],
        //   content:url,
        //   area:["800px","460px"],
        //   shadeClose: true, //开启遮罩关闭
        //   yes:function(index,layero){
        //     getOneTisk(sIndex,index,layero,id,preDgid);

        //   },
        //   btn1:function(){
        //     layer.close(index);
        //   }
        // });
        window.open(url, "_self");
        top.layer.close(index);
    })
}
// 停用药物回调
function getOneTisk(id, index, layero, sId, preDgid) {
    //得到iframe页的窗口对象
    var iframeWin = top.window[layero.find("iframe")[0]["name"]];
    var json;
    //执行iframe页的showMsg方法
    var data = iframeWin.getFormData();
    if (data) {
        var json = {
            "index": sId,
            "pid": userJson.pid,
            "preDgid": preDgid,
            "status": JSON.stringify(data)
        };
        ajaxCommon("diagnose/stopUsing", json, htmlReload, "", id);

        //initTable();
    } else {
        //top.layer.msg("请认真填写消息");
    }
}

function htmlReload(el, data, id) {
    top.layer.close(id);
    location.reload()
}

function selectThis(el) {
    var val = $(el).val();
    if (val == "其他") {
        $(el).next().show().attr("check", "required")
    } else {
        $(el).next().hide().val("").removeAttr("check", "")
    }
}
// 本次用药记录回显
function initHistoryFormList(key, data) {
    var arr = data,
        str, el;
    $(el).find("tbody tr:first").nextAll().remove();
    if (key == "currentMedicine") {
        el = "#m_page1_tb1";
        for (var i = 0; i < arr.length; i++) {
            var html = $("#p_list tbody tr").clone(true).attr("id", "m_page1_tb_list_" + i);
            $(el).find("tbody").append(html);
        }
        initHistoryForm("m_page1_tb_list_", data);

    }
}
// 本次用药记录初始化回显值
function initHistoryForm(el, data) {
    var d1, d2;
    for (var i = 0; i < data.length; i++) {

        $.each(data[i], function(name, value) {
            if (isObject(value)) {
                $.each(value, function(name1, value1) {

                    $("#" + el + i).find("select[name='" + name1 + "'] option[value='" + value1 + "']").attr("selected", "selected");
                    $("#" + el + i).find("input[name='" + name1 + "'][value='" + value1 + "']").attr("checked", "checked");
                    $("#" + el + i).find("input[name='" + name1 + "']").val(value1);
                    $("#" + el + i).find("select[name='" + name1 + "']");
                    if (name1 == "chemical") {
                        d1 = value1;
                    }
                    if (name1 == "name") {
                        d2 = value1;
                    }
                    var gyfs = $("#" + el + i).find("select[name='method']").val();
                    if (gyfs == "其他") {
                        $("#" + el + i).find("input[name=m_method_other]").show()
                    }
                });
            } else {
                $("#" + el + i).find("select[name='" + name + "'] option[value='" + value + "']").attr("selected", "selected");
                $("#" + el + i).find("input[name='" + name + "'][value='" + value + "']").attr("checked", "checked");
                $("#" + el + i).find("input[name='" + name + "']").val(value);
            }


        });

        f1(d1, d2, $("#" + el + i).find("select[name='category']"));

    }

}
// 继续用药值回显
function initContinueForm(el, data) {
    var d1 = data.medicine.chemical,
        d2 = data.medicine.name;
    for (var key in data) {
        $("#" + el).find("select[name='" + key + "'] option[value='" + data[key] + "']").attr("selected", "selected");
        $("#" + el).find("select[name='" + key + "'] option[value='" + data[key] + "']").attr("selected", "selected");
        $("#" + el).find("input[name='" + key + "'][value='" + data[key] + "']").attr("checked", "checked");
        $("#" + el).find("input[name='" + key + "']").val(data[key]);
        $("#" + el).find("select[name='category'] option[value='" + data[key].category + "']").attr("selected", "selected");

    }
    f1(d1, d2, $("#" + el).find("select[name='category']"));
}
// 获取去除空后的数据
function Trim(str) {
    var result;
    result = str.replace(/(^\s+)|(\s+$)/g, "");
    result = result.replace(/\s/g, "");
    return result;
}
// 时间插件初始化
function initDate(el, sData) {
    el.datetimepicker({
        container: "#stopUsingForm",
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
        endDate: new Date(),
        pickerPosition: "top-left" //控件显示位置
    })
}
// 初始化 药品类别 通用名 商品名称
function initMedicineSel(el, data) {
    var data = data.listAll;
    $("#m_category").html("");
    $("#m_category").append("<option value=''>请选择</option>");
    for (var i = 0; i < data.length; i++) {
        $("#m_category").append("<option value=" + data[i].name + ">" + data[i].name + "</option>");
    }
    //$("#m_page1_tb1").find("tbody").append($("#p_list tbody").html());
    //mJSon=data.listAll;
    ajaxCommon("diagnose/medicineShow", { "pid": userJson.pid, "dgId": userJson.dgId, "preDgid": userJson.lastDgid }, initForm, "", "");

}
// 初始化 药品类别 通用名 商品名称
function initMedicineSel1(el, data) {
    $("#m_category").html("");
    $("#m_category").append("<option value=''>请选择</option>");
    for (var i = 0; i < data.length; i++) {
        $("#m_category").append("<option value=" + data[i].id + ">" + data[i].name + "</option>");
    }
    //$("#m_page1_tb1").find("tbody").append($("#p_list tbody").html());
    //mJSon=data.listAll;
    // ajaxCommon("diagnose/medicineShow",{"pid":userJson.pid,"dgId":userJson.dgId},initForm,"","");

}

function f1(city, country, el, ) {
    var d1 = $(el);
    var d2 = $(el).parent().siblings().find("select#m_chemical");
    var d3 = $(el).parent().siblings().find("select#m_name");
    if ($(d1).val() != "") {
        $("#addPatientFrom").publicAjax({
            url: globalUrl + "drug/drugCategory",
            type: "post",
            data: { "type": 2, "cateName": $(d1).val() },
            dataType: "json",
            successFn: function(result) {
                if (result.code == "0") {
                    var dataArr = result.data.listAll;
                    $(d2).empty();
                    $(d2).append("<option value=''>请选择</option>");
                    for (var i = 0; i < dataArr.length; i++) {
                        var op = $("<option value='" + dataArr[i].name + "'>" + dataArr[i].name + "</option>");
                        $(d2).append(op);
                    }
                    if (city != "") {
                        $(d2).find("option").each(function() {
                            if ($(this).text() == city) {
                                $(this).attr("selected", true)
                            }
                        });
                        f2(country, d2);
                    } else {
                        f2('', d2);
                    }
                } else {
                    top.layer.alert(data.msg);
                }
            }
        });
        // var data=getSelctOne("",$(d1).val(),mJSon);
    } else {
        $(d2).empty();
        $(d2).append("<option value=''>请选择</option>");
        $(d3).empty();
        $(d3).append("<option value=''>请选择</option>");
    }

}

function f2(country, el) {
    var d2 = $(el);
    var d1 = $(el).parent().siblings().find("select#m_category");
    var d3 = $(el).parent().siblings().find("select#m_name");
    //var data=getSelctTwo("",$(d1).val(),$(d2).val(),mJSon);
    if ($(d2).val() != "") {

        $("#addPatientFrom").publicAjax({
            url: globalUrl + "drug/drugCategory",
            type: "post",
            data: { "type": 3, "cateName": $(d2).val() },
            dataType: "json",
            successFn: function(result) {
                if (result.code == "0") {
                    $(d3).empty();
                    $(d3).append("<option value=''>请选择</option>");
                    var dataArr = result.data.listAll;
                    for (var i = 0; i < dataArr.length; i++) {
                        var op = $("<option value='" + dataArr[i].id + "'>" + dataArr[i].name + "</option>");
                        $(d3).append(op);
                    }
                    if (country != "") {
                        $(d3).find("option").each(function() {
                            if ($(this).text() == country) {
                                $(this).attr("selected", true)
                            }
                        })
                    }
                } else {
                    top.layer.alert(data.msg);
                }
            }
        });
    } else {
        $(d3).empty();
        $(d3).append("<option value=''>请选择</option>");
    }
}

function getSelctOne(key, val, data) {
    var jsonArr = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].category == val) {
            jsonArr.push({ "name": data[i].chemical });
        }
    }
    return jsonArr;
}

function getSelctTwo(key, val1, val2, data) {
    var jsonArr = [];
    for (var i = 0; i < data.length; i++) {
        if (data[i].category == val1 && data[i].chemical == val2) {
            jsonArr.push({ "name": data[i].name, "id": data[i].id });
        }
    }
    return jsonArr;
}
// 点击返回按钮返回
function backLeft() {
    var json = JSON.stringify({ "pid": userJson.pid, "page": "p_page3" });
    var src = "./p_diagnosis.html?pid=" + json;
    window.open(src, '_self');
}