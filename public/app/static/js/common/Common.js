/*
1、加载公共的 css 和 js 文件
2、图标文件
3、
4、
*/
//js获取项目根路径，如： https://localhost:8083/uimcardprj
function getRootPath() {
    //获取当前网址，如： https://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： https://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    //var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    //return(localhostPaht+projectName);
    return localhostPaht;
}
// var src=getRootPath()+'/app';
var src = window.location.href.split("/app/")[0] + '/app/';
//var src=getRootPath();
var serverUrl = "http://39.104.163.167/api/";


var testUrl = "https://www.powerbone.cn/gl/app/";
//https://www.powerbone.cn/gl/app/
var localApi = "https://www.powerbone.cn/gl/app/";  // "http://localhost:8086/app/"; http://192.168.31.150:8082/wjwgl/app/
var apiUrl = "https://www.powerbone.cn/gl/app/";
var apiUrl2 = "https://www.powerbone.cn/gl/";
// var apiUrl = "http://192.168.31.150:8080/wjwgl/app/";
// var apiUrl2 = "http://192.168.31.150:8080/wjwgl/";
// var apiUrl = "http://172.20.10.2:8086/app/";
// var apiUrl2 = "http://172.20.10.2:8086/";

var imagesUrl = "http://39.106.47.123:8080/ophp/";
var globalUrl = localApi;
var userFlag = sessionStorage.getItem("flag");
var $p_btnGroup = sessionStorage.getItem("p_btnGroup");
var UID;
var TIME;

/*---------------url截取-----------*/
function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return r[2];
    else
        return "";
}

