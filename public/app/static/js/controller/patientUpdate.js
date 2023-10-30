/*
 * @Description: 新增 || 修改患者信息 业务逻辑
 * @Author: 杨志强
 * @Date: 2019-08-30 14:14:27
 * @LastEditTime: 2020-04-17 13:29:18
 * @LastEditors: Please set LastEditors
 */

var userJson, pid;
/* $(window).resize(function() {
  $(".p_iframe").height($(window).height()*2);
}); */
$(function() {


    /*var div = document.getElementById('hei');
    $("#hei").css("height","1800px")
*/
    // var token = decodeURI(getUrlParams('token'));
    // sessionStorage.setItem("token", token);
    // pid = decodeURI(getUrlParams('pid')).replace(/\"/g, '');
    // $(".p_iframe").height($(window).height()*2);
    initYearSelect("#p_year");
    initSelect("zip/area/", { "id": "" }, initSel, "#p_sheng");
    initSelect("zip/area/", { "id": "" }, initSel, "#p_n_sheng");
    //ajaxCommon("queryDic/dicList",{"dcode":"occupation"},initPatientOccupation,"#p_occupation");
    //ajaxCommon("queryDic/dicList",{"dcode":"education"},initPatientOccupation,"#p_education");
    $("#addPatientFrom").publicAjax({
        url: globalUrl + "doctor/personalData",
        type: "post",
        data: { "uid": sessionStorage.getItem("UID") },
        dataType: "json",
        successFn: function(data) {
            if (data.code == "0") {
                sessionStorage.setItem("realname", data.data.realname)
            } else {
                top.layer.alert(data.msg);

            }
        }
    });
    //ajaxCommon("examine/detial",{"pid":$("#p_pid").val()},initRiskScreening,"")
    if (location.hash) {     $('a[href=' + location.hash + ']').tab('show');   }
    $(document.body).on("click", "a[data-toggle]", function(event) { location.hash = this.getAttribute("href"); });

    initDate($(".p_create_date"));
    initDate($(".p_signData"));
    tabsChange("")
        //  判断是否有id
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        ajaxCommon("patient/detial", { "pid": userJson.pid }, initPatientForm, "el");
        $("#p_realname").attr("disabled", "disabled");
        $(".p_disabled").attr("disabled", "disabled");
        $("#p_updata").text("修改");
        var hrefId = location.hash;
        tabsChange(hrefId);
    } else {
        $('a[href="#profile"]').on('show.bs.tab', function(e) {
            e.preventDefault();
        });
    }
    $("#p_tabs li").find("a").click(function() {
        var id = $(this).attr("href");
        tabsChange(id);
    });
    //var form = new CybVerification.FirstVisitForm("addPatientFrom");
    if (location.hash) {     $('a[href=' + location.hash + ']').tab('show');   }  
    $(document.body).on("click", "a[data-toggle]", function(event) {     location.hash = this.getAttribute("href");   });

    var sign = $("#p_sign").val();

});
$(window).on('popstate', function() {  
    var anchor = location.hash || $("a[data-toggle=tab]").first().attr("href");  
    $('a[href=' + anchor + ']').tab('show');
});


