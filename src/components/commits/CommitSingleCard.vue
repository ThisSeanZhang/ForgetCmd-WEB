<template>
  <el-card class="each"
  shadow="hover">
  <div :class="'each-header ' + (haveCommitRemark ? 'have-line' : '')">
    <div
    style="display:flex; align-items: center;">{{commit.commandName}}</div>
    <!-- TODO Don't know exibit what props -->
    <div style="display: inline-block; margin-right: 10px;">
      <div>{{createTime}}</div>
      <div>{{commit.status}}</div>
    </div>
    <div class="options">
        <!-- 单多行切换 -->
        <!-- <el-tooltip class="" effect="dark" :content="exhibitBtn.desc" placement="top">
          <i style="float: right; " :class="exhibitBtn.icon"
            @click="currentModel = currentModel === exhibitModel.ONELINE
            ? exhibitModel.MULTLINE : exhibitModel.ONELINE"
          ></i>
        </el-tooltip> -->
        <!-- 跳转到命令填充页 -->
        <el-tooltip class="" effect="dark" :content="$t('other.btn.toCmd')" placement="top">
          <i @click="toCmdPadding" style="cursor: pointer"
          v-if="commit.cid"
          class="el-icon-s-promotion"></i>
        </el-tooltip>
        <!-- 浏览 完善命令请求 -->
        <el-tooltip class="" effect="dark" :content="$t('other.btn.view')" placement="top">
          <i @click="toCommitDetail" style="cursor: pointer"
          class="el-icon-view"></i>
        </el-tooltip>
        <!-- 编辑 完善命令请求 按钮 -->
        <el-tooltip class="" effect="dark" :content="$t('other.btn.edit')" placement="top">
          <i @click="editDialogVisible = true" style="cursor: pointer"
            v-if="exhibitOperator.edit"
            class="el-icon-edit"></i>
        </el-tooltip>
        <!-- <span class="head-arrow" v-if="haveCommitRemark" @click="isOpen = !isOpen">
          <i style="cursor: pointer"
            :class="isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
        </span> -->
    </div>
  </div>
  <!-- <div class="each-other-info">
    <div>{{commit.status}}</div>
  </div> -->
  <div v-if="haveCommitRemark">aaaaa{{commit.remark}}</div>
  <!-- <el-collapse-transition>
    <div v-show="isOpen">aaaaa{{commit.remark}}</div>
  </el-collapse-transition> -->
  </el-card>
</template>
<script>
import CommandCommit from '../../entities/CommandCommit';
import StringUtils from '../../entities/StringUtils';
import TimeUtils from '../../entities/TimeUtils';

export default {
  name: 'commit-single-card',
  props: {
    commit: {
      type: CommandCommit,
      default: () => new CommandCommit({}),
    },
  },
  data() {
    return {
      editDialogVisible: false,
      isOpen: false,
    };
  },
  computed: {
    exhibitOperator() {
      return { edit: true };
    },
    haveCommitRemark() {
      return StringUtils.nonEmptyString(this.commit.remark);
    },
    createTime() {
      return TimeUtils.dateFormat('yyyy-MM-dd HH:mm:ss', this.commit.createTime);
    },
  },
  methods: {
    toCmdPadding() {
      const routeUrl = this.$router.resolve({
        path: `/cmd/padding/${this.commit.cid}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    toCommitDetail() {
      const routeUrl = this.$router.resolve({
        path: `/commits/${this.commit.ccid}`,
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>
<style lang="scss" scoped>
.each {
  margin-bottom: 10px;
  margin-right: 10px;
}
.each-header {
  display: flex;
  justify-content: space-between;
  .options {
    i {
      padding: 3px 3px
    }
  }
}
.have-line {
  border-bottom: 1px solid #EBEEF5;
  padding-bottom: 10px;
  margin-bottom: 10px;
}
.each-context {
  height: 0px;
  overflow: hidden;
}
.each-context:hover{
  height: auto;
}
.each-other-info  {
  display: flex;
  justify-content: space-between;
}
</style>
