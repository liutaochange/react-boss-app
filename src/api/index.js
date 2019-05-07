import axios from "axios";
import { Toast } from "antd-mobile";
import Store from "@/assets/js/utils";
const request = axios.create({
  timeout: 10000,
  withCredentials: true
});

// 登录
export const login = (user, password) =>
  request.post("/user/login", {
    user,
    password
  });
// 注册
export const register = (user, password, type) =>
  request.post("/user/register", {
    user,
    password,
    type
  });
// 完善用户信息
export const update = info =>
  request.post("/user/update", {
    user: (Store.get("__USER_INFO__") && Store.get("__USER_INFO__").user) || "",
    type: (Store.get("__USER_INFO__") && Store.get("__USER_INFO__").type) || "",
    ...info
  });

// 拦截请求, 在header中添加token
request.interceptors.request.use(function(request) {
  const token =
    (Store.get("__USER_INFO__") && Store.get("__USER_INFO__").token) || "";
  if (
    !token &&
    request.url !== "/user/login" &&
    request.url !== "/user/register"
  ) {
    Toast.info("您已离线，请重新登录", 1);
    Store.remove("__USER_INFO__");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } else {
    request.headers = {
      ...request.headers,
      Authentication:
        (Store.get("__USER_INFO__") && Store.get("__USER_INFO__").token) || ""
    };
    return request;
  }
});

// 拦截相应
request.interceptors.response.use(function(response) {
  if (response.status === "401") {
    Toast.info("您已离线，请重新登录", 1);
    Store.remove("__USER_INFO__");
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } else {
    return response;
  }
});
