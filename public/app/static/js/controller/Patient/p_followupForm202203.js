/**
 * @description 2022年3月，项目二期升级改造新增
 * @param {*} name 
 * @param {*} value 
 */




 //排除需要校验的数据
 owner.excludeValidata = function(){ 
    var  excludeClass=""; 
    var zdtypObj = $('form[id=p_diagnose]').find('input[type=radio]:checked');
       debugger
	        var zdtypObj1 = $("#p_h3_check").val()
     //如果勾选的原发性骨质疏松症伴病理性骨折\继发性骨质疏松症伴病理性骨折
    //if((zdtypObj.attr('name')== "d_d" || zdtypObj.attr('name') == "d_f")){
		
		 if( zdtypObj1 == '1'){
        if($("input[type=checkbox][name=d1FraPart5]").is(':checked')){
            excludeClass += "exclude-gzbw-,";
        }else{  
            if(!$("input[type=checkbox][name=d1FraPart1]").is(':checked')){//如果没有勾选锥体骨折，排除样式
                excludeClass += "exclude-gzbw-ztgz,";
            }else{ //如果勾选了锥体雇主
                if( $("input[type=radio][name=d1Method]:checked").val() =="1"){// 如果勾选了保守，排除手术 class
                        excludeClass += "exclude-gzbw-ztgz-01,";
                }
            }

            if(!$("input[type=checkbox][name=d1FraPart2]").is(':checked')){//如果没有勾选锥体骨折，排除样式
                excludeClass += "exclude-gzbw-wbgz,";
            }else{ //如果勾选了锥体雇主
                if( $("input[type=radio][name=d2Method]:checked").val() =="1"){
                    excludeClass += "exclude-gzbw-wbgz-01,";
                }
            }

            if(!$("input[type=checkbox][name=d1FraPart3]").is(':checked')){//如果没有勾选锥体骨折，排除样式
                excludeClass += "exclude-gzbw-qtgz,";
            }else{ //如果勾选了锥体雇主
                if( $("input[type=radio][name=d3Method]:checked").val() =="1"){
                    excludeClass += "exclude-gzbw-qtgz-01,";
                } 
                if($("input[type=radio][name=d3FraPart1]:checked").val() != "0"){ //没有勾选其他，排除其他输入框内容
                    excludeClass += "exclude-gzbw-qtgz-other,";
                } 
            }
        }
    }else{ //否则 排除所有此次骨折详细信息的校验
        excludeClass = "exclude-gzbw,";
    }
    return excludeClass;
}
   
   
 //根据方法名称动态调用函数(此函数只用于 数据隐藏显示)
 owner.callback = {
    "owner.ckFrapart(this)": function (e) { 
        $(".gzbw-"+$(e).val()).show();
    }, 
    "owner.dMethod(this)": function (e) { 
        if($(e).val() == "2"){ //保守
            $("."+ $(e).attr("name")+"-by-name").show();
        }else{ //手术
            $("."+ $(e).attr("name")+"-by-name").hide(); 
        }  
    },  
        
}

    //代理方式执行onclick方法
    owner.execute = function(dom){
        if($(dom).attr('onclick')){
            owner.callback[$(dom).attr('onclick')](dom);
        }
    }


