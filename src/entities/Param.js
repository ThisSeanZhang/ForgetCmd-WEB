export default class Param {
  constructor(param) {
    this.value = param.value || '';
    this.paramsDesc = { cn: '' };
    this.index = param.index;
  }

  getCurrentLocationDesc() {
    return this.paramsDesc.cn || '';
  }
}
