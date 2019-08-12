import axios from 'axios';
import { Message } from 'element-ui';
// import store from '../store';

const TIME_OUT_MAX = 5000;

const ajax = (option = {
  url: '', data: {}, isSilence: false, method: 'GET',
}) => {
  const opts = { method: option.method || 'GET', url: option.url };
  const query = {};
  Object.entries(option.data).forEach(([key, value]) => {
    if (value && value !== '') {
      (query[key] = value);
    }
  });
  opts[opts.method === 'GET' ? 'params' : 'data'] = query;
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      timeout: TIME_OUT_MAX,
    });
    instance(opts)
      .then((res) => {
        resolve(res);
      })
      .catch((error) => {
        // checkSession();
        reject(error);
      });
  });
};
// const checkSession = function () {
//   if (!store.state.UserInfo.signed) {
//     return;
//   }
//   const request = {
//     methods: 'GET',
//     url: `/session/${  store.state.UserInfo.developerId}`,
//   };
//   const sender = axios.create({
//     timeout: TIME_OUT_MAX,
//   });

//   sender(request)
//     .then((resp) => {
//       store.dispatch('UserInfo/setUserInfo', resp.data.data);
//     })
//     .catch((error) => {
//       console.log(error);
//       Message('登入信息已经过期了,访问非公开信息需要重新登陆哦');
//       store.dispatch('UserInfo/delUserInfo');
//     });
// };
function handleNotHTTPError(error, reject) {
  if (error.request) {
    Message.error('发送失败请检查网络连接╮（╯＿╰）╭');
    reject(error);
  } else {
    Message('欸，好像出错了_(:з)∠)_，再试一次吧');
    reject(error);
  }
}
function handleAll(error) {
  return new Promise((resolve, reject) => {
    if (error.response) {
      switch (parseInt(error.response.status, 10)) {
        case 504:
          Message.error('发送失败请检查网络连接╮（╯＿╰）╭');
          reject(error);
          break;
        default:
      }
      resolve(error.response);
    } else {
      handleNotHTTPError(error, reject);
    }
  });
}
function just404(error) {
  return new Promise((resolve, reject) => {
    if (error.response) {
      switch (parseInt(error.response.status, 10)) {
        case 404:
          resolve(error);
          break;
        case 504:
          Message.error('发送失败请检查网络连接╮（╯＿╰）╭');
          reject(error);
          break;
        default:
          Message.warning(`${error.response.data.message}(●ˇ∀ˇ●)`);
          reject(error);
      }
    } else {
      handleNotHTTPError(error, reject);
    }
  });
}
function wantNothing(error) {
  if (error.response) {
    switch (parseInt(error.response.status, 10)) {
      case 504:
        Message.error('发送失败请检查网络连接╮（╯＿╰）╭');
        break;
      default:
        Message.warning(`${error.response.data.message}(●ˇ∀ˇ●)`);
    }
  } else {
    handleNotHTTPError(error, () => {});
  }
}

export {
  ajax,
  handleAll,
  just404,
  wantNothing,
};
