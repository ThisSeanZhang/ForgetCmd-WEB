<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main
      v-if="!commited"
      v-loading="loading.doing"
    >
      <CommandPanel
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        class="cmd-perview"
        :inCmd='outCmd'
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <LoadPanel v-bind:loading="commitLoading"
        v-else class="cmd-perview" v-bind:callBack="fetchCommitItems" />
      <div
        v-if="cmdLoading.success"
        v-loading="commitLoading.doing"
        style="width: 70%; height: 100%; display: flex; flex-direction: column;">
        <div v-if="items.length === 0"></div>
        <ItemConfirm v-else :items="items" @effectItems="effectInCmd($event)" />
        <div style="display: flex; flex-direction: row-reverse; margin: 10px;">
          <el-button :disabled="!allowConfirm"
            @click="confirmCmd" type="primary">{{$t('other.btn.submit')}}</el-button>
        </div>
      </div>
      <LoadPanel v-bind:loading="commitLoading"
      v-else class="cmd-perview" v-bind:callBack="fetchCommitItems" />
    </el-main>
    <el-main v-else>
      提交成功
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import { ajax, wantNothing } from '../api/fetch';
import Command from '../entities/Command';
import CommandOption from '../entities/CommandOption';
import ItemConfirm from '../components/commits/ItemConfirm.vue';
import CommandPanel from '../components/command/CommandPanel.vue';
import CMDHeader from '@/components/header/Header.vue';
import CommitItem from '../entities/CommitItem';
import Param from '../entities/Param';
import LoadPanel from '../components/common/LoadPanel.vue';
import StringUtils from '../entities/StringUtils';

// TODO version 从获取的cmd中获取
// TODO 变更cid 时刷新页面内容
export default {
  name: 'review-commit',
  components: {
    ItemConfirm, CommandPanel, CMDHeader, LoadPanel,
  },
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
      cmdLoading: {
        doing: false,
        success: false,
      },
      commitLoading: {
        doing: false,
        success: false,
      },
      cid: null,
      ccids: null,
      version: null,
      commited: false,
    };
  },
  watch: {
    cid() {
      this.getCommandById();
      this.fetchCommitItems();
    },
    ccids() {
      this.fetchCommitItems();
    },
    version() {
      this.fetchCommitItems();
    },
  },
  computed: {
    allowConfirm() {
      return StringUtils.nonEmptyString(this.outCmd.commandName) && this.effItems.length > 0;
    },
    outCmd() {
      const tmpCmd = this.cmd.deepCopy();
      this.effItems.forEach(item => this.doTemp(tmpCmd, item));
      return tmpCmd;
    },
    notNewCmd() {
      return this.cid && this.version !== null && this.version !== undefined;
    },
    request() {
      // const ciids = this.effItems.map(i => i.ciid);
      const usedIdMap = {};
      this.effItems.forEach((item) => {
        if (usedIdMap[item.ccid]) {
          usedIdMap[item.ccid].push(item.ciid);
        } else {
          usedIdMap[item.ccid] = [item.ciid];
        }
      });
      const { params, options, ...cmd } = { ...this.outCmd.toData() };
      return {
        url: '/cmds',
        method: 'POST',
        data: {
          cmd,
          // ciids,
          usedIdMap,
          params,
          options,
          ccids: this.$route.params.ccids,
        },
      };
    },
  },
  methods: {
    confirmCmd() {
      ajax(this.request, this.loading).then(() => {
        this.commited = true;
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
        if (item.keyPath.includes('.')) {
          this.editObject(inCmd, item);
        } else {
          this.$set(inCmd, item.keyPath, item.value);
        }
        // this.cmd.options = Object.values(optionMap);
      }
      if (item.type === 'params') {
        const paramMap = {};
        (inCmd.params || []).forEach((p) => { paramMap[p.index] = p; });
        console.log(paramMap);
        const keys = item.keyPath.split('.');
        const editParam = paramMap[keys[0]] || new Param({ ...item.value, index: keys[0] });
        console.log(editParam);
        // let params = [];
        if (item.action === 0) {
          if (keys.length > 1) {
            this.editObject(editParam, item);
          }
          paramMap[keys[0]] = editParam;
        }
        if (item.action === 1) {
          this.editObject(editParam, item);
          paramMap[keys[0]] = editParam;
        }
        if (item.action === 2) {
          delete paramMap[keys[0]];
        }
        // if (item.action === 0) {
        //   params = inCmd.params || [];
        //   const p = [params.length, 0, new Param(item.value)];
        //   for (let index = 0; index < params.length; index += 1) {
        //     const param = params[index];
        //     if (parseInt(param.keyPath, 10) === parseInt(item.keyPath, 10)) {
        //       p[0] = index;
        //       p[1] = 1;
        //       break;
        //     }
        //     if (parseInt(param.keyPath, 10) > parseInt(item.keyPath, 10)) {
        //       p[0] = index;
        //       break;
        //     }
        //   }
        //   params.splice(...p);
        // }
        // if (item.action === 2) {
        //   params = inCmd.params
        // .filter(i => parseInt(i.keyPath, 10) !== parseInt(item.keyPath, 10));
        // }
        // this.$set(inCmd, 'params', params);
        this.$set(inCmd, 'params', Object.values(paramMap));
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
      if (item.type === 'params') keys.shift();
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
      if (!this.ccids && !this.notNewCmd) {
        this.commitLoading.success = true;
        return;
      }
      const request = {
        url: '/commits/items',
        method: 'GET',
        data: {
          ccids: this.ccids,
          cid: this.cid,
          version: this.version,
        },
      };
      console.log(request);
      ajax(request, this.commitLoading).then((resp) => {
        this.items = resp.data.data.map(CommitItem.fromObj);
        console.log(this.items);
      }).catch(wantNothing);
    },
    getCommandById() {
      if (!this.cid) {
        this.cmdLoading.success = true;
        return;
      }
      const request = {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
      ajax(request, this.cmdLoading).then((resp) => {
        this.cmd = Command.fromObj(resp.data.data);
      }).catch(wantNothing);
    },
  },
  created() {
    this.ccids = this.$route.params.ccids;
    this.cid = this.$route.params.cid;
    this.version = this.$route.params.version;
  },
  beforeRouteUpdate(to, from, next) {
    this.cid = to.params.cid;
    this.ccids = to.params.ccids;
    this.version = to.params.version;
    // console.log(to, from, next)
    next();
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
