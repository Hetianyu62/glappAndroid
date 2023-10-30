$(function() {
    var  selfHeight  =  document.body.scrollHeight;    
    var  p_demo  =  window.top.document.getElementsByClassName('p_child_iframe');    
    p_demo.height = selfHeight;
    $("#p_current_tb").hide();
    $("#p_lastTime_tb").hide();
    $("#m_currentDoc").hide();
    $("#m_currentDate").hide();
    $("#m_note").hide();
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title);
        referralConfirm(userJson.dataHid, userJson.userHid, userFlag, userJson.uType);

        if (userJson.type == "info") {
            ajaxCommon("diagnose/medicineShow", { "pid": userJson.pid, "dgId": userJson.dgId, "dgtype": userJson.dgtype, "apid": userJson.apid, "preDgid": userJson.lastDgid, "nextDgid": userJson.nextDgid }, initInfo, "", "")
        } else {
            initInfo("")
        }
    }
    $("#myTab li").find("a").click(function() {
        var id = $(this).attr("href");
        $("#p_page_href").val(id);
    });
});


// 初始化 信息
function initInfo(el, data) {
    if (!data) {

    } else {
        //referralConfirm(userJson.dataHid,userJson.userHid,userFlag,userJson.uType,data.haveEdit);
        // initOperation(data.finish,data.dataHid,data.userHid);
        $.each(data, function(name, value) {
            if (isArray(value)) { //  && value.length>0
                $("#p_medicine_none").html("");
                if (name == "preMedicine") {
                    initLastTimeList("preMedicine", value);
                } else {
                    //$("#p_medicine_none").html("<p>暂无用药记录</p>");
                }
                if (name == "currentMedicine") {
                    initNowList("currentMedicine", value);
                } else {
                    //$("#p_medicine_none").html("<p>暂无用药记录</p>");
                    //$("#updateMrdicine").hide();
                    //$("#addMrdicine").show();
                }
            } else {
                //$("#updateMrdicine").hide();
                //$("#addMrdicine").show();
            }
        });

        // if(data.preMedicine && data.currentMedicine ){
        //   $("#updateMrdicine").text("");
        //   $("#updateMrdicine").text("修改");
        //   //$("#p_form").hide();
        // }else if(data.preMedicine && !data.currentMedicine ){
        //   //$("#p_form").show();
        //   $("#updateMrdicine").text("");
        //   $("#updateMrdicine").text("新增");
        // }else if(data.preMedicine==undefined && data.currentMedicine){
        //   $("#updateMrdicine").text("");
        //   $("#updateMrdicine").text("修改");
        // }else{
        //   $("#updateMrdicine").text("");
        //   $("#updateMrdicine").text("新增");
        // }
   
		
            if (data.btnState == "0") {
                $("#updateMrdicine").show(0);
                $("#updateMrdicine").text("");
				$("#updateMrdicine").text("修改");
            } else if (data.btnState == "1") { // 1新增
                $("#updateMrdicine").show(0);
                $("#updateMrdicine").text("");
                $("#updateMrdicine").text("新增");

            } else if (data.btnState == "2") { // 2编辑
                $("#updateMrdicine").show(0);
                $("#updateMrdicine").text("");
                $("#updateMrdicine").text("修改");
            }
        
        var m_currentDate, m_currentDoc, m_preDate, m_preDoc,m_note,m_preNote;
        if (data.currentDate) {
            m_currentDate = dateFormat(data.currentDate)
        } else {
            m_currentDate = "无"
        }
        if (data.preDate) {
            m_preDate = dateFormat(data.preDate)
        } else {
            m_preDate = "无"
        }
        if (data.currentDoc) {
            m_currentDoc = data.currentDoc
        } else {
            m_currentDoc = "无"
        }
        if (data.preDoc) {
            m_preDoc = data.preDoc;
        } else {
            m_preDoc = "无"
        }
        if (data.m_note) {
            m_note = data.m_note;
        } else {
            m_note = ""
        }
        if (data.preNote) {
            m_preNote = data.preNote;
        } else {
            m_preNote = ""
        }
        $("#m_currentDate").append("<b>开药时间：" + m_currentDate + "</b>");
        $("#m_currentDoc").append("<b>开药医生：" + m_currentDoc + "</b>");
        $("#m_note").append("<b>备注：" + m_note + "</b>");
        $("#m_preDate").append("<b>开药时间：" + m_preDate + "</b>");
        $("#m_preDoc").append("<b>开药医生：" + m_preDoc + "</b>");
        $("#m_preNote").append("<b>备注：" + m_preNote + "</b>");
    }
}
// 点击修改跳转修改界面
function tabsParentSrc(type) {
    var fram = parent.document.getElementById("p_p_page3_iframe");
    var hrefId = $("#p_page_href").val();
    var type = (type == "1") ? "add" : "update";
    var json = JSON.stringify({ "pid": userJson.pid, "dgId": userJson.dgId, "dgtype": userJson.dgtype, "apid": userJson.apid, "title": userJson.title, "type": type, "lastDgid": userJson.lastDgid });
    //fram.src="./p_medicineForm.html?pid="+json;//Iframe--SRC
    var src = "./p_medicineForm.html?pid=" + json;
    window.open(src, "_self");
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
                callback(el, data.data);
            } else {
                layer.alert(data.msg);
            }
        }
    });
}

