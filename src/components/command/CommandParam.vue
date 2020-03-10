<template>
  <div>
    <div style="display: inline-block;" v-for="(param, index) in exhibitParam" :key="param.index" >
      <el-popover
        placement="top"
        trigger="hover"
        :disabled="!param.selected || param.descIndex >= paramDef.length"
        :content="getDefSesc(param.descIndex)">
        <el-tag
          slot="reference"
          closable
          @close="handleClose(index)"
          @click="changeSelect(index)"
          :type="param.selected ? 'success': 'info'" >
          {{param.value}}
        </el-tag>
      </el-popover>
    </div>
    <!-- <div v-for="(para, index) in comp_paras" :key="'list-'+index">
      <el-popover
        placement="top"
        trigger="hover"
        :content="para.value">
        <el-tag
          slot="reference"
          closable
          @click="oneclick"
          type="info">
          {{para.value}}
        </el-tag>
      </el-popover>
    </div> -->
    <el-button size="small" icon="el-icon-set-up" @click="paramDrawShow = true" ></el-button>
  <ParamsListPanel
    v-model="paramDrawShow"
    :params='paramVal'
    v-on:updateVal="updateVal($event)">
  </ParamsListPanel>
  </div>
</template>
<script>
import ParamsListPanel from './ParamsListPanel.vue';
// import CmdParam from '../../entities/CmdParam';

export default {
  name: 'common-param',
  components: { ParamsListPanel },
  props: {
    paramDef: {
      type: Array,
      default: () => [],
    },
    paramVal: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    exhibitParam() {
      let index = -1;
      return this.paramVal
        .map((p) => {
          const r = { ...p };
          r.descIndex = p.selected ? index += 1 : -1;
          return r;
        });
    },
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  data() {
    return {
      cparams: [],
      inputValue: null,
      paramDrawShow: false,
      aparams: [],
    };
  },
  methods: {
    updateVal(event) {
      console.log(event);
      this.$emit('upParamVal', event);
    },
    oneclick() {
      console.log('one click');
    },
    doubleClick() {
      console.log('double click');
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.cparams.push({ value: this.inputValue });
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    getDefSesc(index) {
      if (index < 0 || index >= this.paramDef.length) return '';
      return this.paramDef[index].getCurrentLangDesc(this.currentLang);
    },
    changeSelect(index) {
      const param = this.paramVal[index];
      this.$set(param, 'selected', !param.selected);
    },
    handleClose(index) {
      this.paramVal.splice(index, 1);
    },
  },
  created() {
    this.cparams = [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }];
    this.aparams = [{ value: 'aaa', index: 0 }, { value: 'bbb', index: 1 }, { value: 'ccc', index: 2 }];
  },
};
</script>
<style lang="scss" scoped>
.param-value, .param-desc{
  display: inline-block;
}
.param-brief{
  width: 80px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.param-input{
  margin-left: 80px;
}
.per-option{
  margin-bottom: 10px;
}
.draing-tag{
  opacity: 0.5;
}
.flip-list-move {
  transition: transform 1s;
}
</style>
