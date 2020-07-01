import Vue from 'vue';
import axios from 'axios';
import { Message } from 'element-ui';
import store from '../store';
import i18n from '../lang';

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
        Vue.set(loading, 'message', res.data.message);
        store.dispatch('UserInfo/updateExpTime');
      })
      .catch((error) => {
        checkSession();
        reject(error);
        Vue.set(loading, 'doing', false);
        Vue.set(loading, 'success', false);
        Vue.set(loading, 'message', error.response.data.message);
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
        Message.warning(`${i18n.t(error.response.data.message)}(●ˇ∀ˇ●)`);
    }
  } else {
    handleNotHTTPError(error, () => {});
  }
}
function handleError(funcs = {}, showMessage = false) {
  return (error) => {
    if (!error.response) handleNotHTTPError(error, funcs.handleNetError || (() => {}));
    const dealFunc = funcs[parseInt(error.response.status, 10)];
    if (dealFunc) {
      dealFunc(error);
      if (showMessage) Message.info(`(●ˇ∀ˇ●) ${i18n.t(error.response.data.message)}`);
    } else {
      Message.warning(`(●ˇ∀ˇ●) ${i18n.t(error.response.data.message)}`);
    }
  };
}

export {
  ajax,
  handleAll,
  just404,
  wantNothing,
  handleError,
};
