export default class CommitItem {
  constructor(item) {
    this.ciid = item.ciid;
    this.type = item.type; // 用于指定修改的是命令还是参数还是选项
    // 指定key如果是命令  那就是cName之类的，Option以全称为关键字，全称变了就算变了 Param为参数的index索引
    this.key = item.key;
    this.oValue = item.oValue;
    this.value = item.value; // 变更后的值
    this.ccid = item.ccid; // 所属的命令提交
    this.action = item.action;
  }

  static ACTION = {
    CREATE: 0, MODIFY: 1, DELETE: 2,
  }

  static getItemsByCommitId(ccid) {
    console.log(ccid);
    const json = '[{"type":"options","key":"name1","oValue":{"oid":1,"cid":1,"briefName":"n","fullName":"name1","description":{"zh":"设值容器名称"},"rules":[]},"action":2},{"type":"options","key":"name","value":{"oid":1,"cid":1,"briefName":"n","fullName":"name","description":{"zh":"设值容器名称"},"rules":[],"value":""},"action":0},{"type":"options","key":"port","value":{"oid":2,"cid":2,"briefName":"p","fullName":"port","description":{"zh":"容器映射端口"},"type":4,"rules":[],"value":""},"action":0},{"type":"options","key":"a","value":{"oid":3,"cid":3,"briefName":"a","fullName":"a","description":{"zh":"aaa"},"type":2,"rules":["aaa","bbbb","ccc"],"value":"aaa"},"action":0},{"type":"options","key":"undefined","value":{"description":{"zh":""},"rules":[],"value":""},"action":0}]';
    return JSON.parse(json)
      .map(v => new CommitItem({
        ...v, value: JSON.stringify(v.value), oValue: JSON.stringify(v.oValue),
      }));
  }

  static getItemsByCommitId2(ccid) {
    console.log(ccid);
    const json = '[{"type":"options","key":"name1.briefName","oValue":"n","action":2},{"type":"options","key":"name1.rules","oValue":[],"action":2},{"type":"options","key":"name1.description.zh","oValue":"设值容器名称","action":2},{"type":"options","key":"name.briefName","value":"n","action":0},{"type":"options","key":"name.rules","value":[],"action":0},{"type":"options","key":"name.description.zh","value":"设值容器名称","action":0},{"type":"options","key":"port.briefName","value":"p","action":0},{"type":"options","key":"port.type","value":4,"action":0},{"type":"options","key":"port.rules","value":[],"action":0},{"type":"options","key":"port.description.zh","value":"容器映射端口","action":0},{"type":"options","key":"a.briefName","value":"a","action":0},{"type":"options","key":"a.type","value":2,"action":0},{"type":"options","key":"a.rules","value":["aaa","bbbb","ccc"],"action":0},{"type":"options","key":"a.description.zh","value":"aaa","action":0},{"type":"options","key":"undefined.rules","value":[],"action":0}]';
    return JSON.parse(json)
      .map(v => new CommitItem(v));
  }
}
