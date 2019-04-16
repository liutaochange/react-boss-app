import { Toast } from 'antd-mobile';
export default () => {
  Toast.loading('Loading...', 3, () => {
    console.log('Load complete !!!');
  }, true);
};
