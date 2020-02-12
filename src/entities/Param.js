const currentLang = 'zh';
export default class Param {
  constructor(param) {
    this.value = param.value || 'default';
    this.description = param.description ? param.description : { [currentLang]: '' };
    this.index = param.index;
    this.selected = true;
  }

  getCurrentLocationDesc() {
    return this.paramsDesc.cn || '';
  }

  deepCopy() {
    return new Param(JSON.parse(JSON.stringify(this)));
  }

  getCurrentLangDesc() {
    return Object.prototype.hasOwnProperty.call(this.description, currentLang)
      ? this.description[currentLang]
      : '';
  }
}
