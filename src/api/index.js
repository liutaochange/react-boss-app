import axios from "axios";
import { Toast } from "antd-mobile";
const request = axios.create({
  timeout: 10000,
  withCredentials: true
});

// 获取用户信息
export const getUserInfo = () => request.get("/user/info");
// 增加用户
export const addUser = () => request.get("/user/add");

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
