import { ajax } from './fetch';

export default {
  loadType() {
    const request = {
      method: 'GET',
      url: 'options/types',
    };
    return ajax(request);
  },
  findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}/options`,
    };
    return ajax(request);
  },
};
