<template>
  <el-container>
    <el-header>
      <CMDHeader :searchBar="true"
        v-on:currentSelect="hendleSelectCmd($event)"
      ></CMDHeader>
    </el-header>
    <el-main>
      <CommandPanel
        style="margin: 0px 5px"
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        class="cmd-perview"
        :inCmd='cmd'
        :improve="true"
        :createHist="true"
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
import SnapshotApi from '../api/SnapShotApi';
import Snapshot from '../entities/Snapshot';

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
      snapId: null,
      location: null,
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
    // location() {
    //   this.getSnap();
    // },
  },
  computed: {
    request() {
      return {
        method: 'GET',
        url: `cmds/${this.cid}`,
      };
    },
    computedTitle() {
      const title = {
        'local-browser': '本地浏览器快照',
        'online-remote': '远程快照',
      };
      return title[this.location]
        ? title[this.location]
        : '填充命令';
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
        this.getSnap();
      }).catch(wantNothing);
    },
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
    getSnap() {
      const getFunc = {
        'local-browser': this.getLocalSnap,
        'online-remote': this.getRemoteSnap,
      };

      if (typeof getFunc[this.location] === 'function') {
        getFunc[this.location]();
      }
    },
    getRemoteSnap() {
      console.log('online-remote');
      SnapshotApi.findBySid(this.snapId).then((resp) => {
        console.log(resp);
        const snap = Snapshot.fromObj(resp.data.data);
        this.paramVal = snap.paramVal;
        this.optionVal = snap.optionVal;
      });
    },
    getLocalSnap() {
      console.log('get Snap');
      if (this.snapId !== null
        && this.snapId !== undefined
        && StringUtils.nonEmptyString(this.cmd.commandName)) {
        const snap = this.getCommandHis()(this.cmd.commandName)[this.snapId];
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
    this.snapId = this.$route.params.snapId;
    this.location = this.$route.params.location;
    document.title = this.computedTitle;
    console.log('create');
    // 根据路由获取
    // this.getCommandById();
  },
  // beforeRouteUpdate(to, from, next) {
  //   this.cid = to.params.cid;
  //   this.snapIndex = to.params.snapIndex;
  //   // console.log(to, from, next)
  //   console.log('do');
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
  overflow: hidden;
}
.commit {
  width: 50%;
}
.cmd-perview {
  min-width: 50%;
}
</style>
