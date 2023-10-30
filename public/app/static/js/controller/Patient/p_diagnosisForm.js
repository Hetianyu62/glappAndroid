/*
 * @Author: 杨志强
 * @Date: 2019-11-27 10:35:08
 * @LastEditTime: 2020-05-06 09:23:14
 * @LastEditors: Please set LastEditors
 * @Description: 诊疗记录的核心业务
 * @FilePath: \wjw_gs\static\js\controller\Patient\p_diagnosisForm.js
 */
var userJson, dgId;
$(function() {
    //initHeight();
    var updateUrl = src + "/views/Patient/p_heathForm.html";
    //openCommonLayer("healthId", 2, "欧洲五维健康量表EQ-5D-5L",updateUrl,["1000px","500px"], "",["确定"])
    // $("body").prepend('<input type="text" id="focus" size="1" style="filter: alpha(opacity:0);opacity: 0;">');
    var form = new CybVerification.FirstVisitForm("home");
    var dataName = decodeURI(getUrlParams("pid"));
    $("#p_docName").val(localStorage.getItem("realname"));
    //ajaxCommonTest("","",initForm,"","");
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#p_title").text(userJson.title);
        ajaxCommon("diagnose/zdDateRegion", { "pid": userJson.pid, "dgId": userJson.dgId }, initZdDate, "", "");

        if (userJson.type == "update" || userJson.uType == "update") {
            ajaxCommon("diagnose/editDiagnose", { "pid": userJson.pid, "dgId": userJson.dgId }, initForm, "", "");

        }
    }
    nullChange(".p_check_null");
    initNullChange(".p_check_null");
    yesChange(".p_check_yes");
    initYesChange(".p_check_yes");
    othersChange(".p_others");
    othersRadioChange(".p_radio_others");
    othersSelChange(".p_others_sel");
    otherSelectChange(".p_other_select");
    //otherSelect00Change('.p_other_select00')
    initOthersSelChange(".p_others_sel");
    notOrYesChange(".p_checkbox", "h2_disease");
    allSelChange(".p_h3_checkbox");
    initNotOrYes(".p_checkbox");
    initradioNotOrYes(".p_radiobox");
    radioNotOrYes(".p_radiobox");
    radioSel('.radioSel');
    initPregnantNum("#p_g2_c");
    nullSelectChange(".p_select_null");
    initNullSelectChange(".p_select_null");
    ////referralConfirm();
    //有无过敏史 初始化
    initAllergy("#p_h5_check");
    //initLastYears("#p_h3_lastyear");
    //lastYearschange("#p_h3_lastyear");
	delCheck(sessionStorage.getItem("verson"))
    selePoint("#myTab", userJson.href);
    checkSelect(".p_check_select");
    selectDirection(".p_select_direction");
    othersEquipment("#p_d_d_1");
    g3Type("#p_page3_g3_other")

    $("#p_g1_s_b").bind('input propertychange', function() {
        var val = $(this).val();
        if (val > 1) {
            $(".p_g1_s_b_2").val(val);
        } else {
            $(".p_g1_s_b_2").val(1);
        }
    });
    $("input.p_radio_checkbox").each(function() {
        $(this).click(function() {
            if ($(this).prop('checked')) {
                $('input.p_radio_checkbox').prop('checked', false);
                $(this).prop('checked', true);
                if ($(this).prop('name') == "d_e" || $(this).prop('name') == "d_f") {
                    $("#p_d_e_f_note").removeProp("readonly");
                    $("#p_d_e_f_note").attr("check", "required");
                    $("#p_d_e_f_note").parent().show();
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

                $(".p-ctr-b-zlju").hide();

                //d_c原发性骨质疏松,  d_d原发性骨质疏松症伴病理性骨折 王英海新增
               //d_e 继发性骨质疏松症 d_f继发性骨质疏松症伴病理性骨折 *导致骨质疏松的疾病
               if($(this).prop('name') == "d_d" || $(this).prop('name') == "d_f"  ){
                   $(".gz-infor").show()
                   $("tr[class*='-other']").hide(); 
               }  
               owner.clearData(".p-ctr-b-zlju");//不管点击什么，都需要把数据清理掉

            }
        });
    });
    $("input.p_d_checkbox1").each(function() {
        $(this).click(function() {
            if ($("#p_d_4").is(":checked") == true) {
                $("#p_d_1,#p_d_2").attr("disabled", "disabled")
                $("#p_d_1,#p_d_2").attr("checked", false);
            } else {
                $("#p_d_1,#p_d_2").removeAttr("disabled", "disabled")
            }
            if ($("#p_d_1").is(":checked") == true || $("#p_d_2").is(":checked") == true) {
                $("#p_d_4").attr("disabled", "disabled")
                $("#p_d_4").attr("checked", false)

            } else {
                $("#p_d_4").removeAttr("disabled", "disabled")
            }
            // }
            // $(this).prop('checked', true);
            // $($(this)).val($($(this)).val() == "0" ? "1" : "0");


        });
    });
    // 根据男女进行婚育史的显示隐藏
    initGender("#p_gender");
	delCheck(sessionStorage.getItem("verson"))
    initDate($(".p_birthday"), "", "");
    $(".p_nextDate").datetimepicker({
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
        startDate: new Date(),
        //endDate:new Date()
    });
    $('.p_nextDate').datetimepicker("setDate", new Date(parseInt('7776000000') + new Date().getTime()));

});
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
            // alert("56665")
            // callBack();//刷新列表页面
        }

    });
}
// 初始化诊断时间
function initZdDate(el, data) {
    var startTime = data.startTime ? new Date(data.startTime) : "";
    var endTime = data.endTime ? new Date(data.endTime) : new Date();
    $("#p_diagnosisDate").datetimepicker({
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
        endDate: endTime,
    });
}
// 根据男女进行婚育史的显示隐藏
function initGender(el) {
    var gender = sessionStorage.getItem("gender");
    if (gender == 1) {
        $(el).hide();
		$(el).find("#p_g2_a,#p_g2_b,#p_g3_b_age,#p_g3_c").removeAttr("check");
		$("#p_g3_e").attr("check","");
		$("#p_g3_d").attr("check","");
		$("#p_g3_b_age").attr("check","");
    } else {
        $(el).show();
        $(el).find("#p_g2_a,#p_g2_b").attr("check", "required");
		$("#p_g3_b_age").attr("check","required g3_b_age");
    }
}
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
        var updateUrl = src + "/p_heathForm.html";
        openCommonLayer("healthId", 1, "健康量表", $("#healBox"), ["300px", "500px"], healthCallback, ["确定"], function() {
            var aaab = $("#p_page1_h1_a_0").text();
            if (aaab == "") {
                $("#p_h1_check").val("0")
            }
        });
        //window.open(updateUrl,"_self");
    }

}
// 健康量表回调
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
// morse跌倒风险评估
function morse(th) {
    var val = $(th).val();
    if (val == "" || val == 0) {
        $("#morseResult").text('');
    } else {
        // $(".health-form").show();
        // $(".health-form").find('.checkRadio').attr("check","radio");
        var updateUrl = src + "/p_morseForm.html";
        openCommonLayer("morseId", 1, "Morse跌倒风险评估量表", $("#morseBox"), ["300px", "500px"], morseCallback, ["确定"],
            function() {
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
    if (data == false) {
        return
    }
    console.log(data, "asfkaoi")
    top.layer.closeAll();
    $("#morseResult").text(data.fallRiskAssessment);
    // morseResultCallback();
    // if (data) {
    //     ajaxCommon("healthResult/result", data, morseResultCallback, '', id);
    //     //initTable();
    // } else {
    //     layer.msg("请认真填写消息");
    // }
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
            $(this).parent().parent().next().find("input[type='text']").val("");
            $(this).parent().parent().next().find("input[type='number']").val("");
            // $(this).parent().parent().next().find(".p_others_sel").siblings().hide();
            $(this).parent().parent().next().find("input[type='text']").prop("readonly", "readonly");
            $(this).parent().parent().next().find("input[type='number']").prop("readonly", "readonly");
            $(this).parent().parent().next().find("select option[value='']").prop("selected", "selected");
            $(this).parent().parent().next().find("select").prop("disabled", "disabled");
            $(this).parent().parent().next().find("input[type='text'],input[type='number'],select,textarea").removeAttr("check");
            $(this).parent().parent().next().hide();
        } else {
            $(this).parent().parent().next().show();

        }
    })
}
// 是否既往体健
function yesChange(el) {
    $(el).change(function() {
        if ($(this).val() == 1 || $(this).val() == "") {
            $(this).attr("check", "required");
            $(this).parent().nextAll().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().nextAll().removeClass("check");
            $(this).parent().nextAll().find("input[type='checkbox']").removeAttr("check");
            $(this).parent().nextAll().find("input[type='text']").val("");
            $(this).parent().nextAll().find("input[type='number']").val("");
            $(this).parent().nextAll().hide();
        } else {
            $(this).parent().nextAll().show();
            $(".p_check_null_2").hide();
            $(this).parent().nextAll().find(".p_check_null").prop("checked", true);
            $(this).removeAttr("check");
            // $(this).parent().nextAll().find("input.p_check_null[type='checkbox']").prop("checked","checked");
            $(this).parent().nextAll().find("input[type='checkbox']").attr("check", "checkbox");
            $(this).parent().nextAll().addClass("check");


        }
    })
}
// 是否既往体健
function initYesChange(el) {
    if ($(el).val() == 1 || $(el).val() == "") {
        $(el).attr("check", "required");
        $(el).parent().nextAll().find("input[type='checkbox']").prop("checked", false);
        $(el).parent().nextAll().find("input[type='checkbox']").removeAttr("check");
        $(el).parent().nextAll().removeClass("check");
        $(el).parent().nextAll().find("input[type='text']").val("");
        $(el).parent().nextAll().find("input[type='number']").val("");
        $(el).parent().nextAll().hide();
    } else {
        $(el).parent().nextAll().show();
        $(el).removeAttr("check");
        // $(this).parent().nextAll().find("input.p_check_null[type='checkbox']").prop("checked","checked");
        $(el).parent().nextAll().find("input[type='checkbox']").attr("check", "checkbox");
        $(el).parent().nextAll().addClass("check");
    }
}
//有无过敏史 初始化
function initAllergy(el) {
    $(el).change(function() {
        if ($(this).val() == 0 || $(this).val() == "") { // 无
            $(this).parent().parent().next().hide();
            $(this).parent().parent().next().find("textarea").removeAttr("check");
            $(this).parent().parent().next().find("textarea").val("");
        } else {
            $(this).parent().parent().next().show();
            $(this).parent().parent().next().find("textarea").attr("check", "required");
        }
    });

    if ($(el).val() == 0 || $(el).val() == "") { // 无
        $(this).parent().parent().next().hide();
        $(el).parent().parent().next().find("textarea").removeAttr("check");
        $(this).parent().parent().next().find("textarea").val("");

    } else {
        $(el).parent().parent().next().show();
        $(el).parent().parent().next().find("textarea").attr("check", "required");

    }
}
// 点击其他激活input 输入框
function othersChange(el) {
    $(el).change(function() {
        if ($(this).is(":checked")) {
            $(this).nextAll().removeProp("readonly");
            $(this).nextAll().show();
            //$(this).nextAll().attr("check",'required');
        } else {
            $(this).nextAll().prop("readonly", "readonly");
            $(this).nextAll().hide();
            //$(this).nextAll().removeAttr("check");
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
// 手术史 手术简介change事件
function othersSelChange(el) {
    $(el).change(function() {
        if ($(this).is(":checked")) {
            $(this).parent().nextAll().show()
            $(this).parent().nextAll().removeProp("disabled");
            $(this).parent().parent().find("input[type='text']").removeAttr("readonly");
            $(this).parent().nextAll().attr("check", "required");
        } else {
            $(this).parent().nextAll().hide()
            $(this).parent().nextAll().prop("disabled", "disabled");
            $(this).parent().nextAll().find("option[value='']").attr("selected", true);
            $(this).parent().nextAll().val("");
            $(this).parent().nextAll().removeAttr("check");
        }
    })
}
// 是否绝经的选中事件
function otherSelectChange(el) {
    $(el).change(function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().next().hide();
            $(this).parent().next().find("input").removeAttr("check");
            $(this).parent().next().find("input").val("");

        } else {
            $(this).parent().next().show();
            $(this).parent().next().find("input").attr("check", "required");
        }
        //otherSelect00Change('.p_other_select00')
    });

    $.each($(el), function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().next().hide();
            $(this).parent().next().find("input").removeAttr("check");
            $(this).parent().next().find("input").val("");
        } else {
            $(this).parent().next().show();
            $(this).parent().next().find("input").attr("check", "required");
        }
    });
    //otherSelect00Change('.p_other_select00')

}

