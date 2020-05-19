import { ajax } from '../api/fetch';
import strUtil from './StringUtils';

function initRules(rules) {
  if (!rules) return [];
  return typeof rules !== 'string' ? rules : rules.split(',');
}

export default class CommandOption {
  constructor(option) {
    this.oid = option.oid;
    this.cid = option.cid;
    this.briefName = option.briefName;
    this.fullName = option.fullName;
    this.description = option.description ? option.description : {};
    this.frequency = option.frequency;
    this.selected = option.selected;
    this.type = option.type;
    this.rules = initRules(option.rules);
    this.value = this.initValue(option.value);
    // 使用的时候是否忽略类型
    this.ignore = option.ignore;
    // 是否能重复选择
    this.duplicate = option.duplicate === true;
  }

  static TYPE = {
    NONE: 0, NUMBER: 1, ENUM: 2, STRING: 3, MAP: 4,
  }

  static types() {
    return Object.keys(CommandOption.TYPE)
      .map(key => ({ key: CommandOption.TYPE[key], value: key }));
  }

  initValue(value) {
    // console.log(this.rules);
    if (value) return value;
    if (this.isMultip()) return [];
    if (!this.rules) {
      return '';
    }
    if (this.isType(CommandOption.TYPE.ENUM) && (typeof this.rules === typeof [])) {
      return this.rules[0];
    }
    return '';
  }

  showName() {
    return this.briefName || this.fullName;
  }

  sameBriefAndFull() {
    return strUtil.isEmptyString(this.briefName)
      || strUtil.isEmptyString(this.fullName)
      || this.briefName === this.fullName;
  }

  isMultip() {
    return this.type >= 2 ** 14;
  }

  isType(inType) {
    return this.ignore ? false : this.type % (2 ** 14) === inType;
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}/options`,
    };
    return ajax(request);
  }

  static loadType() {
    const request = {
      method: 'GET',
      url: 'options/types',
    };
    return ajax(request);
  }

  deepCopy() {
    return new CommandOption(JSON.parse(JSON.stringify(this)));
  }

  static matchKey(value, key) {
    return value ? value.toLowerCase().indexOf(key.toLowerCase()) >= 0 : false;
  }

  searchKey(key) {
    return CommandOption.matchKey(this.briefName, key)
      || CommandOption.matchKey(this.fullName, key)
      || CommandOption.matchKey(JSON.stringify(this.description), key);
  }

  getCurrentLangDesc(currentLang) {
    return Object.prototype.hasOwnProperty.call(this.description, currentLang)
      ? this.description[currentLang]
      : '';
  }

  toData() {
    return {
      oid: this.oid,
      description: strUtil.o2str(this.description, () => ''),
      cid: this.cid,
      briefName: this.briefName,
      fullName: this.fullName,
      frequency: this.frequency,
      selected: this.selected,
      type: this.type,
      rules: strUtil.o2str(this.rules, () => ''),
      ignore: this.ignore,
      duplicate: this.duplicate,
    };
  }

  static convertDatas(params) {
    if (!params || params.length === 0) return [];
    return params.map(p => p.toData());
  }

  static convertObjs(objs) {
    if (!objs || objs.length === 0) return [];
    return objs.map(p => CommandOption.fromObj(p));
  }

  static fromObj(obj) {
    return new CommandOption({
      ...obj,
      description: strUtil.parse(obj.description, () => {}),
      rules: strUtil.parse(obj.rules, () => []),
    });
  }
}
