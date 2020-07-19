<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main
      v-if="!commited && cmdLoading.success"
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
        v-else class="cmd-perview" v-on:inform="fetchCommitItems" />

      <div
        v-if="commitLoading.success"
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
      v-else  v-on:inform="fetchCommitItems" />
    </el-main>
    <!-- 当页面提交成功或者没有东西展示时呈现的 -->
    <el-main v-else>
      <!-- 提交成功 -->
      <div v-if="cmdLoading.success">提交成功</div>
      <!-- 没有相应资源 -->
      <div v-else>找不到相关资源</div>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import CMDHeader from '@/components/header/Header.vue';
// import Commit from '../entities/CommandCommit';
import { ajax, wantNothing } from '../api/fetch';
import Command from '../entities/Command';
import CommandOption from '../entities/CommandOption';
import ItemConfirm from '../components/commits/ItemConfirm.vue';
import CommandPanel from '../components/command/CommandPanel.vue';
import CommitItem from '../entities/CommitItem';
import Param from '../entities/Param';
import LoadPanel from '../components/common/LoadPanel.vue';
import StringUtils from '../entities/StringUtils';

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
      // cid: null,
      // ccids: null,
      version: null,
      commited: false,
    };
  },
  watch: {
    cid() {
      this.getCommandById();
    },
    ccids() {
      this.fetchCommitItems();
    },
  },
  computed: {
    cid() {
      return this.$route.params.cid;
    },
    ccids() {
      return this.$route.params.ccids;
    },
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
      // console.log(items);
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
        // console.log(paramMap);
        const keys = item.keyPath.split('.');
        const editParam = paramMap[keys[0]] || new Param({ ...item.value, index: keys[0] });
        // console.log(editParam);
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
        this.$set(inCmd, 'params', Object.values(paramMap));
      }
      // console.log(inCmd);
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
        url: '/items',
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
        this.cmd = new Command({});
        this.cmdLoading.success = true;
        return;
      }
      const request = {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
      ajax(request, this.cmdLoading).then((resp) => {
        this.cmd = Command.fromObj(resp.data.data);
        this.version = this.cmd.version;
        this.fetchCommitItems();
      }).catch(wantNothing);
    },
  },
  created() {
    this.getCommandById();
    this.fetchCommitItems();
  },
  // beforeRouteUpdate(to, from, next) {
  //   console.log('触发beforeRouteUpdate');
  //   this.cid = to.params.cid;
  //   this.ccids = to.params.ccids;
  //   // console.log(to, from, next)
  //   next();
  // },
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