function selectPatter(e, k) {
    var val = $(e).val();
    console.log(e, k, '#drugCadtegory' + k + '', "这是什么3")
    if (val == "1" || val == "") {
        $('#pattern_show' + k + '').hide()
            // $('#pattern_show' + k + '').find("select[name=h3_1]").removeAttr("check", "required");
            // $('#payment').find("option:selected").attr("selected", false);
    } else {
        $('#pattern_show' + k + '').show()
        $('#pattern_show' + k + '').find("select").val("");
        $('#pattern_show' + k + '').find("input[name=h3_0_other]").val("").hide();
        // $('#pattern_show' + k + '').find("select[name=h3_1]").attr("check", "required");
        $('#pstternType' + k + '').val("")
            // $(e).val("");
    }
}
// DXA 切换事件
function checkSelect(el) {
    $(el).change(function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().parent().next().hide();
            $(this).parent().parent().next().find(".check1,.p_required").removeAttr("check");
            $(this).parent().parent().next().find("select option:first").prop("selected", "selected");
            $(this).parent().parent().next().find("select").val("");
            $(this).parent().parent().next().find("select:first").removeAttr("check");
            $(this).parent().parent().next().find("input[type='text'],input[type='number']").val("");
            $(this).parent().parent().nextAll().find("#p_page2_tb4").find("tbody").html("");

            //$(this).next().find(".p_required").removeAttr("check");
        } else {
            $(this).parent().parent().next().show();
            $(this).parent().parent().next().find(".check1,.p_required").attr("check", "required");
            $(this).parent().parent().next().find("select:first").attr("check", "required");
            $(this).parent().parent().nextAll().find("#p_page2_tb4").find("tbody").html("");

            //$(this).next().find(".p_required").attr("check","required");
        }
        selectDirection(".p_select_direction");
        othersEquipment("#p_d_d_1");
        initNullSelectChange(".p_select_null");
    });
    $.each($(el), function() {
        if ($(this).val() == "" || $(this).val() == "0") {
            $(this).parent().parent().next().hide();
            $(this).parent().parent().next().find(".check1,.p_required").removeAttr("check");
            $(this).parent().parent().next().find("select option:first").prop("selected", "selected");
            $(this).parent().parent().next().find("select").val("");
            $(this).parent().parent().next().find("select:first").removeAttr("check");
            $(this).parent().parent().next().find("input[type='text'],input[type='number']").val("");
            //$(this).next().find(".p_required").removeAttr("check");
        } else {
            $(this).parent().parent().next().show();
            $(this).parent().parent().next().find(".check1,.p_required").attr("check", "required");
            $(this).parent().parent().next().find("select:first").attr("check", "required");
            //$(this).next().find(".p_required").attr("check","required");
        }
        selectDirection(".p_select_direction");
        othersEquipment("#p_d_d_1");
        initNullSelectChange(".p_select_null");
    });
    // initNullSelectChange(".p_select_null");
    // othersEquipment("#p_d_d_1");
    // selectDirection(".p_select_direction");
}
// 手术史初始化事件
function initOthersSelChange(el) {
    $.each($(el), function() {
        if ($(this).is(":checked")) {
            $(this).parent().nextAll().show()
            $(this).parent().nextAll().removeProp("disabled");
            $(this).parent().nextAll().attr("check", "required");
            $(this).parent().nextAll().find("input[type='text']").removeAttr("readonly");

        } else {
            $(this).parent().nextAll().hide()
            $(this).parent().nextAll().prop("disabled", "disabled");
            $(this).parent().nextAll().find("option[value='']").attr("selected", true);
            $(this).parent().nextAll().val("");
            $(this).parent().nextAll().removeAttr("check");
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
        case "page1": 
            if ($("#p_h1_check").val() == 1) {
                if (!$("#p_h1_a").val()) {
                    top.layer.msg("请填写本次健康量表");
                    return false;
                }
            }
            var fractureRate = $("#p_fractureRate").val()
            var osteoporticFracture = $("#p_osteoporticFracture").val()
            if (fractureRate >= 3 || osteoporticFracture >= 20) {

                $("#p_d_5").prop("checked", true);
                // $("#p_d_5").attr("disabled", "disabled");
            } else {
                $("#p_d_5").prop("checked", false);
            }
            if (Number(fractureRate) > Number(osteoporticFracture)) {
                top.layer.msg("未来10年髋部骨折概率不得大于未来10年主要骨质疏松性骨折概率，请核对！");
                return false;
            }
            data = {
                'height': $("#p_height").val(),
                'weight': $("#p_weight").val(),
                'BMI': $("#p_BMI").val(),
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "isDensity": $("#p_isDensity").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "health": {
                    "h1_check": $("#p_h1_check").val(),
                    "h1_a": $("#p_h1_a").val()
                }
            };
            url = 'diagnose/optFirstVisit';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                'height': $("#p_height").val(),
                'weight': $("#p_weight").val(),
                'bmi': $("#p_BMI").val(),
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "isDensity": $("#p_isDensity").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "page1": JSON.stringify(data)
            };
            id = "page2";
            break;
        case "page2":
            var check1 = $("#p_h1_d1_check").is(':checked')
            var check2 = $("#p_h1_d2_check").is(':checked')
            var check3 = $("#p_h1_d3_check").is(':checked')
            var check4 = $("#p_h1_d4_check").is(':checked')
            var check5 = $("#p_h1_d5_check").is(':checked')
            var check6 = $("#p_h1_d6_check").is(':checked')
            var check7 = $("#p_h1_d7_check").is(':checked')
            var check8 = $("#p_h1_d8_check").is(':checked')
            var check9 = $("#p_h1_d9_check").is(':checked')
            var check10 = $("#p_h1_d10_check").is(':checked')
                // console.log(check)
            if (check1 == true && check2 == true && check3 == true && check4 == true && check5 == true && check6 == true && check7 == true && check8 == true && check9 == true && check10 == true) {
                top.layer.msg("至少有一项疾病选择非“无”选项")
                return false;
            }
            data = {
                "history_1": {
                    "h1_h_check": $("#p_h1_h_check").val(),
                    "h1_disease1": $("#p_page2_h1_disease1").serializeObject(),
                    "h1_disease2": $("#p_page2_h1_disease2").serializeObject(),
                    "h1_disease3": $("#p_page2_h1_disease3").serializeObject(),
                    "h1_disease4": $("#p_page2_h1_disease4").serializeObject(),
                    "h1_disease5": $("#p_page2_h1_disease5").serializeObject(),
                    "h1_disease6": $("#p_page2_h1_disease6").serializeObject(),
                    "h1_disease7": $("#p_page2_h1_disease7").serializeObject(),
                    "h1_disease8": $("#p_page2_h1_disease8").serializeObject(),
                    "h1_disease9": $("#p_page2_h1_disease9").serializeObject(),
                    "h1_disease10": $("#p_page2_h1_disease10").serializeObject(),
                },
                "history_2": {
                    "pharmacy_block_1": $("#pharmacy_block_1").serializeObject(),
                    "pharmacy_block_2": {
                        "osteoporosis_select": $('#osteoporosis_select option:selected').val(),
                        "osteoporosis_arr": getHistoryArr('#addMedicine'),
                    },
                    "pharmacy_block_3": {
                        "renicapsule_select": $("#renicapsule_select option:selected").val(),
                        "renicapsule_arr": getHistoryArr('#addHormone'),
                    },
                    "pharmacy_block_4": $("#otherYW").serializeObject(),


                },
                "history_4": {
                    "h4_check": $("#p_h4_check").is(':checked') ? 1 : 0,
                    "h4_a": $("#p_h4_a_form").serializeObject(),
                    "h4_b": $("#p_h4_b_form").serializeObject(),
                    "h4_c": $("#p_h4_c_form").serializeObject(),
                    "h4_d": $("#p_h4_d_form").serializeObject(),
                    "h4_z": $("#p_h4_z_form").serializeObject()
                },
                "history_5": {
                    "h5_check": $("#p_h5_check").val(),
                    "h5_a": $("#p_h5_a").val(),
                }
            }
            url = 'diagnose/optFirstVisit';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                "page2": JSON.stringify(data)
            };
            id = "page3";
            break;
        case "page3":
		   if(sessionStorage.getItem("verson")=="v2"){
			   
			   if(!menarchsubmit()){
			   	return false;
			   }
			   //绝经年龄校验
			   if(!checkage2()){
			   	return false;
			   }
			   //停年龄校验
			   if(!check3age()){
			   	return false;
			   }
			   
		    if(!g3checksubm($("#p_g3_c").val())){
		   	 return false;
		    }
		   if(!hcCheck($("#p_g3_e").val())){
		   	 return false;
		   } 
		   var hcvale=$("#p_g3_e").val()
		    if(hcvale !='' && hcvale !=undefined){
		   	 for(var ns=1;ns<=parseInt(hcvale);ns++){
		   		 if(!birthy(ns)){
		   			 return false;
		   		 }
		   		if(!lactationch($("#p_g3_e5_"+ns).val(),ns)){
		   			return false;
		   		} 
		   	 }
		    }	
		   	 }
		    			
		      
		
            data = {
                "genetic_0": $("#genetic_0").val(),
                "genetic_1": $("#p_genetic_1").serializeObject(),
                "genetic_3": {
                    "g3_father": $("#p_g3_father").serializeObject(),
                    "g3_mother": $("#p_g3_mother").serializeObject(),
                    //  "g3_relative":getHistoryArr('#p_page3_tb4')
                    "g3_relative": {
                        "g3_other": $("#p_page3_g3_other").val(),
                        "g3_arr": getHistoryArr('#p_page3_tb4')
                    }
                }
            };
            var nData = { "genetic_2": $("#p_genetic_2").serializeObject() };
            var gender = sessionStorage.getItem("gender");
            var dataJson;
            if (gender == 1) {
                dataJson = data;
            } else {
                dataJson = $.extend(data, nData);
            }
            url = 'diagnose/optFirstVisit';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                "page3": JSON.stringify(dataJson)
            };
            id = "page4";
            break;
        case "page4":

            data = {
                "d_date": $("#p_d_date").val(),
                "d_diagnose": {
                    "d_d_a": {
                        "d_d_check": $("#p_d_d_check").val(),
                        "d_d_date": $("#p_d_d_date").val(),
                        "d_d_1": $("#p_d_d_1").val(),
                        "d_d_1_z": $("#p_d_d_1_z").val(),
                        "d_d_2": $("#p_d_d_2").serializeObject(),
                        "d_d_3": $("#p_d_d_3").serializeObject(),
                        "d_d_4": $("#p_d_d_4").serializeObject(),
                    },
                    "history_3": {
                        "h3_check": $("#p_h3_check").val(),
                        "num_check": $("#p_num_check").val(),
                        "h3_lastyear": $("#p_h3_lastyear").val(),
                        "h3_fracture": getHistoryArr('#p_page2_tb4'),
                    },

                },
                "diagnose": $("#p_diagnose").serializeObject(),
                "patient_t": $("#p_patient_t").serializeObject(),
                "zdtype": 1, //getzdType("#p_diagnose")
                "docName": $("#p_docName").val(),
                "diagnosisDate": $("#p_diagnosisDate").val(),
                //"nextDate":$("#p_nextDate").val()
                "qct":{},
                "diagnoseGzbw":{},
            };
             
			var page2_tb4=getHistoryArr('#p_page2_tb4')
			var qtid =document.getElementById('Qtid')
			
			if(qtid !=null && qtid !=undefined){
							 if(qtid.checked){
								 if(qtid.value ==1){
									 if(page2_tb4[0].h3_z== ""){
									 					 top.layer.msg("请填写其他骨折部位描述信息",{ icon: 5, anim: 6 })
									 					 return false
									 }
								 }
								
								 
							 }
							
							 
			}
            
            var dd3= $("#p_d_d_3").serializeObject();
            var d_d2checkval=$("#p_d_d_3").serializeObject()
            console.log(d_d2checkval)
            debugger
           if(d_d2checkval.d_d3_check1==1){
			   console.log("关闭app首诊dax腰椎校验")
           //  if(dd3.d_d3_13=="" && dd3.d_d3_14=="" && dd3.d_d3_15=="" && dd3.d_d3_23=="" ){
           //      if( dd3.d_d3_16 == "" && dd3.d_d3_17=="" && dd3.d_d3_18=="" && dd3.d_d3_24==""){
           //          top.layer.msg("DXA检查部分里腰椎里的L1-L4和L2-L4至少需要填写其中一个",{ icon: 5, anim: 6 })
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
           // 		 }else if(dd3.d_d3_16 = "" && dd3.d_d3_17=="" && dd3.d_d3_18==""){
           // 			 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // 			 return false;
           // 		 }else if(dd3.d_d3_16 == "" || dd3.d_d3_17 !="" || dd3.d_d3_18 !=""){
           // 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // 					 return false;
           //              }else if(dd3.d_d3_16 == "" && dd3.d_d3_17 !="" && dd3.d_d3_18 !=""){
           // 					 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // 					 return false;
           //              }
           	
           //          return false;
           //          debugger
           //      }else if(dd3.d_d3_16 == "" && dd3.d_d3_17=="" && dd3.d_d3_18=="" && dd3.d_d3_24 !=""){
           // 			 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // 			 return false;
           //  }
           // 	 else if(dd3.d_d3_16 != "" && dd3.d_d3_17=="" && dd3.d_d3_18==""){
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
               
           // }else if(dd3.d_d3_16 == "" && dd3.d_d3_17=="" && dd3.d_d3_18=="" && dd3.d_d3_24 !=""){
           // 			 top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // 			 return false;}
           // // else if( dd3.d_d3_16 == "" || dd3.d_d3_17=="" || dd3.d_d3_18==""){
           // //     top.layer.msg("L2-L4的骨密度、T值、Z值为必填",{ icon: 5, anim: 6 })
           // //     return false;
           // // }
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
          var daxval= $('#p_d_d_check').val();
      
          if(qctData.qct1 !=1 ){
          	if(daxval !=1){
          		top.layer.msg("DXA骨密度检查与QCT检查必须填写其中一项",{ icon: 5, anim: 6 })
          		return false;
          	}
          	
          }

 

      
            var zdtype;
            if ($("#p_d_c").is(":checked") || $("#p_d_d").is(":checked")) {
                zdtype = 1;
            } else if ($("#p_d_e").is(":checked") || $("#p_d_f").is(":checked")) {
                zdtype = 2;
            } else if ($("#p_d_z_check").is(":checked")) {
                zdtype = 3;
            }
            url = 'diagnose/optFirstVisit';
            json = { "pid": userJson.pid, "dgId": DGID, "dgtype": 1, "apid": userJson.apid, "zdtype": zdtype, "zddate": $("#p_diagnosisDate").val(), "page4": JSON.stringify(data) };
            id = "page6";
            break;
        default:
            break;
    }
    //"apid":userJson.apid
	if(id=='page6'){
		//var form = new CybVerification.FirstVisitForm(el);
		//var state = form.submit(excludeClass);
		//if (state) {
		    //clearInterval(TIME); // 先清除掉原来的定时器
		    //TIME = setInterval(getMsgNum, 3000); // 开启定时器 名字  TIME
		    ajaxCommon(url, json, initHtml, '#myTab', id);
		    //$("html,body",window.parent.document).animate({scrollTop:'0px'}, 500);
		    $("#focus").focus();
		
		//}
	}else{
		var form = new CybVerification.FirstVisitForm(el);
		var state = form.submit(excludeClass);
		if (state) {
		    clearInterval(TIME); // 先清除掉原来的定时器
		    TIME = setInterval(getMsgNum, 3000); // 开启定时器 名字  TIME
		    ajaxCommon(url, json, initHtml, '#myTab', id);
		    $("html,body",window.parent.document).animate({scrollTop:'0px'}, 500);
		    $("#focus").focus();
		
		}
	}
    
}
// 暂存
function submitzc(type, el) {
    var data, url, callback, json, id;
    var DGID;
    if (userJson.dgId) {
        DGID = userJson.dgId;
    } else {
        DGID = dgId;
    }
    switch (type) {
        case "page1":
            // var h1=$("#h1_1").find("input[type='radio']:checked").val();
            // var h2=$("#h1_2").find("input[type='radio']:checked").val()
            // var h3=$("#h1_3").find("input[type='radio']:checked").val()
            // var h4=$("#h1_4").find("input[type='radio']:checked").val()
            // var h5=$("#h1_5").find("input[type='radio']:checked").val();
            // if($("#p_h1_check").val()==1){
            //   if(!h1 && !h2 && !h3 && !h4 && !h5){
            //     top.layer.msg("请填写欧洲五维健康量表EQ-5D-5L");
            //     return false;
            //   }
            // }
            if ($("#p_h1_check").val() == 1) {
                if (!$("#p_h1_a").val()) {
                    top.layer.msg("请填写本次健康量表");
                    return false;
                }
            }
            var fractureRate = $("#p_fractureRate").val()
            var osteoporticFracture = $("#p_osteoporticFracture").val()
            if (fractureRate >= 3 || osteoporticFracture >= 20) {

                $("#p_d_5").prop("checked", true);
                // $("#p_d_5").attr("disabled", "disabled");
            } else {
                $("#p_d_5").prop("checked", false);
            }
            if (Number(fractureRate) > Number(osteoporticFracture)) {
                top.layer.msg("未来10年髋部骨折概率不得大于未来10年主要骨质疏松性骨折概率，请核对！");
                return false;
            }
            data = {
                'height': $("#p_height").val(),
                'weight': $("#p_weight").val(),
                'BMI': $("#p_BMI").val(),
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
                }
            };
            url = 'diagnose/optFirst';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                'height': $("#p_height").val(),
                'weight': $("#p_weight").val(),
                'bmi': $("#p_BMI").val(),
                "isFrax": $("#p_isFrax").val(),
                "fractureRate": $("#p_fractureRate").val(),
                "osteoporticFracture": $("#p_osteoporticFracture").val(),
                "isMorse": $("#p_isMorse").val(),
                "healthScore": $("#p_healthScore").val(),
                "fallRiskAssessment": $("#morseResult").text(),
                "isDensity": $("#p_isDensity").val(),
                "page1": JSON.stringify(data)
            };
            id = "page2";
            break;
        case "page2":
            var check1 = $("#p_h1_d1_check").is(':checked')
            var check2 = $("#p_h1_d2_check").is(':checked')
            var check3 = $("#p_h1_d3_check").is(':checked')
            var check4 = $("#p_h1_d4_check").is(':checked')
            var check5 = $("#p_h1_d5_check").is(':checked')
            var check6 = $("#p_h1_d6_check").is(':checked')
            var check7 = $("#p_h1_d7_check").is(':checked')
            var check8 = $("#p_h1_d8_check").is(':checked')
            var check9 = $("#p_h1_d9_check").is(':checked')
            var check10 = $("#p_h1_d10_check").is(':checked')
                // console.log(check)
            if (check1 == true && check2 == true && check3 == true && check4 == true && check5 == true && check6 == true && check7 == true && check8 == true && check9 == true && check10 == true) {
                top.layer.msg("至少有一项疾病选择非“无”选项")
                return false;
            }
            data = {
                "history_1": {
                    "h1_h_check": $("#p_h1_h_check").val(),
                    "h1_disease1": $("#p_page2_h1_disease1").serializeObject(),
                    "h1_disease2": $("#p_page2_h1_disease2").serializeObject(),
                    "h1_disease3": $("#p_page2_h1_disease3").serializeObject(),
                    "h1_disease4": $("#p_page2_h1_disease4").serializeObject(),
                    "h1_disease5": $("#p_page2_h1_disease5").serializeObject(),
                    "h1_disease6": $("#p_page2_h1_disease6").serializeObject(),
                    "h1_disease7": $("#p_page2_h1_disease7").serializeObject(),
                    "h1_disease8": $("#p_page2_h1_disease8").serializeObject(),
                    "h1_disease9": $("#p_page2_h1_disease9").serializeObject(),
                    "h1_disease10": $("#p_page2_h1_disease10").serializeObject(),
                },
                "history_2": {
                    "pharmacy_block_1": $("#pharmacy_block_1").serializeObject(),
                    "pharmacy_block_2": {
                        "osteoporosis_select": $('#osteoporosis_select option:selected').val(),
                        "osteoporosis_arr": getHistoryArr('#addMedicine'),
                    },
                    "pharmacy_block_3": {
                        "renicapsule_select": $("#renicapsule_select option:selected").val(),
                        "renicapsule_arr": getHistoryArr('#addHormone'),
                    },
                    "pharmacy_block_4": $("#otherYW").serializeObject(),


                },
                // $("#p_history_2").serializeObject(),
                "history_4": {
                    "h4_check": $("#p_h4_check").is(':checked') ? 1 : 0,
                    "h4_a": $("#p_h4_a_form").serializeObject(),
                    "h4_b": $("#p_h4_b_form").serializeObject(),
                    "h4_c": $("#p_h4_c_form").serializeObject(),
                    "h4_d": $("#p_h4_d_form").serializeObject(),
                    "h4_z": $("#p_h4_z_form").serializeObject()
                },
                "history_5": {
                    "h5_check": $("#p_h5_check").val(),
                    "h5_a": $("#p_h5_a").val(),
                }
            }
            url = 'diagnose/optFirst';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                "page2": JSON.stringify(data)
            };
            id = "page3";
            break;
        case "page3":
            data = {
                "genetic_1": $("#p_genetic_1").serializeObject(),
                "genetic_0": $("#genetic_0").val(),
                "genetic_3": {
                    "g3_father": $("#p_g3_father").serializeObject(),
                    "g3_mother": $("#p_g3_mother").serializeObject(),
                    //  "g3_relative":getHistoryArr('#p_page3_tb4')
                    "g3_relative": {
                        "g3_other": $("#p_page3_g3_other").val(),
                        "g3_arr": getHistoryArr('#p_page3_tb4')
                    }
                }
            };
            var nData = { "genetic_2": $("#p_genetic_2").serializeObject() };
            var gender = sessionStorage.getItem("gender");
            var dataJson;
            if (gender == 1) {
                dataJson = data;
            } else {
                dataJson = $.extend(data, nData);
            }
            url = 'diagnose/optFirst';
            json = {
                "pid": userJson.pid,
                "dgId": DGID,
                "dgtype": 1,
                "apid": userJson.apid,
                "page3": JSON.stringify(dataJson)
            };
            id = "page4";
            break;
        case "page4":

            data = {
                "d_date": $("#p_d_date").val(),
                "d_diagnose": {
                    "d_d_a": {
                        "d_d_check": $("#p_d_d_check").val(),
                        "d_d_date": $("#p_d_d_date").val(),
                        "d_d_1": $("#p_d_d_1").val(),
                        "d_d_1_z": $("#p_d_d_1_z").val(),
                        "d_d_2": $("#p_d_d_2").serializeObject(),
                        "d_d_3": $("#p_d_d_3").serializeObject(),
                        "d_d_4": $("#p_d_d_4").serializeObject(),
                    },
                    "history_3": {
                        "h3_check": $("#p_h3_check").val(),
                        "num_check": $("#p_num_check").val(),
                        "h3_lastyear": $("#p_h3_lastyear").val(),
                        "h3_fracture": getHistoryArr('#p_page2_tb4'),
                    },

                },

                "diagnose": $("#p_diagnose").serializeObject(),
                "patient_t": $("#p_patient_t").serializeObject(),
                "zdtype": 1, //getzdType("#p_diagnose")
                "docName": $("#p_docName").val(),
                "diagnosisDate": $("#p_diagnosisDate").val(),
                //"nextDate":$("#p_nextDate").val()
                "qct":{},
                "diagnoseGzbw":{},  //新增的诊断 骨折部位
            };

            var qctData = owner.getFormData(".in-qct-form-data"); 
            // qctData.qct1 = $("input[type=radio][name=qct1]:checked").val();
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
            url = 'diagnose/optFirst';
            json = { "pid": userJson.pid, "dgId": DGID, "dgtype": 1, "apid": userJson.apid, "zdtype": zdtype, "zddate": $("#p_diagnosisDate").val(), "page4": JSON.stringify(data) };
            id = "page6";
            break;
        default:
            break;
    }
    //"apid":userJson.apid
    // var form = new CybVerification.FirstVisitForm(el);
    //var state = $(el).submit();
    //if (state) {
        //clearInterval(TIME);  // 先清除掉原来的定时器
        //TIME = setInterval(getMsgNum,3000);  // 开启定时器 名字  TIME
        ajaxCommon(url, json, initzcHtml, '#myTab', id);
        //$("html,body",window.parent.document).animate({scrollTop:'0px'}, 500);
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
// 月经初潮年龄范围
function checkg2a(th) {
    var newVal = $(th).val();
    if (!(newVal * 1 < ('61') * 1)) {
        top.layer.msg("月经初潮年龄必须小于当前年龄，请核实!");
        $(th).focus();
        $(th).select();
        return;
    }
    if ((document.getElementById("p_g2_b").value > 0) && (newVal * 1 > (document.getElementById("p_g2_b").value) * 1)) {
        top.layer.msg("\"月经初潮年龄\"不得大于绝经年龄，请核实!");
        $(th).focus();
        $(th).select();
    }
    if (newVal * 1 < 8 || newVal * 1 > 36) {
        top.layer.msg("月经初潮年龄超出填写范围（8-36），请核实!");
        $(th).focus();
        $(th).select();
    }
    if (newVal * 1 < 8 || newVal * 1 > 20) {
        top.layer.confirm("月经初潮年龄超出正常值范围（8-20），是否修改？", function(index) {
            $(th).select();
            top.layer.close(index);
        });

    }
    $(th).val(newVal);
}
// 绝经年龄校验
function checkg2b(th) {
    var newVal = $(th).val();

    if (newVal * 1 <= (document.getElementById("p_g2_a").value) * 1) {
        top.layer.msg("\“绝经年龄\”必须大于其\“月经初潮年龄\”，请核实!");
        $(th).focus();
        $(th).select();
        return;
    }
    if (newVal * 1 > ('61') * 1) {
        top.layer.msg("\“绝经年龄\”不得大于其\“当前年龄\”，请核实!");
        $(th).focus();
        $(th).select();
        return;
    }
    if (newVal * 1 < 25 || newVal * 1 > 65) {
        top.layer.msg("绝经年龄超出填写范围（25-65），请核实!");
        $(th).focus();
        $(th).select();
        return;
    }
    if (newVal * 1 < 40 || newVal * 1 > 60) {
        top.layer.confirm("绝经年龄超出正常值范围（40-60），是否修改？", function(index) {
            $(th).focus();
            $(th).select();
            top.layer.close(index);
        })

        return;
    }
    $(th).val(newVal);
}


