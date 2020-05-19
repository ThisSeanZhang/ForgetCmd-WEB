import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';

const TIME_OUT_MAX = 5000;

function checkSession() {
  if (!store.state.UserInfo.signed) {
    return;
  }
  const request = {
    methods: 'GET',
    url: `/sessions/${store.state.UserInfo.did}`,
  };
  const sender = axios.create({
    timeout: TIME_OUT_MAX,
  });

  sender(request)
    .then((resp) => {
      store.dispatch('UserInfo/setUserInfo', resp.data.data);
    })
    .catch(() => {
      store.dispatch('UserInfo/removeSignedUser');
    });
}

const ajax = (option = {
  url: '', data: {}, isSilence: false, method: 'GET',
}, loading = { doing: false, success: false }) => {
  // set page loading === true
  Vue.set(loading, 'doing', true);
  const opts = { method: option.method || 'GET', url: option.url };
  const query = {};
  Object.entries(option.data || {}).forEach(([key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
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
        Vue.set(loading, 'doing', false);
        Vue.set(loading, 'success', true);
        store.dispatch('UserInfo/updateExpTime');
      })
      .catch((error) => {
        checkSession();
        reject(error);
        Vue.set(loading, 'doing', false);
        Vue.set(loading, 'success', false);
      });
  });
};

function handleNotHTTPError(error, reject) {
  if (error.request) {
    Message.error('发送失败请检查网络连接╮（╯＿╰）╭');
    reject(error);
  } else {
    console.log(error);
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
