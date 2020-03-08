// snapShot 相关
const LOCAL_SNAPSHOT_KEY = 'SNAPSHOT_KEY';
const SNAPSHOT_STATE_KEY = 'cmdHistory';
const SNAPSHOT_HIS_INIT = 'CommandHistory/initRecord';
const snapHisUpadate = 'CommandHistory/initRecord';

function getSnaps() {
  const snapStr = localStorage.getItem(LOCAL_SNAPSHOT_KEY);
  try {
    return snapStr
      ? JSON.parse(snapStr)
      : { 'docker run': [{ title: 'snap1' }, { title: 'snap2' }] };
    // : {};
  } catch {
    return {};
  }
}

function updateSnap(snaps) {
  try {
    localStorage.setItem(LOCAL_SNAPSHOT_KEY, JSON.stringify(snaps));
  } catch {
    // TODO 抛出异常
  }
}

// lang
const LOCAL_LANG_KEY = 'LANG_KEY';
const LANG_INIT = 'Language/initLang';

export default (store) => {
  // Called when store is initialized
  console.log('my plugin start');
  // store.dispatch(SNAPSHOT_HIS_INIT, getSnaps());
  store.commit(SNAPSHOT_HIS_INIT, getSnaps());
  store.commit(LANG_INIT, localStorage.getItem(LOCAL_LANG_KEY));
  store.subscribe((mutation, state) => {
    if (mutation.type === snapHisUpadate) {
      updateSnap(state[SNAPSHOT_STATE_KEY]);
    }
    // Called after every mutation
    // Mutation comes in the format `{ type, payload }`
  });
};
