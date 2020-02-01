<template>
  <div>
    <div style="display: inline-block;" v-for="(param, index) in paramVal" :key="param.index" >
      <el-popover
        placement="top"
        trigger="hover"
        :content="paramDef[index].description">
        <el-tag
          slot="reference"
          closable
          @click="oneclick"
          type="info">
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
import CmdParam from '../../entities/CmdParam';

export default {
  name: 'common-param',
  components: { ParamsListPanel },
  props: {
    // paramDef: {
    //   type: Array,
    //   default: () => [],
    // },
    paramVal: {
      type: Array,
      default: () => [],
    },
    params: {
      type: Array,
    },
    paras: {
      type: Array,
    },
  },
  computed: {
    comp_paras() {
      if (this.choiceIndex === undefined) return this.cparams;
      const [...cparams] = this.cparams;
      const cParam = cparams.splice(this.choiceIndex, 1)[0];
      console.log(JSON.stringify(cparams));
      // cParam.choiced = true;
      const injectIndex = this.onIndex !== undefined ? this.onIndex : this.choiceIndex;
      console.log(injectIndex);
      cparams.splice(injectIndex, 0, cParam);
      return cparams.map((o, index) => ({ ...o, index }));
    },
  },
  data() {
    return {
      cparams: [],
      choiceIndex: undefined,
      onIndex: undefined,
      inputValue: null,
      inputVisible: false,
      paramDrawShow: false,
      aparams: [],
      paramDef: [],
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
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => this.$refs.saveTagInput.$refs.input.focus());
    },
    handleInputConfirm() {
      if (this.inputValue) {
        this.cparams.push({ value: this.inputValue });
      }
      this.inputVisible = false;
      this.inputValue = '';
    },

    // 拖动开始
    dragstart(event, index) {
    // event 是被拖动的元素
      event.dataTransfer.setData('text/plain', event.target);
      console.log('dragstart', index);
      this.choiceIndex = index;
    },
    // 拖动结束
    dragend(event) {
      this.cparams = this.comp_paras;
      this.onIndex = undefined;
      this.choiceIndex = undefined;
      // this.params = params;
      console.log('dragend', event);
    },
    // 拖动到某个块中
    dragenter(event) {
      this.onIndex = event;
      console.log('dragenter', event);
    },
    // 拖动到某个
    dragleave(event) {
      this.onIndex = event;
      console.log('dragleave', event);
    },
    dragexit() {
      console.log('exit');
    },
    // 当一个元素或是选中的文字被拖拽释放到一个有效的释放目标位置时
    drag() {
    // drag(event, index) {
      // console.log(event.target);
      // console.log('drag', index);
      // console.log(event);
    },
    drop(event) {
      event.preventDefault();
      console.log('drop');
    },
    dragover(event) {
      // console.log(event);
      event.preventDefault();
    },
  },
  created() {
    this.cparams = [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }];
    this.aparams = [{ value: 'aaa', index: 0 }, { value: 'bbb', index: 1 }, { value: 'ccc', index: 2 }];
    this.paramDef = [
      new CmdParam({
        cpid: 1, sort: 0, paramName: 'paramName1', description: 'description of param1',
      }),
      new CmdParam({
        cpid: 2, sort: 1, paramName: 'paramName2', description: 'description of param2',
      }),
      new CmdParam({
        cpid: 3, sort: 2, paramName: 'paramName3', description: 'description of param3',
      }),
    ];
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
