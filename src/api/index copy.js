import axios from 'axios';
import QS from 'qs';
import { Dialog } from 'vant';
import router from "../router/index";



let http = axios.create({
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    transformRequest: [function (data) {
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
    http({
        method: method,
        url: url,
        data: method === 'POST' || method === 'PUT' ? params : null,
        params: method === 'GET' || method === 'DELETE' ? params : null,
    }).then(function (res) {
        response(res);
    }).catch(function (err) {
        response(err);
    })
}

export default {
    get: function (url, params, response) {
        return apiAxios('GET', url, params, response)
    },
    put: function (url, params, response) {
        return apiAxios('PUT', url, params, response)
    },
    delete: function (url, params, response) {
        return apiAxios('DELETE', url, params, response)
    },
    //POST
    post: function (postUrl, data, success) {
       
        const url = "http://test2.59star.cn/api/" + postUrl;
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
        xmlhttp.onreadystatechange = function () {
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
        xmlhttp.ontimeout = function () {
            //   console.log("客户端请求超时..");
        };
        data.sessionId = window.localStorage.getItem("sessionId");
        console.log(data);
        xmlhttp.send(JSON.stringify(data));
    },
    //POST code出错也返回结果
    post3: function (postUrl, data, success) {

        const url = "http://test2.59star.cn/api/" + postUrl;
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
        xmlhttp.onreadystatechange = function () {
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
                    success(res);
                }
                xmlhttp = null;
            }
        };
        xmlhttp.ontimeout = function () {
            //   console.log("客户端请求超时..");
        };
        data.sessionId = window.localStorage.getItem("sessionId");
        // console.log(data);
        xmlhttp.send(JSON.stringify(data));
    },
    post2:  function (postUrl, data, success) {

        const url = "http://test2.59star.cn/api/" + postUrl;
        // const url = "http://localhost:3000/" + postUrl;
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
        xmlhttp.timeout = 50000;
        xmlhttp.onreadystatechange = function () {
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
        xmlhttp.ontimeout = function () {
        };
        xmlhttp.send(data);
    },
    //POST 分离开发接口
    post4: function (postUrl, data, success) {
       
        const url = "http://test3.59star.cn/api/" + postUrl;
        //const url = "http://192.168.43.192:9000/circle/" + postUrl;
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
        xmlhttp.onreadystatechange = function () {
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
        xmlhttp.ontimeout = function () {
            //   console.log("客户端请求超时..");
        };
        data.sessionId = window.localStorage.getItem("sessionId");
        console.log(data);
        xmlhttp.send(QS.stringify(data));
    },
    // post 分离开发文件 || 图片上传
    post5:  function (postUrl, data, success) {

       
        const url = "http://192.168.43.192:9000/circle" + postUrl;
        // const url = "http://localhost:3000/" + postUrl;
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
        xmlhttp.timeout = 50000;
        xmlhttp.onreadystatechange = function () {
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
        xmlhttp.ontimeout = function () {
        };
        xmlhttp.send(data);
    },
    filePost :function(postUrl,data,success ){
        const url = "http://test3.59star.cn/api/" + postUrl;
        let config = {
            headers: { //添加请求头
                  'Content-Type': 'multipart/form-data'
            }
          }
        return new Promise((resolve, reject) => {
            //把 uploadUrl 换成自己的 上传路径
            axios.post(url, data, config).then(res => {
                if (res.code){	
                    //否则 Toast 提示
                    //Toast.fail(res.data && (res.data.msg))
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
                    reject(res.data)			//如果为真 resolve出去
                } else {
                    success(res.data)
                }
            }).catch(err => {
                  //Toast.fail('系统异常')
                  reject(err)
            });
        })
    }
}