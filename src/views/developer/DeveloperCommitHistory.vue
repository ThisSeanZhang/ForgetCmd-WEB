<template>
<el-scrollbar v-if="loading.success" style="height: 100%;" >
    <CommitSingleCard  v-for="(commit, i) in commits" :key="i" :commit="commit" />
  </el-scrollbar>
  <LoadPanel v-bind:loading="loading" v-else v-on:inform="fetchCommitsInfo()"></LoadPanel>
</template>
<script>
import { wantNothing } from '@/api/fetch';
import CommitAPI from '../../api/CommitAPI';
import CommitSingleCard from '../../components/commits/CommitSingleCard.vue';
import LoadPanel from '../../components/common/LoadPanel.vue';
import CommandCommit from '../../entities/CommandCommit';

export default {
  name: 'user-commit-history',
  components: {
    LoadPanel, CommitSingleCard,
  },
  data() {
    return {
      addLogs: [],
      paramVal: [],
      optionVal: [],
      currentIndex: null,
      cmdTab: true,
      commits: [],
      reviewCmd: new CommandCommit({}).toCommand(),
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  watch: {
    cmdTab(n) {
      if (n) {
        this.fetchCommitsInfo();
      }
    },
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    changeTab() {
      console.log(this.cmdTab);
      this.cmdTab = !this.cmdTab;
    },
    fetchCommitsInfo() {
      CommitAPI.getCommitsByDid(this.$route.params.did, this.loading).then((resp) => {
        this.commits = resp.data.data.map(CommandCommit.fromObj);
        console.log(this.commits);
      }).catch(wantNothing);
    },
    review(cmd) {
      this.reviewCmd = cmd;
      this.paramVal = [];
      this.optionVal = [];
    },
    confirmLog(row) {
      console.log(row);
    },
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
  },
  created() {
    this.fetchCommitsInfo();
    this.$emit('flash', this.fetchCommitsInfo);
  },
};
</script>
<style lang="scss" scoped>
.developer-commit-history{
  flex: 1;
  display: flex;
}
.commit {
  width: 50%;
}
.box-card{
  margin: 10px 0px;
}
.command-list-head{
  display: flex;
  justify-content: space-between;
}
.item-list{
  height: 100%;
  flex: 1;
  max-width: 50%;
}
.command-list{
  height: 100%;
  overflow: hidden;
}
.exhibit-cmd{
  flex: 1;
  max-width: 50%;
}
</style>
