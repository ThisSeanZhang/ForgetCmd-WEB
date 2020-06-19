import CommandOption from './CommandOption';
import CmdParam from './Param';
import strUtil from './StringUtils';

export default class Snapshot {
  constructor(snap) {
    // this.snapId = snap.snapId;
    // this.config = snap.config;
    // this.title = snap.title;
    // this.share = snap.share;
    // this.shareCode = snap.shareCode;
    // this.allowCopy = snap.allowCopy;
    // this.did = snap.did;

    this.snapId = snap.snapId;// 存储的是snap的id
    this.type = snap.type; // 快照类型 cmd commit
    this.ccid = snap.ccid; // 如果是Commit的快照
    this.cid = snap.cid; // command id
    this.title = snap.title;
    this.paramVal = Object.prototype.toString.call(snap.paramVal) === '[object Array]' ? snap.paramVal : [];
    this.optionVal = Object.prototype.toString.call(snap.optionVal) === '[object Array]' ? snap.optionVal : [];
    this.share = snap.share === true;
    this.shareCode = snap.shareCode;
    this.allowCopy = snap.allowCopy === true;
    this.did = snap.did; // 开发者ID
    this.version = snap.version;
    this.commandName = snap.commandName;
    this.createTime = snap.createTime;
    this.desc = snap.desc;
    this.did = snap.did;
    this.location = snap.location;
  }

  dealValue(deal) {
    let allRows = [this.commandName];
    const cmdOption = this.optionVal
      .filter(option => option.selected)
      .map((option) => {
        if (option.isMultip()) {
          return option.value.filter(p => p.selected).map(p => `${this.buildHyphen(option)}${option.briefName} ${p.value}`);
        }
        return [`${this.buildHyphen(option)}${option.briefName} ${option.value}`];
      })
      .reduce((a1, a2) => a1.concat(a2), []);
    // console.log(JSON.stringify(cmdOption));
    allRows = allRows.concat(cmdOption);
    allRows = allRows.concat(this.paramVal.map(p => p.value));
    return typeof deal === 'function' ? deal(allRows) : allRows;
  }

  static oneLine(params) {
    return params.join(' ');
  }

  static multLine(params) {
    return params.map((p, index) => (index === params.length - 1 ? p : `${p} \\`));
  }

  static copyLine(isOneLine) {
    return params => (isOneLine
      ? params.join(' ')
      : params.map((p, index) => (index === params.length - 1 ? p : `${p} \\\r`)).join(''));
  }

  static buildHyphen(option) {
    if (option.briefName === option.fullName) {
      return '--';
    }
    return '-';
  }

  toData() {
    return {
      snapId: this.snapId,
      type: this.type,
      ccid: this.ccid,
      cid: this.cid,
      title: this.title,
      paramVal: JSON.stringify(CmdParam.convertDatas(this.paramVal, true)),
      optionVal: JSON.stringify(CommandOption.convertDatas(this.optionVal, true)),
      share: this.share,
      shareCode: this.shareCode,
      allowCopy: this.allowCopy,
      did: this.did,
      version: this.version,
      commandName: this.commandName,
      createTime: this.createTime,
      desc: this.desc,
      location: this.location,
    };
  }

  static fromObj(obj) {
    return new Snapshot({
      ...obj,
      optionVal: CommandOption.convertObjs(strUtil.parse(obj.optionVal), () => []),
      paramVal: CmdParam.convertObjs(strUtil.parse(obj.paramVal), () => []),
    });
  }
}
