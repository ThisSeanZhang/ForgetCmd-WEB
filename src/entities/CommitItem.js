export default class CommitItem {
  constructor(item) {
    this.ciid = item.ciid;
    this.type = item.type; // 用于指定修改的是命令还是参数还是选项
    // 指定key如果是命令  那就是cName之类的，Option以全称为关键字，全称变了就算变了 Param为参数的index索引
    this.keyPath = item.keyPath;
    this.oValue = item.oValue;
    this.value = item.value; // 变更后的值
    this.ccid = item.ccid; // 所属的命令提交
    this.action = item.action;
  }

  static ACTION = {
    CREATE: 0, MODIFY: 1, DELETE: 2,
  }

  static COMPARE_KEY = {
    OPTION: ['briefName', 'type', 'rules', 'repeat'],
    PARAM: ['sort', 'paramName', 'required', 'type'],
  }

  notDelete() {
    return this.action !== CommitItem.ACTION.DELETE;
  }

  expend() {
    // 因为删除和修改都是原有值存在的，要么删除全部，要么删除或修改具体值
    // 但是创建是从无到有，为减少修改项，所以展示的时候需要单独展开
    if (this.action !== CommitItem.ACTION.CREATE) return [this];
    let value;
    try {
      value = JSON.parse(this.value);
    } catch {
      return [this];
    }
    let base = CommitItem.COMPARE_KEY.OPTION
      .filter(key => key !== 'description')
      .map(key => new CommitItem({
        ...this,
        keyPath: `${this.keyPath}.${key}`,
        oValue: null,
        value: value[key],
      }));
    if (typeof value.description === (typeof {})) {
      const description = Object.keys(value.description)
        .map(key => new CommitItem({
          ...this,
          keyPath: `${this.keyPath}.description.${key}`,
          oValue: null,
          value: value.description[key],
        }));
      base = base.concat(description);
    }
    return base;
  }

  static getItemsByCommitId(ccid) {
    console.log(ccid);
    const json = '[{"type":"options","keyPath":"name","value":{"oid":1,"cid":1,"briefName":"n","fullName":"name","description":{"zh":"设值容器名称dede", "en": "set container name"},"rules":[],"value":""},"action":0},{"type":"options","keyPath":"name1","oValue":{"oid":1,"cid":1,"briefName":"n","fullName":"name1","description":{"zh":"设值容器名称"},"rules":[]},"action":2},{"type":"options","keyPath":"name","value":{"oid":1,"cid":1,"briefName":"n","fullName":"name","description":{"zh":"设值容器名称"},"rules":[],"value":""},"action":0},{"type":"options","keyPath":"port","value":{"oid":2,"cid":2,"briefName":"p","fullName":"port","description":{"zh":"容器映射端口"},"type":4,"rules":[],"value":""},"action":0},{"type":"options","keyPath":"a","value":{"oid":3,"cid":3,"briefName":"a","fullName":"a","description":{"zh":"aaa"},"type":2,"rules":["aaa","bbbb","ccc"],"value":"aaa"},"action":0},{"type":"options","keyPath":"undefined","value":{"description":{"zh":""},"rules":[],"value":""},"action":0}]';
    return JSON.parse(json)
      .map(v => new CommitItem({
        ...v, value: JSON.stringify(v.value), oValue: JSON.stringify(v.oValue),
      }));
  }

  static getItemsByCommitId2(ccid) {
    console.log(ccid);
    const json = '[{"type":"options","keyPath":"name1.briefName","oValue":"n","action":2},{"type":"options","keyPath":"name1.rules","oValue":[],"action":2},{"type":"options","keyPath":"name1.description.zh","oValue":"设值容器名称","action":2},{"type":"options","keyPath":"name.briefName","value":"n","action":0},{"type":"options","keyPath":"name.rules","value":[],"action":0},{"type":"options","keyPath":"name.description.zh","value":"设值容器名称","action":0},{"type":"options","keyPath":"port.briefName","value":"p","action":0},{"type":"options","keyPath":"port.type","value":4,"action":0},{"type":"options","keyPath":"port.rules","value":[],"action":0},{"type":"options","keyPath":"port.description.zh","value":"容器映射端口","action":0},{"type":"options","keyPath":"a.briefName","value":"a","action":0},{"type":"options","keyPath":"a.type","value":2,"action":0},{"type":"options","keyPath":"a.rules","value":["aaa","bbbb","ccc"],"action":0},{"type":"options","keyPath":"a.description.zh","value":"aaa","action":0},{"type":"options","keyPath":"undefined.rules","value":[],"action":0}]';
    return JSON.parse(json)
      .map(v => new CommitItem(v));
  }

  toData() {
    return {
      description: JSON.stringify(this.description),
      ciid: this.ciid,
      type: this.type,
      keyPath: this.keyPath,
      oValue: JSON.stringify(this.oValue),
      value: JSON.stringify(this.value),
      ccid: this.ccid,
      action: this.action,
    };
  }

  static convertDatas(items) {
    if (!items || items.length === 0) return [];
    return items.map(p => p.toData());
  }
}
