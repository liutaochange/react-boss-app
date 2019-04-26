import axios from "axios";
import { Toast } from "antd-mobile";
import Store from "@/assets/js/utils"
const request = axios.create({
  timeout: 10000,
  withCredentials: true,
  headers: {'Authentication': Store.get('__USER_INFO__') && Store.get('__USER_INFO__').token}
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
    type,
  });

// 拦截请求
axios.interceptors.request.use(function(config) {
  Toast.loading("加载中", 0);
  return config;
});

// 拦截相应
axios.interceptors.response.use(function(config) {
  Toast.hide();
  return config;
});
