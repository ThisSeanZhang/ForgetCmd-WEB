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
    NONE: 0, NUMBER: 1, ENUM: 2, STRING: 3,
  }

  static getType() {
    return {
      STRING: 0, NUMBER: 1, ENUM: 2, NONE: 3,
    };
  }

  initValue() {
    console.log(this.rules);
    if (!this.rules) {
      return '';
    }
    if (this.type === Option.TYPE.ENUM && (typeof this.rules === typeof [])) {
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
}
