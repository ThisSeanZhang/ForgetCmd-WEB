<template>
  <el-container>
    <el-header>
      <CMDHeader></CMDHeader>
    </el-header>
    <el-main>
      <!-- <CommitPanel :commit="commit" :originCmd="originCmd" class="commit" /> -->
      <div>
        左侧填充面板
      </div>
      <div>
        <el-table
          :data="addLogs"
          stripe
          style="width: 100%">
          <el-table-column
              prop="commandName"
              label="命令名称">
          </el-table-column>
          <el-table-column
              prop="briefDesc"
              label="简述">
          </el-table-column>
          <el-table-column
              prop="status"
              label="状态">
          </el-table-column>
          <el-table-column
              label="操作">
              <template slot-scope="props">
              <el-button @click="review(props.row.ccid)">预览</el-button>
              <el-button @click="confirmLog(props.row.ccid)">通过</el-button>
              </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import Commit from '@/entities/CommandCommit';
import Command from '@/entities/Command';
// import CommitPanel from '@/components/commits/CommitPanel.vue';
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'create-commit',
  components: { CMDHeader },
  data() {
    return {
      paramVal: [],
      optionVal: [],
      commit: Commit.CreateFackCommit(),
      originCmd: new Command({ commandName: 'docker', params: [{ index: 0, description: { zh: 'aaaa' } }] }),
    };
  },
  computed: {
    cmd() {
      return this.commit.toCommand();
    },
  },
  methods: {
    upParamVal(paramVal) {
      this.paramVal = paramVal;
    },
  },
  created() {
    // TODO 如果有ID的话需要获取相比较的cmd， commit 也要使用cmd进行初始化
    console.log(this.$route.params);
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
