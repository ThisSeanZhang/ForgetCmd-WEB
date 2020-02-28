
const localSnapshotKey = 'SNAPSHOT_KEY';
const STATE_KEY = 'cmdHistory';
const snapHisInit = 'CommandHistory/initRecord';
const snapHisUpadate = 'CommandHistory/initRecord';

function getSnaps() {
  const snapStr = localStorage.getItem(localSnapshotKey);
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
    localStorage.setItem(localSnapshotKey, JSON.stringify(snaps));
  } catch {
    // TODO 抛出异常
  }
}
export default (store) => {
  // Called when store is initialized
  console.log('my plugin start');
  // store.dispatch(snapHisInit, getSnaps());
  store.commit(snapHisInit, getSnaps());
  store.subscribe((mutation, state) => {
    if (mutation.type === snapHisUpadate) {
      updateSnap(state[STATE_KEY]);
    }
    // Called after every mutation
    // Mutation comes in the format `{ type, payload }`
  });
};