function filterXSS(str) {
    return str
        .replace(/&/g, '&amp;')
        .replace(/ /g, '&nbsp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\r{0,}\n/g, '<br/>')
}

/* 日期格式化 */

function dateFormat(date) {
    var d = new Date(date);

    var year = d.getFullYear(); //年
    var month = d.getMonth() + 1; //月
    var day = d.getDate(); //日

    var hh = d.getHours(); //时
    var mm = d.getMinutes(); //分
    var ss = d.getSeconds(); //秒

    var clock = year + "-";

    if (month < 10)
        clock += "0";

    clock += month + "-";

    if (day < 10)
        clock += "0";

    clock += day;
    /*
       if (hh < 10)
           clock += "0";

       clock += hh + ":";
       if (mm < 10) clock += '0';
       clock += mm + ":";

       if (ss < 10) clock += '0';
       clock += ss; */
    return (clock);
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    var path = window.location.pathname;
    var pathUrlArr = path.split(".");
    var pathUrl = pathUrlArr[0];
    document.cookie = cname + "=" + cvalue + ";" + path + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/* 返回管理列表传id */
function backHistory(url) {
    window.open(src + url, '_self');
}

/* 公共弹框 */
function openLayer(id, type, title, el, areaArr, callback, btnArr) {
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
    id = layer.open({
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
        scrollbar: true,
        maxmin: false,
        btn: btn,
        yes: function (index, layero) {
            callback(id, index, layero);
        },
        btn2: function () {
            layer.close(id)
        }

    });
}



/* iframe弹框 */
function openLayerIframe(id, type, title, el, areaArr, callback, btnArr) {
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
    id = parent.layer.open({
        type: type,
        title: title,
        skin: 'layui-layer-demo', //样式类名
        closeBtn: 0, //不显示关闭按钮
        anim: 2,
        shadeClose: false, //开启遮罩关闭
        area: area,
        move: ".layui-layer-title",
        closeBtn: 1,
        content: "<iframe src='" + con + "'></iframe>",
        scrollbar: true,
        maxmin: false,
        btn: btn,
        yes: function (index, layero) {
            callback(id, index, layero);
        },
        btn2: function () {
            layer.close(id)
        }

    });
}

// TIME=setInterval(function(){
// 	getMsgNum();
// },2000);

function getMsgNum() {
    // $.ajax({
    // 	url:globalUrl+'diagnose/unFinishDiagnoseCount',
    //   type:'post',
    //   data:{"sessionId": sessionStorage.getItem("token")},
    // 	dataType:'json',
    // 	success:function(data){
    //     $("#msgNum").text("");
    // 		$("#msgNum").text(data.data.count);

    // 	}
    // });
    //console.log("开启诊疗提醒");
}
// 权限控制
// function flagConfirm(){
//   var flag=userFlag;

//   if(flag==1){
//     /*
//      1超级管理员 2国家级用户 3 科室管理员 4医师 5 科研人员
//      1、超级管理员(患者信息只可查看)
//      .f_p_updateBtn // 患者操作按钮
//      .f_p_delBtn    // 删除按钮
//      .f_p_upload    // 信息上传
//      .f_p_pupload   // 批量上传
//      .f_p_download   // 批量上传
//      .f_p_cAdd       // 参数管理操作
//     */
//     $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,.f_p_cAdd").remove();
//   }else if(flag==2){
//     $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download,.f_p_cAdd").remove();
//   }else if(flag==3){
//     $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download").remove();
//     $(".f_p_cAdd").show();
//   }else if(flag==4){
//     $(".f_p_cAdd").remove();
//     $(".flag_btn,.f_p_updateBtn,.f_p_delBtn,.f_p_upload,.f_p_pupload,.f_p_download").show();
//   }
// }

// 转诊过后的按钮控制
function referralConfirm(dataHid, userHid, flagCode) {
    var referralstatus = sessionStorage.getItem("referralstatus");

    /*
       诊疗状态 dataHid 1 诊疗id  userHid 用户hid
       用户权限
     */
    if (flagCode == 1) {
        $(".flag_btn").remove();
    } else if (flagCode == 2) {
        $(".flag_btn").remove();
    } else if (flagCode == 3) {
        $(".flag_btn").remove();
    } else if (flagCode == 4) {
        if (dataHid == userHid && referralstatus == 1) {
            $(".flag_btn").show();
        } else {
            $(".flag_btn").hide();
            $(".flag_btn").remove();
        }
    } else {
        $(".flag_btn").remove();
    }
}


function shakes(data) {
    //后台传递过来的字符串
    console.log(data.data)
    if (data.data.msg) { //打印提示信息
        top.layer.msg(data.data.msg);
    }
    if (!data.data.key) { //如果没有key 直接返回，不做晃动处理
        return;
    }

    var domAttrStr = data.data.key;
    var s = domAttrStr.substring(0, 1);//如果第一位是数字表示 当前表单重复字段所在的索引位置

    var attrs = "";
    var tagObj = null;
    if (isNaN(s)) {
        attrs = domAttrStr;
        s = "0";
    } else {
        attrs = domAttrStr.substring(1, domAttrStr.length);
    }

    var tagObj = $('[' + attrs + ']'); //p_h1_check
    //如果拿到多个tag ，索引s的值为0，取第一个对象
    if (tagObj.length > 1) { tagObj = $(tagObj[s]); }
    tagObj.focus(); //获取焦点 用于在页面中地位当前元素  
    if (tagObj.attr('type') != 'radio' && tagObj.attr('type') != 'checkbox') {
        $(tagObj).css({ position: 'relative' });
        //intShakes：抖动次数；intDistance：抖动左右距离；intDuration：持续时间 
        var intShakes = 6, intDistance = 10, intDuration = 100;
        for (var x = 1; x <= intShakes; x++) {
            $(tagObj).animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    }

}
// eslint-disable-next-line no-unused-vars
function openModal() {
    var modalDiv = '<div class="module-backdrop"></div>';
    // eslint-disable-next-line no-undef
    console.log($(".module-backdrop") == null);
    // eslint-disable-next-line no-undef
    $('body').append(modalDiv)
}
// eslint-disable-next-line no-unused-vars
function closedModal() {
    // eslint-disable-next-line no-undef
    $('.module-backdrop').remove()
}