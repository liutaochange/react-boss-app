import { type } from "../action/index";
import Store from "@/assets/js/utils";
const initState = {
  info: Store.get('__USER_INFO__') || {},
  isLogin: false
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