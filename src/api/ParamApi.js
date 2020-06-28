import { ajax } from './fetch';

export default {
  findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}/params`,
    };
    return ajax(request);
  },
  loadType() {
    const request = {
      method: 'GET',
      url: 'params/types',
    };
    return ajax(request);
  },
};
