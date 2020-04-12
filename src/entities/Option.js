import { ajax } from '../api/fetch';
/**
 * 旧的
 */
function initRules(rules) {
  if (!rules) return [];
  return typeof rules !== 'string' ? rules : rules.split(',');
}
export default class Option {
  constructor(option) {
    this.oid = option.oid;
    this.cid = option.cid;
    this.briefName = option.briefName;
    this.fullName = option.fullName;
    this.description = option.description;
    this.whenDeprecated = option.whenDeprecated;
    this.whenEnable = option.whenEnable;
    this.frequency = option.frequency;
    this.selected = false;
    this.type = option.type;
    this.rules = initRules(option.rules);
    this.value = this.initValue(option.value);
  }

  static TYPE = {
    NONE: 0, NUMBER: 1, ENUM: 2, STRING: 3, MAP: 4,
  }

  initValue(value) {
    // console.log(this.rules);
    if (value) return value;
    if (this.isMultip()) return [];
    if (!this.rules) {
      return '';
    }
    if (this.isType(Option.TYPE.ENUM) && (typeof this.rules === typeof [])) {
      return this.rules[0];
    }
    return '';
  }

  showName() {
    if (this.briefName === this.fullName) {
      return this.fullName;
    }
    return `${this.briefName} (${this.fullName})`;
  }

  isMultip() {
    return this.type >= 2 ** 14;
  }

  isType(inType) {
    return this.type % (2 ** 14) === inType;
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
    return new Option(JSON.parse(JSON.stringify(this)));
  }

  static matchKey(value, key) {
    return value ? value.toLowerCase().indexOf(key.toLowerCase()) >= 0 : false;
  }

  searchKey(key) {
    return Option.matchKey(this.briefName, key)
      || Option.matchKey(this.fullName, key)
      || Option.matchKey(JSON.stringify(this.description), key);
  }
}
