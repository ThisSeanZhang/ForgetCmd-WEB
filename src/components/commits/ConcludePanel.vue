<template>
  <div>
    <ItemExhibit v-for="(value, index) in concludeDiff" :item="value" :key="index" />
  </div>
</template>
<script>
import CommandCommit from '../../entities/CommandCommit';
import CommitItem from '../../entities/CommitItem';
import Command from '../../entities/Command';
import StringUtils from '../../entities/StringUtils';
import ItemExhibit from './ItemExhibit.vue';

export default {
  name: 'conclude-panel',
  components: { ItemExhibit },
  props: {
    commit: {
      type: CommandCommit,
      default: () => new CommandCommit({}),
    },
    cmd: {
      type: Command,
      default: () => new Command({ description: { zh: 'dd', jp: 'aaa' } }),
    },
  },
  data() {
    return {
      currentLang: 'zh',
      multipLangBriefDescDialog: false,
      multipLangDescDialog: false,
      tempCmd: new Command({}),
    };
  },
  computed: {
    compareParamLength() {
      return this.cmd.params.length > this.commit.params.length
        ? this.cmd.params.length
        : this.commit.params.length;
    },
    // 比较Option
    optionDiff() {
      const cOption = this.cmd.getOptionMap();
      const cOptionKeys = Object.keys(cOption);
      const ccOption = this.commit.getOptionMap();
      const allKeys = cOptionKeys
        .concat(Object.keys(ccOption).filter(v => !cOptionKeys.includes(v))) || [];
      if (allKeys.length === 0) return [];
      return allKeys
        .map(key => this.compareOptions(key, cOption[key], ccOption[key]))
        .reduce((list, c) => list.concat(c));
    },
    // 比较Param
    paramDiff() {
      if (!this.compareParamLength || this.compareParamLength === 0) return [];
      return [...Array(this.compareParamLength).keys()]
        .map(index => this.compareParam(
          index, this.cmd.params[index], { ...this.commit.params[index], index },
        ))
        .reduce((list, c) => list.concat(c));
    },
    baseDiff() {
      return this.compaerBase(this.cmd, this.commit);
    },
    concludeDiff() {
      const all = this.baseDiff.concat(this.optionDiff).concat(this.paramDiff);
      this.$emit('updateItems', all);
      console.log(all);
      return all;
    },
  },
  methods: {
    compaerBase(ob1, ob2) {
      // 修改命令不修改命令名称
      const compareKey = StringUtils.isEmptyString(this.cmd.commandName) ? ['commandName'] : [];
      const baseItems = compareKey.filter(key => !StringUtils.eq(ob1[key], ob2[key]))
        .map(key => new CommitItem({
          type: 'base', action: 1, keyPath: key, oValue: ob1[key], value: ob2[key],
        }));
      const descItems = this.createItemByComapreObject('base', 'description', ob1.description, ob2.description);
      const bDescItems = this.createItemByComapreObject('base', 'briefDesc', ob1.briefDesc, ob2.briefDesc);
      return baseItems.concat(descItems).concat(bDescItems);
    },
    compareOptions(fKey, ob1, ob2) {
      if (!ob1 || !ob2) {
        return [new CommitItem({
          type: 'options', action: this.judgeAction(ob1, ob2), keyPath: fKey, oValue: ob1, value: ob2,
        })];
      }
      const baseItems = CommitItem.COMPARE_KEY.OPTION
        .filter(key => !StringUtils.eq(ob1[key], ob2[key]))
        .map(key => ({ key, action: this.judgeAction(ob1[key], ob2[key]) }))
        .map(m => new CommitItem({
          action: m.action,
          type: 'options',
          keyPath: [fKey, m.key].filter(v => StringUtils.nonEmptyString(v)).join('.'),
          oValue: ob1[m.key],
          value: ob2[m.key],
        }));
      const descItems = this.createItemByComapreObject('options', `${fKey}.description`, ob1.description, ob2.description);
      return baseItems.concat(descItems);
    },
    compareParam(index, ob1, ob2) {
      if (!ob1 || !ob2) {
        return [new CommitItem({
          type: 'params', action: this.judgeAction(ob1, ob2), keyPath: index, oValue: ob1, value: ob2,
        })];
      }
      const baseItems = CommitItem.COMPARE_KEY.PARAM
        .filter(key => !StringUtils.eq(ob1[key], ob2[key]))
        .map(key => ({ key, action: this.judgeAction(ob1[key], ob2[key]) }))
        .map(key => new CommitItem({
          type: 'params', keyPath: key, oValue: ob1[key], value: ob2[key],
        }));
      const descItems = this.createItemByComapreObject('params', `${index}.description`, ob1.description, ob2.description);
      return baseItems.concat(descItems);
    },
    createItemByComapreObject(type, fKey, ob1, ob2) {
      // const ob1 = ib1 || {};
      // const ob2 = ib2 || {};
      const o1keys = Object.keys(ob1);
      const o2keys = Object.keys(ob2);
      // 并集
      const unionKeys = [].concat(o1keys).concat(o2keys.filter(v => !o1keys.includes(v)));
      console.log(unionKeys);
      return unionKeys
        // 过滤值相同的参数
        .filter(key => !StringUtils.eq(ob1[key], ob2[key]))
        // 判断类型
        .map(key => ({ key, action: this.judgeAction(ob1[key], ob2[key]) }))
        // 转为对应修改项
        .map(m => new CommitItem({
          action: m.action, type, keyPath: [fKey, m.key].filter(v => StringUtils.nonEmptyString(v)).join('.'), oValue: ob1[m.key], value: ob2[m.key],
        }));
    },
    judgeAction(v1, v2) {
      if (StringUtils.isEmptyString(v1)) {
        return 0;
      }
      if (StringUtils.isEmptyString(v2)) {
        return 2;
      }
      return 1;
    },
    doTemp(item) {
      if (item.type === 'options') {
        const optionMap = this.tempCmd.getOptionMap();
        if (item.action === 0) {
          // this.tempCmd.options.push(item.value);
          optionMap[item.key] = item.value;
        }
        if (item.action === 1) {
          this.editObject(optionMap, item);
        }
        if (item.action === 2) {
          delete optionMap[item.key];
          // this.tempCmd.options = this.tempCmd.options.filter(op => op.fullName !== item.key);
        }
        this.tempCmd.options = Object.values(optionMap);
      }
      // console.log(item);
      // const keys = item.key.split('.');
      // const k = keys.pop();
      // const obj = this.getPathObject(this.tempCmd, keys);
      // obj[k] = '测试';
      console.log(JSON.stringify(this.tempCmd));
    },
    editObject(inObj, item) {
      console.log(item);
      console.log(JSON.stringify(inObj));
      const keys = item.key.split('.');
      const k = keys.pop();
      const obj = this.getPathObject(inObj, keys);
      obj[k] = item.value;
      console.log(JSON.stringify(inObj));
    },
    getPathObject(obj, keys) {
      if (!obj || !keys) return obj;

      if (keys.length === 1) {
        console.log(`remain keys: ${keys}`);
        return obj[keys[0]];
      }

      if (keys.length > 1) {
        const k = keys.shift();
        return this.getPathObject(obj[k], keys);
      }
      return obj;
    },
  },
  mounted() {
  },
  created() {
    // this.cmd.options.push({
    //   oid: 1,
    //   cid: 1,
    //   briefName: 'n',
    //   fullName: 'name1',
    //   description: { zh: '设值容器名称' },
    //   rules: [],
    // });
    // this.tempCmd.options.push({
    //   oid: 1,
    //   cid: 1,
    //   briefName: 'n',
    //   fullName: 'name1',
    //   description: { zh: '设值容器名称' },
    //   rules: [],
    // });
  },
};
</script>
<style lang="scss" scoped>
.edit-base-info{
  padding: 10px;
}
.per-option{
  margin-bottom: 10px;
}
.option-brief{
  width: 80px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.option-value-bar{
  margin-left: 80px;
}
</style>
