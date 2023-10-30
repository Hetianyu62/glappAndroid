/**
 * Created by Administrator on 2018/5/2.
 */
var defaults = {
    /*
     * 正则表达式
     * */

    reg_username: /^[a-zA-Z0-9_-]{4,16}$/, //用户名
    //reg_password: /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,  //密码
    reg_password: /^[a-zA-Z0-9]{4,10}$/,
    reg_email: /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i, //验证邮箱
    reg_qq: /^[1-9]\d{4,9}$/, // 验证qq
    reg_num: /^\d{0,4}$/, //验证数字
    reg_chinese: /^[\u4E00-\u9FA5]+$/, //验证中文
    reg_mobile: /^1[3456789]{1}[0-9]{9}$/, //验证手机
    reg_idcard: /^\d{14}\d{3}?\w$/, //验证身份证
    reg_passport: /^[a-zA-Z0-9]{3,21}$/, // 验证护照
    reg_OfficerCard: /^[a-zA-Z0-9]{7,21}$/, // 验证军官证
    reg_medicine: /^[a-zA-Z0-9]{2}$/, // 验证冰箱号  必须两位数字或者字母
    reg_medicinec: /^[1-9]{1}$/, // 验证层数/冰箱号  必须0-9数字
    reg_medicinej: /^[1-9]{1}$/, // 验证架子数/层  必须0-9数字
    reg_medicineh: /^([1-9]\d|\d)$/, // 验证架子数/层  必须0-99数字
    reg_check0: /^(\+?[1-9][0-9]*)$/, // 验证是否为正整数
    reg_check1: /^\d+(.?\d{1,3})?$/, //正数，允许录入三位小数
    reg_check2: /^0\.\d{1,2}$|^0\.[1-9]\d{1,2}$|^[1-9](\.\d{1,2})?$|^[1-9]\d(\.\d{1,2})?$/, //正数，允许录入两位小数，不允许录入0或负数
    reg_check3: /^(\+?[0-9][0-9]*)$/, // 验证是否为正整数
    reg_check5: /^0\.\d{1,3}$|^0\.[1-9]\d{1,3}$|^[1-9](\.\d{1,3})?$|^[1-9]\d(\.\d{1,3})?$/, //正数，允许录入三位小数，不允许录入0或负数
    reg_check7: /^0\.\d{1,1}$|^0\.[1-9]\d{1,1}$|^[1-9]+(.?\d{1,1})?$|^[1-9]\d+(.?\d{1,1})?$/, // 正数，允许录入一位小数，不允许录入0或负数

    /*
     * 提示信息
     * */
    tips_success: '填写成功', //验证成功时的提示信息，默认为空
    tips_required: '请认真填写',
    tips_username: '用户名格式错误',
    tips_password: '密码不能含有非法字符，长度在4-10之间',
    tips_email: '邮箱地址格式有误',
    tips_qq: 'qq格式有误',
    tips_num: '请填写数字且长度小于4位',
    tips_chinese: '请填写中文',
    tips_mobile: '手机号码格式有误',
    tips_idcard: '身份证号码格式有误',
    tips_pwdequal: '两次密码不一致',
    tips_passport: '护照号码格式有误',
    tips_OfficerCard: '军官证号码有误',
    tips_medicine: '必须两位数字或者字母',
    tips_medicinec: '层数/冰箱号必须0-9数字',
    tips_medicinej: '架子数/层必须0-9数字',
    tips_medicineh: '架子数/层必须0-99数字', //
    tips_weight: '体重填写范围（15.0-150.0），允许录入一位小数请核实!',
    tips_height: '身高填写范围（100.0-220.0），允许录入一位小数请核实!',
    tips_drinkTotal: '饮酒量总和需大于0',
    tips_check0: '请输入正整数',
    tips_check1: '请输入正数，允许录入三位小数',
    tips_check2: '请输入正数，允许录入两位小数，不允许录入0或负数',
    tips_check3: '请输入0或正整数',
    tips_check5: '请输入正数，允许录入三位小数，不允许录入0或负数',

    /*
     * 提示成功消息图标
     * */
    icon_success: 'glyphicon glyphicon-ok-sign',
    icon_error: 'glyphicon glyphicon-remove-sign',
}
var reg_check2 = /^0\.\d{1,2}$|^[1-9]+(.?\d{1,2})?$|^[1-9]\d+(.?\d{1,2})?$/ //正数，允许录入两位小数，不允许录入0或负数
var reg_check3 = /^0\.\d{1,3}$|^[1-9]+(.?\d{1,3})?$|^[1-9]\d+(.?\d{1,3})?$/ //正数，允许录入三位小数，不允许录入0或负数
var reg_check4 = /^[\-\+]?\d+(\.\d)?$/ //允许录入一位小数 可为正数 负数 以及0
var reg_check5 = /^[1-9]\d*$/ //正整数，不允许录入负数或0或小数
var reg_check6 = /^\d.\d$|^\d/ //正数，允许录入0和小数，不允许录入负数
var reg_check7 = /^0\.\d{1,1}$|^0\.[1-9]\d{1,1}$|^[1-9]+(.?\d{1,1})?$|^[1-9]\d+(.?\d{1,1})?$/ // 正数，允许录入一位小数，不允许录入0或负数
var reg_check8 = /^[0-9]\d*$/ //整数，允许录入0，不允许录入小数或负数
var reg_check9 = /^0\.\d$|^0\.[1-9]\d}$|^[1-9]+(.?\d)?$|^[1-9]\d+(.?\d)?$/ //正数，允许录入小数，不允许录入0或负数
var reg_check10 = /^[\-\+]?\d?$/ //允许录入正数、负数、0
var CybVerification = {
    Form: function(ele) {
        var input = $(ele).find('input')
        var _this = this
        var pwd1
        var arr = {}
        var isok = false //控制表单提交的开关
            /*
             * 遍历失去焦点进行验证
             * */
        $(
                "input[type='text'],input[type='password'],input[type='email'],textarea,select"
            ).each(function() {
                $(this).blur(function() {
                    var val = $(this).val()
                    var that1 = $(this)
                    var _validate = $(this).attr('check') //获取check属性的值
                    if (_validate) {
                        var arr = _validate.split(' ') //用空格将其拆分成数组
                        for (var i = 0; i < arr.length; i++) {
                            //逐个进行验证，不通过跳出返回false,通过则继续 !check($(this), arr[i], $(this).val())
                            if (!_this.verification(val, arr[i], that1))
                                return false
                            else continue
                        }
                    }
                    //
                    // var name = $(this).attr("name");
                    // var that = $(this);
                    // _this.verification(val, name, that);
                })
            })
            /*
             *  验证
             * */
        this.verification = function(val, name, that) {
                if (val) {
                    _this.showMsg(that, defaults.tips_success, true)
                    switch (name) {
                        case 'required':
                            return val ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_required, false)

                        case 'username': //用户名
                            return _this.testReg(val, defaults.reg_username) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_username, false)
                            break
                        case 'password': //密码
                            pwd1 = val
                            return _this.testReg(val, defaults.reg_password) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_password, false)
                            break
                        case 'password2':
                            return _this.confirmPass(val, pwd1) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_pwdequal, false)
                            break
                        case 'email': //邮箱
                            return _this.testReg(val, defaults.reg_email) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_email, false)
                            break
                        case 'mobile': // 手机号
                            return _this.testReg(val, defaults.reg_mobile) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_mobile, false)
                            break
                        case 'idcard': // 身份证号
                            return _this.testReg(val, defaults.reg_idcard) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_idcard, false)
                            break
                        case 'num': // 数字
                            return _this.testReg(val, defaults.reg_num) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_num, false)
                            break
                        case 'chinese': // 中文
                            return _this.testReg(val, defaults.reg_chinese) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_chinese, false)
                            break
                        case 'passport': // 护照
                            return _this.testReg(val, defaults.reg_passport) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_passport, false)
                            break
                        case 'OfficerCard': // 军官证
                            return _this.testReg(val, defaults.reg_OfficerCard) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(
                                    that,
                                    defaults.tips_OfficerCard,
                                    false
                                )
                            break
                        case 'medicine': // 冰箱号
                            return _this.testReg(val, defaults.reg_medicine) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_medicine, false)
                            break
                        default:
                            return true
                    }
                } else {
                    _this.showMsg(that, defaults.tips_required, false)
                }
            }
            /*
             * 验证两次密码是否输入一直
             *
             * */
        this.confirmPass = function(pass1, pass2) {
                return pass1 == pass2 ? true : false
            }
            /*
             * submit  提交
             * */
        this.submit = function() {
            isok = true
            $(
                "input[type='text'],input[type='password'],input[type='email'],textarea,select"
            ).each(function() {
                var val = $(this).val()
                var that1 = $(this)
                var _validate = $(this).attr('check') //获取check属性的值
                if (_validate) {
                    var arr = _validate.split(' ') //用空格将其拆分成数组
                    for (var i = 0; i < arr.length; i++) {
                        if (!_this.verification(val, arr[i], that1)) {
                            isok = false //验证不通过阻止表单提交，开关false
                            return //跳出
                        }
                    }
                }
                /* var val1 = $(this).val();
                var name1 = $(this).attr("name");
                var that1 = $(this);
                if (!_this.verification(val1, name1, that1)) {
                  isok = false; //验证不通过阻止表单提交，开关false
                  return; //跳出
                } */
            })
            return isok
        }

        /*
         *
         * 获取表单数据
         * */
        this.getData = function() {
                $(
                    "input[type='text'],input[type='password'],input[type='email'],textarea"
                ).each(function() {
                    var val1 = $(this).val()
                    var name1 = $(this).attr('name')
                    var that1 = $(this)
                    if (val1) {
                        arr[name1] = val1
                    }
                })
                return arr
            }
            /**
             *  错误消息提示
             */

        this.showMsg = function(obj, msg, mark) {
            $(obj)
                .next('#errormsg')
                .remove() //先清除
            var _html =
                "<div id='errormsg' style='font-size:13px;margin:0px 0px 0px 0px;color: #a94442'><span class='" +
                defaults.icon_error +
                "'></span>&nbsp;&nbsp;&nbsp;" +
                msg +
                '</div>'
            if (mark)
                _html =
                "<div id='errormsg' style='font-size:13px;margin:0px 0px 0px 0px;color: #1ab394'><span class='" +
                defaults.icon_success +
                "'></span>&nbsp;&nbsp;&nbsp;" +
                msg +
                '</div>'
            $(obj).after(_html) //再添加
            return mark
        }

        /**正则校验* */
        this.testReg = function(str, reg) {
            return reg.test(str)
        }
    },
    SampleForm: function(ele) {
        var input = $(ele).find('input')
        var _this = this
        var pwd1
        var arr = {}
        var isok = false //控制表单提交的开关
            // 失去焦点验证
        $("input[type='number'],input[type='text'],select").each(function() {
                $(this).blur(function() {
                    var val = $(this).val()
                    var that1 = $(this)
                    var _validate = $(this).attr('check') //获取check属性的值
                    if (_validate) {
                        var arr = _validate.split(' ') //用空格将其拆分成数组
                        for (var i = 0; i < arr.length; i++) {
                            //逐个进行验证，不通过跳出返回false,通过则继续 !check($(this), arr[i], $(this).val())
                            if (!_this.verification(val, arr[i], that1))
                                return false
                            else continue
                        }
                    }
                })
            })
            // submit  提交
        this.submit = function() {
                isok = true
                $(
                    "input[type='number'],input[type='text'],input[type='radio'],input[type='checkbox'],input[type='radio'],select"
                ).each(function() {
                    var val = $(this).val()
                    var that1 = $(this)
                    var _validate = $(this).attr('check') //获取check属性的值
                    var type = $(this).attr('type')

                    if (_validate) {
                        var arr = _validate.split(' ') //用空格将其拆分成数组
                        if (type == 'checkbox' || type == 'radio') {
                            if ($(this).is(':checked')) {
                                val = $(this).val()
                            } else {
                                val = ''
                            }
                        }
                        for (var i = 0; i < arr.length; i++) {
                            if (!_this.verification(val, arr[i], that1)) {
                                isok = false //验证不通过阻止表单提交，开关false
                                return //跳出
                            }
                        }
                    }
                })
                return isok
            }
            // 开始验证
        this.verification = function(val, name, that) {
                if (val) {
                    _this.showMsg(that, defaults.tips_success, true)
                    switch (name) {
                        case 'required':
                            return val ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_required, false)
                            break
                        case 'num': // 数字
                            return _this.testReg(val, defaults.reg_num) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_num, false)
                            break
                        case 'medicine': // 冰箱号
                            return _this.testReg(val, defaults.reg_medicine) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(that, defaults.tips_medicine, false)
                            break
                        case 'medicinec': // 层数/冰箱号
                            return _this.testReg(val, defaults.reg_medicinec) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(
                                    that,
                                    defaults.tips_medicinec,
                                    false
                                )
                            break
                        case 'medicinej': // 架子数/冰箱号
                            return _this.testReg(val, defaults.reg_medicinej) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(
                                    that,
                                    defaults.tips_medicinej,
                                    false
                                )
                            break
                        case 'medicineh': // 架子数/冰箱号
                            return _this.testReg(val, defaults.reg_medicineh) ?
                                _this.showMsg(that, defaults.tips_success, true) :
                                _this.showMsg(
                                    that,
                                    defaults.tips_medicineh,
                                    false
                                )
                            break
                        default:
                            return true
                    }
                } else {
                    _this.showMsg(that, defaults.tips_required, false)
                }
            }
            // 错误消息提示
        this.showMsg = function(obj, msg, mark) {
                if (mark) {
                    $(obj)
                        .parent()
                        .removeClass('has-error')
                } else {
                    $(obj)
                        .parent()
                        .addClass('has-error')
                    layer.msg(msg, { icon: 5, anim: 6 })
                }

                return mark
            }
            /**正则校验* */
        this.testReg = function(str, reg) {
            return reg.test(str)
        }
    },
    FirstVisitForm: function(ele) {
        var input = $(ele).find('input')
        var _this = this
        var pwd1
        var arr = {}
        var isok = false //控制表单提交的开关
             
        this.submit = function(excludeClass) {
                isok = true
                console.log("---->wyhai aaa ")
                var excludeClassArr = [];
                if(excludeClass){
                    excludeClassArr = excludeClass.split(',');
                }
                
                $('#' + ele)
                    .find(
                        "input[type='number'][check],input[type='text'][check],input[type='password'][check],input[type='file'][check],select[check],textarea[check],.check"
                    )
                    .each(function() {
                        for(var a =0 ;a<excludeClassArr.length; a++ ){
                            if(excludeClassArr[a].trim()!=''  &&  $(this).attr("class").indexOf(excludeClassArr[a]) != -1){
                                return true;
                            }
                        }
                        var val = $(this).val()
                        var that1 = $(this)
                        var _validate = $(this).attr('check') // 获取check属性的值
                        var tip_msg = $(this).attr('tip-msg') // 获取行内属性 提示消息
                        var type = $(this).attr('type')
                        var className = $(this).attr('data-class')
                        if (_validate) {
                            var arr = _validate.split(' ') //用空格将其拆分成数组
                            for (var i = 0; i < arr.length; i++) {
                                if (!_this.verification(
                                        val,
                                        arr[i],
                                        that1,
                                        tip_msg,
                                        className
                                    )) {
                                    isok = false //验证不通过阻止表单提交，开关false
                                    return false //跳出
                                }
                            }
                        }
                    })
                return isok
            }
            // 开始验证
        this.verification = function(val, name, that, tip_msg, className) {
                var val = $.trim(val)
                var msg
                if (tip_msg) {
                    msg = tip_msg
                } else {
                    msg = defaults.tips_required
                }
                // if (val) {
                //   _this.showMsg(that, defaults.tips_success, true);
                switch (name) {
                    case 'required':
                        return _this.confirmRequired(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, msg, false)
                        break
                    case 'num': // 数字
                        return _this.testReg(val, defaults.reg_num) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_num, false)
                        break
                    case 'height':
                        return _this.confirmHeight(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'heightOthers':
                        return _this.confirmHeightOthers(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'weight':
                        return _this.confirmWeight(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'checkbox':
                        return _this.confirmCheckbox(className) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                $(that).find("input[type='checkbox']"),
                                tip_msg,
                                false
                            )
                        break
                    case 'radio':
                        return _this.confirmRadio(className) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                $(that).find("input[type='radio']"),
                                tip_msg,
                                false
                            )
                        break
                    case 'radioCheckbox':
                        return _this.confirmRadioCheckbox(className) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                $(that).find("input[type='radio']"),
                                tip_msg,
                                false
                            )
                        break
                    case 'age':
                        return _this.confirmAge(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'inputLeast':
                        return _this.confirmInputText(className) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                $(that).find("input[type='number']:eq(1)"),
                                msg,
                                false
                            )
                        break
                    case 'selectLeast':
                        return _this.confirmselectLeast(className) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg($(that).find('select'), tip_msg, false)
                        break
                    case 'uploadImg':
                        return _this.confirmUploadImg(that) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'relativeslist':
                        return _this.confirmRelativeslist(that) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'adrs':
                        return _this.confirmAdrs(that) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, tip_msg, false)
                        break
                    case 'password': //密码
                        pwd1 = val
                        return _this.testReg(val, defaults.reg_password) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_password, false)
                        break
                    case 'password2':
                        return _this.confirmPass(val, pwd1) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_pwdequal, false)
                        break
                    case 'idcard': // 身份证号
                        return _this.testReg(val, defaults.reg_idcard) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_idcard, false)
                        break
                    case 'num': // 数字
                        return _this.testReg(val, defaults.reg_num) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_num, false)
                        break
                    case 'check0': // 验证是否为正整数
                        return _this.testReg(val, defaults.reg_check0) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check0, false)
                        break
                    case 'check1': // 验证是否为正数，允许录入三位小数
                        return _this.testReg(val, defaults.reg_check1) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check1, false)
                        break
                    case 'check2': // 正数，允许录入两位小数，不允许录入0或负数
                        return _this.testReg(val, defaults.reg_check2) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check2, false)
                        break
                    case 'check3': // 正数，允许录入两位小数，不允许录入0或负数
                        return _this.testReg(val, defaults.reg_check3) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check3, false)
                        break
                    case 'check4': // 正数，允许录入1位小数，不允许录入0或负数
                        return _this.testReg(val, defaults.reg_check3) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check3, false)
                        break
                    case 'check5': // 正数，允许录入1位小数，不允许录入0或负数
                        return _this.testReg(val, defaults.reg_check5) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_check5, false)
                        break
                    case 'checkSmoke': // 正整数，且大于20
                        return _this.confirmCheckSmoke(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                that,
                                '吸烟量超出填写范围（>20），请填写整数！',
                                false
                            )
                        break
                        // case "checkNumber": // 校验input数字
                        // return _this.confirmCheckNumber(that) ? _this.showMsg(that, defaults.tips_success, true)
                        // : _this.showMsg(that, msg, false);
                        // break;
                    case 'chinese': // 中文
                        return _this.testReg(val, defaults.reg_chinese) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_chinese, false)
                        break
                    case 'passport': // 护照
                        return _this.testReg(val, defaults.reg_passport) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_passport, false)
                        break
                    case 'OfficerCard': // 军官证
                        return _this.testReg(val, defaults.reg_OfficerCard) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_OfficerCard, false)
                        break
                    case 'email': //邮箱
                        return _this.testReg(val, defaults.reg_email) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_email, false)
                        break
                    case 'qq': //邮箱
                        return _this.testReg(val, defaults.reg_qq) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_qq, false)
                        break
                    case 'mobile': // 手机号
                        return _this.testReg(val, defaults.reg_mobile) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(that, defaults.tips_mobile, false)
                        break
                    case 'drinkTotal': // 饮酒量总和是否大于0
                        return _this.confirmDrinkTotal(val) ?
                            _this.showMsg(that, defaults.tips_success, true) :
                            _this.showMsg(
                                $('.p_drink_input'),
                                defaults.tips_drinkTotal,
                                false
                            )
                        break
                    default:
                        return true
                }
                // } else {
                //   _this.showMsg(that, msg, false);
                // }
            }
            // 错误消息提示
        this.showMsg = function(obj, msg, mark) {
                if (mark) {
                    // $(obj)
                    //   .parent()
                    //   .removeClass("has-error");
                } else {
                 // top.layer.msg(msg, { icon: 5, anim: 6 })
                    top.layer.msg(msg, { icon: 5, anim: 6 })

                        // $(obj)
                        //   .parent()
                        //   .addClass("has-error");
                    $(obj).focus()
                        //$(obj).select();
                    return false
                }

                return mark
            }
            /**正则校验* */
        this.testReg = function(str, reg) {
                return reg.test(str)
            }
            /*
             * 验证两次密码是否输入一直
             *
             * */
        this.confirmPass = function(pass1, pass2) {
            return pass1 == pass2 ? true : false
        }
        this.confirmRequired = function(val) {
                var flag = true
                if (val) {
                    flag = true
                } else {
                    flag = false
                }
                return flag
            }
            /* 验证身高 */
        this.confirmHeight = function(val) {
                var heightFlag = true
                var newVal = $.trim(val)
                if (newVal * 1 < 100 || newVal * 1 > 220) {
                    heightFlag = false
                        //	return;
                } else {
                    if (defaults.reg_check7.test(newVal)) {
                        heightFlag = true
                    } else {
                        heightFlag = false
                    }
                }
                return heightFlag
            }
            // 验证身高缩短
        this.confirmHeightOthers = function(val) {
            var heightFlag = true
            var newVal = $.trim(val)
            if (newVal * 1 < 1 || newVal * 1 > 100) {
                heightFlag = false
                    //	return;
            } else {
                if (defaults.reg_check7.test(newVal)) {
                    heightFlag = true
                } else {
                    heightFlag = false
                }
            }
            return heightFlag
        }

        /* 验证体重 */
        this.confirmWeight = function(val) {
                var weightFlag = true
                var newVal = $.trim(val)
                if (newVal * 1 < 15 || newVal * 1 > 150) {
                    weightFlag = false
                        //	return;
                } else {
                    if (defaults.reg_check7.test(newVal)) {
                        weightFlag = true
                    } else {
                        weightFlag = false
                    }
                }
                return weightFlag
            }
            /* 验证戒酒年龄 || 戒烟年龄 */
        this.confirmAge = function(val) {
                var ageFlag = true
                var reg = /^(\+?[0-9][0-9]*)$/
                var newVal = $.trim(val)
                if (newVal * 1 < 10 || newVal * 1 > 122) {
                    ageFlag = false
                        //	return;
                } else {
                    if (reg.test(newVal)) {
                        ageFlag = true
                    } else {
                        ageFlag = false
                    }
                }
                return ageFlag
            }
            /* 验证吸烟量大于20 */
        this.confirmCheckSmoke = function(val) {
                var smokeFlag = true
                var newVal = $.trim(val)
                if (defaults.reg_check3.test(val)) {
                    if (newVal * 1 > 20) {
                        smokeFlag = true
                            //	return;
                    } else {
                        smokeFlag = false
                    }
                } else {
                    smokeFlag = false
                }

                return smokeFlag
            }
            /* 验证checkbox 是否勾选 */
        this.confirmCheckbox = function(className) {
                var sel = $('.' + className).find("input[type='checkbox']:checked")
                if (sel.length == 0) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证radio 是否勾选 */
        this.confirmRadio = function(className) {
                var sel = $('.' + className).find("input[type='radio']:checked")
                if (sel.length == 0) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证radio checkbox 是否勾选一项 */
        this.confirmRadioCheckbox = function(className) {
                var sel = $('.' + className).find(
                    "input[type='radio']:checked,input[type='checkbox']:checked"
                )
                if (sel.length == 0) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证input数值型输入框的值 */
        this.confirmCheckNumber = function(obj) {
                var val = $(obj).val()
                var regCheck = $(obj).attr('data-check')
                if (regCheck == 'check2') {
                    return _this.check2($(obj))
                }
                if (regCheck == 'check3') {
                    return _this.check3($(obj))
                }
                if (regCheck == 'check4') {
                    return _this.check4($(obj))
                }
                if (regCheck == 'check5') {
                    return _this.check5($(obj))
                }
                if (regCheck == 'check6') {
                    return _this.check6($(obj))
                }
                if (regCheck == 'check7') {
                    return _this.check7($(obj))
                }
                if (regCheck == 'check8') {
                    return _this.check8($(obj))
                }
                if (regCheck == 'check9') {
                    return _this.check9($(obj))
                }
                if (regCheck == 'check10') {
                    return _this.check10($(obj))
                }
            }
            /* 验证图片 是否上传 */
        this.confirmUploadImg = function(obj) {
                var sel = $(obj).find('li')
                if (sel.length == 0) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证患者是否有不良反应 */
        this.confirmAdrs = function(obj) {
                var sel = $('#adrshow tr').length
                if (sel == 0) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证患者是否有直系亲属患有骨质疏松症 */
        this.confirmRelativeslist = function(obj) {
                var sel = $(obj).find('tr')
                if (sel.length == 2) {
                    return false
                } else {
                    return true
                }
            }
            /* 验证一组 input输入框至少填写一项*/
        this.confirmInputText = function(className) {
                var seasoning_name = ''
                $('.' + className)
                    .find("input[type='number'],textarea")
                    .each(function() {
                        seasoning_name += $(this).val()
                    })

                if (seasoning_name == '') {
                    return false
                } else {
                    return true
                }
            }
            /* 验证一组 select下拉框至少检查一项*/
        this.confirmselectLeast = function(className) {
                var seasoning_name = ''
                $('.' + className)
                    .find("select,input[type='radio']:checked")
                    .each(function() {
                        seasoning_name += $(this).val()
                    })

                if (seasoning_name == '' || seasoning_name == 0) {
                    return false
                } else {
                    return true
                }
            }
            // 验证一天的饮酒总量必须大于0
        this.confirmDrinkTotal = function(val) {
            if (val <= 0) {
                return false
            } else {
                return true
            }
        }

        /* 校验 数值输入框 */
        // 请输入正数，允许录入两位小数，不允许录入0或负数
        this.check2 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (val != 0) {
                        if (!reg_check2.test(val)) {
                            //top.layer.msg("请输入正数，允许录入两位小数，不允许录入0或负数", { icon: 5, anim: 6 });
                            //$("#"+id).focus();
                            _this.showMsg(
                                th,
                                '请输入正数，允许录入两位小数，不允许录入0或负数',
                                false
                            )
                            return false
                        } else {
                            return true
                        }
                    } else {
                        _this.showMsg(
                            th,
                            '请输入正数，允许录入两位小数，不允许录入0或负数',
                            false
                        )
                        return false
                    }
                } else {
                    return false
                }
            }
            // 请输入正数，允许录入两位小数，不允许录入0或负数
        this.check3 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (val != 0) {
                        if (!reg_check3.test(val)) {
                            _this.showMsg(
                                th,
                                '请输入正数，允许录入三位小数，不允许录入0或负数',
                                false
                            )
                            return false
                        } else {
                            return true
                        }
                    } else {
                        _this.showMsg(
                            th,
                            '请输入正数，允许录入三位小数，不允许录入0或负数',
                            false
                        )
                        return false
                    }
                } else {
                    return false
                }
            }
            // 允许录入一位小数可为负数、正数以及0
        this.check4 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (!reg_check4.test(val)) {
                        _this.showMsg(
                            th,
                            '允许录入一位小数可为负数、正数以及0',
                            false
                        )
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
            // 正整数，不允许录入负数或0或小数
        this.check5 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (val != 0) {
                        if (!reg_check5.test(val)) {
                            _this.showMsg(
                                th,
                                '正整数，不允许录入负数或0或小数',
                                false
                            )
                            return false
                        } else {
                            return true
                        }
                    } else {
                        _this.showMsg(th, '正整数，不允许录入负数或0或小数', false)
                        return false
                    }
                } else {
                    return false
                }
            }
            // 正数，允许录入0和小数，不允许录入负数
        this.check6 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (!reg_check6.test(val)) {
                        _this.showMsg(
                            th,
                            '正数，允许录入0和小数，不允许录入负数',
                            false
                        )
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
            // 正数，允许录入一位小数，不允许录入0或负数
        this.check7 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (val != 0) {
                        if (!reg_check7.test(val)) {
                            _this.showMsg(
                                th,
                                '正数，允许录入一位小数，不允许录入0或负数',
                                false
                            )
                            return false
                        } else {
                            return true
                        }
                    } else {
                        _this.showMsg(
                            th,
                            '正数，允许录入一位小数，不允许录入0或负数',
                            false
                        )
                        return false
                    }
                } else {
                    return false
                }
            }
            // 整数，允许录入0，不允许录入小数或负数
        this.check8 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (!reg_check8.test(val)) {
                        _this.showMsg(
                            th,
                            '整数，允许录入0，不允许录入小数或负数',
                            false
                        )
                        return false
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            }
            // 正数，允许录入小数，不允许录入0或负数
        this.check9 = function(th) {
                var val = $(th).val()
                var id = $(th).attr('id')
                if (val) {
                    if (val != 0) {
                        if (!reg_check9.test(val)) {
                            _this.showMsg(
                                th,
                                '正数，允许录入小数，不允许录入0或负数',
                                false
                            )
                            return false
                        } else {
                            return true
                        }
                    } else {
                        _this.showMsg(
                            th,
                            '正数，允许录入小数，不允许录入0或负数',
                            false
                        )
                        return false
                    }
                } else {
                    return false
                }
            }
            //
        this.check10 = function(th) {
            var val = $(th).val()
            var id = $(th).attr('id')
            if (val) {
                if (!reg_check10.test(val)) {
                    _this.showMsg(th, '允许录入正数、负数、0', false)
                    return false
                } else {
                    return true
                }
            } else {
                return false
            }
        }
    },
}
