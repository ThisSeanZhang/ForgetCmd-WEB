<template>
  <el-container>
    <el-header>
      <CMDHeader :searchBar="true"
        v-on:currentSelect="hendleSelectCmd($event)"
      ></CMDHeader>
    </el-header>
    <el-main
    v-if="loading.success"
    v-loading="loading.doing"
    >
      <CommandPanel
        style="margin: 0px 5px"
        class="cmd-perview"
        :inCmd='cmd'
        :improve="true"
        :createHist="true"
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="upParamVal($event)" />
      <SideOfPaddingCommand
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        :cid="cid"
        :location="location"
        :commandName="cmd.commandName"
        :snap="snap"
      />
      <!-- <div style="height: 100%;
    overflow: hidden;
    width: 100%;">
        <CommandHistory
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        :cid="cid"
        :commandName="cmd.commandName" />
      <RemoteSnaps
        v-if="cmdLoading.success"
        v-loading="cmdLoading.doing"
        :cid="cid"
        :commandName="cmd.commandName" />
      </div> -->
    </el-main>
    <LoadPanel v-bind:loading="loading"
        v-else class="cmd-perview" v-bind:callBack="getCommandById" />
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
// import Commit from '../entities/CommandCommit';
import { mapGetters } from 'vuex';
import { ajax, wantNothing } from '@/api/fetch';
import CMDHeader from '@/components/header/Header.vue';
import Command from '../entities/Command';
import CommandPanel from '../components/command/CommandPanel.vue';
// import CommandHistory from '../components/history/CommandHistory.vue';
// import RemoteSnaps from '../components/snap/RemoteSnaps.vue';
import SideOfPaddingCommand from './SideOfPaddingCommand.vue';
import LoadPanel from '../components/common/LoadPanel.vue';
import StringUtils from '../entities/StringUtils';
import Param from '../entities/Param';
import CommandOption from '../entities/CommandOption';
import SnapshotApi from '../api/SnapShotApi';
import Snapshot from '../entities/Snapshot';

export default {
  name: 'padding-command',
  components: {
    CommandPanel, LoadPanel, CMDHeader, SideOfPaddingCommand,
  },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      cmd: new Command({}),
      cid: null,
      snapId: null,
      snap: new Snapshot({}),
      location: null,
      cmdLoading: {
        doing: false,
        success: false,
      },
      snapLoading: {
        doing: false,
        success: true,
        needInputShareCode: false,
      },
      shareCode: null,
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
    loading() {
      return {
        doing: this.cmdLoading.doing || this.snapLoading.doing,
        success: this.cmdLoading.success && this.snapLoading.success,
      };
    },
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
    findSnapRequest() {
      return {
        snapId: this.snapId,
        shareCode: this.shareCode,
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
      SnapshotApi.findBySid(this.findSnapRequest).then((resp) => {
        console.log(resp);
        this.snap = Snapshot.fromObj(resp.data.data);
        this.paramVal = this.snap.paramVal;
        this.optionVal = this.snap.optionVal;
      }).catch(e => console.log(e));
    },
    getLocalSnap() {
      console.log('get Snap');
      if (this.snapId !== null
        && this.snapId !== undefined
        && StringUtils.nonEmptyString(this.cmd.commandName)) {
        this.snap = this.getCommandHis()(this.cmd.commandName)[this.snapId];
        if (this.snap) {
          const copyOne = JSON.parse(JSON.stringify(this.snap));
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
    if (StringUtils.nonEmptyString(this.snapId)) {
      this.snapLoading = {
        doing: false,
        success: false,
      };
    }
    this.location = this.$route.params.location;
    this.shareCode = this.$route.params.shareCode;
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
  padding-right: 0px;
}
.commit {
  width: 50%;
}
.cmd-perview {
  min-width: 50%;
}
</style>
