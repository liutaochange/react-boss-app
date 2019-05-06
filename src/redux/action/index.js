export const type = {
  USER_INFO: "__USER_INFO__"
};
export const changeUserInfo = userInfo => {
  return {
    type: type.USER_INFO,
    userInfo
  };
};