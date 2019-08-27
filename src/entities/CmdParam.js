import { ajax } from '../api/fetch';

export default class CmdParam {
  constructor(param) {
    this.cpid = param.cpid;
    this.cid = param.cid;
    this.sort = param.sort;
    this.description = param.description;
    this.required = param.required;
    this.value = '';
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}/params`,
    };
    return ajax(request);
  }
}
