<template>
  <div>
    <div class="exhibit-head">
      <div>{{$t('page.commandPanel.preview')}}</div>
      <div>
        <el-tooltip effect="dark"
          :content="$t('other.btn.copy')" placement="top">
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
        <el-tooltip effect="dark"
          :content="$t('page.commandPanel.previewPanel.snapshot')" placement="top">
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
    <el-scrollbar style="height: calc(100% - 44px);">
      <div v-if="currentModel === exhibitModel.ONELINE">
          {{dealValue(oneLine)}}
      </div>
      <div v-if="currentModel === exhibitModel.MULTLINE">
        <div v-for="(line, index) in dealValue(multLine)" :key="index">
          {{line}}
        </div>
      </div>
    </el-scrollbar>
    <SnapshotPanel :inSnap="snap" v-model="snapCreateDialogVisible" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from 'vuex';
import Command from '../../entities/Command';
import TimeUtils from '../../entities/TimeUtils';
import SnapshotPanel from '../snap/SnapshotPanel.vue';
import Snapshot from '../../entities/Snapshot';
// import CmdParam from '../../entities/CmdParam';

export default {
  name: 'command-exhibit',
  components: { SnapshotPanel },
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
    createHist: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      allRows: [],
      exhibitModel: { ONELINE: Symbol('one line'), MULTLINE: Symbol('Multip line') },
      currentModel: null,
      snapCreateDialogVisible: false,
    };
  },
  computed: {
    snap() {
      const { commandName, cid } = { ...this.cmd };
      return new Snapshot({
        cid,
        paramVal: this.params,
        optionVal: this.options,
        commandName,
        did: this.did,
      });
    },
    exhibitBtn() {
      return this.currentModel === this.exhibitModel.ONELINE
        ? { icon: 'el-icon-document-remove', desc: this.$t('page.commandPanel.previewPanel.oneLine') }
        : { icon: 'el-icon-document', desc: this.$t('page.commandPanel.previewPanel.multiple') };
    },
    ...mapGetters('UserInfo', ['did']),
  },
  methods: {
    createSnapshot() {
      this.snapCreateDialogVisible = true;
      // SnapApi.createSnapshot(this.cmd);
    },
    buildHyphen(option) {
      if (option.briefName === option.fullName) {
        return '--';
      }
      return '-';
    },
    exhibitName(option) {
      if (!option) return '';
      return option.briefName && option.briefName !== '' ? option.briefName : option.fullName;
    },
    dealValue(deal) {
      let allRows = [];
      allRows.push(this.cmd.commandName);
      const cmdOption = this.options
        .filter(option => option.selected)
        .map((option) => {
          if (option.isMultip()) {
            return option.value.filter(p => p.selected).map(p => `${this.buildHyphen(option)}${this.exhibitName(option)} ${p.value}`);
          }
          return [`${this.buildHyphen(option)}${this.exhibitName(option)} ${option.value}`];
        })
        .reduce((a1, a2) => a1.concat(a2), []);
      // console.log(JSON.stringify(cmdOption));
      allRows = allRows.concat(cmdOption);
      allRows = allRows.concat(this.params.filter(p => p.selected).map(p => p.value));
      return typeof deal === 'function' ? deal(allRows) : allRows;
    },
    craeteHistory() {
      if (!this.createHist) return;
      const createTime = new Date().getTime();
      this.newRecord({
        ...this.cmd.toSnap(),
        title: TimeUtils.dateFormat('YYYY-MM-dd HH:mm:ss', createTime),
        createTime,
        paramVal: this.params,
        optionVal: this.options,
      });
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
      this.craeteHistory();
      this.$notify({
        title: this.$t('other.copy.message.success'),
        type: 'success',
        // position: 'top-left',
      });
    },
    onError() {
      this.$notify.error({
        title: this.$t('other.copy.message.fail'),
        // position: 'top-left',
      });
    },
    ...mapMutations('CommandHistory', ['newRecord']),
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
