import strUtil from './StringUtils';
import { ajax } from '../api/fetch';
import Param from './Param';
import CommandOption from './CommandOption';

const currentLang = 'zh';

export default class Command {
  constructor(cmd) {
    this.cid = cmd.cid;
    this.commandName = cmd.commandName ? cmd.commandName : '';
    this.briefDesc = cmd.briefDesc ? cmd.briefDesc : { [currentLang]: '' };
    this.description = cmd.description ? cmd.description : { [currentLang]: '' };
    this.version = cmd.version;
    this.platform = cmd.platform;
    this.argNum = cmd.argNum;
    this.whenDeprecated = cmd.whenDeprecated;
    this.whenEnable = cmd.whenEnable;
    this.frequency = cmd.frequency;
    this.options = cmd.options ? cmd.options : [];
    this.params = cmd.params ? cmd.params : [];
    this.status = cmd.status;
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}`,
    };
    return ajax(request);
  }

  static createCommit(cmd) {
    console.log(cmd);
    const data = JSON.parse(JSON.stringify(cmd));
    cmd.options.forEach((option, index) => {
      data.options[index].rules = option.rules.join(',');
      delete data.options[index].value;
      delete data.options[index].selected;
    });
    cmd.params.forEach((param, index) => {
      delete data.params[index].value;
    });
    data.options = JSON.stringify(data.options);
    data.params = JSON.stringify(data.params);
    const request = {
      method: 'POST',
      url: 'commits/cmds',
      data,
    };
    return ajax(request);
  }

  static findLogCid(cid) {
    const request = {
      method: 'GET',
      url: `commits/cmds/${cid}`,
    };
    return ajax(request);
  }

  static CreateFackCmd() {
    const cmd = new Command({});
    cmd.briefDesc = '简要描述';
    cmd.commandName = 'commandName';
    cmd.frequency = '0';
    cmd.options = [
      new CommandOption({
        oid: 1, cid: 1, briefName: 'n', fullName: 'name', description: { zh: '设值容器名称' }, sort: 1,
      }),
      new CommandOption({
        oid: 2, cid: 2, briefName: 'p', fullName: 'port', description: { zh: '容器映射端口' }, sort: 2, type: CommandOption.TYPE.MAP,
      }),
      new CommandOption({
        oid: 3, cid: 3, briefName: 'a', fullName: 'a', description: { zh: 'aaa' }, sort: 2, type: CommandOption.TYPE.ENUM, rules: 'aaa,bbbb,ccc',
      }),
      new CommandOption({}),
    ];
    cmd.paras = [
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
      new Param({}),
    ];
    return cmd;
  }

  getOptionMap() {
    const obj = {};
    this.options.forEach((op) => {
      obj[op.fullName] = op;
    });
    return obj;
  }

  deepCopy() {
    return Command.fromObj(JSON.parse(JSON.stringify(this.toData())));
  }

  toSnap() {
    return { cid: this.cid, commandName: this.commandName, title: 'text' };
  }

  toData() {
    return {
      index: this.index,
      cid: this.cid,
      commandName: this.commandName,
      briefDesc: strUtil.o2str(this.briefDesc, () => ''),
      description: strUtil.o2str(this.description, () => ''),
      version: this.version,
      platform: this.platform,
      argNum: this.argNum,
      whenDeprecated: this.whenDeprecated,
      whenEnable: this.whenEnable,
      frequency: this.frequency,
      options: CommandOption.convertDatas(this.options),
      params: Param.convertDatas(this.params),
      status: this.status,
    };
  }

  static convertDatas(cmds) {
    if (!cmds || cmds.length === 0) return [];
    return cmds.map(p => p.toData());
  }

  static fromObj(obj) {
    return new Command({
      ...obj,
      briefDesc: strUtil.parse(obj.briefDesc, () => {}),
      description: strUtil.parse(obj.description, () => {}),
      options: CommandOption.convertObjs(obj.options),
      params: Param.convertObjs(obj.params),
      rules: strUtil.parse(obj.rules, () => []),
    });
  }
}
