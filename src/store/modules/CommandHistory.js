import Vue from 'vue';
import SnapShot from '../../entities/Snapshot';
import StringUtils from '../../entities/StringUtils';

// initial state
const state = {
  cmdHistory: {},
  all: [],
};
/* eslint no-shadow: ["error", { "allow": ["state", "getters"] }] */
// getters
const getters = {
  snaps(state) {
    return { ...state.cmdHistory };
  },
  // getCommandHis: state => commandName => (Object.keys(state.cmdHistory).includes(commandName)
  //   ? JSON.stringify(state.cmdHistory[commandName])
  //   : []),
  // getCommandHis: state => (commandName) => {
  //   console.log('commandName', commandName);
  //   console.log('state', state.cmdHistory[commandName]);
  //   return Object.keys(state.cmdHistory).includes(commandName)
  //     ? [...state.cmdHistory[commandName]]
  //     : [];
  // },
  getCommandHis: state => commandName => state.cmdHistory[commandName] || [],
};

// actions
const actions = {
  getCommandHis({ state }, commandName) {
    return Object.keys(state.cmdHistory).includes(commandName)
      ? state.cmdHistory[commandName]
      : [];
  },
  // initRecord({ state, getters }, recordStr) {
  //   console.log(getters);
  //   Object.keys(recordStr).forEach((key) => {
  //     if (Object.prototype.toString.call(recordStr[key]) === '[object Array]') {
  //       // state.cmdHistory[key] = recordStr[key].map(snap => new SnapShot(snap));
  //       Vue.set(state.cmdHistory, key, recordStr[key].map(snap => new SnapShot(snap)));
  //     }
  //   });
  //   // state.cmdHistory = recordStr.map(snap => new SnapShot(snap));
  // },
  removeByIndex({ commit }, option) {
    commit('removeByIndex', option);
  },
};
/* eslint no-param-reassign: ["error", { "props": false }] */
// mutations
const mutations = {
  newRecord(state, inSnapshot) {
    const snapshot = JSON.parse(JSON.stringify(inSnapshot));
    if (!snapshot || !snapshot.commandName) return;
    let currentCmdHis = state.cmdHistory[snapshot.commandName];
    // 如果不存在的话
    if (!currentCmdHis) {
      state.cmdHistory = { ...state.cmdHistory, [snapshot.commandName]: [] };
      currentCmdHis = state.cmdHistory[snapshot.commandName];
    }
    // console.log(currentCmdHis);
    currentCmdHis.unshift(new SnapShot(snapshot));
    // console.log(state.cmdHistory[snapshot.commandName]);
    currentCmdHis.splice(10);
    // 存入local Store
    localStorage.setItem('SNAPSHOT_KEY', StringUtils.o2str(state.cmdHistory));
  },
  initRecord(state, recordStr) {
    console.log(recordStr);
    Object.keys(recordStr).forEach((key) => {
      if (Object.prototype.toString.call(recordStr[key]) === '[object Array]') {
        // state.cmdHistory[key] = recordStr[key].map(snap => new SnapShot(snap));
        Vue.set(state.cmdHistory, key, recordStr[key].map(snap => new SnapShot(snap)));
        // Vue.set(state.cmdHistory, key, recordStr[key].map(snap => new SnapShot({
        //   ...snap,
        //   paramVal: (snap.paramVal || []).map(p => new CmdParam(p)),
        //   optionVal: (snap.optionVal || []).map(p => new CommandOption(p)),
        // })));
      }
    });
  },
  removeByIndex(state, { commandName, index }) {
    return new Promise((resolve, reject) => {
      if (typeof index !== 'number') {
        // Notification.info({
        //   title: '出错了',
        //   message: '啊欧~删除失败<(＿＿)>',
        // });
        // Message.info({
        //   showClose: true,
        //   message: '啊欧~删除失败<(＿ ＿)>',
        // });
        reject();
        return;
      }
      try {
        state.cmdHistory[commandName].splice(index, 1);
        localStorage.setItem('SNAPSHOT_KEY', StringUtils.o2str(state.cmdHistory));
        resolve();
      } catch {
        reject();
      }
      // Notification.success({
      //   title: '成功',
      //   message: '这是一条成功的提示消息',
      // });
      // console.log(i18n.t('page.commandPanel.param'));
      // Message.success({
      //   showClose: true,
      //   message: '成功删除',
      // });
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
