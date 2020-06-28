import strUtil from './StringUtils';

export default class Param {
  constructor(param) {
    this.value = param.value || 'default';
    this.description = param.description || {};
    this.index = param.index;
    this.selected = param.selected === undefined ? true : param.selected;
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

  toData(value = false) {
    return {
      index: this.index,
      description: JSON.stringify(this.description),
      value: value ? this.value : null,
    };
  }

  static convertDatas(params, value = false) {
    if (!params || params.length === 0) return [];
    return params.map(p => p.toData(value));
  }

  static convertObjs(objs) {
    if (!objs || objs.length === 0) return [];
    return objs.map(Param.fromObj);
  }

  static fromObj(obj) {
    return new Param({
      ...obj,
      description: strUtil.parse(obj.description, () => {}),
    });
  }
}
