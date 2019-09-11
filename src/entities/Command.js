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
}
