/*
 * @Description: 引入日期插件 bootstrap-datetimepicker
 * @Author: 杨志强
 * @Date: 2019-07-11 11:37:24
 * @LastEditTime: 2019-08-29 17:22:04
 * @LastEditors: Please set LastEditors
 */
//var src = getRootPath();
document.write(
    ' <link href=" ' +
    src +
    '/static/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.min.css" rel="stylesheet">'
);
document.write(
    "<script type='text/javascript' src='" +
    src +
    "/static/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.js'></script>"
);
document.write(
    "<script type='text/javascript' src='" +
    src +
    "/static/js/plugins/bootstrap-datetimepicker/bootstrap-datetimepicker.zh-CN.js'></script>"
);

/* 封装公共的日期 */

function commonDate(el) {
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
        //startDate:new Date()
    });
}