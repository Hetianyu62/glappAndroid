/*
 * @Description: 新增 || 修改患者信息 业务逻辑
 * @Author: 杨志强
 * @Date: 2019-08-30 14:14:27
 * @LastEditTime: 2020-04-17 13:29:31
 * @LastEditors: Please set LastEditors
 */

var userJson, pid;
$(function() {
    var token = decodeURI(getUrlParams('token'));
    sessionStorage.setItem("token", token);
    var p_realname = decodeURI(getUrlParams('realname'));
    sessionStorage.setItem("p_realname", p_realname);
    pid = decodeURI(getUrlParams('pid')).replace(/\"/g, '');
    var realname = sessionStorage.getItem("realname");
    $("#p_archivist").val(realname);
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
    initDate($(".p_create_date"));
    initDate($(".p_signData"));
    //  判断是否有id
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
    }
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
                ,time: 2 //5秒后自动关闭
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
                ,time: 2 //5秒后自动关闭
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
	

	var idinfo=$('#p_idtype').val()
	//return false;
	if(idinfo == '1'){
			 var p_idcard=$('#p_idcard').val()
			 if(!IdentityCodeValid(p_idcard)){
				 return false;
			 }
	}
	
    if (state) {
        var data = $("#addPatientFrom").serializeObject();
        //if(getSelectedVal("#p_zip") && getSelectedVal4("#p_detaiDddress")){
        var selJson = {
            //"occupation":$("#p_occupation").val()==8 ?  $("#p_occupation_z").val(): $("#p_occupation").find("option:selected").text(),
            "zip": getSelectedVal("#p_zip"),
            "residenceCode": getSelectedVal4(".p_detaiDddress"),
            "uuid": localStorage.getItem("uuid"),
            "residence": getNowResidence("#p_n_sheng") + "/" + getNowResidence("#p_n_shi") + "/" + getNowResidence("#p_n_xian") + "/" + getNowResidence("#p_n_zhen") + "/" + $("#p_residence").val()
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
                    ajaxCommon("patient/addPatient", json, backParent);
                    localStorage.setItem("uuid","");
                }
            )
            return;
        }
        if (signDatas.getTime() > createDates.getTime()) {
            top.layer.alert("建档日期不得早于知情同意书签署日期")
        } else {
            ajaxCommon("patient/addPatient", json, backParent);
            localStorage.setItem("uuid","");
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
// 知情同意书日期显示
function signdata() {
    var val = $("#p_sign").find("option:selected").val();
    if (val == 1) {
        $(".signdataShow").show()
        $("#p_signData").attr("check", "required ");
        $("#p_signData").val("")
    } else {
        $(".signdataShow").hide()
        $("#p_signData").removeAttr("check", "required ");
        $("#p_signData").val("")
    }
}
// 基本信息保存回调事件
// 基本信息保存回调事件
function backParent(el, data) {
    window.location.href = window.location.href.split("/app/")[0] + '/index.html#home?pid=' + data.pid + '&realname=' + $("#p_realname").val();
}

function backLeft() {
    window.location.href = window.location.href.split("/app/")[0] + '/index.html#home?pid=' + pid + '&realname=' + sessionStorage.getItem("p_realname");
}
// 公共ajax
function ajaxCommon(url, data, callback, el) {
    $("#addPatientFrom").publicAjax({
        url: globalUrl + url,
        type: "post",
        data: data,
        dataType: "json",
        successFn: function(data) {
           // lyIndex != null ? (top.layer.close(lyIndex)) : '';
            if (data.code == "0") {
                callback(el, data.data);
            } else {
                layer.alert(data.msg);
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
                        if ($(this).val() == city) {
                            $(this).attr("selected", true)
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
                        if ($(this).val() == country) {
                            $(this).attr("selected", true)
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
                            $(this).attr("selected", true)
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
                            $(this).attr("selected", true)
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
                            $(this).attr("selected", true)
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



//同意书上传窗口
function openFileUploadModule(){
    console.log(src)
    var url=src+"/template/zqtysUpload.html";
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
    var fileUUid = $("#iframeContentId")[0].contentWindow.successUUid;
    if(fileUUid != null){
        $("#tysId1").show();
        $("#tysId2").css("width","50%");
       // localStorage.setItem("uuid",fileUUid)
        $("#fileTeamUuid").val(fileUUid)
    }
}

function hXImg(e,data) {

    let datas = data;
    var content = '<div style="text-align: center ">'
    for (let i = 0; i < datas.length; i++) {
        content+='<img id="img1" style="width: 100%; " src= '+data[i]+"?token="+ localStorage.getItem("sessionId") +' alt="">'
    }
    content +="</div>"
    layer.open({
        content:content
        ,style: ' color:#fff;  height:500px ;width: 100%; overflow-y:auto ;' //自定风格
    });
}

function seeZqtysImg() {

    ajaxCommon("patient/selectImgPath", {"uuid":$("#fileTeamUuid").val() }, hXImg , "", "")
}


function IdentityCodeValid(val) {
			  var code=val
			  
		            var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
		            var tip = "";
		             var pass= true;
		             
		             if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
		                 tip = "身份证号格式错误,请认真核对!";
		                 pass = false;
		             }
		             
		           else if(!city[code.substr(0,2)]){
		                 tip = "身份证地址编码错误,请认真核对!";
		                pass = false;
		             }
		             else{
		                 //18位身份证需要验证最后一位校验位
		                 if(code.length == 18){
		                    code = code.split('');
		                    //∑(ai×Wi)(mod 11)
		                    //加权因子
		                     var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
		                   //校验位
		                     var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ,'x'];
		                     var sum = 0;
		                    var ai = 0;
		                     var wi = 0;
		                    for (var i = 0; i < 17; i++)
	                     {
		                         ai = code[i];
		                        wi = factor[i];
	                         sum += ai * wi;
		                    }
		                     var last = parity[sum % 11];
		                    if(parity[sum % 11] != code[17]){
		                        tip = "身份证号校验位错误,请认真核对";
	                         pass =false;
		                    }
	                 }
		             }
		             if(!pass) alert(tip);
					 console.log(pass)
		            return pass;
					
		        }