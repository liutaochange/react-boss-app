import axios from "axios";
const request = axios.create({
  timeout: 10000,
  withCredentials: true
})

// 获取用户信息
export const getUserInfo = () => request.get('/user/info')
// 增加用户
export const addUser = () => request.get('/user/add')