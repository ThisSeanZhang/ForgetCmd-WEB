import { ajax } from '../api/fetch';
import Option from './Option';
import Param from './Param';

export default class Command {
  constructor(cmd) {
    this.cid = cmd.cid;
    this.commandName = cmd.commandName;
    this.briefDesc = cmd.briefDesc;
    this.description = cmd.description;
    this.version = cmd.version;
    this.platform = cmd.platform;
    this.argNum = cmd.argNum;
    this.whenDeprecated = cmd.whenDeprecated;
    this.whenEnable = cmd.whenEnable;
    this.frequency = cmd.frequency;
    this.options = cmd.options ? cmd.options : [];
    this.params = cmd.params ? cmd.params : [];
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
      new Option({
        oid: 1, cid: 1, briefName: 'n', fullName: 'name', description: { zh: '设值容器名称' }, sort: 1,
      }),
      new Option({
        oid: 2, cid: 2, briefName: 'p', fullName: 'port', description: { zh: '容器映射端口' }, sort: 2, type: Option.TYPE.NUMBER,
      }),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
      new Option({}),
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
}
