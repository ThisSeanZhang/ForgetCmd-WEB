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
    this.value = '';
  }
}
