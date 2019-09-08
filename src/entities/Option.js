function initRules(rules) {
  if (!rules) return null;
  return rules.split(',');
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
    this.value = this.initValue();
  }

  static TYPE = {
    NONE: 0, NUMBER: 1, ENUM: 2, STRING: 3, MAP: 4,
  }

  initValue() {
    console.log(this.rules);
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
}