// 计算 BMI
function countBmi(th) {
    var height = $.trim($("#p_height").val());
    var weight = $.trim($("#p_weight").val());
    if (height && weight) {
        var bmiResult = (weight / ((height / 100) * (height / 100))).toFixed(2);
        $("#p_BMI").val(bmiResult);
    } else {
        //layer.msg("请认真填写身高以及体重！！！");
    }
}

function initHtml(el, data, id) {
    if (id == "page6") {
        //parent.location.reload();
        var json = { "pid": userJson.pid, "apid": userJson.apid, "dgId": data.dgId, "title": userJson.title, "type": "info" };
        window.open(src + "/p_diagnosisInfo.html?pid=" + JSON.stringify(json), "_self");
    } else {
        dgId = data.dgId; // 新增回调得到新增后的dgid回传给后台 页面缓存保存。
        $(el).find('a[href="#' + id + '"]').tab('show');
    }
}
// 暂存
function initzcHtml(el, data, id) {
    if (id == "page6") {
        //parent.location.reload();
        var json = { "pid": userJson.pid, "apid": userJson.apid, "dgId": data.dgId, "title": userJson.title, "type": "info" };
        window.open(src + "/p_diagnosisForm.html?pid=" + JSON.stringify(json), "_self");
    } else {
        dgId = data.dgId; // 新增回调得到新增后的dgid回传给后台 页面缓存保存。
        $(el).find('a[href="#' + id + '"]').tab('show');
    }
}
// 数据回显
function initForm(el, data) {
    // console.log(data, "这是数据吗")
    var abc = data.storage
        // console.log(data, "胃痛i哦i")
    var arr1 = abc.split("")
    $.each(arr1, function(si, ki) {
        console.log(arr1, "啊送发票佛【【啊【佛奥")
        if (arr1[0] == 1) {
            $("#home .zcBtn").hide()
        } else {
            // $("#home .zcBtn,#page2 .zcBtn,#page3 .zcBtn,#page4 .zcBtn").show()
            $("#home .zcBtn").show()
        }
        if (arr1[1] == 1) {
            $("#page2 .zcBtn").hide()
        } else {
            $("#page2 .zcBtn").show()
        }
        if (arr1[2] == 1) {
            $("#page3 .zcBtn").hide()
        } else {
            $("#page3 .zcBtn").show()
        }
        if (arr1[3] == 1) {
            $("#page4 .zcBtn").hide()
        } else {
            $("#page4 .zcBtn").show()
        }
        console.log(ki, "啊送发票佛【【啊【佛奥")
    })
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
			   if(name=="page3" ){
				 var gender = sessionStorage.getItem("gender");
				  if(gender == '2'){
					var g3e=cData.genetic_2.g3_e
					if(g3e!=undefined){
					var hcval=cData.genetic_2.g3_e
					 addhcNum(parseInt(hcval))
					 console.log(parseInt(hcval))
											 
					 }
				  }
				
			
		      	}
				
                $.each(cData, function(name1, value1) {
                    $("input[type='radio'][name='" + name1 + "'][value='" + value1 + "']").prop("checked", true);
                    $("input[type='checkbox'][name='" + name1 + "'][value='" + value1 + "']").prop("checked", true);
                    $("input[type='hidden'][name='" + name1 + "']").val(value1);
                    $("input[name='" + name1 + "']").val(value1);
                    $("select[name='" + name1 + "'] option[value='" + value1 + "']").prop("selected", "selected");
                    //console.log("1:"+name1+":"+value1);
                    if (cData.isFrax == 1) {
                        $("#fraxShow").show()
                        $("#fraxShow input").attr("check", "required checkz1")
                    }
                    $("#morseResult").text(cData.fallRiskAssessment);
                    $("select[name='genetic_0'] option[value='" + cData.genetic_0 + "']").prop("selected", "selected");
                    if (isObject(value1)) {
                        if (value1.d_2 == 1 || value1.d_1 == 1) {
                            $("#p_d_4").attr("disabled", "disabled")
                        }
                        if (value1.d_4 == 1) {
                            $("#p_d_1,#p_d_2").attr("disabled", "disabled")
                        }
                        $.each(value1, function(name2, value2) {
                            //王英海新增的代码20220325 用户checkbox回显 开始
                            $("input[type='checkbox'][name='" + name2 + "'][value='" + value2 + "']").prop("checked", true);
                            //王英海新增的代码20220325 用户checkbox回显 结束
                            // 用药史修改回显
                            if (value2.other_yw_1 == 1) {
                                $("#other_yw_1").parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
                                $("#other_yw_1").parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
                                $("#other_yw_8_input").removeAttr("check", "required")
                                $("#other_yw_8_input").val('')
                            }
                            if (value2.sup_0 == 1) {
                                $("#sup_0").parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
                                $("#sup_0").parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
                                $("#selectShowa1b").hide()
                                $("#selectShowa1c").hide()
                                $("#selectShowa1e").hide()
                                $("#sup_3_input").removeAttr("check", "required")
                                $("#sup_3_input").val('')
                            }
                            if (value2.sup_1 == 1) {
                                $("#selectShowa1b").show()
                            }
                            if (value2.sup_2 == 1) {
                                $("#selectShowa1c").show()
                            }
                            if (value2.sup_3 == 1) {
                                $("#selectShowa1e").show()
                            }
                            if (value2.osteoporosis_select == 1) {
                                $("#addMedicine").show();
                                $("#addMedicine").find("input[type=number]").attr("check", "required")
                                $("#addMedicine").find("select").attr("check", "required")
                                $("#addMedicine").find("input[name=ost_3]").attr("check", "required check0")
                                    // $("#osteoporosis_select").attr("disabled", "disabled")
                                    // $("#addMedicine").show()
                            }
                            if (value2.renicapsule_select == 1) {
                                $("#addHormone").show();
                                $("#addHormone").find("input[type=number]").attr("check", "required")
                                $("#addHormone").find("select").attr("check", "required")
                                $("#addHormone").find("input[name=ren_5]").attr("check", "required check0")
                                $("#addHormone").find("input[name=ren_3]").attr("check", "required check1")
                                $("#addHormone").find("input[name=ren_4]").attr("check", "required check1")
                                    // $("#renicapsule_select").attr("disabled", "disabled")

                            }
                            if (value2.other_yw_z_check == 1) {
                                $("#other_yw_8_input").show()

                            }
                            if (value2.h3_pattern == 2) {

                            }
                            if (value2.g3_m_no == 1) {
                                $("#p_g3_m_no").parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
                                $("#p_g3_m_no").parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
                                $("#p_g3_m_z").removeAttr("check", "required")
                                $("#p_g3_m_z").val('')
                            }
                            if (value2.g3_f_no == 1) {
                                $("#p_g3_f_no").parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
                                $("#p_g3_f_no").parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
                                $("#p_g3_f_z").removeAttr("check", "required")
                                $("#p_g3_f_z").val('')
                            }
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
                            $("input[type='text'][name='" + name2 + "']").val(value2);
                            $("input[type='hidden'][name='" + name2 + "']").val(value2);
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
                                        } else if (name3 == 'h2_d1_list1') {
                                            initHistoryFormList("h2_d1_list1", value3);
                                        } else if (name3 == 'h2_d2_list') {
                                            initHistoryFormList("h2_d2_list", value3);
                                        } else if (name3 == "g3_relative") {
                                            initHistoryFormList("g3_relative", value3);
                                        } else if (name3 == "renicapsule_arr") {
                                            initHistoryFormList("renicapsule_arr", value3);
                                        } else if (name3 == "osteoporosis_arr") {
                                            initHistoryFormList("osteoporosis_arr", value3);
                                        }
                                    }
                                })
                                if (name2 == "g3_relative") {
                                    initHistoryFormList("g3_relative", value2);
                                }
                            } else if (isArray(value2)) {
                                if (name2 == 'h3_fracture') {
                                    initHistoryFormList("h3_fracture", value2);
                                } else if (name2 == 'h2_d1_list1') {
                                    initHistoryFormList("h2_d1_list1", value2);
                                } else if (name2 == 'h2_d2_list') {
                                    initHistoryFormList("h2_d2_list", value2);
                                } else if (name2 == "g3_relative") {
                                    initHistoryFormList("g3_relative", value2);
                                } else if (name2 == "renicapsule_arr") {
                                    initHistoryFormList("renicapsule_arr", value2);
                                } else if (name2 == "osteoporosis_arr") {
                                    initHistoryFormList("osteoporosis_arr", value2);
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
    initYesChange(".p_check_yes");
    initNotOrYes(".p_checkbox");
    initradioNotOrYes(".p_radiobox");
    initPregnantNum("#p_g2_c");
    initAllergy("#p_h5_check");
	g3ch($("#p_g3_c").val())
	console.log($("#p_g3_c").val()+"--------hty1111111111111111")
    initNullSelectChange(".p_select_null");
    initOthersSelChange(".p_others_sel");
    otherSelectChange(".p_other_select");
    g3Type("#p_page3_g3_other")
    var g1 = $("#p_g1_s_b").val();
    var g2 = $("#p_g1_a_quit").val();
    if (g1 > 1) {
        $(".p_g1_s_b_2").prop('checked', 'checked');
    } else {
        $(".p_g1_s_b_2").removeProp('checked');
    }
    if (g2 > 1) {
        $(".p_g1_a_quit_2").prop('checked', 'checked');
    } else {
        $(".p_g1_a_quit_2").removeProp('checked');
    }
    checkSelect(".p_check_select");
    selectDirection(".p_select_direction");
    $("input.p_radio_checkbox").each(function() {
        if ($(this).prop('checked')) {
            $('input.p_radio_checkbox').prop('checked', false);
            $(this).prop('checked', true);
            if ($(this).prop('name') == "d_e" || $(this).prop('name') == "d_f") {
                $("#p_d_e_f_note").removeProp("readonly");
                $("#p_d_e_f_note").attr("check", "required");
                $("#p_d_e_f_note").parent().show();
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
            $(this).parent().parent().next().hide();
            // $(this).parent().parent().next().find("input[type='checkbox']").prop("checked",false);
            // $(this).parent().parent().next().find("input[type='text']").val("");
            $(this).parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().next().find("input[type='text']").val("");
            $(this).parent().parent().next().find("input[type='number']").val("");
            $(this).parent().parent().next().find("input[type='text']").prop("readonly", "readonly");
            $(this).parent().parent().next().find("input[type='number']").prop("readonly", "readonly");
            $(this).parent().parent().next().find("select option[value='']").prop("selected", "selected");
            $(this).parent().parent().next().find("select").prop("disabled", "disabled");
            $(this).parent().parent().next().find("input[type='text'],input[type='number'],select,textarea").removeAttr("check");
            //$(this).parent().parent().next().hide();
        } else {
            $(this).parent().parent().next().show();

        }
    });

    $.each($(".p_others"), function() {
        if ($(this).next().val() != 0) {
            $(this).prop("checked", "checked");
            $(this).next().removeProp("readonly");
            $(this).next().show();
        } else {
            $(this).removeProp("checked");
            $(this).next().prop("readonly", "readonly");
            $(this).next().hide();
        }
    })


}
// el 为像某个固定的元素内部添加节点  type 为药品名称类型区分 1 为抗骨质疏松类药物；2为肾上腺糖皮质激素
var addI = 0,
    addK = 0,
    addG = 0;

function addSpoMedicine(el, type) {
    var str = "";
    if (type == 3) {
        addG++;
        if ($(".p_fracture_list").length < 10) {
           str = '<tr class="p_fracture_list">' +
		    '<td class="text-center"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>' +
		    '<td class="">' +
		    '<form>' +
		    '<label><span class="red">*</span>骨折日期：</label>' +
		    '<input type="number" name="h3_age" class="form-control input-inline p_h3_age" check="required"/>' +
		    '<div class="check" tip-msg="请选择骨折原因" data-class="p_e1_3_check_00" check="radio"><div class="p_e1_3_check_00"><label>骨折原因：</label>' +
		    '<input type="radio" name="h3_reason" value="1">脆性' +
		    '<input type="radio" name="h3_reason" value="2">暴力</div></div>' +
		    '<p style="font-size: 14px;">骨折部位：</p>' +
		
		    '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="请至少勾选一处骨折位置" data-class="p_h3_000_' + addG + '">' +
		    ' <tbody class="p_h3_000_' + addG + '">' +
		    ' <tr>' +
		    '<td style="width:100px;">椎体</td>' +
		    '<td>' +
			'<input type="checkbox" onclick="Ztcheck(this,'+addG+')" name="h3_a_6_check" id="h3_a_6_check'+addG+'" value="1" />椎体'+
		    '<div style="display: none;" class="Ztclass">' +
		    '<div ><input class="p_check_unknown" type="checkbox" name="h3_a_1" id="p_h3_a_1" value="1"  onchange="unknownChange(this)">不详</div>' +
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
		    '<input type="checkbox" name="h3_a_2_check" id="h3_a_2_check" value="1">胸椎' +
			 '<div style="display: none;">'+
		    '（' +
		    '<input type="checkbox"  name="h3_a_9"  id="p_h3_a_9"  value="1">T1' +
		    '<input type="checkbox"  name="h3_a_10" id="p_h3_a_10" value="1">T2' +
		    '<input type="checkbox"  name="h3_a_11" id="p_h3_a_11" value="1">T3' +
		    '<input type="checkbox"  name="h3_a_12" id="p_h3_a_12" value="1">T4' +
		    '<input type="checkbox"  name="h3_a_13" id="p_h3_a_13" value="1">T5' +
		    '<input type="checkbox"  name="h3_a_14" id="p_h3_a_14" value="1">T6' +
		    '<input type="checkbox"  name="h3_a_15" id="p_h3_a_15" value="1">T7' +
		    '<input type="checkbox"  name="h3_a_16" id="p_h3_a_16" value="1">T8' +
		    '<input type="checkbox"  name="h3_a_17" id="p_h3_a_17" value="1">T9' +
		    '<input type="checkbox"  name="h3_a_18" id="p_h3_a_18" value="1">T10' +
		    '<input type="checkbox"  name="h3_a_19" id="p_h3_a_19" value="1">T11' +
		    '<input type="checkbox"  name="h3_a_20" id="p_h3_a_20" value="1">T12' +
		    '）'+
		     '</div></div>' +
		    '<div id="h3_a_2_check_child">胸椎子类</div>' +
		    '<div class="p_h3_checkbox">' +
		    '<input type="checkbox" name="h3_a_3_check" id="h3_a_3_check" value="1">腰椎' +
			'<div style="display: none;">'+
		    '（' +
		    '<input type="checkbox"  name="h3_a_21" id="p_h3_a_21" value="1">L1' +
		    '<input type="checkbox"  name="h3_a_22" id="p_h3_a_22" value="1">L2' +
		    '<input type="checkbox"  name="h3_a_23" id="p_h3_a_23" value="1">L3' +
		    '<input type="checkbox"  name="h3_a_24" id="p_h3_a_24" value="1">L4' +
		    '<input type="checkbox"  name="h3_a_25" id="p_h3_a_25" value="1">L5' +
		    '）' +
		    '</div></div>' +
		    '<div>腰椎子类</div>' +
		    '<div>' +
		    '<input type="checkbox" name="h3_a_26" id="p_h3_a_26" value="1" >骶椎' +
		    '</div>' +
		    '</div></br>' +
			'<input type="checkbox"  name="h3_b_1_check" id="h3_b_1_check" ">肋骨'+
			'<div style="display: none;" class="Lzclass1">' +
			'<div><input class="p_check_unknown" type="checkbox" id="p_h3_b_1" name="h3_b_1" value="1"  onchange="unknownChange(this)">不详</div>' +
			'<div class="p_h3_checkbox">' +
			'<input type="checkbox" name="h3_b_1_check0" id="h3_b_1_check0" value="1">左侧' +
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
			'<input type="checkbox" name="h3_c_7_check" id="h3_c_7_check" value="1" onclick="Szcheck(this,'+addG+')">上肢'+
			'<div style="display: none;" class="Szclass">' +
			'<div><input class="p_check_unknown" type="checkbox" name="h3_c_1" id="p_h3_c_1" value="1"  onchange="unknownChange(this)">不详</div>' +
			'<div class="p_h3_checkbox">' +
			'<input type="checkbox" name="h3_c_1_check" id="h3_c_1_check" value="1">左侧' +
			'<div style="display: none;">'+
			 '（ ' +
			 '<input type="checkbox"  name="h3_c_2" id="p_h3_c_2" value="1">指骨' +
			 '<input type="checkbox"  name="h3_c_3" id="p_h3_c_3" value="1">掌骨' +
			 '<input type="checkbox"  name="h3_c_4" id="p_h3_c_4" value="1">舟骨' +
			 '<input type="checkbox"  name="h3_c_5" id="p_h3_c_5" value="1">尺骨' +
			 '<input type="checkbox"  name="h3_c_6" id="p_h3_c_6" value="1">桡骨' +
			 '<input type="checkbox"  name="h3_c_7" id="p_h3_c_7" value="1">肱骨' +
			 '<input type="checkbox"  name="h3_c_8" id="p_h3_c_8" value="1">锁骨' +
			 '）' +
			'</div></div>' +
			'<div class="p_h3_checkbox">' +
			'<input type="checkbox" name="h3_c_2_check" id="h3_c_2_check" value="1">右侧' +
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
			'</div></br>' +
			'<input type="checkbox"  name="h3_d_1" id="p_h3_d_1">骨盆及髋部'
			'<div  style=" display: none;" class="Gpclass1">' +
			'<div><input class="p_check_unknown" type="checkbox" name="h3_d_1" id="p_h3_d_1" value="1"  onchange="unknownChange(this)">不详</div>' +
			'<div>' +
			'<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
			'<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
			'<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
			'<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
			'</div>' +
			'</div></br>' +
			'<input type="checkbox" name="h3_e_6_check" id="h3_e_6_check" value="1" onclick="Xzcheck(this,'+addG+')">下肢'+
			'<div style="display: none;" class="Xzclass">' +
			'<div><input class="p_check_unknown" type="checkbox" name="h3_e_1" id="p_h3_e_1" value="1"  onchange="unknownChange(this)">不详</div>' +
			'<div class="p_h3_checkbox">' +
			'<input type="checkbox" name="h3_e_1_check" id="h3_e_1_check" value="1">左侧' +
			'<div style="display: none;">'+
			 '（   ' +
			 '<input type="checkbox"  name="h3_e_2" id="p_h3_e_2" value="1">足趾' +
			 '<input type="checkbox"  name="h3_e_3" id="p_h3_e_3" value="1">髌骨' +
			 '<input type="checkbox"  name="h3_e_4" id="p_h3_e_4" value="1">胫骨' +
			 '<input type="checkbox"  name="h3_e_5" id="p_h3_e_5" value="1">腓骨' +
			 '<input type="checkbox"  name="h3_e_6" id="p_h3_e_6" value="1">踝部' +
			 '<input type="checkbox"  name="h3_e_7" id="p_h3_e_7" value="1">股骨' +
			 '）' +
			'</div></div>' +
			
			'<div class="p_h3_checkbox">' +
			'<input type="checkbox" name="h3_e_2_check" id="h3_e_2_check" value="1">右侧' +
			//'<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
			'<div style="display: none;">'
			 '（' +
			 '<input type="checkbox"  name="h3_e_8" id="p_h3_e_8" value="1">足趾' +
			 '<input type="checkbox"  name="h3_e_9" id="p_h3_e_9" value="1">髌骨' +
			 '<input type="checkbox"  name="h3_e_10" id="p_h3_e_10" value="1">胫骨' +
			 '<input type="checkbox"  name="h3_e_11" id="p_h3_e_11" value="1">腓骨' +
			 '<input type="checkbox"  name="h3_e_12" id="p_h3_e_12" value="1">踝部' +
			 '<input type="checkbox"  name="h3_e_13" id="p_h3_e_13" value="1">股骨' +
			 '）' +
			'</div></div>' +
			'<div  class="p_h3_checkbox">'+
				 '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
			'</div>'+
			 '<div>'+
			//     '<input type="checkbox" class="p_others">其他'+
			//     '<input type="text" name="h3_z"  class="form-control" readonly="readonly" id="p_h3_z" value="">'+
			// '</div>'+
			'</div>' +
			
			
			//<!-- 上版本删除内容 -->
		    
		    //'<tr><td>其他</td><td><input type="text" name="h3_z"  class="form-control" readonly="readonly" id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
		    '<tr><td><div><input type="checkbox" name="h3_z_1" onclick="Qtcheck1(this)" id="Qtid" value="1" />其他</div></td></tr>' +
		    
		    '<tr><td><input type="text" name="h3_z"  class="form-control1"  id="p_h3_z" value="" placeholder="请描述"  style="display: none;"></td></tr>' +
			
			'</tbody>' +
		    '</table>' +
		    '</form>' +
		    '</td>' +
		    '</tr>'
        } else {
            layer.msg("最多创建10条历史 请认真填写。");
            return false;
        }

    } else if (type == 4) {
        var selVal = $("#p_page3_relatives_sel").find("option:selected").val();
        if (selVal != "") {
            if (selVal == 0) {
                parent.parent.layer.prompt({ title: '请输入其他直系亲属', formType: 3 }, function(text, index) {
                    if (text != "") {
                        str = '<tr class="qsgx">' +
                            // '<td class="text-center"></td>' +
                            '<td colspan="5"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button><form class="">' +
                            '<div class="pull-right"><span class="red">*</span><label>' + Trim(text) + '：</label><input type="hidden" value="' + Trim(text) + '"name="g3_r_a">' +
                            '<label>是否发生过脆性骨折：</label>' +
                            '<select class="form-control" name="g3_r_b" id="p_g3_r_b" check="required">' +
                            '<option value="">请选择</option>' +
                            '<option value="1">是</option>' +
                            '<option value="-1">否</option>' +
                            '<option value="0">不确定</option>' +
                            '</select>' +
                            //  '<label><input type="radio" name="g3_r_b" value="1"/>是</label>'+
                            //  '<label><input type="radio" name="g3_r_b" value="-1"/>否</label>'+
                            //  '<label><input type="radio" name="g3_r_b" value="0"/>不确定</label>'+
                            '</div></td></form>' +
                            '</tr>';
                        $(el).append(str);
                        parent.parent.layer.close(index);
                    } else {
                        parent.parent.layer.msg("不能为空！！！");
                    }

                });
            } else {
                var selTitle = $("#p_page3_relatives_sel").find("option:checked").text();
                str = '<tr class="qsgx">' +
                    // '<td class="text-center"></td>' +
                    '<td colspan="5"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button><form>' +
                    '<div class="pull-right"><span class="red">*</span><label>' + Trim(selTitle) + '：</label><input type="hidden" value="' + Trim(selTitle) + '"name="g3_r_a">' +
                    '<label>是否发生过脆性骨折：</label>' +
                    '<select class="form-control" name="g3_r_b" id="p_g3_r_b" check="required">' +
                    '<option value="">请选择</option>' +
                    '<option value="1">是</option>' +
                    '<option value="-1">否</option>' +
                    '<option value="0">不确定</option>' +
                    '</select>' +
                    //  '<label><input type="radio" name="g3_r_b" value="1"/>是</label>'+
                    //  '<label><input type="radio" name="g3_r_b" value="-1"/>否</label>'+
                    //  '<label><input type="radio" name="g3_r_b" value="0"/>不确定</label>'+
                    '</div></td></form>' +
                    '</tr>';
                //$(el).append(str);
            }

        } else {
            top.layer.msg("请选择直系亲属");
        }
    }
    $(el).append(str);
    allSelChange(".p_h3_checkbox");
    sortTrNumber();
}
// 删除用药记录
function delSpoMedicine(th) {
    parent.parent.layer.confirm('确定要删除记录吗？？', { icon: 3, title: '提示' }, function(index) {
        $(th).parent().parent().remove();
        parent.parent.layer.close(index);
    });
}

// 删除骨折历史
function delFracture(th) {
    parent.parent.layer.confirm('确定要删除记录吗？？', { icon: 3, title: '提示' }, function(index) {
        $(th).parent().parent().remove();
        parent.parent.layer.close(index);
        sortTrNumber();
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
            if (index == "addI") {
                addSpoMedicine('#p_page2_tb2', '1');
            } else {
                addSpoMedicine('#p_page2_tb3', '2');
            }

        }
    });
}
// 初始化 是  否  不确定  拒绝回答(药物类)
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
        if ($(this).val() == 1) {

            $(this).parent().parent().parent().parent().next().show();
            $("div.radioSelInput").hide();
            $(this).parent().parent().parent().parent().next().find("input[type='checkbox']").removeAttr("disabled", "true");
            // $(this).parent().parent().parent().parent().next().find("input[name='g3_m_z_check']").hide();
            $(this).parent().parent().parent().parent().next().find("input[name='g3_m_z']").val("").hide();
            // $(this).parent().parent().parent().parent().next().find("input[name='g3_f_z_check']").hide();
            $(this).parent().parent().parent().parent().next().find("input[name='g3_f_z']").val("").hide();
            $(this).parent().parent().parent().parent().next().find('div[check]').attr('class', 'check');
            $(this).parent().parent().parent().parent().next().find("input[type='number']").attr("check", "required");
            //$(this).parent().parent().parent().parent().next().find("input.p_drink_input").val("0");
            $(this).parent().parent().parent().parent().next().find("input#p_g1_a_total").attr("check", "required drinkTotal");
            $("#p_g1_a_total").val("0");

        } else {
            $(this).parent().parent().parent().parent().next().hide();
            $(this).parent().parent().parent().parent().next().find("input[type='radio']").prop("checked", false);
            $(this).parent().parent().parent().parent().next().find("input[type='checkbox']").prop("checked", false);
            $(this).parent().parent().parent().parent().next().find("input[type='number']").prop("value", "");
            $(this).parent().parent().parent().parent().next().find('div[check]').removeAttr('class');
            $(this).parent().parent().parent().parent().next().find("input[type='number']").removeAttr("check");
            $(this).parent().parent().parent().parent().next().find("input#p_g1_a_total").removeAttr("check");
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
                $(this).parent().parent().parent().parent().next().find("input[type='number']").prop("value", "");
                $(this).parent().parent().parent().parent().next().find('div[check]').removeAttr('class');
                $(this).parent().parent().parent().parent().next().find("input[type='number']").removeAttr("check");
                $(this).parent().parent().parent().parent().next().find("input#p_g1_a_total").removeAttr("check");

                $("#p_g1_s_a").val();
                $("#p_g1_a_quit").val();
                $(".radioSelInput").find("input[type=number]").removeAttr('check');

            } else {

                $(this).parent().parent().parent().parent().next().show();
                $(this).parent().parent().parent().parent().next().find('div[check]').attr('class', 'check');
                $(this).parent().parent().parent().parent().next().find("input[type='number']").attr("check", "required");
                //$(this).parent().parent().parent().parent().next().find("input.p_drink_input").val("0");
                $(this).parent().parent().parent().parent().next().find("input#p_g1_a_total").attr("check", "required drinkTotal")

            }
        }
    });
    initRadioSel('.radioSel');
}
// 是否戒烟 || 是否戒酒
function radioSel(el) {
    $(el).find('input[type="radio"]').change(function() {
        if ($(this).val() == 1) {
            $(this).parent().parent().find("div.radioSelInput").show();
            $(this).parent().parent().find("div.radioSelInput").find("input[type=number]").attr('check', 'required age');
        } else {
            $(this).parent().parent().find("div.radioSelInput").hide();
            $(this).parent().parent().find("div.radioSelInput").find("input[type=number]").removeAttr('check');

        }
    })
}
// 初始化是否戒烟 || 是否戒酒
function initRadioSel(el) {
    $.each($(el).find('input[type="radio"]'), function() {
        if ($(this).is(':checked')) {
            if ($(this).val() == 1) {
                $(this).parent().parent().find("div.radioSelInput").show();
                $(this).parent().parent().find("div.radioSelInput").find("input[type=number]").attr('check', 'required age');
            } else {
                $(this).parent().parent().find("div.radioSelInput").hide();
                $(this).parent().parent().find("div.radioSelInput").find("input[type=number]").removeAttr('check');

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
        jsonArr.push($(this).serializeObject())
    });
    return jsonArr;
    /*  "h3_age":$(this).find('input[name=h3_age]').val(),
        "h3_reason":$(this).find("input[name=h3_reason]:checked").val(),
        "h3_a_1":$(this).find("input[name=h3_a_1]:checked").val() ? 1 : 0,
        "h3_a_1_check":$(this).find("input[name=h3_a_1_check]:checked").val() ? 1 : 0,
        "h3_a_2":$(this).find("input[name=h3_a_2]:checked").val() ? 1 : 0,
        "h3_a_3":$(this).find("input[name=h3_a_3]:checked").val() ? 1 : 0,
        "h3_a_4":$(this).find("input[name=h3_a_4]:checked").val() ? 1 : 0,
        "h3_a_5":$(this).find("input[name=h3_a_5]:checked").val() ? 1 : 0,
        "h3_a_6":$(this).find("input[name=h3_a_6]:checked").val() ? 1 : 0,
        "h3_a_7":$(this).find("input[name=h3_a_7]:checked").val() ? 1 : 0,
        "h3_a_8":$(this).find("input[name=h3_a_8]:checked").val() ? 1 : 0,
        "h3_a_2_check":$(this).find("input[name=h3_a_2_check]:checked").val() ? 1 : 0,
        "h3_a_2_1":$(this).find(".p_h3_a_2_1").serializeObject(),
        "h3_a_3_check":$(this).find("input[name=h3_a_3_check]:checked").val() ? 1 : 0,
        "h3_a_3_1":$(this).find(".p_h3_a_3_1").serializeObject(),
        "h3_a_26":$(this).find("input[name=h3_a_26]:checked").val() ? 1 : 0,
        "h3_b_1":$(this).find("input[name=h3_b_1]:checked").val() ? 1 : 0,
        "h3_b_1_check":$(this).find("input[name=h3_b_1_check]:checked").val() ? 1 : 0,
        "h3_b_2":$(this).find("input[name=h3_b_2]:checked").val() ? 1 : 0,
        "h3_b_3":$(this).find("input[name=h3_b_3]:checked").val() ? 1 : 0,
        "h3_b_4":$(this).find("input[name=h3_b_4]:checked").val() ? 1 : 0,
        "h3_b_5":$(this).find("input[name=h3_b_5]:checked").val() ? 1 : 0,
        "h3_b_6":$(this).find("input[name=h3_b_6]:checked").val() ? 1 : 0,
        "h3_b_7":$(this).find("input[name=h3_b_7]:checked").val() ? 1 : 0,
        "h3_b_8":$(this).find("input[name=h3_b_8]:checked").val() ? 1 : 0,
        "h3_b_9":$(this).find("input[name=h3_b_9]:checked").val() ? 1 : 0,
        "h3_b_10":$(this).find("input[name=h3_b_10]:checked").val() ? 1 : 0,
        "h3_b_11":$(this).find("input[name=h3_b_11]:checked").val() ? 1 : 0,
        "h3_b_12":$(this).find("input[name=h3_b_12]:checked").val() ? 1 : 0,
        "h3_b_13":$(this).find("input[name=h3_b_13]:checked").val() ? 1 : 0,
        "h3_b_2_check":$(this).find("input[name=h3_b_2_check]:checked").val() ? 1 : 0,
        "h3_b_14":$(this).find("input[name=h3_b_14]:checked").val() ? 1 : 0,
        "h3_b_15":$(this).find("input[name=h3_b_15]:checked").val() ? 1 : 0,
        "h3_b_16":$(this).find("input[name=h3_b_16]:checked").val() ? 1 : 0,
        "h3_b_17":$(this).find("input[name=h3_b_17]:checked").val() ? 1 : 0,
        "h3_b_18":$(this).find("input[name=h3_b_18]:checked").val() ? 1 : 0,
        "h3_b_19":$(this).find("input[name=h3_b_19]:checked").val() ? 1 : 0,
        "h3_b_20":$(this).find("input[name=h3_b_20]:checked").val() ? 1 : 0,
        "h3_b_21":$(this).find("input[name=h3_b_21]:checked").val() ? 1 : 0,
        "h3_b_22":$(this).find("input[name=h3_b_22]:checked").val() ? 1 : 0,
        "h3_b_23":$(this).find("input[name=h3_b_23]:checked").val() ? 1 : 0,
        "h3_b_24":$(this).find("input[name=h3_b_24]:checked").val() ? 1 : 0,
        "h3_b_25":$(this).find("input[name=h3_b_25]:checked").val() ? 1 : 0,
        "h3_c_1":$(this).find("input[name=h3_c_1]:checked").val() ? 1 : 0,
        "h3_c_1_check":$(this).find("input[name=h3_c_1_check]:checked").val() ? 1 : 0,
        "h3_c_2":$(this).find("input[name=h3_c_2]:checked").val() ? 1 : 0,
        "h3_c_3":$(this).find("input[name=h3_c_3]:checked").val() ? 1 : 0,
        "h3_c_4":$(this).find("input[name=h3_c_4]:checked").val() ? 1 : 0,
        "h3_c_5":$(this).find("input[name=h3_c_5]:checked").val() ? 1 : 0,
        "h3_c_6":$(this).find("input[name=h3_c_6]:checked").val() ? 1 : 0,
        "h3_c_7":$(this).find("input[name=h3_c_7]:checked").val() ? 1 : 0,
        "h3_c_8":$(this).find("input[name=h3_c_8]:checked").val() ? 1 : 0,
        "h3_c_2_check":$(this).find("input[name=h3_c_2_check]:checked").val() ? 1 : 0,
        "h3_c_9":$(this).find("input[name=h3_c_9]:checked").val() ? 1 : 0,
        "h3_c_10":$(this).find("input[name=h3_c_10]:checked").val() ? 1 : 0,
        "h3_c_11":$(this).find("input[name=h3_c_11]:checked").val() ? 1 : 0,
        "h3_c_12":$(this).find("input[name=h3_c_12]:checked").val() ? 1 : 0,
        "h3_c_13":$(this).find("input[name=h3_c_13]:checked").val() ? 1 : 0,
        "h3_c_14":$(this).find("input[name=h3_c_14]:checked").val() ? 1 : 0,
        "h3_c_15":$(this).find("input[name=h3_c_15]:checked").val() ? 1 : 0,
        "h3_d_1":$(this).find("input[name=h3_d_1]:checked").val() ? 1 : 0,
        "h3_d_2":$(this).find("input[name=h3_d_2]:checked").val() ? 1 : 0,
        "h3_d_3":$(this).find("input[name=h3_d_3]:checked").val() ? 1 : 0,
        "h3_d_4":$(this).find("input[name=h3_d_4]:checked").val() ? 1 : 0,
        "h3_d_5":$(this).find("input[name=h3_d_5]:checked").val() ? 1 : 0,
        "h3_e_1":$(this).find("input[name=h3_e_1]:checked").val() ? 1 : 0,
        "h3_e_1_check":$(this).find("input[name=h3_e_1_check]:checked").val() ? 1 : 0,
        "h3_e_2":$(this).find("input[name=h3_e_2]:checked").val() ? 1 : 0,
        "h3_e_3":$(this).find("input[name=h3_e_3]:checked").val() ? 1 : 0,
        "h3_e_4":$(this).find("input[name=h3_e_4]:checked").val() ? 1 : 0,
        "h3_e_5":$(this).find("input[name=h3_e_5]:checked").val() ? 1 : 0,
        "h3_e_6":$(this).find("input[name=h3_e_6]:checked").val() ? 1 : 0,
        "h3_e_7":$(this).find("input[name=h3_e_7]:checked").val() ? 1 : 0,
        "h3_e_2_check":$(this).find("input[name=h3_e_2_check]:checked").val() ? 1 : 0,
        "h3_e_8":$(this).find("input[name=h3_e_8]:checked").val() ? 1 : 0,
        "h3_e_9":$(this).find("input[name=h3_e_9]:checked").val() ? 1 : 0,
        "h3_e_10":$(this).find("input[name=h3_e_10]:checked").val() ? 1 : 0,
        "h3_e_11":$(this).find("input[name=h3_e_11]:checked").val() ? 1 : 0,
        "h3_e_12":$(this).find("input[name=h3_e_12]:checked").val() ? 1 : 0,
        "h3_e_13":$(this).find("input[name=h3_e_13]:checked").val() ? 1 : 0,
        "h3_z":$(this).find("input[name=h3_z]:checked").val() ? 1 : 0, */
}
// 不详check 切换事件
function unknownChange(th) {
    var name = ($(th).prop("name")).substring(0, 4);
    if ($(th).is(':checked')) {
        $(th).parent().nextAll().find('input[type=checkbox][name^="' + name + '"]').prop("disabled", "disabled");
        $(th).parent().nextAll().find('input').prop("disabled", "disabled");
        $(th).parent().nextAll().find('input').prop("checked", false);
    } else {
        $(th).parent().nextAll().find('inputinput[type=checkbox][name^="' + name + '"]').removeProp("disabled");
        $(th).parent().nextAll().find('input').removeProp("disabled");
    }
    allSelChange(".p_h3_checkbox");

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
//
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

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isObject(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
}

function isString(obj) {
    return (typeof obj == 'string') && obj.constructor == String;
}
var Medicinelength = 0
addHormonelength = 0

function initHistoryFormList(key, data) {
    var arr = data,
        str, el;
    //康骨质酥松
    // console.log(data, "抗骨质酥松")
    if (key == "osteoporosis_arr") {

        el = "#addMedicine";
        for (var i = 1; i < arr.length; i++) { //'<tr class="p_h2_d2_list" id="p_h2_d1_list_'+i+'">'+
            $(el).append(
                '<tr class="p_h2_d1_list" id="p_h2_d1_list_' + i + '">' +
                // '<td class="text-center"></td>' +
                '<td colspan="6"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button><form>' +
                '<div class="form-inline">' +
                '<div class="form-item"><label><span class="red">*</span>药品类别</label>' +
                '<select name="ost_1" id="bs_a1_c_select" class="form-control" check="required" onchange="selectYwType1(this,' + i + ')" tip-msg="请选择">' +
                '<option value="">请选择</option>' +
                '<option value="1">双膦酸盐类</option>' +
                '<option value="2">降钙素类</option>' +
                '<option value="3">雌激素类</option>' +
                '<option value="4">选择性雌激素受体调节剂</option>' +
                '<option value="5">RANKL抑制剂</option>' +
                '<option value="6">甲状旁腺激素类似物</option>' +
                '<option value="7">锶盐</option>' +
                '<option value="8">维生素K类</option>' +
                '<option value="9">活性维生素D及其类似物</option>' +
                '<option value="10">中药</option>' +
                '<option value="11">其他</option>' +
                '</select>' +
                '<input type="text" name="ost_2" id="drugCadtegory' + i + '" placeholder="请输入其他内容" class="form-control" style="display: none;">' +
                '</div>' +

                '<div class="form-item"><label><span class="red">*</span>用药时长</label>' +
                '<input type="number" min="0" name="ost_3" id="p_h2_d1_duration" class="form-control" value="" check="required check0" tip-msg="请选择用药时长">' +
                '<label><span class="red">*</span>单位</label>' +
                '<select name="ost_4" id="p_h2_d1_duration_unit" class="form-control" check="required" tip-msg="请选择用药时image.png">' +
                '<option value="">请选择</option>' +
                '<option value="1">天</option>' +
                '<option value="2">周</option>' +
                '<option value="3">月</option>' +
                '<option value="4">年</option>' +
                '</select></div>' +
                '</div>' +
                '<div class="form-item"><label><span class="red">*</span>是否规律用药</label>' +
                '<select onchange="selectgl(this,' + i + ')" name="ost_5" id="p_h2_d1_regular" class="form-control" check="required" tip-msg="请选择是否规律用药">' +
                '<option value="">请选择</option>' +
                '<option value="1">是</option>' +
                '<option value="0">否</option>' +
                '</select>' +
                ' <input type="text" name="ost_chenk" id="ost_chenk' + i + '" placeholder="请描述原因" class="form-control" style="display: none;">' +
                // '<input type="radio" name="h2_d1_regular" value="1" id="">是'+
                // '<input type="radio" name="h2_d1_regular" value="0" id="">否'+
                '</div>' +
                '</form></td>' +
                '</tr>'
            );
        }
        Medicinelength = $("#addMedicine").find($(".p_h2_d1_list")).length

        // console.log($("#addMedicine").find($(".p_h2_d1_list")).length, "长度")

        initHistoryForm("p_h2_d1_list_", data);
    } else if (key == "renicapsule_arr") {
        el = "#addHormone";
        for (var k = 1; k < arr.length; k++) { //'<tr class="p_h2_d2_list" id="p_h2_d2_list_'+k+'">'+
            $(el).append(
                '<tr class="p_fracture_list" id="p_h2_d2_list_' + k + '">' +
                // '<td class="text-center"></td>' +
                '<td colspan="6"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button>' +
                '<form>' +
                '<div class="form-inline">' +
                '<div class="form-item"><label><span class="red">*</span>药品类别</label>' +
                '<select  name="ren_1" id="p_h2_d2_type" onchange="selectYwType2(this,' + k + ')" style="width:50px" class="form-control" check="required" tip-msg="请选择药品类别">' +
                '<option value="">请选择</option>' +
                '<option value="1">泼尼松</option>' +
                '<option value="2">泼尼松龙</option>' +
                '<option value="3">甲泼尼龙</option>' +
                '<option value="4">曲安西龙</option>' +
                '<option value="5">地塞米松</option>' +
                '<option value="6">氢化可的松</option>' +
                '<option value="7">可的松</option>' +
                '<option value="8">得宝松</option>' +
                '<option value="9">其他</option>' +
                '</select>' +
                '<input type="text" name="ren_2" id="drugCadtegory2_' + k + '" placeholder="请输入其他内容" class="form-control" style="display: none;width: 50%;margin-left: 27%;">' +
                '</div>' +
                '<div class="form-group">' +
                '<label><span class="red">*</span>初始用药剂量</label>' +
                '<input type="number" name="ren_3" min="0" class="form-control" id="p_h2_d2_dose_start" value="" check="required check1" tip-msg="请输入初始用药剂量">mg/d' +
                '</div>' +
                '<div class="form-group">' +
                '<label><span class="red">*</span>目前用药剂量</label>' +
                '<input type="number" name="ren_4" min="0" class="form-control" id="p_h2_d2_dose_current" value="" check="required check1" tip-msg="请输入目前用药剂量">mg/d</div>' +

                '<div class="form-group"><label><span class="red">*</span>用药时长</label>' +
                '<input type="number" name="ren_5" min="0" id="p_h2_d2_duration" class="form-control" value="" check="required" tip-msg="请输入用药时长">' +
                '<label><span class="red">*</span>单位</label>' +
                '<select name="ren_6" d="p_h2_d2_duration_unit" class="form-control" check="required check0" tip-msg="请输入用药时长">' +
                '<option value="">请选择</option>' +
                '<option value="1">天</option>' +
                '<option value="2">周</option>' +
                '<option value="3">月</option>' +
                '<option value="4">年</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-item"><label style="width:27%"><span class="red">*</span>用药方式</label>' +
                '<select name="ren_7" id="p_h2_d2_usage" onchange="selectYwType3(this,' + k + ')" class="form-control" check="required" tip-msg="请输入用药方式">' +
                '<option value="">请选择</option>' +
                '<option value="1">口服</option>' +
                '<option value="2">静脉</option>' +
                '<option value="3">肌肉</option>' +
                '<option value="4">外用</option>' +
                '<option value="5">鼻喷</option>' +
                '<option value="6">点眼</option>' +
                '<option value="7">其他</option>' +
                '</select>' +
                '<input type="text" name="ren_8" id="drugCadtegory3_' + k + '" placeholder="请输入其他内容" class="form-control" style="display: none;">' +
                '</div>' +
                '</div>' +
                '</form>' +
                '</td>' +
                '</tr>'
            );
        }
        addHormonelength = $("#addHormone").find($(".p_fracture_list")).length

        initHistoryForm("p_h2_d2_list_", data);
    } else if (key == "h3_fracture") {
        el = "#p_page2_tb4";
        for (var k = 0; k < arr.length; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(
                '<tr id="p_h3_fracture_list_' + k + '" class="p_fracture_list">' +
                '<td class="text-center"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>' +
                '<td class="">' +
                '<form>' +
                '<label>年龄</label>' +
                ' <select name="h3_age" id="p_h3_age" class="form-control" check="required" tip-msg="请选择骨折年龄">' +
                '   <option value="">请选择</option>' +
                '   <option value="1">0-10岁</option>' +
                '   <option value="2">10-20岁</option>' +
                '   <option value="3">20-30岁</option>' +
                '   <option value="4">30-40岁</option>' +
                '   <option value="5">40-50岁</option>' +
                '   <option value="6">50-60岁</option>' +
                '   <option value="7">60-70岁</option>' +
                '   <option value="8">70-80岁</option>' +
                '   <option value="9">80-90岁</option>' +
                '   <option value="10">90-100岁</option>' +
                ' </select>' +
                //  ' <label>骨折原因</label>'+
                //  ' <input type="checkbox" name="" value="">脆性'+
                //  ' <input type="checkbox" name="" value="">暴力'+
                ' <p>骨折位置</p>' +

                '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="请选择骨折位置" data-class="p_h3_0000_' + k + '">' +
                ' <tbody class="p_h3_0000_' + k + '">' +
                ' <tr>' +
                '<td style="width:100px;">椎体</td>' +
                '<td>' +
                '<div>' +
                '<div ><input type="checkbox" name="h3_a_1" id="p_h3_a_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_1_check" id="h3_a_1_check" value="1">颈椎' +
                '（' +
                '<input type="checkbox"  name="h3_a_2" id="p_h3_a_2" value="1">C1' +
                '<input type="checkbox"  name="h3_a_3" id="p_h3_a_3" value="1">C2' +
                '<input type="checkbox"  name="h3_a_4" id="p_h3_a_4" value="1">C3' +
                '<input type="checkbox"  name="h3_a_5" id="p_h3_a_5" value="1">C4' +
                '<input type="checkbox"  name="h3_a_6" id="p_h3_a_6" value="1">C5' +
                '<input type="checkbox"  name="h3_a_7" id="p_h3_a_7" value="1">C6' +
                '<input type="checkbox"  name="h3_a_8" id="p_h3_a_8" value="1">C7）' +
                '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_2_check" id="h3_a_2_check" value="1">胸椎' +
                '（' +
                '<input type="checkbox"  name="h3_a_9"  id="p_h3_a_9"  value="1">T1' +
                '<input type="checkbox"  name="h3_a_10" id="p_h3_a_10" value="1">T2' +
                '<input type="checkbox"  name="h3_a_11" id="p_h3_a_11" value="1">T3' +
                '<input type="checkbox"  name="h3_a_12" id="p_h3_a_12" value="1">T4' +
                '<input type="checkbox"  name="h3_a_13" id="p_h3_a_13" value="1">T5' +
                '<input type="checkbox"  name="h3_a_14" id="p_h3_a_14" value="1">T6' +
                '<input type="checkbox"  name="h3_a_15" id="p_h3_a_15" value="1">T7' +
                '<input type="checkbox"  name="h3_a_16" id="p_h3_a_16" value="1">T8' +
                '<input type="checkbox"  name="h3_a_17" id="p_h3_a_17" value="1">T9' +
                '<input type="checkbox"  name="h3_a_18" id="p_h3_a_18" value="1">T10' +
                '<input type="checkbox"  name="h3_a_19" id="p_h3_a_19" value="1">T11' +
                '<input type="checkbox"  name="h3_a_20" id="p_h3_a_20" value="1">T12' +
                '） </div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_a_3_check" id="h3_a_3_check" value="1">腰椎' +
                '（' +
                '<input type="checkbox"  name="h3_a_21" id="p_h3_a_21" value="1">L1' +
                '<input type="checkbox"  name="h3_a_22" id="p_h3_a_22" value="1">L2' +
                '<input type="checkbox"  name="h3_a_23" id="p_h3_a_23" value="1">L3' +
                '<input type="checkbox"  name="h3_a_24" id="p_h3_a_24" value="1">L4' +
                '<input type="checkbox"  name="h3_a_25" id="p_h3_a_25" value="1">L5' +
                '）' +
                '</div>' +
                '<div>' +
                '<input type="checkbox" name="h3_a_26" id="p_h3_a_26" value="1" >骶椎' +
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width:100px;">肋骨</td>' +
                '<td>' +
                '<div >' +
                '<div><input type="checkbox" id="p_h3_b_1" name="h3_b_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_b_1_check" id="h3_b_1_check" value="1">左侧' +
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
                '</div>' +
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_b_2_check" id="h3_b_2_check" value="1">右侧' +
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
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width:100px;">上肢</td>' +
                '<td>' +
                '<div>' +
                '<div><input type="checkbox" name="h3_c_1" id="p_h3_c_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
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
                '<input type="checkbox" name="h3_c_2_check" id="h3_c_2_check" value="1">右侧' +
                '（' +
                '<input type="checkbox"  name="h3_c_9"  id="p_h3_c_9"  value="1">指骨' +
                '<input type="checkbox"  name="h3_c_10" id="p_h3_c_10" value="1">掌骨' +
                '<input type="checkbox"  name="h3_c_11" id="p_h3_c_11" value="1">舟骨' +
                '<input type="checkbox"  name="h3_c_12" id="p_h3_c_12" value="1">尺骨' +
                '<input type="checkbox"  name="h3_c_13" id="p_h3_c_13" value="1">桡骨' +
                '<input type="checkbox"  name="h3_c_14" id="p_h3_c_14" value="1">肱骨' +
                '<input type="checkbox"  name="h3_c_15" id="p_h3_c_15" value="1">锁骨' +
                '）' +
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width:100px;">骨盆及髋部</td>' +
                '<td>' +
                '<div >' +
                '<div><input type="checkbox" name="h3_d_1" id="p_h3_d_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div>' +
                '<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
                '<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
                '<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
                '<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
                '</div>' +
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr>' +
                '<td style="width:100px;">下肢</td>' +
                '<td>' +
                '<div>' +
                '<div><input type="checkbox" name="h3_e_1" id="p_h3_e_1" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                '<div class="p_h3_checkbox">' +
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
                '<div class="p_h3_checkbox">' +
                '<input type="checkbox" name="h3_e_2_check" id="h3_e_2_check" value="1">右侧' +
                '（' +
                '<input type="checkbox"  name="h3_e_8" id="p_h3_e_8" value="1">足趾' +
                '<input type="checkbox"  name="h3_e_9" id="p_h3_e_9" value="1">髌骨' +
                '<input type="checkbox"  name="h3_e_10" id="p_h3_e_10" value="1">胫骨' +
                '<input type="checkbox"  name="h3_e_11" id="p_h3_e_11" value="1">腓骨' +
                '<input type="checkbox"  name="h3_e_12" id="p_h3_e_12" value="1">踝部' +
                '<input type="checkbox"  name="h3_e_13" id="p_h3_e_13" value="1">股骨' +
                '）' +
                '</div>' +
                // '<div>'+
                //     '<input type="checkbox" class="p_others">其他'+
                //     '<input type="text" name="h3_z"  class="form-control" readonly="readonly" id="p_h3_z" value="">'+
                // '</div>'+
                '</div>' +
                '</td>' +
                '</tr>' +
                '<tr><td>其他</td><td><input type="text" name="h3_z"  class="form-control1" readonly="readonly" id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
                '</tbody>' +
                '</table>' +
                '</form>' +
                '</td>' +
                '</tr>'
            );
        }
        initHistoryForm("p_h3_fracture_list_", data);
        sortTrNumber();
    } else if (key == "g3_relative") {
        el = "#p_page3_tb4";
        for (var j = 0; j < arr.g3_arr.length; j++) { // '<tr id="p_g3_relative_list_'+j+'">'+
            $(el).append(
                '<tr class="qsgx" id="p_g3_relative_list_' + j + '">' +
                // '<td class="text-center"></td>' +
                '<td colspan="5"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button><form>' +
                '<div class="pull-right"><span class="red">*</span><label>' + arr.g3_arr[j].g3_r_a + '：</label><input type="hidden" value="' + arr.g3_arr[j].g3_r_a + '"name="g3_r_a">' +
                '<label>是否发生过脆性骨折：</label>' +
                '<select class="form-control" name="g3_r_b" id="p_g3_r_b" check="required">' +
                '<option value="">请选择</option>' +
                '<option value="1">是</option>' +
                '<option value="-1">否</option>' +
                '<option value="0">不确定</option>' +
                '</select>' +
                //  '<label><input type="radio" name="g3_r_b" value="1"/>是</label>'+
                //  '<label><input type="radio" name="g3_r_b" value="-1"/>否</label>'+
                //  '<label><input type="radio" name="g3_r_b" value="0"/>不确定</label>'+
                '</div></td></form>' +
                '</tr>'
            )
        }
        initHistoryForm("p_g3_relative_list_", data.g3_arr);
    }
}

function initHistoryForm(el, data) {
    console.log(data, "阿发发发");
    for (var i = 0; i < data.length; i++) {
        $.each(data[i], function(name, value) {
            // console.log($("#" + el + i), name + ":" + value, "啊u入球陪我去");
            if (value == 1) {
                $("#" + el + i).find('input[type="checkbox"][name="' + name + '"]').prop("checked", "checked");
            } else {
                $("#" + el + i).find('input[type="checkbox"][name="' + name + '"]').removeProp("checked");
            }

            $("#" + el + i).find("select[name='" + name + "'] option[value='" + value + "']").prop("selected", "selected");
            $("#" + el + i).find("input[name='" + name + "'][value='" + value + "']").attr("checked", "checked");
            $("#" + el + i).find("input[type='number'][name='" + name + "']").val(value);
            $("#" + el + i).find("input[type='text'][name='" + name + "']").val(value);
            var ost1 = $("#" + el + i).find("select[name=ost_1]").val();
            // console.log(ost1, $("#drugCadtegory3_" + i + "input"), "发UFO啊u哦偶去");
            if (ost1 == 11) {
                $("#" + el + i).find($("#drugCadtegory" + i)).show()
            }
            var ost5 = $("#" + el + i).find("select[name=ost_5]").val();

            if (ost5 == 1 || ost5 == '') {
                $("#" + el + i).find($("#ost_chenk" + i)).hide()

            } else {
                $("#" + el + i).find($("#ost_chenk" + i)).show()

            }
            var ren1 = $("#" + el + i).find("select[name=ren_1]").val();
            // console.log(ren1, $("#drugCadtegory3_" + i + "input"), "发UFO啊u哦偶去");
            if (ren1 == 9) {
                $("#" + el + i).find($("#drugCadtegory2_" + i)).show()
            }
            var ren7 = $("#" + el + i).find("select[name=ren_7]").val();
            // console.log(ren7, $("#drugCadtegory3_" + i + "input"), "发UFO啊u哦偶去");
            if (ren7 == 7) {
                $("#" + el + i).find($("#drugCadtegory3_" + i)).show()
            }
            var h3pattern = $("#" + el + i).find("select[name=h3_pattern]").val();
            if (h3pattern == 2) {
                $("#" + el + i).find($("#pattern_show" + i)).show()
            }
            var h3input = $("#" + el + i).find("select[name=h3_1]").val();
            if (h3input == 2) {
                $("#" + el + i).find($("#h3_0SHQK_" + i)).show()
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
// 怀孕次数失去焦点
function pregnantNum(th) {
    var val = $(th).val();
    if (val > 0) {
        $(th).parent().parent().parent().next().show();
    } else {
        $(th).parent().parent().parent().next().hide();
    }
}

function initPregnantNum(el) {
    var val = $(el).val();
    if (val > 0) {
        $(el).parent().parent().parent().next().show();
    } else {
        $(el).parent().parent().parent().next().hide();
    }
}

/*
 *  初始化骨折史历史次数
 *  默认为0次
 *  骨折历史添加按钮为禁止状态
 */
function initLastYears(el) {
    var val = $(el).val();
    if (val == 0) {
        $(el + "_btn").attr("disabled", "disabled");
    } else {
        $(el + "_btn").removeAttr("disabled");
    }
}
/*
 *  骨折史历史次数
 *  默认为0次
 *  骨折历史change 事件
 */
function lastYearschange(el) {
    $(el).change(function() {
        if ($(this).val() > 0) {
            $(el + "_btn").removeAttr("disabled");
        } else if ($(this).val() == 0) {
            $(el + "_btn").attr("disabled", "disabled");
        }
    });
}
//序号处理
function sortTrNumber() {
    $('#p_page2_tb4 tbody tr.p_fracture_list').each(function(index, obj) {
        //$(obj).attr("class", "add-tr"+(index+1));
        // console.log($(obj).attr("class", "add-tr" + (index + 1)));
        $(obj).find("td span.p_fracture_num").html(index + 1);
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
        } else {
            $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").show();
        }
    } else {
        $("#delRiskScreen,#addRiskScreen,.p_riskTest_update").hide();
    }

}
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
    })
}

function check19(id, val, m) {
    var match = /^[1-9]\d*$/;
    var ok = match.test(val);
    var age = sessionStorage.getItem("age");
    if (!ok) {
        top.layer.alert("首次妊娠年龄请填写整数！");
        $("#" + id).focus();
        return;
    } else {
        if (val * 1 > age * 1) {
            top.layer.alert("首次妊娠年龄必须不得大于当前年龄，请核实!");
            $("#" + id).focus();
            return;
        }
        if (($("#p_g2_c_h").val() > 0) && (val * 1 > ($("#p_g2_c_h").val()) * 1)) {
            top.layer.alert("\"首次妊娠年龄\"不得大于末次妊娠年龄，请核实!");
            $("#" + id).focus();
            return
        }

    }
    $("#" + id).val(val);
}

function check20(id, val, m) {
    var match = /^[1-9]\d*$/;
    var ok = match.test(val);
    var age = sessionStorage.getItem("age");

    if (!ok) {
        top.layer.alert("末次妊娠年龄请填写整数！");
        $("#" + id).focus();
        return;
    }
    if (val * 1 > age * 1) {
        top.layer.alert("末次妊娠年龄必须小于当前年龄，请核实！");
        $("#" + id).focus();
        return;
    }

    if (val * 1 < ($("#p_g2_a").val()) * 1) {
        top.layer.alert("月经初潮年龄不得大于末次妊娠年龄，请核实！");
        $("#" + id).focus();
        return;
    }

    if (val * 1 < ($("#p_g2_c_g").val()) * 1) {
        top.layer.alert("\"末次妊娠年龄\"不得小于\"首次妊娠年龄\"，请核实！");
        $("#" + id).focus();
        return;
    }

    $("#" + id).val(val);
}

function check21(id, val, m) {
    var match = /^[1-9]\d*$/;
    var ok = match.test(val);
    if (!ok) {
        top.layer.alert("哺乳总时间请填写整数！");
        $("#" + id).focus();
        return;
    }
    if (val * 1 < 0 || val * 1 > 300) {
        top.layer.alert("哺乳总时间超出填写范围（0-300），请核实!");
        $("#" + id).focus();
        return;
    }

    $("#" + id).val(val);
}

// 校验年龄
function checkAge(th) {
    var reg = /^(?:[1-9][0-9]?|1[01][0-9]|120)$/; //年龄是1-120之间有效
    var val = $(th).val();
    if (!reg.test(val) || parseInt(val) > parseInt(sessionStorage.getItem("age"))) {
        top.layer.msg("请输入正确年龄格式范围为1 - 本人年龄之间", { icon: 5, anim: 6 });
        $(th).focus();
        return false;
    }
}
// 绝经年龄二次检验
// 绝经年龄校验
function checkg2Age(th) {
 var newVal = $(th).val();
 
 var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
 var age = sessionStorage.getItem("age");
 if(!pattern.test(newVal)){
 	 top.layer.msg("绝经年龄仅能输入正整数，请核实!");
 	 $(th).val("");
 	 $(th).select();
 	 return false;
 }
 if (newVal * 1 > age * 1) {
     top.layer.msg("\“绝经年龄\”不得大于其\“当前年龄\”，请核实!");
     $(th).val("");
     $(th).select();
     return false;
 }
 
  if (newVal * 1 <= (document.getElementById("p_g3_b_age").value) * 1) {
         top.layer.msg("\“绝经年龄\”必须大于其\“月经初潮年龄\”，请核实!");
         $(th).val("");
         $(th).select();
         return false;
     }
 
 if (newVal * 1 < 25 || newVal * 1 >65) {
     top.layer.msg("绝经年龄正常填写范围40-60，最大填写范围25-65，请核实!");
     $(th).val("");
     $(th).select();
     return false;
 }
 
 if (newVal * 1 == 25 || newVal * 1 ==65) {
     top.layer.msg("绝经年龄正常填写范围40-60，最大填写范围25-65，请核实!");
    
     return false;
 }
 
 if (newVal * 1 < 40 || newVal * 1 > 60) {
     top.layer.confirm("绝经年龄超出正常值范围（40-60），请与患者确认！", function(index) {
         //$(th).focus();
         //$(th).select();
         top.layer.close(index);
     }, function(index) {
         $(th).val("");
         top.layer.close(index);
     })
 
     return;
 }
 $(th).val(newVal);
}

//绝经年龄提交时候得校验
function  checkage2 () {

	var newVal = $("#p_g2_a_age").val();
 
	var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
	var age = sessionStorage.getItem("age");
	if(!pattern.test(newVal)){
		 top.layer.msg("绝经年龄仅能输入正整数，请核实!");
		 $(th).val("");
		 $(th).select();
		 return false;
	}
	if (newVal * 1 > age * 1) {
	    top.layer.msg("\“绝经年龄\”不得大于其\“当前年龄\”，请核实!");
	   
	    return false;
	}
	
	
	
    return true;
	
}

// 停经年龄校验
function checkg3Age(th) {
   var newVal = $(th).val();
   var jage = $("#p_g2_a_age").val()
   var age = sessionStorage.getItem("age");
   var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
   debugger
   if(!pattern.test(newVal)){
   	 top.layer.msg("停经年龄仅能输入正整数，请核实!");
   	 $(th).val("");
   	 $(th).select();
   	 return false;
   }
   
   if (newVal * 1 > age * 1) {
       top.layer.msg("\“停经年龄\”不得大于其\“当前年龄\”，请核实!");
       $(th).val("");
       $(th).select();
       return false;
   }
   if (newVal * 1 < 25 || newVal * 1 > 65) {
       top.layer.msg("停经年龄正常填写范围40-60，最大填写范围25-65，请核实!");
       $(th).val("");
       $(th).select();
       return false;
   }
   if (newVal * 1 == 25 || newVal * 1 == 65) {
       top.layer.msg("停经年龄正常填写范围40-60，最大填写范围25-65，请核实!");
     
       return false;
   }
   if (newVal * 1 > jage * 1) {
       top.layer.confirm("停经年龄不得大于绝经年龄，请核实!", function(index) {
           //$(th).focus();
           //$(th).select();
           $(th).val("");
           top.layer.close(index);
       })
   
       return false;
   }
   if (newVal * 1 < 40 || newVal * 1 > 60) {
       top.layer.confirm("停经年龄超出正常值范围（40-60），是否修改？", function(index) {
           //$(th).focus();
           //$(th).select();
           top.layer.close(index);
       })
   
       return false;
   }
   $(th).val(newVal);
}

//停经提交校验
function check3age(){
	
	
	var newVal = $("#p_g2_b_age").val();
	var jage = $("#p_g2_a_age").val()
	var age = sessionStorage.getItem("age");
	var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
	
	if (newVal * 1 > age * 1) {
	    top.layer.msg("\“停经年龄\”不得大于其\“当前年龄\”，请核实!");
	    
	    return false;
	}


   return true;

	
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
    addfracturHistory("h3_fracture", length);



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

function selectSHQK(e, i) {
    if ($(e).val() === "2") {
        $("#h3_0SHQK_" + i).css('display', '')
    } else {
        $("#h3_0SHQK_" + i).css('display', 'none');
        $("#h3_0SHQK_" + i).val("");
    }
}


var start1 = new Date(),
    end1 = new Date();

function addfracturHistory(key, data) {
    var arr, str, el;
    if (key == "h3_fracture") {
        el = "#p_page2_tb4";
        $(el).html("");
        for (var k = 0; k < data; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(
            '<tr id="p_h3_fracture_list_' + k + '" class="p_fracture_list">' +
               // '<td class="text-center" style="width:100px;"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>'+
               '<td class="" colspan="2">' +
               // '<button class="btn btn-danger btn-sm text-center p_del_btn" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-remove"></span></button>'+
               '<form class="h3_form p_c_form">' +
               '<div role="separator" class="van-divider van-divider--hairline van-divider--content-center"><p>第<span class="p_fracture_num"></span>次脆性骨折信息</p></div>' +
               '<div class="form-horizontal"><div class="form-group">' +
               '<label class="col-xs-4 control-label"><span class="red">*</span>骨折日期</label>' +
               
               '<div  class="col-xs-8" style="display: inline-block;position: relative;">' +
               
               '<label style="margin-right: 20px"><select name="h3_qt" id="h3_qt' + k + '" check="required"   class="form-control p_d_select" tip-msg="请填选择骨折日期" style="width:auto;display: inline-block" onchange="selectQt(this,' + k + ')">' +
               '<option value="">请选择</option>' +
               '<option value="1">时间详细</option>' +
               '<option value="2">时间不详</option>' +
               '</select> </label>' +
               '</label>' +
               '</div>' +
               //年 月
               '<div class="col-xs-12 col-xs-offset-4"  id="sj'+ k + '" style="display: none">'+
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
               '</div></div>'+
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
               '<input type="text" name="h3_0_other" id="h3_0SHQK_' + k + '" placeholder="请输入其他内容" class="isptype form-control" style="display: none; "></div></div></div > </div>' +
               // '<input type="number" name="h3_age" class="form-control input-inline p_h3_age" check="required"/>'+
               // '<div class="form-horizontal">'+
               // '<div class="check form-group" tip-msg="请选择骨折原因" data-class="p_e1_3_check_00" check="radio"><div class="p_e1_3_check_00"><label class="col-xs-4 control-label">骨折原因：</label>'+
               // '<div  class="col-xs-8"><input type="radio" name="h3_reason" value="1">脆性'+
               // '<input type="radio" name="h3_reason" value="2">暴力</div></div></div>'+
               '<p style="font-size: 14px;"><span class="red">*</span>骨折部位：</p>' +
               '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="骨折部位至少勾选一项" data-class="p_h3_0000_' + k + '">' +
               ' <tbody class="p_h3_0000_' + k + '">' +
               '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">请选择骨折部位</div></td></tr>' +
               ' <tr>' +
               
               '<td >' +
              '<input type="checkbox" name="h3_a_6_check" id="h3_a_6_check'+k+'" value="1" onclick="Ztcheck1(this,'+k+')"/>椎体'+
               '<div style="display: none;" class="Ztclass">' +
               '<div ><input type="checkbox" name="h3_a_1" id="p_h3_a_1'+k+'" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
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
               '<input type="checkbox" name="h3_b_1_check" id="h3_b_1_check" value="1"/>肋骨'+
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
               
               '<input type="checkbox"  name="h3_c_7_check" id="h3_c_7_check'+k+'" value="1"  onclick="Szcheck1(this,'+k+')" >上肢'+
               '<div style="display: none;" class="Szclass">' +
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
               
               '<input type="checkbox" name="h3_d_1" id="p_h3_d_1'+k+'" value="1">骨盆及髋部'+
               '<div style="display: none;" class="Pgclass">' +
               '<div><input type="checkbox" name="h3_d_12" id="p_h3_d_12" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
               '<div>' +
               '<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
               '<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
               '<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
               '<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
               '</div>' +
               '</div></br>' +
               
                 '<input type="checkbox" onclick="Xzcheck1(this,'+k+')" name="h3_e_6_check" id="h3_e_6_check'+k+'" value="1">下肢'+
                 '<div style="display: none;" class="Xzclass">' +
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
              					 //'<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
                 '</div>' +
              					 '<div  class="p_h3_checkbox">'+
              					 	 '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" value="1">其他'+
              					 '</div>'+
                 '<div>'+
              					 //'<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
                     //'<input type="checkbox" name="h3_z" id="p_h3_z" class="p_others">其他'+
                     // '<input type="text" name="h3_z_note"  class="form-control"  id="p_h3_z_note" value="测试你">'+
                 '</div>'+
                 '</div>' +
               
               
               '</td>' +
               '</tr>' +
              // <!-- 上一个版本的代码全部注释 -->
               
               // '<tr><td>其他</td></tr>'+
               '<tr><td><div><input type="checkbox"  name="h3_z_1" onclick="Qtcheck1(this)" id="Qtid" value="1"/>其他</div></td></tr>' +
               
               '<tr><td><input type="text" name="h3_z"  class="form-control1"  id="p_h3_z" value="" placeholder="请描述"  style="display: none;"></td></tr>' +
               
               
               // '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">其他</div></td></tr>' +
               
               // '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
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
// 初始化骨折历史
function initfracturHistory(key, data) {

    var arr, str, el;
    if (key == "h3_fracture") {
        el = "#p_page2_tb4";
        $(el).html("");
        for (var k = 0; k < data.length; k++) { // '<tr id="p_h3_fracture_list_'+k+'">'+
            $(el).append(
                '<tr id="p_h3_fracture_list_' + k + '" class="p_fracture_list">' +
                   // '<td class="text-center" style="width:100px;"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-minus"></span></button><p>第<span class="p_fracture_num"></span>次骨折</p></td>'+
                   '<td class="" colspan="2">' +
                   // '<button class="btn btn-danger btn-sm text-center p_del_btn" type="button" onclick="delFracture(this)"><span class="glyphicon glyphicon-remove"></span></button>'+
                   '<form class="h3_form p_c_form">' +
                   '<div role="separator" class="van-divider van-divider--hairline van-divider--content-center"><p>第<span class="p_fracture_num"></span>次脆性骨折信息</p></div>' +
                   '<div class="form-horizontal"><div class="form-group">' +
                   '<label class="col-xs-4 control-label"><span class="red">*</span>骨折日期</label>' +
                   
                   '<div class="col-xs-8"  style="display: inline-block;position: relative;">' +
                   
                   '<label style="margin-right: 20px"><select name="h3_qt" id="h3_qt' + k + '" check="required"  tip-msg="请填选择骨折日期" class="form-control p_d_select" style="width:auto;display: inline-block" onchange="selectQt(this,' + k + ')">' +
                   '<option value="">请选择</option>' +
                   '<option value="1">时间详细</option>' +
                   '<option value="2">时间不详</option>' +
                   '</select> </label>' +
                   '</label>' +
                   '</div>' +
                   //年 月
                   '<div id="sj'+ k + '" style="display: none">'+
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
                   '</div></div>'+
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
                   '<input type="text" name="h3_0_other" id="h3_0SHQK_' + k + '" placeholder="请输入其他内容" class="isptype form-control" style="display: none;"></div></div></div > </div>' +
                   // '<input type="number" name="h3_age" class="form-control input-inline p_h3_age" check="required"/>'+
                   // '<div class="form-horizontal">'+
                   // '<div class="check form-group" tip-msg="请选择骨折原因" data-class="p_e1_3_check_00" check="radio"><div class="p_e1_3_check_00"><label class="col-xs-4 control-label">骨折原因：</label>'+
                   // '<div  class="col-xs-8"><input type="radio" name="h3_reason" value="1">脆性'+
                   // '<input type="radio" name="h3_reason" value="2">暴力</div></div></div>'+
                   '<p style="font-size: 14px;"><span class="red">*</span>骨折部位：</p>' +
                   '<table class="table table-bordered text-left check" id="" check="checkbox" tip-msg="骨折部位至少勾选一项" data-class="p_h3_0000_' + k + '">' +
                   ' <tbody class="p_h3_0000_' + k + '">' +
                   '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">请选择骨折部位</div></td></tr>' +
                   ' <tr>' +
                   
                   '<td >' +
                   '<input type="checkbox" name="h3_a_6_check" id="h3_a_6_check'+k+'"  onclick="Ztcheck1(this,'+k+')" value="1"/>椎体'+
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
                    '<input type="checkbox" name="h3_a_3_check" id="h3_a_3_check'+k+'" value="1">腰椎' +
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
                    '<input type="checkbox" name="h3_b_1_check" id="h3_b_1_check" value="1"/>肋骨'+
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
                    
                    '<input type="checkbox" name="h3_c_7_check" id="h3_c_7_check'+k+'" value="1" onclick="Szcheck1(this,'+k+')">上肢'+
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
                    
                    '<input type="checkbox" name="h3_d_1" id="p_h3_d_1'+k+'" value="1">骨盆及髋部'+
                    '<div style="display: none;" class="Pgclass">' +
                    '<div><input type="checkbox" name="h3_d_12" id="p_h3_d_12" value="1"  onchange="unknownChange(this)" class="p_check_unknown">不详</div>' +
                    '<div>' +
                    '<input type="checkbox"  name="h3_d_2" id="p_h3_d_2" value="1">股骨颈' +
                    '<input type="checkbox"  name="h3_d_3" id="p_h3_d_3" value="1">粗隆间' +
                    '<input type="checkbox"  name="h3_d_4" id="p_h3_d_4" value="1">髋臼' +
                    '<input type="checkbox"  name="h3_d_5" id="p_h3_d_5" value="1">骨盆 ' +
                    '</div>' +
                    '</div></br>' +
                    
                      '<input type="checkbox" name="h3_e_6_check" id="h3_e_6_check'+k+'" value="1" onclick="Xzcheck1(this,'+k+')">下肢'+
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
                   				
                      '</div >' +
                   					    '<div  class="p_h3_checkbox">'+
                   					    	 '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" value="1 ">其他'+
                   					    '</div>'+
                      '<div>'+
                         // '<input type="checkbox"  name="h3_e_5_check" id="h3_e_5_check" ">其他'+
                          // '<input type="text" name="h3_z_note"  class="form-control"  id="p_h3_z_note" value="测试你">'+
                      '</div>'+
                      '</div>' +
                    
                    
                    '</td>' +
                    '</tr>' +
                   // <!-- 上一个版本的代码全部注释 -->
                    
                    // '<tr><td>其他</td></tr>'+
                    '<tr><td><div><input type="checkbox"  onclick="Qtcheck1(this)" name="h3_z_1" id="Qtid" value="1"/>其他</div></td></tr>' +
                    
                    '<tr><td><input type="text" name="h3_z"  class="form-control1"  id="p_h3_z'+k+'" value="" placeholder="请描述"  style="display: none;" ></td></tr>' +
                    // '<tr><td><div role="separator" class="van-divider van-divider--hairline van-divider--content-center">其他</div></td></tr>' +
                    
                    // '<tr><td><input type="text" name="h3_z"  class="form-control"  id="p_h3_z" value="" placeholder="请描述"></td></tr>' +
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
function initYMDate(el, sDate, eDate) {
    var startTime = (sDate != null ? new Date(sDate) : null)
    var endTime = (eDate != null ? new Date(eDate) : new Date())
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
        // startDate: startTime,
        //  endDate:new Date(parseInt("86400000")+new Date().getTime())
        endDate: endTime

    });
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
        //  startDate:new Date(),
        //  endDate:new Date(parseInt("86400000")+new Date().getTime())
        endDate: new Date()

    });
    el.datetimepicker("setDate", new Date(parseInt(new Date().getTime())));
}

function getzdType(el) {

}
// 是否直系亲属患有 切换事件
function g3Type(id) { // #p_page3_g3_other
    $(id).change(function() {
        if ($(this).val() != 4) {
            $("#p_page3_relatives_sel,#addRelatives").prop("disabled", "disabled");
            $("#p_page3_tb4").removeClass("check");
            $("#p_page3_tb4").removeAttr("check");
            $(this).parent().parent().nextAll().remove();
        } else {
            $("#p_page3_relatives_sel,#addRelatives").removeProp("disabled");
            $("#p_page3_tb4").addClass("check");
            $("#p_page3_tb4").attr("check", "relativeslist")
        }
    });

    var val = $("#p_page3_g3_other").val();
    if (val != 4) {
        $("#p_page3_relatives_sel,#addRelatives").prop("disabled", "disabled");
        $("#p_page3_tb4").removeClass("check");
        $("#p_page3_tb4").removeAttr("check");
        $("#p_page3_g3_other").parent().parent().parent().nextAll().remove();
    } else {
        $("#p_page3_relatives_sel,#addRelatives").removeProp("disabled");
        $("#p_page3_tb4").addClass("check");
        $("#p_page3_tb4").attr("check", "relativeslist")
    }

}
// 点击返回按钮返回
function backLeft() {
    var json = JSON.stringify({ "pid": userJson.pid, "page": "p_page1" });
    //fram.src="./p_diagnosisForm.html?pid="+json;//Iframe--SRC
    var src = "./p_diagnosis.html?pid=" + json;
    window.open(src, '_self');
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
// 基础补充剂
$(function() {

    // 选择无
    $("#sup_0").click(function() {
        if ($(this).prop('checked')) {
            $(this).parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
            $("#selectShowa1b").hide()
            $("#selectShowa1c").hide()
            $("#selectShowa1e").hide()
            $("#sup_3_input").removeAttr("check", "required")
            $("#sup_3_input").val('')
            $("#sup_1_select").val('')
            $("#sup_2_select").val('')
        } else {
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("disabled", "true"); 
        }
    });

    // 选择其他
    $("#sup_1").click(function() {
        if ($(this).prop('checked')) {
            $("#selectShowa1b").show()
            $("#sup_1_select").attr("check", "required")

        } else {
            $("#selectShowa1b").hide()
            $("#sup_1_select").removeAttr("check", "required")
        }
    });
    $("#sup_2").click(function() {
        if ($(this).prop('checked')) {
            $("#selectShowa1c").show()
            $("#sup_2_select").attr("check", "required")
        } else {
            $("#selectShowa1c").hide()
            $("#sup_2_select").removeAttr("check", "required")
        }
    });
    $("#sup_3").click(function() {
        if ($(this).prop('checked')) {
            $("#sup_3_input").attr("check", "required")
            $("#selectShowa1e").show()
        } else {
            $("#selectShowa1e").hide()
            $("#sup_3_input").removeAttr("check", "required")
            $("#sup_3_input").val('')
        }
    });
    $("#other_yw_8").click(function() {
        // console.log("5666")
        if ($(this).prop('checked')) {
            $('#other_yw_8_input').attr("check", "required")
            $('#other_yw_8_input').show()
        } else {
            $('#other_yw_8_input').hide()
            $('#other_yw_8_input').removeAttr("check", "required")
            $('#other_yw_8_input').val('')
        }
    });
    // 选择无
    $("#other_yw_1").click(function() {
        if ($(this).prop('checked')) {
            $(this).parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("check", "required");
            $('#other_yw_8_input').hide()
            $('#other_yw_8_input').val('')

        } else {
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("disabled", "true"); 
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
        }
    });
    // 母亲骨质酥松
    $("#p_g3_m_no").click(function() {
        if ($(this).prop('checked')) {
            $(this).parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("check", "required");
            $('#p_g3_m_z').hide()
            $('#p_g3_m_z').val('')

        } else {
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("disabled", "true"); 
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
        }

    });
    // 父亲骨质酥松
    $("#p_g3_f_no").click(function() {
        if ($(this).prop('checked')) {
            $(this).parent().siblings().find("input[type='checkbox']").attr("disabled", "true");
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("checked", false);
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("check", "required");
            $('#p_g3_f_z').hide()
            $('#p_g3_f_z').val('')

        } else {
            $(this).parent().siblings().find("input[type='checkbox']").removeAttr("disabled", "true"); 
            // $(this).parent().siblings().find("input[type='checkbox']").attr("check", "checkbox");
        }
    });

}); 
// 抗骨质疏松类药物
function selectType(e) {
    var val = $(e).val();
    // var id = $(th).attr("id");
    if (val == 1) {
        $("#addMedicine").show()
        $("#addMedicine").find("input[type=number]").attr("check", "required")
        $("#addMedicine").find("select").attr("check", "required")
        $("#addMedicine").find("input[name=ost_3]").attr("check", "required check0")
    } else {
        $("#addMedicine").hide()
        $("#addMedicine").find("input").val("").removeAttr("check", "")
        $("#addMedicine").find("select").val("").removeAttr("check", "")
        $("#addMedicine").find("input[name=ost_2]").hide()
    }
}
// 抗骨质疏松类药物 类别选择
function selectYwType1(e, k) {

    var val = $(e).val();
    // console.log(e, k, '#drugCadtegory' + k + '', "这是什么1")
    // var id = $(th).attr("id");

    if (val == 11 || val == "其他") {
        $('#drugCadtegory' + k + '').show()
        $('#drugCadtegory' + k + '').attr("check", "required")
    } else {
        $('#drugCadtegory' + k + '').hide()
        $('#drugCadtegory' + k + '').val('')
        $('#drugCadtegory' + k + '').removeAttr("check", "")
    }


}

function selectgl(e, k) {
    var val = $(e).val();
    if (val == 1 || val == '') {
        $('#ost_chenk' + k + '').hide()
        $('#ost_chenk' + k + '').val('')
    } else {
        $('#ost_chenk' + k + '').show()
    }
}
//
function selectUnit1(e) {
    var val = $(e).val();
    // var id = $(th).attr("id");
    if (val == 11 && val == "其他") {
        $("#drugCadtegory").show()
    } else {
        $("#drugCadtegory").hide()
        $("#drugCadtegory").val('')
    }
}
// 肾上腺糖皮质激素
function selectHormone(e) {
    var val = $(e).val();
    // var id = $(th).attr("id");
    if (val == 1) {
        $("#addHormone").show()
        $("#addHormone").find("input[type=number]").attr("check", "required")
        $("#addHormone").find("select").attr("check", "required")
        $("#addHormone").find("input[name=ren_5]").attr("check", "required check0")
        $("#addHormone").find("input[name=ren_3]").attr("check", "required check1")
        $("#addHormone").find("input[name=ren_4]").attr("check", "required check1")
    } else {
        $("#addHormone").hide()
        $("#addHormone").find("input").val("").removeAttr("check", "")
        $("#addHormone").find("select").val("").removeAttr("check", "")
        $("#addHormone").find("input[name=ren_2]").hide()
        $("#addHormone").find("input[name=ren_8]").hide()
    }
    // if (val == 1) {
    //     $("#addHormone").show()
    // } else {
    //     $("#addHormone").hide()
    // }
}

// function methodOfmedication(e) {
//     var val = $(e).val();
//     // var id = $(th).attr("id");
//     if (val == 7) {
//         $("#methodOfmedication1").show()
//     } else {
//         $("#methodOfmedication1").hide()
//         $("#methodOfmedication1").val("")
//     }
// }

function selectYwType2(e, k) {
    var val = $(e).val();
    console.log(e, k, '#drugCadtegory' + k + '', "这是什么2")
    if (val == 9) {
        $('#drugCadtegory2_' + k + '').show()
        $('#drugCadtegory2_' + k + '').attr("check", "required")
    } else {
        $('#drugCadtegory2_' + k + '').hide()
        $('#drugCadtegory2_' + k + '').val("")
        $('#drugCadtegory2_' + k + '').removeAttr("check", "")

    }
}

function selectYwType3(e, k) {
    var val = $(e).val();
    console.log(e, k, '#drugCadtegory' + k + '', "这是什么3")
    if (val == 7) {
        $('#drugCadtegory3_' + k + '').show()
        $('#drugCadtegory3_' + k + '').attr("check", "required")
    } else {
        $('#drugCadtegory3_' + k + '').hide()
        $('#drugCadtegory3_' + k + '').val("")
        $('#drugCadtegory3_' + k + '').val("").removeAttr("check", "")
    }
}
// $(function() {
//         console.log($("#addMedicine").find($(".p_h2_d1_list")).length, "去我日群殴我")
//     })
// 抗骨质疏松类药物增加
function addSYWtype(key, type) {

    var str = "";

    // addG =
    // Medicinelength
    // addHormonelength
    if (type == "s1") {
        Medicinelength++;
        if ($(".p_h2_d1_list").length < 5) {
            str = '<tr class="p_h2_d1_list">' +
                // '<td class="text-center"></td>' +
                '<td colspan="6"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button><form>' +
                '<div class="form-inline">' +
                '<div class="form-item"><label style="width: 27%;"> <span class="red">*</span>药品类别</label>' +
                '<select style="width: 71%;" name="ost_1" id="bs_a1_c_select" class="form-control" check="required" onchange="selectYwType1(this,' + Medicinelength + ')" tip-msg="请选择">' +
                '<option value="">请选择</option>' +
                '<option value="1">双膦酸盐类</option>' +
                '<option value="2">降钙素类</option>' +
                '<option value="3">雌激素类</option>' +
                '<option value="4">选择性雌激素受体调节剂</option>' +
                '<option value="5">RANKL抑制剂</option>' +
                '<option value="6">甲状旁腺激素类似物</option>' +
                '<option value="7">锶盐</option>' +
                '<option value="8">维生素K类</option>' +
                '<option value="9">活性维生素D及其类似物</option>' +
                '<option value="10">中药</option>' +
                '<option value="11">其他</option>' +
                '</select>' +
                '<input type="text" name="ost_2" id="drugCadtegory' + Medicinelength + '" placeholder="请输入其他内容" class="form-control" style="margin-left: 27%; width: 71%; display: none;">' +
                '</div>' +

                '<div class="form-item"><label style="width: 27%;" > <span class="red">*</span>用药时长</label>' +
                '<input  style="width: 30%;" type="number" min="0" name="ost_3" id="p_h2_d1_duration" class="form-control" value="" check="required check0" tip-msg="请选择用药时长">' +
                '<label  style="width: 11%;" > <span class="red">*</span>单位</label>' +
                '<select style="width: 30%;"  name="ost_4" id="p_h2_d1_duration_unit" class="form-control" check="required" tip-msg="请选择用药时长">' +
                '<option value="">请选择</option>' +
                '<option value="1">天</option>' +
                '<option value="2">周</option>' +
                '<option value="3">月</option>' +
                '<option value="4">年</option>' +
                '</select></div>' +
                '</div>' +
                '<div class="form-item"><label style="width: 27%;" > <span class="red">*</span>是否规律用药</label>' +
                '<select style="width: 30%;" onchange="selectgl(this,' + Medicinelength + ')" name="ost_5" id="p_h2_d1_regular" class="form-control" check="required" tip-msg="请选择是否规律用药">' +
                '<option value="">请选择</option>' +
                '<option value="1">是</option>' +
                '<option value="0">否</option>' +
                '</select>' +
                ' <input type="text" name="ost_chenk" id="ost_chenk' + Medicinelength + '" placeholder="请描述原因" class="form-control" style="display: none;width:41%">' +
                // '<input type="radio" name="h2_d1_regular" value="1" id="">是'+
                // '<input type="radio" name="h2_d1_regular" value="0" id="">否'+
                '</div>' +
                '</form></td>' +
                '</tr>'
            $(key).append(str);
        } else {
            layer.msg("最多新增4条历史 请认真填写。");
            return false;
        }
    }
    if (type == "s2") {
        addHormonelength++;
        if ($("#addHormone .p_fracture_list").length < 5) {
            str = '<tr class="p_fracture_list">' +
                // '<td class="text-center"></td>' +
                '<td colspan="6"><button class="btn btn-danger btn-sm text-center" type="button" onclick="delSpoMedicine(this)"><span class="glyphicon glyphicon-minus"></span></button>' +
                '<form>' +
                '<div class="form-inline">' +
                '<div class="form-item"><label style="width: 27%;" > <span class="red">*</span>药品类别</label>' +
                '<select name="ren_1" id="p_h2_d2_type" onchange="selectYwType2(this,' + addHormonelength + ')" style="width:50%" class="form-control" check="required" tip-msg="请选择药品类别">' +
                '<option value="">请选择</option>' +
                '<option value="1">泼尼松</option>' +
                '<option value="2">泼尼松龙</option>' +
                '<option value="3">甲泼尼龙</option>' +
                '<option value="4">曲安西龙</option>' +
                '<option value="5">地塞米松</option>' +
                '<option value="6">氢化可的松</option>' +
                '<option value="7">可的松</option>' +
                '<option value="8">得宝松</option>' +
                '<option value="9">其他</option>' +
                '</select>' +
                '<input type="text" name="ren_2" id="drugCadtegory2_' + addHormonelength + '" placeholder="请输入其他内容" class="form-control" style="display: none;width: 50%;margin-left: 27%;">' +
                '</div>' +
                '<div class="form-item">' +
                '<label style="width: 27%;" > <span class="red">*</span>初始用药剂量</label>' +
                '<input type="number" name="ren_3" min="0" class="form-control" id="p_h2_d2_dose_start" value="" check="required check1" tip-msg="请输入初始用药剂量">mg/d' +
                '</div>' +
                '<div class="form-item">' +
                '<label style="width: 27%;" > <span class="red">*</span>目前用药剂量</label>' +
                '<input type="number" name="ren_4" min="0" class="form-control" id="p_h2_d2_dose_current" value="" check="required check1" tip-msg="请输入目前用药剂量">mg/d</div>' +

                '<div class="form-item"><label style="width:27%"> <span class="red">*</span>用药时长</label>' +
                '<input type="number" name="ren_5" min="0" id="p_h2_d2_duration" class="form-control" value="" check="required" tip-msg="请输入用药时长">' +
                '<label> <span class="red">*</span>单位</label>' +
                '<select name="ren_6" d="p_h2_d2_duration_unit" class="form-control" check="required check0" tip-msg="请输入用药时长">' +
                '<option value="">请选择</option>' +
                '<option value="1">天</option>' +
                '<option value="2">周</option>' +
                '<option value="3">月</option>' +
                '<option value="4">年</option>' +
                '</select>' +
                '</div>' +
                '<div class="form-item"><label style="width:27%"> <span class="red">*</span>用药方式</label>' +
                '<select name="ren_7" id="p_h2_d2_usage" onchange="selectYwType3(this,' + addHormonelength + ')" class="form-control" check="required" tip-msg="请输入用药方式">' +
                '<option value="">请选择</option>' +
                '<option value="1">口服</option>' +
                '<option value="2">静脉</option>' +
                '<option value="3">肌肉</option>' +
                '<option value="4">外用</option>' +
                '<option value="5">鼻喷</option>' +
                '<option value="6">点眼</option>' +
                '<option value="7">其他</option>' +
                '</select>' +
                '<input type="text" name="ren_8" id="drugCadtegory3_' + addHormonelength + '" placeholder="请输入其他内容" class="form-control" style="display: none;">' +
                '</div>' +
                '</div>' +
                '</form>' +
                '</td>' +
                '</tr>'
            $(key).append(str);
        } else {
            layer.msg("最多新增4条历史 请认真填写。");
            return false;
        }
    }

}

function Ztcheck1(val,k){ 
    $(".h3_a_3"+k+"_check_child").hide();//隐藏 腰椎骨折程度
    $(".h3_a_2"+k+"_check_child").hide();//隐藏 胸椎骨折程度
    gzCheckBus(val); 
} 
function Szcheck1(val){ gzCheckBus(val);} 
function Xzcheck1(val){ gzCheckBus(val);} 
function Ztcheck(val){ gzCheckBus(val);} 
function Szcheck(val){ gzCheckBus(val);} 
function Xzcheck(val){gzCheckBus(val);}
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

// function Ztcheck1(val,k){
//     let val1=val
//     let Ztclasss= document.getElementsByClassName('Ztclass'+k)
//     if(val1.checked){
//         for(let i=0;i<Ztclasss.length;i++){
//             Ztclasss[i].style.display='block';
//         }
//     }else{
//     for(let i=0;i<Ztclasss.length;i++){
//         Ztclasss[i].style.display='none';
//     }	
//     }
// }
	 
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
// function Ztcheck(val,k){
//             let val1=val
//             let Ztclass1=document.getElementsByClassName('Ztclass1'+k)
//             if(val1.checked){
//                 for(let i=0;i<Ztclass1.length;i++){
//                     Ztclass1[i].style.display='block'
//                 }
                
//             }else{
//                 for(let i=0;i<Ztclass1.length;i++){
//                     Ztclass1[i].style.display='none'
//                 } 
//                 }
            
// }
    

// function Szcheck(val,k){
// let val3=val
//             let Szclass=document.getElementsByClassName('Szclass1'+k)
//     if(val3.checked){
//                 for(let i=0;i<Szclass.length;i++){
//                     Szclass[i].style.display='block'
//                 }
                
//     }else{
//         for(let i=0;i<Szclass.length;i++){
//                     Szclass[i].style.display='none'
//                 } 
//                 }
// }

// function Xzcheck(val,k){
//             let val5=val
//             let Xzclass=document.getElementsByClassName('Xzclass1'+k)
//             if(val5.checked){
//                         for(let i=0;i<Xzclass.length;i++){
//                             Xzclass[i].style.display='block'
//                         }
                        
//             }else{
//                 for(let i=0;i<Xzclass.length;i++){
//                             Xzclass[i].style.display='none'
//                         } 
//                         }
            
// }



function Qtcheck1(val){ 
    // let val6=val
    // let h3zid=document.getElementsByClassName('form-control1')
    // if(val6.checked){
    //     for(let i=0;i<h3zid.length;i++){
    //             h3zid[i].style.display='block';
    //         }
    //     }else{
    //         for(let i=0;i<h3zid.length;i++){
    //             h3zid[i].style.display='none';
    //         }
    //         $("#p_h3_z").val("")
    //     }
    $(val).parent().parent().parent().next().find("input").val("")
    if($(val).prop('checked')){
        $(val).parent().parent().parent().next().find("input").show()
    }else{
        $(val).parent().parent().parent().next().find("input").hide();
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
        
        var _is_checked_ = false;
		function deselect(e){
			
			
			var deval=e;
            debugger
			
			
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
		
	//2022-07-20 hty新增代码
	function g3checksubm(e){
		var yunval=e
		var hcval= $("#p_g3_e").val()
		if(parseInt(yunval)<parseInt(hcval)){
			 top.layer.msg("怀孕次数不能小于活产次数,请重新填写!");
			 return false;
				 
		}
		return true;
		
	}		
			
	 function g3ch(e){
		 // check="required"
		 var yunval=e
		 var hcval= $("#p_g3_e").val()
	 
		if(sessionStorage.getItem("verson")=="v2"){
		 if(yunval == '0'){
			 $("#buyunid").show();//不孕不育显示
			 $("#huochanid").hide()//活产隐藏
			 $("#p_g3_e").val('')
			 $("#hcdiv").hide() //活产下面的就不显示
			 $("#p_g3_d").attr("check","required");
			 $("#p_g3_e").attr("check","");
			 addhcNum(0)
			
		 } 
		 if(parseInt(yunval)<parseInt(hcval) &&parseInt(yunval) !=0 ){
			  top.layer.msg("怀孕次数不能小于活产次数,请重新填写!");
			   return false;
			 
		 }
		 
		 
		 else if(parseInt(yunval)>0){
			 $("#buyunid").hide();//不孕不育隐藏
			 $("#huochanid").show()//活产显示
			 $("#p_g3_d").val('')
			 $("#p_g3_d").attr("check","");
			 $("#p_g3_e").attr("check","required");
			 addhcNum(parseInt(hcval))
			
		 }
		 }
		 else{
		 		if(yunval == '0'){
		 				 $("#buyunid").show();//不孕不育显示
		 				 $("#huochanid").hide()//活产隐藏
		 				 $("#p_g3_e").val('')
		 				 $("#hcdiv").hide() //活产下面的就不显示
		 				 $("#p_g3_d").attr("check","");
		 				 $("#p_g3_e").attr("check","");
		 				 addhcNum(0)
		 				
		 		} 
		 		
		 		
		 		
		 		else if(parseInt(yunval)>0){
		 				 $("#buyunid").hide();//不孕不育隐藏
		 				 $("#huochanid").show()//活产显示
		 				 $("#p_g3_d").val('')
		 				 $("#p_g3_d").attr("check","");
		 				 $("#p_g3_e").attr("check","");
		 				 //addhcNum(parseInt(hcval))
		 				
		 		} 
		 }
	 }
	 function hcCheck(e){
		     var hcval=e
		 	 var yunval=$("#p_g3_c").val()
		 	 console.log(yunval)
		 	 if(parseInt(hcval)>parseInt(yunval)){
		 		  top.layer.msg("活产次数不能大于怀孕次数,请重新填写!");
		 
		 		 return false;
		 	 }
		return true;	 
	 } 
	 
	 function hccheng(e){
		 if(sessionStorage.getItem("verson")=="v2"){
		 var hcval=e.value;
		 var yunval=$("#p_g3_c").val()
		 console.log(yunval)
		 if(parseInt(hcval)>parseInt(yunval)){
			  top.layer.msg("活产次数不能大于怀孕次数,请重新填写!");
	   //       $(e).val("")
			 // $(e).select()
			 // $("#hcdiv").hide()
			 return false;
		 }else if(hcval == 0 ){
			$("#hcdiv").hide() 
			addhcNum(parseInt(hcval))  
		 }
		   else{
			 $("#hcdiv").show()
			addhcNum(parseInt(hcval)) 
		 }
		 
		} 
	 }
			  
	function addhcNum(e){
	 
		var total = $("#p_g3_list tbody").children().length;
		
		if(e < total){ ///删除
		    var _temp = total -e;
			while( _temp-- != 0 ){
				$("#p_g3_list tbody").children().last().remove();
			}
			
		}else  { // 添加 
			for( var i=parseInt(total)+1; i<= e; i++ ){
				 $("#hcdiv").show()
			$("#p_g3_list").append(
			'<tr id="hc_'+i+'" class="chuochan-content">'+
				   '<td style="width:90px;"><span class="red">*</span>活产第'+i+'胎:</td>'+
				   '<td colspan="5">'+
				   '<div id="" class="input-inline" style="display: initial;">'+					
					'<label style="width: 62px;"><span class="red">*</span>性别</label>'+
					'<select name="g3_e1_'+i+'" id="p_g3_e1_'+i+'" class="form-control input-inline p_select_null" check="required" tip-msg="请填写活产第'+i+'胎孩子性别">'+
					'<option value="">请选择</option>'+
					'<option value="男">男</option>'+
					'<option value="女">女</option>'+
					'<option value="双胎">双胎</option>'+
                    '<option value="三胎及以上">三胎及以上</option>'+
					'</select>'+
					'</div> </br>'+
					'<div class="input-inline" style="display: initial;" >'+
					'<label style="width: 62px;"><span class="red">*</span>生日</label>'+
					'<select name="g3_e2_'+i+'" id="p_g3_e2_'+i+'" class="form-control input-inline p_select_null" check="required" onchange="birthy('+i+')" tip-msg="请填写活产第'+i+'胎孩子出生年">'+
					
					'</select>年'+
			        '</div>'+
					'<div class="input-inline" style="display: none;">'+
					'<select name="g3_e3_'+i+'" id="p_g3_e3_'+i+'" class="form-control input-inline p_select_null"  onchange="birthy('+i+')" tip-msg="请填写活产第'+i+'胎孩子出生月">'+
					'<option value="">请选择</option>'+
					'<option value="01">01</option>'+
					'<option value="02">02</option>'+
					'<option value="03">03</option>'+
					'<option value="04">04</option>'+
					'<option value="05">05</option>'+
					'<option value="06">06</option>'+
					'<option value="07">07</option>'+
					'<option value="08">08</option>'+
					'<option value="09">09</option>'+
					'<option value="10">10</option>'+
					'<option value="11">11</option>'+
					'<option value="12">12</option>'+
					'</select>月</br>'+
																					
					'</div>'+
					'<div class="input-inline" style="display: initial;" >'+
					'<label style="width: 62px;"><span class="red">*</span>是否早产</label>'+
					'<select name="g3_e4_'+i+'" id="p_g3_e4_'+i+'" class="form-control input-inline p_select_null" check="required" tip-msg="请选择活产第'+i+'胎孩子是否为早产">'+
					'<option value="">请选择</option>'+
					'<option value="是,孕不足37周">是,孕不足37周</option>'+
					'<option value="否">否</option>'+
					'<option value="不清楚">不清楚</option>'+
					'</select>'+
																				
					'</div>	'+
																			
					'<div class="input-inline">'+
					'<label style="width: 62px;"><span class="red">*</span>哺乳时长</label>'+
					'<input type="text" name="g3_e5_'+i+'" id="p_g3_e5_'+i+'" class="form-control input-inline "  style="width: 80px;" onchange="lactationch(this.value,'+i+')" check="required g3_e5_'+i+'" tip-msg="请填写活产第'+i+'胎孩子哺乳时长">月'+
																				
					'</div>'+															 
					'</td>'+
					'</tr>'
			
			
			)
			
			initYearSelect("#p_g3_e2_"+i)
			}
			
			
		}
		
		
	}	
		  
function initYearSelect(el) {

		    $(el).html();
		    var date = new Date();
		    $(el).append("<option value=''>请选择</option>");
		    for (var i = 1900; i <= date.getFullYear(); i++) {
		        $(el).append("<option value='" + i + "'>" + i + "</option>");
		    }
	}  
		  
			
	//月经初潮年龄校验
	function menarch(){
		var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
		
		var d = new Date();
		var nowYear = d.getFullYear();
		var age = sessionStorage.getItem("age")
		let menval = $("#p_g3_b_age").val()
	 
		if(sessionStorage.getItem("verson")=="v2"){
		if (!pattern.test(menval)) {
			 top.layer.msg("初潮年龄仅允许录入正整数,请重新填写!")
	         $("#p_g3_b_age").val('')
			return false;
		}
		
		if (parseInt(age) < parseInt(menval) ) {
			top.layer.msg("初潮年龄不能大于当前年龄,请重新填写!")
		  $("#p_g3_b_age").val('')
			return false;
		}
		if(parseInt(menval)>20 && parseInt(menval)<36){
			top.layer.msg(" 注意：月经初潮年龄正常填写范围8-20，最大填写范围8-36")
			return true;
		}
		
		if (parseInt(menval)   < 8) {
			top.layer.msg(" 注意：月经初潮年龄正常填写范围8-20，最大填写范围8-36 请重新填写!")
			//this.ruleForm.menarche = ''
		  $("#p_g3_b_age").val('')
			return false;
		} else if (parseInt(menval) > 36) {
			top.layer.msg(" 注意：月经初潮年龄正常填写范围8-20，最大填写范围8-36 请重新填写!")
			//this.ruleForm.menarche = ''
		   $("#p_g3_b_age").val('')
			return false;
		}}
		
		
		return true;	
		
		
		}
		
	function menarchsubmit(){
		  
		  var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
		  	var d = new Date();
		  	var nowYear = d.getFullYear();
		  	var age = sessionStorage.getItem("age")
		  	let menval = $("#p_g3_b_age").val()
		  
		  	if (parseInt(age) < parseInt(menval) ) {
		  		top.layer.msg("初潮年龄不能大于当前年龄,请重新填写!")
		  	    
		  		return false;
		  	}
		
		  	return true;
		  
		  
	}	
		
		
	// 哺乳时长校验
	function lactationch(e,index){
		var pattern = /^(([1-9][0-9]*?[0-9]*)|(([0-9]*))|(0))$/
		if(!pattern.test(e)){
			top.layer.msg(" 注意：哺乳时长仅能输入正整数,活产第"+index+"胎哺乳时长输入错误!")
			return false;
		
		}
		if(parseInt(e) >300){
			top.layer.msg(" 注意：哺乳时长取值范围0-300 月,活产第"+index+"胎哺乳时长输入错误!")
			return false;
		}
		return true;
		
	}
	//孩子活产校验
	function birthy(index){
		var age=sessionStorage.getItem("age")//拿到年龄
		var d = new Date();
 
		var nowYear = d.getFullYear();//拿到当前年份
		var birthynew=parseInt(nowYear)-parseInt(age);//拿到出生年
		var menarval=$("#p_g3_b_age").val();//拿到初潮年龄
		var mageval=$("#p_g2_a_age").val();//拿到绝经年龄
		var menarYearval=parseInt(menarval)+parseInt(birthynew);//月经初潮年
		if(mageval != '' && mageval !=undefined){
			var mageYearval=parseInt(mageval)+parseInt(birthynew);//绝经年
		}
	
	    var year1=$("#p_g3_e2_"+index).val()//当前孩子出生年
	    var year2=$("#p_g3_e2_"+parseInt(index-1)).val()//上一个孩子出生年
	    var moth1=$("#p_g3_e3_"+index).val()//当前孩子出生月
	    var moth2=$("#p_g3_e3_"+parseInt(index-1)).val()//上一个孩子出生月
	    
	
		if(index>1){
			
		if(year1 !=''){
		if(year1 *1 < menarYearval){
			top.layer.msg(" 注意：活产第"+index+"胎孩子出生年不能早于患者月经初潮年,请修改!")
			return false;
		}
		if(mageYearval != undefined && mageYearval !=''){
			if(year1 * 1 > mageYearval){
				top.layer.msg(" 注意：活产第"+index+"胎孩子出生年不能早于患者绝经年,请修改!")
				return false;
			}
		}
		
		
		if(parseInt(year1)<parseInt(year2) ){
		top.layer.msg(" 注意：活产第"+index+"胎孩子出生年月不能早于上一胎孩子出生年月,请修改!")
		return false;
		 }
		//else if(parseInt(year1)==parseInt(year2)){
		// 	if(moth1 *1 == moth2 *1 || moth1 *1 < moth2 *1)
		// 	top.layer.msg(" 注意：活产第"+index+"胎孩子出生年月不能早于上一胎孩子出生年月,请修改!")
		// 	return false;
		// }
		
		}
		}else{
			if(year1 !=""){
			if(year1 *1 < menarYearval){
				top.layer.msg(" 注意：活产第"+index+"胎孩子出生年不能早于患者月经初潮年,请修改!")
				return false;
			}
			if(mageYearval != undefined && mageYearval !=''){
				if(year1 * 1 > mageYearval){
					top.layer.msg(" 注意：活产第"+index+"胎孩子出生年不能早于患者绝经年,请修改!")
					return false;
				}
			}
			}
		}
		return true;
		
	}
	
	function delCheck(e){
		 var gender = sessionStorage.getItem("gender");
		if(e=='v1'){
			$("#p_g3_b_age").attr("check",'');
			$("#p_g3_c").attr("check",'');
		}else if(e=='v2' && gender =='2'){
			$("#p_g3_b_age").attr("check","required p_g3_b_age");
			$("#p_g3_c").attr("check","required");
		}
	}
				
		
		
