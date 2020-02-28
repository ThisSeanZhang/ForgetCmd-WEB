<template>
  <el-card class="" shadow="hover">
    <div slot="header" class="">
      <span>{{ snap.title }}</span>
        <!-- 删除按钮 -->
          <el-popover
            placement="top"
            width="160"
            v-model="btn.deleteVisble">
            <p>确定删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="btn.deleteVisble = false">取消</el-button>
              <el-button type="primary" size="mini" @click="confirmDel()">确定</el-button>
            </div>
            <el-tooltip class="" effect="dark"
            content="删除" placement="top"
            :disabled="btn.deleteVisble"
            slot="reference" >
              <i style="float: right; padding: 3px 3px" class="el-icon-close"></i>
          </el-tooltip>
        </el-popover>
        <!-- 复制按钮 -->
        <el-tooltip class="" effect="dark" content="复制" placement="top">
          <i style="float: right; padding: 3px 3px" class="el-icon-copy-document"
            v-clipboard:copy="dealValue(copyLine)"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"
          ></i>
        </el-tooltip>
        <!-- 单多行切换 -->
        <el-tooltip class="" effect="dark" :content="exhibitBtn.desc" placement="top">
          <i style="float: right; padding: 3px 3px" :class="exhibitBtn.icon"
            @click="currentModel = currentModel === exhibitModel.ONELINE
            ? exhibitModel.MULTLINE : exhibitModel.ONELINE"
          ></i>
        </el-tooltip>
        <!-- 恢复/查看快照按钮 -->
        <el-tooltip class="" effect="dark" content="复原" placement="top">
          <i style="float: right; padding: 3px 3px" class="el-icon-refresh-right"></i>
        </el-tooltip>
    </div>
    <div v-if="currentModel === exhibitModel.ONELINE">
        {{dealValue(oneLine)}}
    </div>
    <div v-if="currentModel === exhibitModel.MULTLINE">
      <div v-for="(line, index) in dealValue(multLine)" :key="index">
        {{line}}
      </div>
    </div>
  </el-card>
</template>
<script>
import Snapshot from '../../entities/Snapshot';
import CommandOption from '../../entities/CommandOption';
import CmdParam from '../../entities/CmdParam';

export default {
  name: 'command-exhibit-card',
  props: {
    snap: {
      type: Snapshot,
      default: () => new Snapshot(),
    },
    index: {
      type: Number,
      default: () => -1,
    },
  },
  data() {
    return {
      allRows: [],
      exhibitModel: { ONELINE: Symbol('one line'), MULTLINE: Symbol('Multip line') },
      currentModel: null,
      btn: {
        deleteVisiable: false,
      },
    };
  },
  computed: {
    exhibitBtn() {
      return this.currentModel === this.exhibitModel.ONELINE
        ? { icon: 'el-icon-document-remove', desc: '单行模式' }
        : { icon: 'el-icon-document', desc: '多行模式' };
    },
    options() {
      return this.snap.optionVal
        .filter(option => option.selected)
        .map(option => new CommandOption(option));
    },
    params() {
      return this.snap.paramVal
        // .filter(param => param.selected)
        .map(param => new CmdParam(param));
    },
  },
  methods: {
    createSnapshot() {
      Snapshot.createSnapshot(this.cmd);
    },
    buildHyphen(option) {
      if (option.briefName === option.fullName) {
        return '--';
      }
      return '-';
    },
    dealValue(deal) {
      let allRows = [this.snap.commandName];
      const cmdOption = this.options
        .map((option) => {
          if (option.isMultip()) {
            return option.value.filter(p => p.selected).map(p => `${this.buildHyphen(option)}${option.briefName} ${p.value}`);
          }
          return [`${this.buildHyphen(option)}${option.briefName} ${option.value}`];
        })
        .reduce((a1, a2) => a1.concat(a2), []);
      // console.log(JSON.stringify(cmdOption));
      allRows = allRows.concat(cmdOption);
      allRows = allRows.concat(this.params.map(p => p.value));
      return typeof deal === 'function' ? deal(allRows) : allRows;
    },
    oneLine(params) {
      return params.join(' ');
    },
    multLine(params) {
      return params.map((p, index) => (index === params.length - 1 ? p : `${p} \\`));
    },
    copyLine(params) {
      return this.currentModel === this.exhibitModel.ONELINE
        ? params.join(' ')
        : params.map((p, index) => (index === params.length - 1 ? p : `${p} \\\r`)).join('');
    },
    onCopy() {
      this.$notify({
        title: '复制成功',
        type: 'success',
      });
    },
    onError() {
      this.$notify.error({
        title: '复制失败！',
      });
    },
    confirmDel() {
      this.btn.deleteVisble = false;
      this.$emit('delThis');
    },
  },
  created() {
    this.currentModel = this.exhibitModel.MULTLINE;
    console.log(this.snap);
  },
};
</script>
<style lang="scss" scoped>
</style>