// 初始化出生年月
function initYearSelect(el) {
    $(el).html("");
    var date = new Date();
    $(el).append("<option value=''>请选择</option>");
    for (var i = 1900; i <= date.getFullYear(); i++) {
        $(el).append("<option value='" + i + "'>" + i + "</option>");
    }
    $(el).change(function() {
        var val = $(this).val();
        if (val) {
            $("#p_birthday").val($(this).val() + '-' + $("#p_mouth").val());
            $("#p_age").val((date.getFullYear() - val));
        } else {
            //layer.msg("请认真填写出生日期");
            layer.open({
                content: "请认真填写出生日期"
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });

        }

    });
    $("#p_mouth").change(function() {
        var val = $(this).val();
        if (val) {
            $("#p_birthday").val($("#p_year").val() + '-' + $("#p_mouth").val());
            //$("#p_age").val((date.getFullYear()-val));
        } else {
            //layer.msg("请认真填写出生日期");
            layer.open({
                content: "请认真填写出生日期"
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
        }

    });
}

function mouthChange(th) {
    var val = $(th).val();
    var date = new Date();
    if (val) {
        $("#p_birthday").val($("#p_year").val() + '-' + $(th).val());
        //$("#p_age").val((date.getFullYear()-val));
    }
}
// 初始表单 前提是 三级联动首先初始完
function initPatientForm(el, data) {
    for (var key in data) {
        $("#p_" + key).val(data[key]);
        $("#p_" + key).find("option[value='" + data[key] + "']").prop("selected", true);
    }
    $("#p_pid").val(userJson.pid);
    $("#p_birthday").val(data.birthday);
    $("#fileTeamUuid").val(data.uuid);
    $("#p_create_date").val(dateFormat(data.create_date) ? dateFormat(data.create_date) : "");
    $("#p_signData").val(dateFormat(data.signData) ? dateFormat(data.signData) : "");
   // console.log($("#p_signData").val(dateFormat(data.signData) ? dateFormat(data.signData) : ""))
    var dateYear = dateFormat(data.birthday).split('-');
    $("#p_year").find("option[value='" + dateYear[0] + "']").prop("selected", true);
    $("#p_mouth").find("option[value='" + dateYear[1] + "']").prop("selected", true);
    var residenArr = data.residence.split("/");
    $("#p_residence").val((residenArr[residenArr.length - 1]).replace(/\//g, ""));
    $("#p_occupation option").each(function() {
        if ($(this).text() == data.occupation) {
            $(this).prop("selected", true);
        } else {
            // $("#p_occupation option:last-child").attr("selected",true);
            // $("#p_occupation_z").val(data.occupation);
            // $("#p_occupation_z").show();
        }
    });
    idtypeChange("#p_idtype");
    //var zipArr=data.zipText.split('/');
    var zipArr = data.zipText.split('/');
    var residenceArr = data.residence_code.split('/');
    // $("#p_sheng").find("option[data-name='" + zipArr[0] + "']").attr("selected", true);
    // $("#p_shi").find("option[data-name='" + zipArr[1] + "']").attr("selected", true);
    // $("#p_xian").find("option[data-name='" + zipArr[2] + "']").attr("selected", true);
    /* initSelect("zip/area/",{"index":($("#p_sheng").val()).substring(0,2)},initSel,"#p_shi");
    changSel("#p_sheng","sheng");
    setTimeout(function(){
      $("#p_shi").find("option[value='" + data.zip2 + "']").attr("selected", true);
      changSel("#p_shi","shi");
      setTimeout(function(){
        $("#p_xian").find("option[value='" + data.zip3 + "']").attr("selected", true);
      },100)
    },100); */
    // 判断是否开始诊疗 是否有诊疗记录
    // if(data.counttreatment==0){ // 未诊疗
    //   $("#p_realname,#p_year,#p_mouth,#p_nation,#p_age,#p_idtype,#p_idcard").removeAttr("disabled");
    //   $("#p_gender").attr("disabled","disabled");
    // }else{ // 有诊疗记录
    // $("#p_realname,#p_year,#p_mouth,#p_gender,#p_nation,#p_age,#p_idtype,#p_idcard").attr("disabled","disabled");
    // }
    $("#p_sheng option").each(function() {
        /*遍历省下拉框;判断下拉框值是否和取到的省的值相同;
          相同就选中;选中之后紧接着就是第二级了;上面大家应该看到了
          f1()代表第二级;   所以在选中之后进行f1()
          并将 市 和 县 的值传过去;
         (县的值在f1()里面是不用的,是为了给f2()传过去的)
          */
        if ($(this).text() == zipArr[0]) {
            $(this).prop("selected", true);
            //var sheng = $(this).val();
            f1(zipArr[1], zipArr[2]);
        }
    });
    $("#p_n_sheng option").each(function() {
        /*遍历省下拉框;判断下拉框值是否和取到的省的值相同;
          相同就选中;选中之后紧接着就是第二级了;上面大家应该看到了
          f1()代表第二级;   所以在选中之后进行f1()
          并将 市 和 县 的值传过去;
         (县的值在f1()里面是不用的,是为了给f2()传过去的)
          */
        if ($(this).val() == residenceArr[0]) {
            $(this).prop("selected", true);
            //var sheng = $(this).val();
            fn1(residenceArr[1], residenceArr[2], residenceArr[3]);
        }
    });

    initDate($(".p_create_date"));
 //   signdata()
    let sign1 = $("#p_sign").val();
    if(sign1 == 1){
        $("#tysId1").show();
        $("#tysId2").css("width","50%");
        $(".signdataShow").show()
    }else{
        $(".signdataShow").hide()
    }
}

function initSelect(url, data, callback, el) {
    $("#app").publicAjax({
        url: globalUrl + url,
        data: data,
        //async:false,
        successFn: function(data) {
            initSel(data.data, el);
        }
    })
}

// 初始化
function initSel(data, el) {
    $(el).find("option").remove();
    //$(el).parent().siblings().nextAll("select option").remove();
    if (data) {
        $(el).append("<option value=''>请选择</option>");
        for (var i = 0; i < data.length; i++) {
            $(el).append("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
        }

    }
}
// 三级联动的change事件
function changSel(th, type) {
    if (type == "sheng") {
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_shi");
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_xian");
    } else if (type == "shi") {
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_xian");
    } else if (type == "n_sheng") {
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_n_shi");
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_n_xian");
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_n_zhen");
    } else if (type == "n_shi") {
        initSelect("zip/area/", { "id": ($(th).val()) }, initSel, "#p_n_xian");
        initSelect("zip/area/", { "id": ($(th).val()).substring(0, 6) }, initSel, "#p_n_zhen");
    } else if (type == "n_xian") {
        initSelect("zip/area/", { "id": ($(th).val()).substring(0, 6) }, initSel, "#p_n_zhen");
    } else {}
}
// 保存患者基本信息
function savepatientInfo() {
    var form = new CybVerification.FirstVisitForm("addPatientFrom");
    var state = form.submit();
    if (state) {
        var data = $("#addPatientFrom").serializeObject();
        //if(getSelectedVal("#p_zip") && getSelectedVal4("#p_detaiDddress")){
        var selJson = {
            "occupation": $("#p_occupation").val() == 8 ? $("#p_occupation_z").val() : $("#p_occupation").find("option:selected").text(),
            "zip": getSelectedVal("#p_zip"),
            "residenceCode": getSelectedVal4(".p_detaiDddress"),
           // "uuid":localStorage.getItem("uuid"),
             "uuid":$("#fileTeamUuid").val(),
            "residence": getNowResidence("#p_n_sheng") + "/" + getNowResidence("#p_n_shi") + "/" + getNowResidence("#p_n_xian") + "/" + getNowResidence("#p_n_zhen") + "/" + $("#p_residence").val(),
            "verson": sessionStorage.getItem("verson")
		};
        var json = $.extend(data, selJson);
        var signData = $("#p_signData").val()
        var createDate = $("#p_create_date").val()
        var signDatas = new Date(signData)
        var createDates = new Date(createDate)
        var sign = $("#p_sign").val();
        if (sign == 2) {
            layer.alert(
                '该患者没有签署知情同意书，请确认是否提交该名患者的基本信息。注意：没有签署知情同意书的患者，无法填写后续诊疗内容，无法对患者执行预约操作',
                {icon:2,closeBtn:0},
                function () {
                    ajaxCommon("patient/updatePatient", json, backParent);
                    localStorage.setItem("uuid","");
					debugger
					sessionStorage.setItem("age",json.age);
					sessionStorage.setItem("verson",json.verson)
                }
            )
            return;
        }
        if (signDatas.getTime() > createDates.getTime()) {
            top.layer.alert("建档日期不得早于知情同意书签署日期")
        } else {
           ajaxCommon("patient/updatePatient", json, backParent);
            localStorage.setItem("uuid","");
			debugger
			sessionStorage.setItem("age",json.age);
			sessionStorage.setItem("verson",json.verson)
        }

    }
}



// 获取现住址的选中的文本信息  如果为请选择不会传值
function getNowResidence(el) {
    var str;
    if ($(el).find("option:selected").text() == "请选择") {
        str = '';
    } else {
        str = $(el).find("option:selected").text();
    }
    return str;
}
// 职业change事件
function occupationChange(th) {
    var val = $(th).val();
    if (val == 8) {
        $(".p_occupation_z").show();
    } else {
        $(".p_occupation_z").hide();
        $("#p_occupation_z").val("");
    }
}
// 基本信息保存回调事件
function backParent(el, data) {
    window.location.href = window.location.href.split("/app/")[0] + '/index.html#home?pid=' + data.pid + '&realname=' + sessionStorage.getItem("p_realname");
}
// 返回
function backLeft(el, data) {
    window.location.href = window.location.href.split("/app/")[0] + '/index.html#home?pid=' + userJson.pid + '&realname=' + sessionStorage.getItem("p_realname");
}
// 公共ajax
function ajaxCommon(url, data, callback, el) {
    $("#addPatientFrom").publicAjax({
        url: globalUrl + url,
        type: "post",
        data: data,
        dataType: "json",
        successFn: function(data) {
            if (data.code == "0") {
                callback(el, data.data);
            } else {
                top.layer.alert(data.msg);
            }
        }
    });
}
// 获取三级联动 || 四级联动值
function getSelectedVal(el) {
    /* var arr='';
    $(el).find("select option:selected").each(function(){
      if($(this).val()!=0){
       arr+=$(this).val()+",";
      }
    }); */
    var val;
    var shengVal = $("#p_sheng").find("option:selected").val();
    var shiVal = $("#p_shi").find("option:selected").val();
    var xianVal = $("#p_xian").find("option:selected").val();
    if (shengVal != "" && shiVal != "" && xianVal != "") {
        val = xianVal;
    } else if (shengVal != "" && shiVal != "" && xianVal == "") {
        val = shiVal;
    } else if (shengVal != "" && shiVal == "" && xianVal == "") {
        val = shengVal;
    } else if ((shengVal == "" && shiVal == "" && xianVal == "")) {
        val = "";
    }
    //  var val=$("#p_xian").find("option:selected").val();
    //arr=arr.substring(0,arr.length-1);
    return val;
}

function getSelectedVal4(el) {
    var arr = '';
    $(el).find("select option:selected").each(function() {
        if ($(this).val() != 0) {
            arr += $(this).attr("data-id") + "/";
        }
    });
    arr = arr.substring(0, arr.length - 1);
    return arr;
}
// 初始化职业
function initPatientOccupation(el, data) {
    $(el).find("option").remove();
    $(el).append("<option value=''>请选择</option>");
    for (var i = 0; i < data.length; i++) {
        $(el).append("<option value='" + data[i].dkey + "'>" + data[i].dvalue + "</option>")
    }
}

//  tabs  切换 按需加载
function tabsChange(id) {
    var url, callback, el;

    if (id != "") {
        switch (id) {
            case "#home":
                url = ""
                break;
            case "#messages":
                url = "./Patient/p_diagnosisUpdate.html?pid=" + 1;
                var id = id.replace('#', '');
                $("#p_" + id + "_iframe").prop("src", url);
                break;
            case "#profile":
                url = "examine/detial";
                ajaxCommon(url, { "pid": $("#p_pid").val() }, initRiskScreening, "")

                break;
        }
    } else {

        // layer.msg("请先填写患者的基本信息");
        url = "./Patient/p_diagnosisUpdate.html?pid=" + 1

    }


    $("#p_messages_iframe").prop("src", url);
}
// 证件编号切换
function idtypeChange(th) {
    var val = $(th).find("option:selected").val();
    var reg = $(th).find("option:selected").attr("data-value");
    console.log(val + reg);
    $("#p_idcard").attr("check", "required " + reg);
    var form = new CybVerification.FirstVisitForm("addPatientFrom");

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
        endDate: new Date()
    });
    //el.datetimepicker("setDate",new Date(parseInt(new Date().getTime())));
}

// 根据出生年月日获取年龄 周岁

function byage(strBirthday) {
    var returnAge;
    var strBirthdayArr = strBirthday.split("-");
    var birthYear = strBirthdayArr[0];
    var birthMonth = strBirthdayArr[1];
    var birthDay = strBirthdayArr[2];

    d = new Date();
    var nowYear = d.getFullYear();
    var nowMonth = d.getMonth() + 1;
    var nowDay = d.getDate();

    if (nowYear == birthYear) {
        returnAge = 0; //同年 则为0岁
    } else {
        var ageDiff = nowYear - birthYear; //年之差
        if (ageDiff > 0) {
            if (nowMonth == birthMonth) {
                var dayDiff = nowDay - birthDay; //日之差
                if (dayDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            } else {
                var monthDiff = nowMonth - birthMonth; //月之差
                if (monthDiff < 0) {
                    returnAge = ageDiff - 1;
                } else {
                    returnAge = ageDiff;
                }
            }
        } else {
            returnAge = -1; //返回-1 表示出生日期输入错误 晚于今天
        }
    }

    return returnAge; //返回周岁年龄
}

function f1(city, country) {
    if ($("#p_sheng").val() != "") {
        $("#app").publicAjax({
            url: globalUrl + "zip/area/",
            data: { "id": $("#p_sheng").val() },
            //async:false,
            successFn: function(data) {
                $("#p_shi").empty();
                var data = data.data;
                $("#p_shi").append("<option value=''>请选择</option>");
                for (var i in data) {
                    var op = $("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
                    $("#p_shi").append(op);
                }
                if (city != null) {
                    $("#p_shi option").each(function() {
                        if ($(this).text() == city) {
                            $(this).prop("selected", true)
                        }
                    });
                    f2(country);
                } else {
                    f2();
                }
            }
        })
    } else {
        $("#p_shi,#p_xian").empty();
        $("#p_shi").append("<option value=''>请选择</option>");
        $("#p_xian").append("<option value=''>请选择</option>");
    }
}

function f2(country) {
    if ($("#p_shi").val() != "") {
        $("#app").publicAjax({
            url: globalUrl + "zip/area/",
            data: { "id": $("#p_shi").val() },
            //async:false,
            successFn: function(data) {
                $("#p_xian").empty();
                var data = data.data;
                $("#p_xian").append("<option value=''>请选择</option>");
                for (var i in data) {
                    var op = $("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
                    $("#p_xian").append(op);
                }
                if (country != null) {
                    $("#p_xian option").each(function() {
                        if ($(this).text() == country) {
                            $(this).prop("selected", true)
                        }
                    })
                }
            }
        })
    } else {
        $("#p_xian").empty();
        $("#p_xian").append("<option value=''>请选择</option>");
    }

}

function fn1(city, country, town) {
    if ($("#p_n_sheng").val() != "") {
        $("#app").publicAjax({
            url: globalUrl + "zip/area/",
            data: { "id": $("#p_n_sheng").val() },
            //async:false,
            successFn: function(data) {
                $("#p_n_shi").empty();
                var data = data.data;
                $("#p_n_shi").append("<option value=''>请选择</option>");
                for (var i in data) {
                    var op = $("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
                    $("#p_n_shi").append(op);
                }
                if (city != null) {
                    $("#p_n_shi option").each(function() {
                        if ($(this).val() == city) {
                            $(this).prop("selected", true)
                        }
                    });
                    fn2(country, town);
                } else {
                    fn2();
                }
            }
        })
    } else {
        $("#p_n_shi,#p_n_xian,#p_n_zhen").empty();
        $("#p_n_shi").append("<option value=''>请选择</option>");
        $("#p_n_xian").append("<option value=''>请选择</option>");
        $("#p_n_zhen").append("<option value=''>请选择</option>");
    }

}

function fn2(country, town) {
    if ($("#p_n_shi").val() != "") {
        $("#app").publicAjax({
            url: globalUrl + "zip/area/",
            data: { "id": $("#p_n_shi").val() },
            //async:false,
            successFn: function(data) {
                $("#p_n_xian").empty();
                var data = data.data;
                $("#p_n_xian").append("<option value=''>请选择</option>");
                for (var i in data) {
                    var op = $("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
                    $("#p_n_xian").append(op);
                }
                if (country != null) {
                    $("#p_n_xian option").each(function() {
                        if ($(this).val() == country) {
                            $(this).prop("selected", true)
                        }
                    });
                    fn3(town);
                } else {
                    fn3();
                }
            }
        })
    } else {
        $("#p_n_xian,#p_n_zhen").empty();
        $("#p_n_xian").append("<option value=''>请选择</option>");
        $("#p_n_zhen").append("<option value=''>请选择</option>");
    }
}

function fn3(town) {
    if ($("#p_n_xian").val() != "") {
        $("#app").publicAjax({
            url: globalUrl + "zip/area/",
            data: { "id": $("#p_n_xian").val() },
            //async:false,
            successFn: function(data) {
                $("#p_n_zhen").empty();
                var data = data.data;
                $("#p_n_zhen").append("<option value=''>请选择</option>");
                for (var i in data) {
                    var op = $("<option value='" + data[i].id + "' data-id='" + data[i].id + "' data-name='" + data[i].name + "'>" + data[i].name + "</option>");
                    $("#p_n_zhen").append(op);
                }
                if (town != null) {
                    $("#p_n_zhen option").each(function() {
                        if ($(this).val() == town) {
                            $(this).prop("selected", true)
                        }
                    })
                }
            }
        })
    } else {
        $("#p_n_zhen").empty();
        $("#p_n_zhen").append("<option value=''>请选择</option>");
    }

}

// 知情同意书日期显示
function signdata() {
    var val = $("#p_sign").find("option:selected").val();
    if (val == 1) {
        $("#tysId1").show();
        $("#tysId2").css("width","50%");
        $(".signdataShow").show()
        $("#p_signData").attr("check", "required ");
        $("#p_signData").val("")
    } else {
        $(".signdataShow").hide()
        $("#p_signData").removeAttr("check", "required ");
        $("#p_signData").val("")
    }
}


//同意书上传窗口
function openFileUploadModule(){
    console.log(src)
    var url=src+"/template/zqtysUpload.html?v1";
    open(url);
}

function open(el) {
    var rx = /^https?:\/\//i;
    var con;
    if (rx.test(el)) {
        con = el;
    } else {
        con = $(el);
    }
    var iframe = '<iframe id = "iframeContentId" style="width: 99%;height: 420px;border: 1px solid red" src="'+con+'" ></iframe>'
  //  var commit = '<div id = "commit" style="width: 99%;height: 20px;border: 1px solid yellowgreen" " ></div>'
    layer.open({
         id:"abcdefg"
        ,type: 1
        ,content: iframe
        ,anim: 'up'
        ,btn: ['确定','取消']
        ,style: 'position:fixed; bottom:0; left:0; width: 100%; height: 72%; padding:10px 0; border:none;margin:0 auto'
        ,closeSucc: closeOk
    });
}


function closeOk() {
  //  checkTys()
    console.log("---------------->")
    var fileUUid = $("#iframeContentId")[0].contentWindow.successUUid;
    if(fileUUid != null){
        $("#tysId1").show();
        $("#tysId2").css("width","50%");
        localStorage.setItem("uuid",fileUUid)
        $("#fileTeamUuid").val(fileUUid)
    }
}

function hXImg(e,data) {
    console.log(data)
    let datas = data;
    var content = '<div  style="text-align: center; ">'
    for (let i = 0; i < datas.length; i++) {
        content+='<img id="img1" style="width: 100%; "  src= '+data[i]+"?token="+ localStorage.getItem("sessionId") +' alt="">'
    }
    content +="</div>"
    layer.open({
        content:content
        ,style: ' color:#fff;  height:500px ; width: 100%; overflow-y:auto ;' //自定风格
    });
}

function seeZqtysImg() {

    ajaxCommon("patient/selectImgPath", {"uuid":$("#fileTeamUuid").val() }, hXImg , "", "")
}




