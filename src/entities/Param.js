export default class Param {
  constructor(param) {
    this.value = param.value || 'default';
    this.paramsDesc = { cn: 'cn_desc' };
    this.index = param.index;
  }

  getCurrentLocationDesc() {
    return this.paramsDesc.cn || '';
  }
}
