import { ajax } from '../api/fetch';

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

  static createAddLog(cmd) {
    console.log(cmd);
    const data = JSON.parse(JSON.stringify(cmd));
    cmd.options.forEach((option, index) => {
      data.options[index].rules = option.rules.join(',');
    });
    data.options = JSON.stringify(data.options);
    data.params = JSON.stringify(data.params);
    const request = {
      method: 'POST',
      url: 'verifies/cmds',
      data,
    };
    return ajax(request);
  }

  static findLogCid(cid) {
    const request = {
      method: 'GET',
      url: `verifies/cmds/${cid}`,
    };
    return ajax(request);
  }
}
