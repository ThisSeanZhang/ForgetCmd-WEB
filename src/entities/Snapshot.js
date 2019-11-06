import { ajax } from '../api/fetch';

export default class Snapshot {
  constructor(snapshot) {
    this.snapId = snapshot.snapId;
    this.config = snapshot.config;
    this.title = snapshot.title;
    this.share = snapshot.share;
    this.shareCode = snapshot.shareCode;
    this.allowCopy = snapshot.allowCopy;
    this.did = snapshot.did;
  }

  static createSnapshot(cmd) {
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
  }

  static findBySid(sid) {
    const request = {
      method: 'GET',
      url: `snapshots/${sid}`,
    };
    return ajax(request);
  }
}
