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
}
