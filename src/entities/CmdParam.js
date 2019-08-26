export default class CmdParam {
  constructor(param) {
    this.cpid = param.cpid;
    this.cid = param.cid;
    this.sort = param.sort;
    this.description = param.description;
    this.required = param.required;
    this.value = '';
  }
}
