import { type } from "../action/index";
import Store from "Assets/js/utils";
const userInfo = Store.get('__USER_INFO__') || {}
const initState = {
  info: userInfo,
  isLogin: Boolean(userInfo && userInfo.token && userInfo.type)
};
const user = (state = initState, action) => {
  switch (action.type) {
    case type.USER_INFO:
      return {
        ...state,
        info: action.userInfo,
        isLogin: Boolean(action.userInfo.token && action.userInfo.type)
      };
    default:
      return {
        ...state
      };
  }
};
export default user