//根据当前表单中的值来显示其他的输入框
   owner.initByInDomVal = function(){
        var zdtypObj = $('form[id=p_diagnose]').find('input[type=radio]:checked');
		    var zdtypObj1 = $("#p_h3_check").val()
			if(zdtypObj1 == '1'){
        //if((zdtypObj.attr('name')== "d_d" || zdtypObj.attr('name') == "d_f")){
            $(".gz-infor").show();
        } 
        if($("input[type=checkbox][name=d1FraPart1]").is(':checked')){//如果没有勾选锥体骨折，排除样式
            owner.execute($("input[type=checkbox][name=d1FraPart1]"))
        }  
        if($("input[type=checkbox][name=d1FraPart2]").is(':checked')){//如果没有勾选锥体骨折，排除样式
            owner.execute($("input[type=checkbox][name=d1FraPart2]"))
        }  
        if($("input[type=checkbox][name=d1FraPart3]").is(':checked')){//如果没有勾选锥体骨折，排除样式
            owner.execute($("input[type=checkbox][name=d1FraPart3]"))
        }   
        var obj2s = $(".p-ctr-b-zlju").find("input[type=radio][name=d1Method]:checked,input[type=radio][name=d2Method]:checked,input[type=radio][name=d3Method]:checked");
        for(var b =0; b<obj2s.length; b++){owner.execute(obj2s[b]);  }
    }

    
  // 点击 骨折部位
  owner.ckFrapart = function(e){
      if($(e).is(':checked') && $(e).val() == -1){ //勾选了不详,取消其他的勾选
        var _cCheckBoxs = $(e).parent().parent().parent().find("input[type=checkbox]") 
            _cCheckBoxs.prop("checked", false);
            $(e).prop("checked", true);
            $("tr[class*='gzbw-']").hide();
            owner.clearData($("tr[class*='gzbw-']"));
      }else{ //勾选的不是不详，则取消不详勾选
        var _cCheckBoxs = $(e).parent().parent().parent().find("input[type=checkbox][value=-1]");
            _cCheckBoxs.prop("checked", false);
            if( $(e).is(':checked') == true){
                $(".gzbw-"+$(e).val()).show();
            }else{
                $(".gzbw-"+$(e).val()).hide();
                $(".gzbw-"+$(e).val()+"-other").css('display', 'none');
                owner.clearData(".gzbw-"+$(e).val()+"-other");
                owner.clearData(".gzbw-"+$(e).val());
            }
      } 
  }


    //此次骨折详细信息--> (椎体骨折、髋部骨折、其他部位骨折)  -->治疗方式(保守、手术)
    owner.dMethod = function(e){
        owner.execute(e);
        if($(e).val() == "1"){ //保守 
            owner.clearData("."+ $(e).attr("name")+"-by-name");
        }  
    }  



    owner.clearData = function(clezzs){
            clearRadioCheck(clezzs);
            clearCheckCheck(clezzs);
            clearTextCheck(clezzs);
    }

    owner.getFormData = function(clazzs){
       var obj = new Object;
       var checks = $(clazzs).find("input[type='radio'] ,input[type='checkbox']");
        $.each(checks , function(index , ckObj){
            if($(ckObj).is(":checked")){
                obj[$(ckObj).attr('name')] = $(ckObj).val();
            }else{
                if(!obj[$(ckObj).attr('name')]){
                    obj[$(ckObj).attr('name')] = "";
                } 
            }
          
        }); 
        var texts = $(clazzs).find("input[type='text'],input[type='number']");
        $.each(texts , function(index , text){ 
           obj[$(text).attr('name')] = $(text).val();
        });
        return obj;
    }


function clearRadioCheck(clazzs){
       var radios = $(clazzs).find("input[type='radio']")
        $.each(radios , function(index , radio){
           $(radio).prop("checked", false);
        })
}

function clearCheckCheck(clazzs){
       var checkboxs = $(clazzs).find("input[type='checkbox']")
        $.each(checkboxs , function(index , checkbox){
           $(checkbox).prop("checked", false);
        })
}

function clearTextCheck(clazzs){
       var texts = $(clazzs).find("input[type='text']")
        $.each(texts , function(index , text){
           $(text).val("");
        })
}

 //QCT骨密度检查 
 function qctClick(e){
    if($(e).val() == '0'){
        $(".in-qct-form-data").hide();
        owner.clearData(".in-qct-form-data");
    }else{
        $(".in-qct-form-data").show();
    }
    $("#qct3Id").hide();
}

function clkOther(e){
    if($(e).val() == '0'){
        $("#"+$(e).attr('name')+"Id").show();
    }else{
        $("#"+$(e).attr('name')+"Id").hide();
        $("#"+$(e).attr('name')+"Id").val("");
    }
}

