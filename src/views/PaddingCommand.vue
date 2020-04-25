<template>
  <el-container>
    <el-header>
      <CMDHeader :searchBar="true"
        v-on:currentSelect="hendleSelectCmd($event)"
      ></CMDHeader>
    </el-header>
    <el-main>
      <CommandPanel
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        class="cmd-perview"
        :inCmd='cmd'
        :improve="true"
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <LoadPanel v-bind:loading="cmdLoading"
        v-else class="cmd-perview" v-bind:callBack="getCommandById" />
      <CommandHistory
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        :cid="cid"
        :commandName="cmd.commandName" />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import { mapGetters } from 'vuex';
import { ajax, wantNothing } from '@/api/fetch';
import Command from '../entities/Command';
import CommandPanel from '../components/command/CommandPanel.vue';
import CommandHistory from '../components/history/CommandHistory.vue';
import LoadPanel from '../components/common/LoadPanel.vue';
import CMDHeader from '@/components/header/Header.vue';
import StringUtils from '../entities/StringUtils';
import Param from '../entities/Param';
import CommandOption from '../entities/CommandOption';

export default {
  name: 'padding-command',
  components: {
    CommandPanel, CommandHistory, LoadPanel, CMDHeader,
  },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      cmd: new Command({}),
      cid: null,
      snapIndex: null,
      cmdLoading: {
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
    cid() {
      this.getCommandById();
    },
    snapIndex() {
      this.feedSnapVal();
    },
  },
  computed: {
    request() {
      return {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
    },
  },
  methods: {
    hendleSelectCmd(cid) {
      this.$router.push(`/cmd/padding/${cid}`);
    },
    getCommandById() {
      if (!this.cid) {
        this.cmdLoading.success = false;
        return;
      }
      ajax(this.request, this.cmdLoading).then((resp) => {
        this.cmd = Command.fromObj(resp.data.data);
        // 不这样snap的command Name 拿不到
        this.feedSnapVal();
      }).catch(wantNothing);
    },
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
    feedSnapVal() {
      if (this.snapIndex !== null
        && this.snapIndex !== undefined
        && StringUtils.nonEmptyString(this.cmd.commandName)) {
        const snap = this.getCommandHis()(this.cmd.commandName)[this.snapIndex];
        if (snap) {
          const copyOne = JSON.parse(JSON.stringify(snap));
          console.log(copyOne);
          this.paramVal = (copyOne.paramVal || []).map(p => new Param(p));
          this.optionVal = (copyOne.optionVal || []).map(p => new CommandOption(p));
        }
      }
    },
    ...mapGetters('CommandHistory', ['getCommandHis']),
  },
  created() {
    this.cid = this.$route.params.cid;
    this.snapIndex = this.$route.params.snapIndex;
    // 根据路由获取
    // this.getCommandById();
  },
  beforeRouteUpdate(to, from, next) {
    this.cid = to.params.cid;
    this.snapIndex = to.params.snapIndex;
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
  min-width: 50%;
}
</style>
