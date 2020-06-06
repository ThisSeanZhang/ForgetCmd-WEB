import { ajax } from './fetch';

export default {
  createSnapshot(snap) {
    const request = {
      method: 'POST',
      url: '/snapshots',
      data: snap,
    };
    return ajax(request);
  },
  findBySid(sid) {
    const request = {
      method: 'GET',
      url: `/snapshots/${sid}`,
    };
    return ajax(request);
  },
};
