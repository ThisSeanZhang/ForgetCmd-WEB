<template>
  <el-container>
    <el-header>
      添加命令
    </el-header>
    <el-main>
      <CommandPanel
        class="cmd-perview"
        :inCmd='outCmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <ItemConfirm @effectItems="effectInCmd($event)" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import Command from '../entities/Command';
import CommandOption from '../entities/CommandOption';
import ItemConfirm from '../components/commits/ItemConfirm.vue';
import CommandPanel from '../components/command/CommandPanel.vue';

export default {
  name: 'review-commit',
  components: { ItemConfirm, CommandPanel },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      // commit: Commit.CreateFackCommit(),
      cmd: new Command({}),
      effItems: [],
    };
  },
  watch: {
    // commit: {
    //   handler(nval, oval) {
    //     console.log(nval, oval);
    //     this.cmd = this.commit.toCommand();
    //     console.log(JSON.stringify(this.cmd));
    //   },
    //   deep: true,
    // },
  },
  computed: {
    outCmd() {
      const tmpCmd = this.cmd.deepCopy();
      this.effItems.forEach(item => this.doTemp(tmpCmd, item));
      return tmpCmd;
    },
  },
  methods: {
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
    effectInCmd(items) {
      console.log(items);
      this.effItems = items;
      // items.forEach(item => this.doTemp(this.cmd, item));
    },
    doTemp(inCmd, item) {
      if (item.type === 'options') {
        this.$set(inCmd, 'options', this.feedOption(inCmd, item));
        // this.cmd.options = Object.values(optionMap);
      }
      // console.log(item);
      // const keys = item.key.split('.');
      // const k = keys.pop();
      // const obj = this.getPathObject(this.tempCmd, keys);
      // obj[k] = '测试';
      console.log(inCmd);
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
    feedOption(inCmd, item) {
      const optionMap = inCmd.getOptionMap();
      if (item.action === 0) {
        const path = item.key.split('.');
        if (path.length < 1) {
          optionMap[item.key] = new CommandOption(JSON.parse(item.value));
          return Object.values(optionMap);
        }
        if (!Object.keys(optionMap).includes(path[0])) {
          optionMap[path[0]] = new CommandOption({ fullName: path[0] });
        }
        this.editObject(optionMap, item);
      }
      if (item.action === 1) {
        this.editObject(optionMap, item);
      }
      if (item.action === 2) {
        delete optionMap[item.key];
        // this.tempCmd.options = this.tempCmd.options.filter(op => op.fullName !== item.key);
      }
      return Object.values(optionMap);
    },
  },
  created() {
    this.cmd.options.push({
      oid: 1,
      cid: 1,
      briefName: 'n',
      fullName: 'name1',
      description: { zh: '设值容器名称' },
      rules: [],
    });
  },
};
</script>
<style lang="scss" scoped>
.el-main, .el-container {
  height: 100%;
}
.el-main {
  display: flex;
  overflow: visible;
}
.commit {
  width: 50%;
}
.cmd-perview {
  width: 50%;
}
</style>
