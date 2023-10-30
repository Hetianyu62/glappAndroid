/**
 * Created by 杨志强 on 2018/12/25.
 * company
 * email   18713815365@163.com
 * 自定义插件封装  基于 JQuery
 * 1、initInput()  checkbox radio tag 方法
 */
$(function($) {
  /*
   *
   *  checkbox || radio
   *  初始化按钮事件
   *  change 事件
   *  用法 $("").initInput({el:"",elChild:"",Event})
   * */
  $.fn.initInput = function(options) {
    var defaults = {
      el: "#demo", //  id || class || dom 元素  但是必须唯一
      elChild: "checkbox", //  元素绑定的子集  checkbox  || radio
      Event: "change" //  事件
    };

    var options = $.extend(defaults, options); //继承默认参数
    var $this = $(this); //当然响应事件对象
    init(options.el, options.elChild); // 初始化方法
    //绑定事件
    if (options.elChild == "checkbox") {
      $this
        .find("input[type='" + options.elChild + "']")
        .on(options.Event, function(e) {
          var id = $(this).attr("data-class");
          if ($(this).is(":checked")) {
            $("." + id).show();
          } else {
            $("." + id).hide();
          }
        });
    } else if (options.elChild == "radio") {
      $this
        .find("input[type='" + options.elChild + "']")
        .on(options.Event, function(e) {
          var id = $(this).attr("data-class");
          if ($(this).is(":checked")) {
            $("#" + id).show();
            $("#" + id)
              .siblings("tr.radio-tag")
              .hide();
          }
        });
    }
    /*init(id,input[type='checkbox'] || input[type='radio'])*/
    function init(el, elChild) {
      if (elChild == "checkbox") {
        $(el)
          .find("input[type='" + elChild + "']")
          .each(function(index, data) {
            var id = $(data).attr("data-class");
            if ($(this).is(":checked")) {
              $("." + id).show();
            } else {
              $("." + id).hide();
            }
          });
      } else if (elChild == "radio") {
        $(el)
          .find("input[type='" + elChild + "']")
          .each(function(index, data) {
            var id = $(data).attr("data-class");
            if ($(this).is(":checked")) {
              $("#" + id).show();
            } else {
              $("#" + id).hide();
            }
          });
      }
    }
  };

  /**
   *
   * 表单赋值
   * 用法：$('#Form').serializeObject(data);
   *
   */
  $.fn.setFormData = function(data) {
    for (var key in data) {
      var $this = this;
      var $tag = $this.find("[name=" + key + "]");
      if ($tag.length > 1) {
        $tag.prop("checked", false);
        if (data[key]) {
          var item = data[key].split(",");
          $.each(item, function(i, val) {
            var $curTag = $this.find("[name=" + key + "][value=" + val + "]");
            $curTag.prop("checked", true);
          });
        }
      } else {
        $tag.val(data[key]);
      }
    }
  };
  /**
   *
   * 获取表单值
   * 用法：var savaData = $('#Form').getFormData();
   *
   */
  $.fn.getFormData = function() {
    var obj = {};
    var $tags = this.find("[name]");
    $tags.each(function() {
      var key = $(this).attr("name");
      if (obj.hasOwnProperty(key) && $(this).is(":checked")) {
        obj[key] = obj[key] + "," + $(this).val(); //checkebox的值是‘aa,bb,cc’这样的格式，要数组的自行修改
        return true;
      }
      var isCheck = $(this).is(function() {
        var type = $(this).attr("type");
        return type == "checkbox" || type == "radio";
      });
      if (isCheck) {
        if ($(this).is(":checked")) {
          obj[key] = $(this).val();
        }
        return true;
      } else {
        obj[key] = $(this).val();
      }
    });
    return obj;
  };
  /*
   * 获取表单值重写jq
   *
   *
   */
  $.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
      if (o[this.name]) {
        if (!o[this.name].push) {
          o[this.name] = [o[this.name]];
        }
        o[this.name].push(this.value || "");
      } else {
        // if (this.name == "password" || this.name == "oldpassword") {
        //   this.value = $.md5($.trim(this.value));
        // }
        o[this.name] = $.trim(this.value) || "";
      }
    });
    var $radio = $('input[type=radio]',this);
    $.each($radio,function(){
        if(!o.hasOwnProperty(this.name) && this.name!=""){
            o[this.name] = '';
        }
    });
    var $checkbox = $('input[type=checkbox]',this);
    $.each($checkbox,function(){
      if(!o.hasOwnProperty(this.name) && this.name!=""){
          console.log($(this).attr("class"));
          
          o[this.name] = '0';
      }
  });
    return o;
  };

  /* 验证不为空 */

  $.fn.checkForm = function(obj) {
    var flag = true;
    $("#" + obj)
      .find("input,textarea,select")
      .each(function(i, obj) {
        if (obj.value == "" || obj.value == "请选择" || obj.value == 0) {
          var str = $(this)
            .parent()
            .prev()
            .text();
          $(this).focus();
          layer.msg(str + "&nbsp;&nbsp;不能为空", { time: 2000, icon: 2 });
          flag = false;
          return false;
        } else {
          flag = true;
        }
      });
    return flag;
  };
  /*
   *
   * 表单增加
   * 用法：用法 $("").initInput({el:"",elChild:"",Event})
   *
   * */
  $.fn.addRowData = function(options) {
    var defaults = {
      el: "#demo", //  id || class || dom 元素  但是必须唯一
      elChild: "checkbox", //  元素绑定的子集  checkbox  || radio
      Event: "change" //  事件
    };
  };

  /*
   *
   * 表单删除 单条
   * 用法：用法 $("").delRowData({el:"",url:"",delId:""})
   *
   *
   * */
  $.fn.delRowData = function(options) {
    var defaults = {
      el: "", //   table目标 id||class || 标签名
      url: "", //   删除数据接口
      type: "",
      data: "", //   删除数据的id
      event: "" //   删除事件
    };
    var options = $.extend(defaults, options); // /默认继承参数
    var $this = $(this);
    var index = layer.confirm("您将彻底删除该条数据，是否确认", function() {
      $(options.el).publicAjax({
        url: options.url,
        type: options.type,
        data: options.data,
        successFn: function(result) {
          $(el).bootstrapTable("refresh");
        }
      });
    });

  };

  /*
   *
   * 表单修改 单条
   * 用法：用法 $("").updateRowData({el:"",elChild:"",Event})
   *
   * */
  $.fn.updateRowData = function(options) {
    var defaults = {
      el: "",
      event: "",
      url: "",
      data: "",
      html: ""
    };
  };

  /*
   *
   * 表单查询
   * 用法：$("").searchRowData({})
   *
   * */

  $.fn.searchRowData = function(options) {
    var defaults = {
      el: "", //  目标table id || class
      url: "", //  search  查询接口
      method: "", //  请求方式 get || post
      data: "", //  查询的参数
      event: "" //  表单查询的事件 click || change || blur
    };
    var options = $.extend(defaults, options); //继承默认参数
    var $this = $(this); //当然响应事件对象
    initTable(options.el, options.url, options.method, options.data);
  };
  /*
   *
   * 表格中新增页面 || 查看页面 || 修改页面
   * 用法：$("").pageMode({})
   *
   * */
  $.fn.pageMode = function(options) {
    var defaults = {
      page: "", //  目标页面
      parameter: "", //   传递的参数 obj
      id: "", //   表格行id
      event: "add" //    add || update  || see
    };
    var options = $.extend(defaults, options);
    var eventData;
    options.parameter = JSON.stringify(options.parameter);
    switch (options.event) {
      case "add":
        eventData = "add";
        break;
      case "update":
        eventData = "update";
        break;
      case "see":
        eventData = "see";
        break;
    }
    window.location.href =
      options.page +
      "?id=" +
      options.id +
      "&parameter=" +
      encodeURI(options.parameter) +
      "&&event=" +
      eventData;
  };

  /*
   *
   * 初始化form 表单为新的页面所有的都是未全中状态
   *
   * */
  $.fn.initForm = function(options) {
    var defaults = {
      el: "",
      formDom: "input,select,textarea"
    };
    var options = $.extend(defaults, options);
    $(options.el)
      .find(options.formDom)
      .each(function(i, obj) {
        $(this).val("");
        $(this).attr("checked", false);
      });
  };
  /*
   *
   * 表格加载 初始化
   * 用法     $("").initTable({})
   *
   * */

  $.fn.initTable = function(options) {
    var defaults = {
      el: "",
      url: "",
      method: "",
      data: "",
      dataType: ""
    };
    var options = $.extend(defaults, options);
    options.method =
      options.method == null ||
      options.method == "" ||
      typeof options.method == "undefined"
        ? "get"
        : options.method;
    initTable(
      options.el,
      options.url,
      options.method,
      options.data,
      options.dataType
    );
  };

  $.fn.searchTale = function(options) {
    var defaults = {
      el: "",
      url: "",
      method: "",
      data: ""
    };
    var options = $.extend(defaults, options);
    options.method =
      options.method == null ||
      options.method == "" ||
      typeof options.method == "undefined"
        ? "get"
        : options.method;
    initTable(options.el, options.url, options.method, options.data);
  };

  /*
   *
   * 公共ajax 封装
   * 前提 必须引入
   * &&jquery 库
   * &&layer 弹框插件（对弹框进行了  华丽的封装）
   * layer 弹框解析
   * layer.alert("弹框提示消息",{icon:1||2||3||4||5||6}) 默认图标可以传入0-6如果是加载层，可以传入0-2
   * layer.msg("消息提示",{icon:1||2||3||4||5||6})；
   * icon: （0） 提示感叹号 （1）打勾的对号 成功 （2）错误消息 （3） 问号 是否确定 （4）锁定 （5）瘪嘴图标 （6）笑脸图标
   *
   * */

  $.fn.publicAjax = function(options) {
    var defaults = {
      url: "", //  接口地址
      type: "", //  请求方式  get|| post
      dataType: "", //  传输的数据类型  json || html || xml || text
      data: "", //  传输的数据
      async: "", //  同步 || 异步
      cache: "", //  是否缓存 true || false
      timeout: "", //  设置超时时间
      successFn: "",
      errorFn: ""
    };
    var options = $.extend(defaults, options); //继承默认参数
    var $this = $(this); //当然响应事件对象
    //var deferred = $.Deferred();
    //this.successFn=options.callBack;
    options.async =
      options.async == null ||
      options.async == "" ||
      typeof options.async == "undefined"
        ? "false"
        : options.async;
    options.cache =
      options.cache == null ||
      options.cache == "" ||
      typeof options.cache == "undefined"
        ? "true"
        : options.cache;
    options.type =
      options.type == null ||
      options.type == "" ||
      typeof options.type == "undefined"
        ? "post"
        : options.type;
    options.dataType =
      options.dataType == null ||
      options.dataType == "" ||
      typeof options.dataType == "undefined"
        ? "json"
        : options.dataType;
    options.data =
      options.data == null ||
      options.data == "" ||
      typeof options.data == "undefined"
        ? { date: new Date().getTime() }
        : options.data;
    var beforeSendIndex; // ajax 数据加载之前调用layer.msg 弹框 beforeSend为弹框的index值

    var tokenParam = {
      // pageNumber: params.pageNumber,
      //pageSize: params.pageSize,
      // sessionId: sessionStorage.getItem("token");
      //token: "eJtqIKysChb/xl+coOwRh7gMQoYWY2pPcwJJFPNrf11z0uJ7+d23HQ=="
      token:sessionStorage.getItem('token')
      
    };
    var options_data = $.extend(tokenParam, options.data);    
    $.ajax({
      url: options.url,
      type: options.type,
      //contentType : 'application/json;charset=utf-8',
      contentType: "application/x-www-form-urlencoded;charset=UTF-8",
      dataType: options.dataType,
      data: $.extend(tokenParam, options.data),
      async: options.async,
      cache: options.cache,
      timeout: options.timeout,
      beforeSend: function() {
        openModal()
        //  console.log("请求开始");
        // beforeSendIndex=layer.msg('加载中', {
        //          icon: 16,
        //          shade: 0.01
        //          });
        /*  var token=sessionStorage.getItem('token');
                 request.setRequestHeader("token", token); */
      },
      crossDomain: true,
      success: function(result) {
        /*
         *
         * result 后台返回的数据格式json
         * json   { code:200,msg:"提示消息",state:"success||error",data:{存放数据}}
         * icon: （0） 提示感叹号 （1）打勾的对号 成功 （2）错误消息
         *       （3） 问号       （4）锁定            （5）瘪嘴图标 （6）笑脸图标
         * 100000 用户登录成功code
         * */
        //layer.close(beforeSendIndex);
        //var result=JSON.parse(result);
        closedModal();
        if (result.sessionId) {
          sessionStorage.setItem("token", result.sessionId);
          localStorage.setItem("token",result.sessionId);
        }
        if (result.code == "0") {
          //  成功登录提示消息
          //layer.msg(result.msg, {icon: 1});
          options.successFn(result);
          //UID=result.uid;
          //sessionStorage.setItem('user_name', response.data.user_name);
        } else if (result.code == "100000") {
          options.successFn(result);
        } else if (result.code == "404") {
          /* token 过期强制跳转登录页 */
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("UID");
          sessionStorage.removeItem("USERNAME");
          sessionStorage.removeItem("realname");
          sessionStorage.removeItem("gender");
          sessionStorage.removeItem("loginTime");
          //window.open(src + "/views/login.html", "_self");
        } else if (result.code == "100003") {
          layer.msg(result.msg, { icon: 1 });
          sessionStorage.removeItem("token");
          sessionStorage.removeItem("UID");
          sessionStorage.removeItem("USERNAME");
          sessionStorage.removeItem("realname");
          sessionStorage.removeItem("gender");
          sessionStorage.removeItem("loginTime");
          window.open(src + "/views/login.html", "_self");
        } else if (result.code == "100001") {
          layer.msg(result.msg, { icon: 2 });
          window.location.href = filterXSS(window.location.href.split("/app/")[0]) + '/index.html';
          return false;
        } else if (result.code != "0" && result.data != "") {
          //  提示消息
          options.successFn(result);
          //layer.msg(result.msg, {icon: 2});
        } else if (result.code != "0") {
          options.successFn(result);
          layer.msg(result.msg, { icon: 2 });
        } else {
          layer.msg(result.msg, { icon: 2 });
        }
      },
      error: function(e) {
        console.log(e);
        closedModal();
        layer.msg("请求出错:"+e.status, { icon: 2, time: 2000 })
        // layer.msg("请求出错", { icon: 2, time: 2000 }, function() {
        // window.open("../../../views/error/500.html","_self");
        // });
      }
    });
  };

  /*
   *
   * 公共表格设置        initTable 获取方法
   * 前提是 必须 引入:
   * bootstrap.css ||bootstrap.min.css
   * && jquery
   * && bootstrap.js || bootstrap.min.js
   * && bootstrap-table.css || bootstrap-table-table.min.css
   * && bootstrap-table.js  || bootstrap-table.min.js
   * && bootstrap-table-zh-CN.js || bootstrap-table-zh-CN.min.js
   * 传递参数:
   * {el:"",url:"",method,"post||get",data:"json(集合数据)"}
   *
   *
   * */
  function initTable(el, url, method, data, dataType, rowStyle) {
    //先销毁表格
    $(el).bootstrapTable("destroy");
    //初始化表格,动态从服务器加载数据
    $(el).bootstrapTable({
      method: method, //使用get请求到服务器获取数据
      url: url, //获取数据的Servlet地址
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      //toolbar: '#toolbar',
      dataType: dataType,
      strictSearch: false,
      showColumns: false, //是否显示所有的列
      showRefresh: false,
      minimumCountColumns: 2, //最少允许的列数
      clickToSelect: true, //是否启用点击选中行
      uniqueId: "ID", //每一行的唯一标识，一般为主键列
      showToggle: false, //是否显示详细视图和列表视图的切换按钮
      cardView: false, //是否显示详细视图
      detailView: false, //是否显示父子表
      striped: true, //表格显示条纹
      pagination: true, //启动分页
      pageSize: 10, //每页显示的记录数
      toolbar: "#toolbar", // 查询框 工具框
      pageNumber: 1, //当前第几页
      pageList: [5, 10, 15, 20, 25], //记录数可选列表
      search: false, //是否启用查询
      sortable: false, //是否启用排序
      sortOrder: "asc",
      //            sidePagination: "server", //表示服务端请求
      //设置为undefined可以获取pageNumber，pageSize，searchText，sortName，sortOrder
      //设置为limit可以获取limit, offset, search, sort, order
      queryParamsType: "undefined",
      maintainSelected: true,
      sidePagination: "server",
      rowStyle: rowStyle,
      responseHandler: function(res) {
        if (res.code == "404") {
          /* token 过期强制跳转登录页 */
          sessionStorage.removeItem("token");
          window.open(src + "/views/login.html", "_self");
          return false;
        }
        return {
          total: res.recordCount, //总页数
          rows: res.data //数据
        };
      },
      queryParams: function queryParams(params) {
        //设置查询参数
        var param = {
          page_pn: params.pageNumber,
          page_size: params.pageSize,
          sessionId: sessionStorage.getItem("token")
        };
        $.extend(param, data);
        return param;
      },
      onLoadSuccess: function(res) {
        //加载成功时执行
        if (res.code == "404") {
          /* token 过期强制跳转登录页 */
          window.open(src + "/views/login.html", "_parent");
          return false;
        }
        $(el + " tr td").each(function() {
          $(this).attr("title", $(this).text());
          $(this).css("cursor", "pointer");
        });
      },
      onLoadError: function(data) {
        //加载失败时执行
       // $("#bs-table").bootstrapTable("removeAll");
        // window.open(src+"/views/error/500.html","_self");
        //window.document.location.href = src + "/views/error/500.html";
      }
    });
    // $(el).on("page-change.bs.table", function(number, size) {
    //   var val = el + "," + size;
    //   setCookie("pageNum", val, 30);
    // });
    // var pageStr = getCookie("pageNum");
    // var pageArr = pageStr.split(",");
    // var pageNum = pageArr[1];
    // var dom = pageArr[0];
    //var pageNum =sessionStorage.getItem("pageNum");
    // if (pageNum != "" && pageNum != null) {
    //   $(dom).bootstrapTable("refreshOptions", {
    //     pageNumber: parseInt(pageNum)
    //   });
    // }
  }


});

function openModal(){
  var modalDiv ='<div class="module-backdrop"></div>';
 $('body').append(modalDiv)
}
function closedModal(){
  $('.module-backdrop').remove()
}