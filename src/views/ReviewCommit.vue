<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <CommandPanel
        class="cmd-perview"
        :inCmd='outCmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <div style="width: 70%; height: 100%; display: flex; flex-direction: column;">
        <div v-if="items.length === 0"></div>
        <ItemConfirm v-else :items="items" @effectItems="effectInCmd($event)" />
        <div style="display: flex; flex-direction: row-reverse; margin: 10px;">
          <el-button @click="confirmCmd" type="primary">提交</el-button>
        </div>
      </div>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import { ajax, wantNothing } from '@/api/fetch';
import Command from '../entities/Command';
import CommandOption from '../entities/CommandOption';
import ItemConfirm from '../components/commits/ItemConfirm.vue';
import CommandPanel from '../components/command/CommandPanel.vue';
import CMDHeader from '@/components/header/Header.vue';
import CommitItem from '../entities/CommitItem';
import Param from '../entities/Param';

export default {
  name: 'review-commit',
  components: { ItemConfirm, CommandPanel, CMDHeader },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      // commit: Commit.CreateFackCommit(),
      cmd: new Command({}),
      effItems: [],
      items: [],
      loading: {
        doing: false,
        success: false,
      },
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
    request() {
      const ciids = this.effItems.map(i => i.ciid);
      console.log(this.outCmd);
      const { params, options, ...cmd } = { ...this.outCmd };
      return {
        url: '/cmds',
        method: 'POST',
        data: {
          cmd: {
            ...cmd,
            briefDesc: JSON.stringify(cmd.briefDesc),
            // description: JSON.stringify(cmd.description),
          },
          ciids,
          params: Param.convertDatas(params),
          options,
          ccids: this.$route.params.ccids,
        },
      };
    },
  },
  methods: {
    confirmCmd() {
      ajax(this.request, this.loading).then((resp) => {
        this.items = resp.data.data.map(item => new CommitItem({
          ...item,
          value: JSON.parse(item.value),
          oValue: JSON.parse(item.ovalue),
        }));
        console.log(this.items);
      }).catch(wantNothing);
    },
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
      if (item.type === 'base') {
        this.$set(inCmd, item.keyPath, item.value);
        // this.cmd.options = Object.values(optionMap);
      }
      if (item.type === 'params') {
        let params = [];
        if (item.action === 0) {
          params = inCmd.params || [];
          const p = [params.length, 0, new Param(item.value)];
          for (let index = 0; index < params.length; index += 1) {
            const param = params[index];
            if (parseInt(param.keyPath, 10) === parseInt(item.keyPath, 10)) {
              p[0] = index;
              p[1] = 1;
              break;
            }
            if (parseInt(param.keyPath, 10) > parseInt(item.keyPath, 10)) {
              p[0] = index;
              break;
            }
          }
          params.splice(...p);
        }
        if (item.action === 2) {
          params = inCmd.params.filter(i => parseInt(i.keyPath, 10) !== parseInt(item.keyPath, 10));
        }
        this.$set(inCmd, 'params', params);
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
      const keys = item.keyPath.split('.');
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
        const path = item.keyPath.split('.');
        if (path.length <= 1) {
          optionMap[item.keyPath] = new CommandOption(item.value);
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
        delete optionMap[item.keyPath];
        // this.tempCmd.options = this.tempCmd.options.filter(op => op.fullName !== item.key);
      }
      return Object.values(optionMap);
    },
    fetchCommitItems() {
      const request = {
        url: '/commits/items',
        method: 'GET',
        data: {
          ccids: this.$route.params.ccids,
        },
      };
      console.log(request);
      ajax(request, this.loading).then((resp) => {
        this.items = resp.data.data.map(item => new CommitItem({
          ...item,
          value: JSON.parse(item.value),
          oValue: JSON.parse(item.ovalue),
        }));
        console.log(this.items);
      }).catch(wantNothing);
    },
  },
  created() {
    console.log(this.$route.params.ccids);
    this.fetchCommitItems();
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
