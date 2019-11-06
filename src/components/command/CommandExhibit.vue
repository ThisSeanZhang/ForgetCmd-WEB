<template>
  <div>
    <div class="exhibit-head">
      <div>命令预览</div>
      <div>
        <el-tooltip effect="dark" content="复制" placement="top">
          <el-button circle
          v-clipboard:copy="dealValue(copyLine)"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          icon="el-icon-copy-document"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" :content="exhibitBtn.desc" placement="top">
          <el-button
            circle
            @click="currentModel = currentModel === exhibitModel.ONELINE
            ? exhibitModel.MULTLINE : exhibitModel.ONELINE"
            :icon="exhibitBtn.icon">
            <!-- {{currentModel === exhibitModel.ONELINE ? '单行模式' : '多行模式'}} -->
          </el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="创建快照" placement="top">
          <el-button
            circle
            @click="createSnapshot"
            icon="el-icon-camera">
          </el-button>
        </el-tooltip>
      </div>
    </div>
    <!-- <div>{{cmd.commandName}}&nbsp;\</div>
    <div>
      <div v-for="option in options" :key="option.oid">
        <div v-if="option.isMultip()">
          <div v-for="(p, index) in option.value.filter(p => p.selected)" :key="index" >
            {{buildHyphen(option) + option.briefName + ' ' + p.value + ' \\'}}
          </div>
        </div>
        <div v-else>
          {{buildHyphen(option) + option.briefName + ' ' + option.value + ' \\'}}
        </div>
      </div>
    </div>
    <div>
      <div v-for="(param, index) in params" :key="param.cpid">{{param.value}}
        <span v-if="index !== params.length - 1">&nbsp;\</span>
      </div>
    </div> -->
    <div v-if="currentModel === exhibitModel.ONELINE">
        {{dealValue(oneLine)}}
    </div>
    <div v-if="currentModel === exhibitModel.MULTLINE">
      <div v-for="(line, index) in dealValue(multLine)" :key="index">
        {{line}}
      </div>
    </div>
  </div>
</template>
<script>
import Command from '../../entities/Command';
import Snapshot from '../../entities/Snapshot';
// import CmdParam from '../../entities/CmdParam';

export default {
  name: 'command-exhibit',
  props: {
    cmd: {
      type: Command,
    },
    options: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      allRows: [],
      exhibitModel: { ONELINE: Symbol('one line'), MULTLINE: Symbol('Multip line') },
      currentModel: null,
    };
  },
  computed: {
    exhibitBtn() {
      return this.currentModel === this.exhibitModel.ONELINE
        ? { icon: 'el-icon-document-remove', desc: '单行模式' }
        : { icon: 'el-icon-document', desc: '多行模式' };
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
      let allRows = [];
      allRows.push(this.cmd.commandName);
      const cmdOption = this.options
        .filter(option => option.selected)
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
  },
  created() {
    this.currentModel = this.exhibitModel.MULTLINE;
    // console.log(this.params, this.options);
  },
};
</script>
<style lang="scss" scoped>
.exhibit-head{
  display: flex;
  line-height: 44px;
  justify-content: space-between;
}
</style>