function ajaxCommon1() {
    $("#addPatientFrom").publicAjax({
        url: "../../mock/p_001.json",
        type: "get",
        data: {},
        dataType: "json",
        successFn: function(data) {
            console.log(data);
            initInfo("", data.data)
        }
    });
}

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isObject(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
}

function ajaxCommonTest(url, data, callback, el, id) {
    $("#addPatientFrom").publicAjax({
        url: "../../mock/p_003.json",
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
// 上次用药记录列表展示
function initLastTimeList(key, data) {
    if (data.length) {
        $("#p_lastTime_tb").show();
        var str, strName;
        for (var i = 0; i < data.length; i++) {
            strName = "'" + encodeURI(data[i].medicine.chemical) + "'";
            if (data[i].status.discard == 0) {
                str = '<button class="btn btn-info btn-sm" type="button" onclick="stopUsing(' + data[i].index + ',' + JSON.stringify(data[i].status).replace(/"/g,  '&quot;') + ',' + strName + ')">停用原因</button>';
            } else {
                str = "";
            }
            $("#p_lastTime_tb table tbody").append(
                '<tr>' +
                '<td>' + data[i].medicine.category + '/' + data[i].medicine.chemical + '/' + data[i].medicine.name + '</td>' +
                '<td>' + data[i].dose + data[i].doseUnit + '</td>' +
                '<td>' + data[i].frequency + '</td>' +
                '<td>' + data[i].method + '</td>' +
                '<td>' + data[i].course + data[i].courseUnit + '</td>' +
                '<td>' + str + '</td>' +
                '</tr>'
            )

        }
    } else {
        $("#p_lastTime_tb table tbody").html("");
        $("#p_lastTime_tb").show();
        $("#p_lastTime_tb table tbody").append(
            '<tr class="text-center">' +
            '<td colspan="6">上次暂无用药记录（未开药）</td>' +
            '</tr>'
        )
    }
}
// 查看停用药物原因
// 停用药物
function stopUsing(id, data, name) {
    var title = "停用药物";
    var data = JSON.stringify({ "id": id, "status": data, "cateName": name }).replace(/\"/g, "'");
    var url = src + '/SeeStopMedicine.html?pid=' + data;
    var area = ["1000px", "540px"];
    window.open(url, "_self");
    // var sIndex=top.layer.open({
    //   type:2,
    //   title:'停用',
    //   //btn:['确定','取消'],
    //   content:url,
    //   area:["800px","460px"],
    //   shadeClose: true, //开启遮罩关闭
    //   // yes:function(index,layero){
    //   //   top.layer.close(sIndex);
    //   // },
    //   // btn1:function(){
    //   //   top.layer.close(sIndex);
    //   // }
    // });

}

function initNowList(key, data) {
    $("#m_currentDate").show();
    $("#m_currentDoc").show();
    $("#m_note").show();
    if (data.length > 0) {
        $("#p_current_tb table tbody").html("");
        $("#p_current_tb").show();
        for (var i = 0; i < data.length; i++) {

            $("#p_current_tb table tbody").append(
                '<tr>' +
                '<td>' + data[i].medicine.category + '/' + data[i].medicine.chemical + '/' + data[i].medicine.name + '</td>' +
                '<td>' + data[i].dose + data[i].doseUnit + '</td>' +
                '<td>' + data[i].frequency + '</td>' +
                '<td>' + data[i].method + '</td>' +
                '<td>' + data[i].course + data[i].courseUnit + '</td>' +
                '</tr>'
            )

        }

    } else {
        $("#p_current_tb table tbody").html("");
        $("#p_current_tb").show();
        $("#p_current_tb table tbody").append(
            '<tr class="text-center">' +
            '<td colspan="5">本次暂无用药记录（未开药）</td>' +
            '</tr>'
        )
    }
}
// 点击返回按钮返回
function backLeft() {
    var json = JSON.stringify({ "pid": userJson.pid, "page": "p_page3" });
    var src = "./p_diagnosis.html?pid=" + json;
    window.open(src, '_self');
}