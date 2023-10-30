var loadmsg = top.layer.msg('努力中加载中...', { icon: 16, shade: [1, '#000000'], scrollbar: false, time: 3000 });
$(function() {
    var dataName = decodeURI(getUrlParams("pid"));
    if (dataName != "") {
        userJson = JSON.parse(dataName);
        $("#nav_title").text(userJson.title);
        if (userJson.type == "info") {
            ajaxCommon("diagnose/detial", { "dgId": userJson.dgId, "apid": userJson.apid, }, initInfo, "", "")
        } else {
            initInfo("")
        }
    }
    $("#myTab li").find("a").click(function() {
        var id = $(this).attr("href");
        $("#p_page_href").val(id);
    });
    initGender("#p_gender");
    top.layer.close(loadmsg);
});

// 根据男女进行婚育史的显示隐藏
function initGender(el) {
    var gender = sessionStorage.getItem("gender");
    if (gender == 1) {
        $(el).hide();
    } else {
        $(el).show();
    }
}

// 初始化 信息
function initInfo(el, data) {
    if (!data) {
        $("#p_page1_v1").append("<td>身高：" + '无' + "</td><td>体重：" + '无' + "</td><td>BMI：" + '无' + "</td>");
        $("#p_page1_s1").append("<td>既往史：" + '无' + "</td><td>用药史：" + '无' + "</td><td>骨折史：" + '无' + "</td>");
        $("#p_page1_s2").append("<td>个人史：" + '无' + "</td><td>手术史：" + '无' + "</td><td>家族史：" + '无' + "</td>");
        $("#p_page1_v2").text("无");
        $("#p_page1_v3").text("无");
        $("#p_page1_v4").text("无");
    } else {
        var page1 = data.page1;
        var page2 = data.page2;
        var page3 = data.page3;
        var page4 = data.page4;
        /* $("#p_page1_v2").append("<textarea class='form-control' readonly='readonly'>"+page1.v2+"</textarea>");
            for (var index = 0; index < page1.v3.length; index++) {
              $("#p_page1_v3").append("<p>"+page1.v3[index]+"</p>");
            }
            $("#p_page1_v4").append("<textarea class='form-control' readonly='readonly'>"+page1.v4+"</textarea>");
            $("#p_page1_v1").append("<td>"+page1.v1[0]+"</td><td>"+page1.v1[1]+"</td><td>"+page1.v1[2]+"</td>")
           if(data.s1){
            for (var k = 0; k < data.s1.length; k++) {
             if(k<3){
              $("#p_page1_s1").append("<td>"+data.s1[k]+"</td>");
             }else{
              $("#p_page1_s2").append("<td>"+data.s1[k]+"</td>");
             }
           }
           }  */

        var fraxdata=page4.fraxdata
            if(fraxdata != undefined){
				$("#GzInFo").html("");
				for (var index = 0; index < fraxdata.length; index++) {
				    $("#GzInFo").append("<p style=\"margin-top:15px\">" + fraxdata[index]+ "</p>");
				        	
				}
			}
        
        // }}
        
           var qctinfo=page4.QCT;
           console.log(qctinfo)
           if(qctinfo !=undefined){
        	   if( qctinfo.qct1=='0'){
        	   			   $("#qct").append("<p><strong>QCT骨密度检查:</strong><span>否</span></p>")
        	   			 
        	    }else{
        	   			
        	   			if(qctinfo.qct3Other != ""){
        	   			
        	   			$("#qct").append('<p><strong>QCT骨密度检查</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>检查日期:</strong>&nbsp;&nbsp;'+qctinfo.qct2+'&nbsp;&nbsp;<strong>机器型号:</strong>&nbsp;&nbsp;'+qctinfo.qct3Other+'</p>')  
        	   			$("#qct").append('<p><strong> 髋部 (左侧)</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct5+'</td><td>T值:</td><td>'+qctinfo.qct6+'</td><td>Z值:</td><td>'+qctinfo.qct7+'</td></tr> </p>') 
        	   			$("#qct").append('<p><strong> 髋部 (右侧)</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct9+'</td><td>T值:</td><td>'+qctinfo.qct10+'</td><td>Z值:</td><td>'+qctinfo.qct11+'</td></tr> </p>') 
        	   			$("#qct").append('<p><strong> 腰椎（平均值）</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct13+'</td><td>T值:</td><td>'+qctinfo.qct14+'</td><td>Z值:</td><td>'+qctinfo.qct15+'</td></tr> </p>') 
        	   			 }else if(qctinfo.qct3== "1"){
        	   				 $("#qct").append('<p><strong>QCT骨密度检查</strong>&nbsp;&nbsp;&nbsp;&nbsp;<strong>检查日期:</strong>&nbsp;&nbsp;'+qctinfo.qct2+'&nbsp;&nbsp;<strong>机器型号:</strong>&nbsp;&nbsp;Mindways QCT</p>')
        	   				 $("#qct").append('<p><strong> 髋部 (左侧)</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct5+'</td><td>T值:</td><td>'+qctinfo.qct6+'</td><td>Z值:</td><td>'+qctinfo.qct7+'</td></tr> </p>') 
        	   				 $("#qct").append('<p><strong> 髋部 (右侧)</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct9+'</td><td>T值:</td><td>'+qctinfo.qct10+'</td><td>Z值:</td><td>'+qctinfo.qct11+'</td></tr> </p>') 
        	   				 $("#qct").append('<p><strong> 腰椎（平均值）</strong></br><tr><td>骨密度 (g/cm3)#:</td><td>'+qctinfo.qct13+'</td><td>T值:</td><td>'+qctinfo.qct14+'</td><td>Z值:</td><td>'+qctinfo.qct15+'</td></tr> </p>') 
        	   			 } 
        	   			  
        	   }
           }else if(qctinfo==undefinedsss){
        	      $("#qct").append("<p><strong>QCT骨密度检查:</strong><span>否</span></p>")
           }
         
        		



        $.each(data, function(name, value) {
            if (name == "page4") {
                $.each(value, function(name1, value1) {
                    if (isObject(value1)) {
                        $.each(value1, function(name2, value2) {
                            if (name2 == "value") {
                                initHistory3(name2, value2);
                            }
                            if (isArray(value2)) {
                                if (value2.length > 0) {
                                    for (var j = 0; j < value2.length; j++) {
                                        if (isArray(value2[j].value) && value2[j].value.length > 0) {
                                            $("#p_" + name + "_" + name1 + "_" + name2).append("<div style='border-bottom:1px solid #ccc;padding:10px 0px;'><p>" + value2[j].name + "</p><div id='p_" + name + "_" + name1 + "_list__" + j + "'></div></div>");
                                            //$("#p_"+name+"_"+name1+"_"+name2).append("<p>"+value2[j].name+"</p><p>"+value2[j].value+"</p>");
                                            for (var k = 0; k < value2[j].value.length; k++) {
                                                $("#p_" + name + "_" + name1 + "_list__" + j).append("<p>" + value2[j].value[k] + "</p>");
                                            }
                                        } else {
                                            $("#p_" + name + "_" + name1 + "_" + name2).append("<p>" + value2[j].name + "</p>");
                                        }
                                        //$("#p_"+name+"_"+name2).append("<p>"+value2[j]+"</p>");
                                    }
                                }
                            } else {
                                $("#p_" + name + "_" + name1 + "_" + name2).append("<span>" + value2 + "</span>");
                            }

                        });
                    } else {
                        if (value1 == "") {
                            $("#p_" + name + "_" + name1).text("暂无检查");
                        } else {
                            $("#p_" + name + "_" + name1).text(value1);
                        }
                    }
                });
            }
            if (name != "page1" && name != "page4") {
                $.each(value, function(name1, value1) {
                    //console.log("name1"+name1+":"+value1);
                    if (isArray(value1)) {
                        if (value1.length > 0) {
                            for (var i = 0; i < value1.length; i++) {
                                if (value1[i].value) {
                                    $("#p_" + name + "_" + name1).append("<div style='border-bottom:1px solid #ccc;padding:10px 0px;'><p>" + value1[i].name + "</p><p>" + value1[i].value + "</p></div>");
                                } else {
                                    if (name1 == "history_4") {
                                        $("#p_" + name + "_" + name1).append("<p>" + value1[i] + "</p>");
                                    } else {
                                        $("#p_" + name + "_" + name1).append("<p>" + value1[i].name + "</p>");
                                    }
                                }
                            }
                        } else {
                            $("#p_" + name + "_" + name1).append("<p>" + value1 + "</p>");

                        }

                    } else if (isObject(value1)) {
                        $.each(value1, function(name2, value2) {
                            //console.log("name2"+name2+":"+value2);
                            if (name2 == "history_3") {
                                console.log(value2);
                                initHistory3(name2, value2);
                            }
                            if (name2 == "name1") {
                                $("#p_" + name + "_" + name1 + "_" + name2).append("<p>" + value2 + "</p>");
                            }
                            if (isArray(value2)) {
                                for (var j = 0; j < value2.length; j++) {
                                    if (value2[j].value) {
                                        $("#p_" + name + "_" + name1).append("<div style='border-bottom:1px solid #ccc;padding:10px 0px;'><p>" + value2[j].name + "：</p><p>" + value2[j].value + "</p></div>");
                                    } else {
                                        $("#p_" + name + "_" + name1).append("<div style='border-bottom:1px solid #ccc;padding:10px 0px;'><p>" + value2[j].name + "</p></div>");
                                    }
                                    //$("#p_"+name+"_"+name2).append("<p>"+value2[j]+"</p>");
                                }
                            } else {
                                $("#p_" + name + "_" + name1).append("<div style='border-bottom:1px solid #ccc;padding:10px 0px;'><p>" + value2 + "</p></div>");
                            }

                        });
                    } else {
                        if (value1 == "") {
                            $("#p_" + name + "_" + name1).text("暂无检查");
                        } else {
                            $("#p_" + name + "_" + name1).text(value1);
                        }
                    }
                });
            } else {
                $.each(value, function(p1name, p1value) {
                    if (isArray(p1value)) {
                        for (var i = 0; i < p1value.length; i++) {
                            $("#p_" + name + "_" + p1name).append("<p>" + p1value[i] + "</p>");
                        }
                    } else if (isObject(p1value)) {
                        $.each(p1value, function(p1name2, p1value2) {
                            if (isArray(p1value2)) {
                                for (var k = 0; k < p1value2.length; k++) {
                                    console.log(p1value2);

                                    $("#p_" + name + "_" + p1name2).append("<p>" + (JSON.stringify(p1value2[k])).replace(/\{|\}|\"/g, "") + "</p>");
                                }
                            } else {
                                if (p1value2 == "") {
                                    $("#p_" + name + "_" + p1name2).text("无");
                                } else {
                                    $("#p_" + name + "_" + p1name2).text(p1value2);
                                }
                            }
                        });
                    } else {
                        if (p1name == "h2") {
                            var h2Val = p1value.split(";");
                            if (p1value != "无") {
                                var h2Val = p1value.split(";");
                                for (var hIndex = 0; hIndex < h2Val.length; hIndex++) {
                                    $("#p_" + name + "_" + p1name + "_" + hIndex).text(h2Val[hIndex]);
                                }
                            } else {
                                for (var hhIndex = 0; hhIndex < 5; hhIndex++) {
                                    $("#p_" + name + "_" + p1name + "_" + hhIndex).text("无");
                                }
                            }

                        }
                        $("#p_" + name + "_" + p1name).text(p1value);
                    }
                });
            }
        })

    }
}

// 信息回显骨折史
function initHistory3(key, data) {
    var str;
    $("#p_page4_history_3__value").html("");
    for (var index = 0; index < data.length; index++) {
        $("#p_page4_history_3__value").append("<p>" + data[index].name + "</p><div id='p_page4_history_3__value_" + index + "'></div>");
        for (var i = 0; i < data[index].value.length; i++) {
            if (data[index].value[i].value == "") {
                $("#p_page4_history_3__value_" + index).append("<p>" + data[index].value[i] + ":" + "无" + "</p>")
            } else {
                $("#p_page4_history_3__value_" + index).append("<p>" + data[index].value[i] + "</p>")

            }
        }
    }
}
// 点击修改跳转修改界面
function tabsParentSrc() {
    var fram = parent.document.getElementById("p_p_page1_iframe");
    var hrefId = $("#p_page_href").val();
    var id = hrefId.replace('#', '');
    var json = JSON.stringify({ "pid": userJson.pid, "dgId": userJson.dgId, "dgtype": userJson.dgtype, "apid": userJson.apid, "href": id, "title": userJson.title, "type": "update" });
    //fram.src="./p_diagnosisForm.html?pid="+json;//Iframe--SRC
    var src = "./p_diagnosisForm.html?pid=" + json;
    window.open(src, '_self');
}
// 点击返回按钮返回
function backLeft() {
    var json = JSON.stringify({ "pid": userJson.pid, "page": "p_page1" });
    //fram.src="./p_diagnosisForm.html?pid="+json;//Iframe--SRC
    var src = "./p_diagnosis.html?pid=" + json;
    window.open(src, '_self');
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

function isArray(obj) {
    return (typeof obj == 'object') && obj.constructor == Array;
}

function isObject(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
}

function isString(obj) {
    return (typeof obj == 'string') && obj.constructor == String;
}

