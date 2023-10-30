(function(e) {
  function n(n) {
    for (
      var r, o, u = n[0], i = n[1], l = n[2], s = 0, f = [];
      s < u.length;
      s++
    )
      (o = u[s]),
        Object.prototype.hasOwnProperty.call(c, o) && c[o] && f.push(c[o][0]),
        (c[o] = 0);
    for (r in i) Object.prototype.hasOwnProperty.call(i, r) && (e[r] = i[r]);
    d && d(n);
    while (f.length) f.shift()();
    return a.push.apply(a, l || []), t();
  }
  function t() {
    for (var e, n = 0; n < a.length; n++) {
      for (var t = a[n], r = !0, o = 1; o < t.length; o++) {
        var u = t[o];
        0 !== c[u] && (r = !1);
      }
      r && (a.splice(n--, 1), (e = i((i.s = t[0]))));
    }
    return e;
  }
  var r = {},
    o = { app: 0 },
    c = { app: 0 },
    a = [];
  function u(e) {
    return (
      i.p +
      "js/" +
      ({}[e] || e) +
      "." +
      {
        "chunk-01322ef4": "c3d2bfed",
        "chunk-10eff39a": "e2f4e2fc",
        "chunk-1460fd2d": "465537a5",
        "chunk-2d0c89e8": "bc67726b",
        "chunk-2d0d34a6": "8f8a3915",
        "chunk-58e2317e": "372bb60d",
        "chunk-5d67cd7e": "8cf7ec00",
        "chunk-63cb4e9f": "4b5f57ab",
        "chunk-75b383b6": "357a2908",
        "chunk-e96c8cc2": "2820ca11",
        "chunk-f463a58c": "7a30c3ab",
      }[e] +
      ".js"
    );
  }
  function i(n) {
    if (r[n]) return r[n].exports;
    var t = (r[n] = { i: n, l: !1, exports: {} });
    return e[n].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  (i.e = function(e) {
    var n = [],
      t = {
        "chunk-01322ef4": 1,
        "chunk-10eff39a": 1,
        "chunk-1460fd2d": 1,
        "chunk-58e2317e": 1,
        "chunk-5d67cd7e": 1,
        "chunk-63cb4e9f": 1,
        "chunk-75b383b6": 1,
        "chunk-e96c8cc2": 1,
        "chunk-f463a58c": 1,
      };
    o[e]
      ? n.push(o[e])
      : 0 !== o[e] &&
        t[e] &&
        n.push(
          (o[e] = new Promise(function(n, t) {
            for (
              var r =
                  "css/" +
                  ({}[e] || e) +
                  "." +
                  {
                    "chunk-01322ef4": "b5104a2c",
                    "chunk-10eff39a": "bc6af7f3",
                    "chunk-1460fd2d": "4cff543c",
                    "chunk-2d0c89e8": "31d6cfe0",
                    "chunk-2d0d34a6": "31d6cfe0",
                    "chunk-58e2317e": "11a070bd",
                    "chunk-5d67cd7e": "9c7155d8",
                    "chunk-63cb4e9f": "151c28cd",
                    "chunk-75b383b6": "92d0ba38",
                    "chunk-e96c8cc2": "5589c485",
                    "chunk-f463a58c": "f33fd1f6",
                  }[e] +
                  ".css",
                c = i.p + r,
                a = document.getElementsByTagName("link"),
                u = 0;
              u < a.length;
              u++
            ) {
              var l = a[u],
                s = l.getAttribute("data-href") || l.getAttribute("href");
              if ("stylesheet" === l.rel && (s === r || s === c)) return n();
            }
            var f = document.getElementsByTagName("style");
            for (u = 0; u < f.length; u++) {
              (l = f[u]), (s = l.getAttribute("data-href"));
              if (s === r || s === c) return n();
            }
            var d = document.createElement("link");
            (d.rel = "stylesheet"),
              (d.type = "text/css"),
              (d.onload = n),
              (d.onerror = function(n) {
                var r = (n && n.target && n.target.src) || c,
                  a = new Error(
                    "Loading CSS chunk " + e + " failed.\n(" + r + ")"
                  );
                (a.code = "CSS_CHUNK_LOAD_FAILED"),
                  (a.request = r),
                  delete o[e],
                  d.parentNode.removeChild(d),
                  t(a);
              }),
              (d.href = c);
            var p = document.getElementsByTagName("head")[0];
            p.appendChild(d);
          }).then(function() {
            o[e] = 0;
          }))
        );
    var r = c[e];
    if (0 !== r)
      if (r) n.push(r[2]);
      else {
        var a = new Promise(function(n, t) {
          r = c[e] = [n, t];
        });
        n.push((r[2] = a));
        var l,
          s = document.createElement("script");
        (s.charset = "utf-8"),
          (s.timeout = 120),
          i.nc && s.setAttribute("nonce", i.nc),
          (s.src = u(e));
        var f = new Error();
        l = function(n) {
          (s.onerror = s.onload = null), clearTimeout(d);
          var t = c[e];
          if (0 !== t) {
            if (t) {
              var r = n && ("load" === n.type ? "missing" : n.type),
                o = n && n.target && n.target.src;
              (f.message =
                "Loading chunk " + e + " failed.\n(" + r + ": " + o + ")"),
                (f.name = "ChunkLoadError"),
                (f.type = r),
                (f.request = o),
                t[1](f);
            }
            c[e] = void 0;
          }
        };
        var d = setTimeout(function() {
          l({ type: "timeout", target: s });
        }, 12e4);
        (s.onerror = s.onload = l), document.head.appendChild(s);
      }
    return Promise.all(n);
  }),
    (i.m = e),
    (i.c = r),
    (i.d = function(e, n, t) {
      i.o(e, n) || Object.defineProperty(e, n, { enumerable: !0, get: t });
    }),
    (i.r = function(e) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (i.t = function(e, n) {
      if ((1 & n && (e = i(e)), 8 & n)) return e;
      if (4 & n && "object" === typeof e && e && e.__esModule) return e;
      var t = Object.create(null);
      if (
        (i.r(t),
        Object.defineProperty(t, "default", { enumerable: !0, value: e }),
        2 & n && "string" != typeof e)
      )
        for (var r in e)
          i.d(
            t,
            r,
            function(n) {
              return e[n];
            }.bind(null, r)
          );
      return t;
    }),
    (i.n = function(e) {
      var n =
        e && e.__esModule
          ? function() {
              return e["default"];
            }
          : function() {
              return e;
            };
      return i.d(n, "a", n), n;
    }),
    (i.o = function(e, n) {
      return Object.prototype.hasOwnProperty.call(e, n);
    }),
    (i.p = ""),
    (i.oe = function(e) {
      throw (console.error(e), e);
    });
  var l = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    s = l.push.bind(l);
  (l.push = n), (l = l.slice());
  for (var f = 0; f < l.length; f++) n(l[f]);
  var d = s;
  a.push([0, "chunk-vendors"]), t();
})({
  0: function(e, n, t) {
    e.exports = t("56d7");
  },
  "034f": function(e, n, t) {
    "use strict";
    var r = t("64a9"),
      o = t.n(r);
    o.a;
  },
  "56d7": function(e, n, t) {
    "use strict";
    t.r(n);
    t("14c6"), t("08c1"), t("4842"), t("d9fc");
    var r = t("2b0e"),
      o = function() {
        var e = this,
          n = e.$createElement,
          t = e._self._c || n;
        return t(
          "div",
          { attrs: { id: "app" } },
          [e.isRouterAlive ? t("router-view") : e._e()],
          1
        );
      },
      c = [],
      a = {
        name: "app",
        provide: function() {
          return { reload: this.reload };
        },
        data: function() {
          return { isRouterAlive: !0 };
        },
        methods: {
          reload: function() {
            (this.isRouterAlive = !1),
              this.$nextTick(function() {
                this.isRouterAlive = !0;
              });
          },
        },
      },
      u = a,
      i = (t("034f"), t("2877")),
      l = Object(i["a"])(u, o, c, !1, null, null, null),
      s = l.exports,
      f = t("b970"),
      d = (t("833e"), { webUrl: "https://www.powerbone.cn/gl/" }),
      p = t("8c4f");
    r["a"].use(p["a"]);
    var h = [
        { path: "/", redirect: "/home", invisible: !0 },
        {
          path: "/home",
          component: function() {
            return t.e("chunk-63cb4e9f").then(t.bind(null, "3d71"));
          },
        },
        {
          name: "login",
          path: "/login",
          component: function() {
            return t.e("chunk-f463a58c").then(t.bind(null, "dc6c"));
          },
        },
        {
          path: "/patient",
          component: function() {
            return t.e("chunk-2d0d34a6").then(t.bind(null, "5bad"));
          },
          children: [
            {
              path: "/patient/reserve",
              component: function() {
                return t.e("chunk-5d67cd7e").then(t.bind(null, "2ef8"));
              },
            },
            {
              path: "/patient/list",
              component: function() {
                return t.e("chunk-1460fd2d").then(t.bind(null, "a152"));
              },
            },
          ],
        },
        {
          path: "/reserve",
          component: function() {
            return t.e("chunk-75b383b6").then(t.bind(null, "c0f1"));
          },
        },
        {
          path: "/reserve/replace",
          component: function() {
            return t.e("chunk-2d0c89e8").then(t.bind(null, "563d"));
          },
        },
        {
          path: "/reserve/add",
          component: function() {
            return t.e("chunk-10eff39a").then(t.bind(null, "38ad"));
          },
        },
        {
          path: "/user/info",
          query: { aaa: 111 },
          component: function() {
            return t.e("chunk-58e2317e").then(t.bind(null, "943a"));
          },
        },
        {
          path: "/patient/yyList",
          component: function() {
            return t.e("chunk-01322ef4").then(t.bind(null, "2075"));
          },
        },
        {
          path: "/register",
          component: function() {
            return t.e("chunk-e96c8cc2").then(t.bind(null, "be82"));
          },
        },
      ],
      m = new p["a"]({ mode: "hash", routes: h });
    m.beforeEach(function(e, n, t) {
      if (n.query.channel)
        if (e.query.channel) t();
        else {
          var r = e.query;
          (r.channel = 555555), t({ path: e.path, query: r });
        }
      else t();
    });
    var b = m,
      v = t("bc3a"),
      g = t.n(v),
      k = t("4328"),
      y = t.n(k),
      w = t("2241"),
      T = g.a.create({
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        transformRequest: [
          function(e) {
            var n = "";
            for (var t in e)
              !0 === e.hasOwnProperty(t) &&
                (n +=
                  encodeURIComponent(t) + "=" + encodeURIComponent(e[t]) + "&");
            return n;
          },
        ],
      });
    function O(e, n, t, r) {
      var o = new Date().valueOf();
      T({
        method: e,
        url: d.webUrl + n + "?utt=" + o,
        data: "POST" === e || "PUT" === e ? t : null,
        params: "GET" === e || "DELETE" === e ? t : null,
      })
        .then(function(e) {
          r(e);
        })
        .catch(function(e) {
          r(e);
        });
    }
    var C = {
        get: function(e, n, t) {
          return O("GET", e, n, t);
        },
        put: function(e, n, t) {
          return O("PUT", e, n, t);
        },
        delete: function(e, n, t) {
          return O("DELETE", e, n, t);
        },
        post: function(e, n, t, r) {
          var o = d.webUrl + e;
          console.log("-----------\x3e" + o);
          var c = null;
          window.XMLHttpRequest && (c = new XMLHttpRequest()),
            c.open("POST", o, !0),
            (c.onerror = function() {
              console.log(c),
                console.log("网络异常，请检查网路"),
                w["a"].alert({
                  title: "提示",
                  message:
                    "当前网络不稳定,请切换网络重试!" + "Code:" + c.status,
                  confirmButtonColor: "#07c160",
                });
            }),
            (c.withCredentials = !1),
            (c.crossDomain = !0),
            c.setRequestHeader(
              "Content-type",
              "application/x-www-form-urlencoded;charset=UTF-8;application/json"
            ),
            (c.timeout = 2e4),
            (c.onreadystatechange = function() {
              if (0 != c.status)
                if (500 !== c.status) {
                  if (4 == c.readyState) {
                    if (504 == c.status) c.abort();
                    else if (200 == c.status) {
                      var e = JSON.parse(c.responseText);
                      if (e.code)
                        return void (null == r
                          ? w["a"]
                              .alert({
                                title: "提示",
                                message: e.msg,
                                confirmButtonColor: "#07c160",
                              })
                              .then(function() {
                                (500 != e.code && 100 != e.code) ||
                                  b.push("/login");
                              })
                          : r(e));
                      t(e);
                    }
                    c = null;
                  }
                } else
                  w["a"].alert({
                    title: "提示",
                    message: "请求出错" + c.status,
                    confirmButtonColor: "#07c160",
                  });
              else
                w["a"].alert({
                  title: "提示",
                  message: "请求出错:" + c.status,
                  confirmButtonColor: "#07c160",
                });
            }),
            (c.ontimeout = function() {
              w["a"].alert({
                title: "提示",
                message: "响应超时",
                confirmButtonColor: "#07c160",
              });
            }),
            (n.token = window.localStorage.getItem("sessionId")),
            console.log(n);
          try {
            c.send(y.a.stringify(n));
          } catch (a) {
            alert(a);
          }
        },
        post4: function(e, n, t) {
          var r = "http://.cn/api/" + e,
            o = null;
          window.XMLHttpRequest && (o = new XMLHttpRequest()),
            o.open("POST", r, !0),
            (o.withCredentials = !1),
            (o.crossDomain = !0),
            o.setRequestHeader(
              "Content-type",
              "application/x-www-form-urlencoded;charset=UTF-8;application/json"
            ),
            (o.timeout = 5e4),
            (o.onreadystatechange = function() {
              if (4 == o.readyState) {
                if (504 == o.status) o.abort();
                else if (200 == o.status) {
                  var e = JSON.parse(o.responseText);
                  if ((console.log(e), e.code))
                    return void w["a"]
                      .alert({
                        title: "提示",
                        message: e.err,
                        confirmButtonColor: "#07c160",
                      })
                      .then(function() {
                        e.code < 0 && b.push("/login");
                      });
                  t(e);
                }
                o = null;
              }
            }),
            (o.ontimeout = function() {}),
            (n.sessionId = window.localStorage.getItem("sessionId")),
            console.log(n),
            o.send(JSON.stringify(n));
        },
      },
      E = t("d399");
    (r["a"].config.productionTip = !1),
      (r["a"].prototype.$api = C),
      (r["a"].prototype.$dialog = w["a"]),
      (r["a"].prototype.$toast = E["a"]),
      (r["a"].prototype.$common = d),
      r["a"].use(f["a"]),
      new r["a"]({
        router: b,
        render: function(e) {
          return e(s);
        },
      }).$mount("#app");
  },
  "64a9": function(e, n, t) {},
});
