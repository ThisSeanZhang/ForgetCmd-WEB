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
        :createSnap="true"
        :paramVal='paramVal'
        :optionVal='optionVal'
        v-on:upParamVal="paramVal = $event" />
      <CommitDetailInfo :commit="commit" v-if="loading.success" />
    </el-main>
    <LoadPanel v-bind:loading="loading" v-else class="cmd-perview" v-on:inform="getCommit">
    </LoadPanel>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import { wantNothing } from '@/api/fetch';
import CMDHeader from '@/components/header/Header.vue';
import CommandPanel from '../../components/command/CommandPanel.vue';
import LoadPanel from '../../components/common/LoadPanel.vue';
// import Command from '../../entities/Command';
import CommitAPI from '../../api/CommitAPI';
import CommandCommit from '../../entities/CommandCommit';
import CommitDetailInfo from '../../components/commits/CommitDetailInfo.vue';

export default {
  name: 'commit-detail',
  components: {
    CommandPanel, CMDHeader, LoadPanel, CommitDetailInfo,
  },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      loading: {
        doing: false,
        success: true,
      },
      itemLoading: {
        doing: false,
        success: true,
      },
      commit: new CommandCommit({}),
    };
  },
  computed: {
    cmd() {
      return this.commit.toCommand();
    },
  },
  methods: {
    hendleSelectCmd(cid) {
      this.$router.push(`/cmd/padding/${cid}`);
    },
    getCommit() {
      const { ccid } = this.$route.params;
      CommitAPI.getCommitInfoById(ccid, this.loading)
        .then((resp) => {
          this.commit = CommandCommit.fromObj(resp.data.data);
        }).catch(wantNothing);
    },
  },
  created() {
    this.getCommit();
  },
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
