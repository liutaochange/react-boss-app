import axios from "axios";
import { Toast } from "antd-mobile";
import Store from "@/assets/js/utils";
const request = axios.create({
  timeout: 10000,
  withCredentials: true
});

// 获取用户信息
export const login = (user, password) =>
  request.post("/user/login", {
    user,
    password
  });
// 增加用户
export const register = (user, password, type) =>
  request.post("/user/register", {
    user,
    password,
    type
  });

// 拦截请求, 在header中添加token
request.interceptors.request.use(function(request) {
  request.headers = {
    ...request.headers,
    Authentication:
      (Store.get("__USER_INFO__") && Store.get("__USER_INFO__").token) || ""
  };
  console.log(request);
  return request;
});

// 拦截相应
request.interceptors.response.use(function(response) {
  console.log(response);
  if (response.status === "401") {
    Toast.info("您已离线，请重新登录", 1);
    setTimeout(() => {
      window.location.href = "/login.html";
    }, 1000);
  } else {
    return response;
  }
});
