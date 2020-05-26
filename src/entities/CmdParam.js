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

  deepCopy() {
    return new CmdParam(JSON.parse(JSON.stringify(this)));
  }
}
