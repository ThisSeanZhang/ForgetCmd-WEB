import { ajax } from './fetch';
// import store from '../store';

// console.log(store.state.UserInfo.admin);
export default {
  createSnapshot(snap) {
    const request = {
      method: 'POST',
      url: '/snapshots',
      data: snap,
    };
    return ajax(request);
  },
  findBySid(data) {
    const request = {
      method: 'GET',
      url: `/snapshots/${data.snapId}`,
      data,
    };
    return ajax(request);
  },
  adminAllSnap() {
    const request = {
      method: 'GET',
      url: '/manager/snaps',
    };
    return ajax(request);
  },
  adminDeleteSnap(snapId) {
    const request = {
      method: 'DELETE',
      url: `/manager/snaps/${snapId}`,
    };
    return ajax(request);
  },
  searchSnap(data, loading) {
    const request = {
      method: 'GET',
      url: '/snapshots/search',
      data,
    };
    return ajax(request, loading);
  },
};
