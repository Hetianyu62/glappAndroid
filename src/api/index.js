import axios from 'axios';
import QS from 'qs';
import { Dialog } from 'vant';
import router from "../router/index";
import Common from '../common/common';


let http = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    transformRequest: [function(data) {
        let newData = '';
        for (let k in data) {
            if (data.hasOwnProperty(k) === true) {
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
            }
        }
        return newData;
    }]
});

function apiAxios(method, url, params, response) {
     
    let time3 = new Date().valueOf(); //1603009495724.精确到毫秒
    http({
        method: method,
        url: Common.webUrl+url+"?utt="+time3,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function(res) {
        response(res);
    }).catch(function(err) {
        response(err);
    })
}

export default {
    get: function(url, params, response) { 
        return apiAxios('GET', url, params, response)
    },
    put: function(url, params, response) {
        return apiAxios('PUT', url, params, response)
    },
    delete: function(url, params, response) {
        return apiAxios('DELETE', url, params, response)
    },
    //POST 分离开发接口
    post: function(postUrl, data, success , error) {
        //const url = "https://www.powerbone.cn/gl/" + postUrl;
        const url = Common.webUrl + postUrl;
        console.log("----------->"+url); 
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.open("POST", url, true);
        xmlhttp.onerror = function(){
            console.log(xmlhttp);
            console.log("网络异常，请检查网路");
            Dialog.alert({
                title: "提示",
                message: "当前网络不稳定,请切换网络重试!"+"Code:"+xmlhttp.status,
                confirmButtonColor: "#07c160"
            })
        };
        xmlhttp.withCredentials = false;
        xmlhttp.crossDomain = true;
        xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded;charset=UTF-8;application/json"
        );
        // xmlhttp.timeout = 20000;
        xmlhttp.timeout = 20000;
        xmlhttp.onreadystatechange = function() { 

            if(xmlhttp.status == 0){ 
                Dialog.alert({
                    title: "提示",
                    message: "请求出错:"+xmlhttp.status,
                    confirmButtonColor: "#07c160"
                })
                return;
            }
            if(xmlhttp.status === 500 ){
                Dialog.alert({
                    title: "提示",
                    message: "请求出错"+xmlhttp.status,
                    confirmButtonColor: "#07c160"
                })
                return;
            }
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 504) {
                    // console.log("服务器请求超时..");
                    // error();
                    xmlhttp.abort();
                } else if (xmlhttp.status == 200) {
                    // success(xmlhttp.responseText);
                    // 统一提示错误
                    let res = JSON.parse(xmlhttp.responseText); 
                    
                    if (res.code) {
                       if(error == null){
                        Dialog.alert({
                            title: "提示",
                            message: res.msg,
                            confirmButtonColor: "#07c160"
                        }).then(() => {
                            //-1 为未登录，或登录超时
                            if (res.code == 500 || res.code == 100) {
                                router.push("/login");
                            } 
                        }); 
                       }else{
                        error(res);
                       }
                       return;
                    } else {
                        success(res);
                    }
                }
                xmlhttp = null;
            }
        };
        xmlhttp.ontimeout = function() {
            Dialog.alert({
                title: "提示",
                message: "响应超时",
                confirmButtonColor: "#07c160"
            })
        };
        data.token = window.localStorage.getItem("sessionId");
        console.log(data); 
        try{
            xmlhttp.send(QS.stringify(data)); 
        }
        catch(e)
        {
        alert(e);
        }
      
    },
    //POST
    post4: function(postUrl, data, success) {

        const url = "http://.cn/api/" + postUrl;
        var xmlhttp = null;
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        }
        xmlhttp.open("POST", url, true);
        xmlhttp.withCredentials = false;
        xmlhttp.crossDomain = true;
        xmlhttp.setRequestHeader(
            "Content-type",
            "application/x-www-form-urlencoded;charset=UTF-8;application/json"
        );
        // xmlhttp.timeout = 20000;
        xmlhttp.timeout = 50000;
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 504) {
                    // console.log("服务器请求超时..");
                    // error();
                    xmlhttp.abort();
                } else if (xmlhttp.status == 200) {
                    // success(xmlhttp.responseText);
                    // 统一提示错误
                    let res = JSON.parse(xmlhttp.responseText);
                    console.log(res);
                    if (res.code) {
                        Dialog.alert({
                            title: "提示",
                            message: res.err,
                            confirmButtonColor: "#07c160"
                        }).then(() => {
                            // -1 为未登录，或登录超时
                            if (res.code < 0) {
                                router.push("/login");
                            }
                        });
                        return;
                    } else {
                        success(res);
                    }
                }
                xmlhttp = null;
            }
        };
        xmlhttp.ontimeout = function() {
            //   console.log("客户端请求超时..");
        };
        data.sessionId = window.localStorage.getItem("sessionId");
        console.log(data);
        xmlhttp.send(JSON.stringify(data));
    }
     
     
     
}