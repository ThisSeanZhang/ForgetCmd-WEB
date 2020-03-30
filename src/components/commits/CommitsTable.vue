<template>
  <div v-loading="loading.doing" :class="'commit-table' + classSuffix">
    <el-scrollbar v-if="loading.success" class="commit-table-scrollbar">
      <el-table
        :data="showList"
        stripe
        style="width: 100%">
        <el-table-column
            prop="commandName"
            :label="$t('entities.commit.commandName')">
        </el-table-column>
        <el-table-column
            prop="briefDesc"
            :label="$t('entities.commit.briefDesc')">
        </el-table-column>
        <el-table-column
            prop="status"
            :label="$t('entities.commit.status')">
        </el-table-column>
        <el-table-column
            :label="$t('other.btn.operate')">
            <template slot-scope="{ row , $index}">
            <el-button @click="review($index)">{{$t('other.btn.perview')}}</el-button>
            <!-- <el-button @click="confirmLog(row.ccid)">通过</el-button> -->
            </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
    <div v-else class="commit-table-nodata" @click="fetchCommitsInfo">
      <i class="el-icon-refresh" ></i>
      重新加载
    </div>
  </div>
</template>
<script>
import { ajax, wantNothing } from '@/api/fetch';
import Commit from '@/entities/CommandCommit';

export default {
  name: 'commits-table',
  props: {
    cmd: {
      type: Object,
      default: () => {},
    },
    single: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      commits: [],
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  computed: {
    showList() {
      return this.commits.map(commit => ({
        ...commit,
        briefDesc: commit.briefDesc[this.currentLang],
        description: commit.description[this.currentLang],
      }));
    },
    request() {
      console.log(this.cmd);
      return {
        url: '/commits',
        method: 'GET',
        data: this.cmd,
      };
    },
    classSuffix() {
      return this.single ? '' : '-single';
    },
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    fetchCommitsInfo() {
      // this.loading = true;
      ajax(this.request, this.loading).then((resp) => {
        console.log(resp.data.data);
        this.commits = resp.data.data.map(commit => new Commit({
          ...commit,
          options: JSON.parse(commit.cmdOptions),
          params: JSON.parse(commit.cmdParams),
          briefDesc: JSON.parse(commit.briefDesc),
          description: JSON.parse(commit.description),
        }));
        // this.loading = false;
      }).catch(wantNothing);
    },
    review(index) {
      const commit = (!this.commits || this.commits.length < 1 || index === null)
        ? new Commit({}).toCommand()
        : this.commits[index].toCommand();
      this.$emit('reviewCmd', commit);
    },
    confirmLog(row) {
      console.log(row);
    },
  },
  created() {
    this.fetchCommitsInfo();
  },
};
</script>
<style lang="scss" scoped>
.commit-table{
  // transition: 0.3s;
  height: inherit;
  .commit-table-scrollbar{
    height: inherit;
  }
  .commit-table-nodata{
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.commit-table-single{
  // transition: 0.3s;
  height: 300px;
  .commit-table-scrollbar{
    height: inherit;
  }
  .commit-table-nodata{
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
