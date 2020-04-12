import { ajax } from '../api/fetch';
// 旧的
export default class CmdParam {
  constructor(param) {
    this.cpid = param.cpid;
    this.cid = param.cid;
    this.sort = param.sort;
    this.paramName = param.paramName;
    this.description = param.description;
    this.required = param.required;
    this.type = param.type;
    this.selectd = param.selectd;
    this.value = param.value;
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}/params`,
    };
    return ajax(request);
  }

  static loadType() {
    const request = {
      method: 'GET',
      url: 'params/types',
    };
    return ajax(request);
  }

  deepCopy() {
    return new CmdParam(JSON.parse(JSON.stringify(this)));
  }
}
