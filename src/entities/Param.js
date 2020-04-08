
export default class Param {
  constructor(param) {
    this.value = param.value || 'default';
    this.description = param.description || {};
    this.index = param.index;
    this.selected = param.selected;
  }

  getCurrentLocationDesc() {
    return this.paramsDesc.cn || '';
  }

  deepCopy() {
    return new Param(JSON.parse(JSON.stringify(this)));
  }

  getCurrentLangDesc(currentLang) {
    return Object.prototype.hasOwnProperty.call(this.description, currentLang)
      ? this.description[currentLang]
      : '';
  }

  toData() {
    return {
      index: this.index,
      description: JSON.stringify(this.description),
    };
  }

  static convertDatas(params) {
    if (!params || params.length === 0) return [];
    return params.map(p => p.toData());
  }
}
