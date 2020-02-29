import { ajax } from '../api/fetch';
import Param from './Param';
import CommandOption from './CommandOption';
import Command from './Command';

const currentLang = 'zh';

export default class CommandCommit {
  constructor(commit) {
    this.ccid = commit.ccid;
    this.cid = commit.cid;
    this.commandName = commit.commandName ? commit.commandName : '';
    this.briefDesc = commit.briefDesc ? commit.briefDesc : { [currentLang]: '' };
    this.description = commit.description ? commit.description : { [currentLang]: '' };
    this.version = commit.version;
    this.platform = commit.platform;
    this.argNum = commit.argNum;
    this.whenDeprecated = commit.whenDeprecated;
    this.whenEnable = commit.whenEnable;
    this.options = commit.options ? commit.options : [];
    this.params = commit.params ? commit.params : [];
    this.status = commit.status;
    this.items = commit.items;
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}`,
    };
    return ajax(request);
  }

  static sendCommit(commit) {
    console.log(commit);
    const data = JSON.parse(JSON.stringify(commit));
    commit.options.forEach((option, index) => {
      data.options[index].rules = option.rules.join(',');
      delete data.options[index].value;
      delete data.options[index].selected;
    });
    commit.params.forEach((param, index) => {
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

  toCommand() {
    return new Command(this);
  }

  static CreateFackCommit() {
    const commit = new CommandCommit({});
    commit.commandName = 'docker run';
    commit.briefDesc = { zh: '' };
    commit.options = [
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
    commit.params = [
      new Param({ index: 0 }),
      new Param({ index: 1 }),
      new Param({ index: 2 }),
      new Param({ index: 3 }),
      new Param({ index: 4 }),
      new Param({ index: 5 }),
      new Param({ index: 6 }),
      new Param({ index: 7 }),
      new Param({ index: 8 }),
      new Param({ index: 9 }),
    ];
    return commit;
  }

  static getCommitList() {
    return [
      {
        commandName: 'docker run', cid: undefined, version: 0, type: 'create', status: 0, size: 9, time: 1581908038524,
      },
      {
        commandName: 'docker inspect', cid: 123, version: 0, type: 'modify', status: 0, size: 9, time: 1581908038524,
      },
    ];
  }

  getOptionMap() {
    const obj = {};
    this.options.forEach((op) => {
      obj[op.fullName] = op;
    });
    return obj;
  }
}
