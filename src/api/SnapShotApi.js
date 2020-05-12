import { ajax } from './fetch';

export default {
  createSnapshot(cmd) {
    const request = {
      method: 'POST',
      url: 'snapshots',
      data: {
        title: cmd.commandName,
        config: JSON.stringify(cmd),
        cid: cmd.cid,
      },
    };
    return ajax(request);
  },
  findBySid(sid) {
    const request = {
      method: 'GET',
      url: `snapshots/${sid}`,
    };
    return ajax(request);
  },
};
