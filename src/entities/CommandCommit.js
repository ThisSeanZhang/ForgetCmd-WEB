import strUtil from './StringUtils';
import { ajax } from '../api/fetch';
import Param from './Param';
import CommandOption from './CommandOption';
import Command from './Command';
import CommitItem from './CommitItem';

export default class CommandCommit {
  constructor(commit) {
    this.ccid = commit.ccid;
    this.cid = commit.cid;
    this.commandName = commit.commandName ? commit.commandName : '';
    this.briefDesc = commit.briefDesc ? commit.briefDesc : {};
    this.description = commit.description ? commit.description : {};
    this.version = commit.version || 0;
    this.platform = commit.platform;
    this.argNum = commit.argNum;
    this.whenDeprecated = commit.whenDeprecated;
    this.whenEnable = commit.whenEnable;
    this.options = commit.options ? commit.options.map(op => new CommandOption(op)) : [];
    this.params = commit.params ? commit.params.map(p => new Param(p)) : [];
    this.status = commit.status;
    this.items = commit.items;
    this.createTime = commit.createTime;
    this.remark = commit.remark;
  }

  static findByCid(cid) {
    const request = {
      method: 'GET',
      url: `cmds/${cid}`,
    };
    return ajax(request);
  }

  /* eslint no-param-reassign: ["error", { "props": false }] */

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
    commit.commandName = 'podman run';
    commit.briefDesc = { zh: '' };
    commit.options = [
      new CommandOption({
        briefName: 'n', fullName: 'name', description: { zh: '设值容器名称' }, sort: 1,
      }),
      new CommandOption({
        briefName: 'p', fullName: 'port', description: { zh: '容器映射端口' }, sort: 2, type: CommandOption.TYPE.MAP, duplicate: true,
      }),
      new CommandOption({
        briefName: 'a', fullName: 'a', description: { zh: 'aaa' }, sort: 2, type: CommandOption.TYPE.ENUM, rules: 'aaa,bbbb,ccc',
      }),
      new CommandOption({}),
    ];
    commit.params = [
      new Param({ index: 0, description: { zh: 'aaaa' } }),
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

  toData() {
    this.items.forEach((item) => {
      item.cid = this.cid;
      item.version = this.version;
    });
    return {
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
      options: JSON.stringify(CommandOption.convertDatas(this.options)),
      params: JSON.stringify(Param.convertDatas(this.params)),
      items: CommitItem.convertDatas(this.items),
      createTime: this.createTime,
      did: this.did,
      remark: this.remark,
    };
  }

  static fromObj(obj) {
    return new CommandCommit({
      ...obj,
      briefDesc: strUtil.parse(obj.briefDesc, () => {}),
      description: strUtil.parse(obj.description, () => {}),
      options: CommandOption.convertObjs(strUtil.parse(obj.options), () => []),
      params: Param.convertObjs(strUtil.parse(obj.params), () => []),
      rules: strUtil.parse(obj.rules, () => []),
    });
  }
}
