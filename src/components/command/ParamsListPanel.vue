<template>
  <el-drawer
  :visible.sync="drawer"
  direction="ltr"
  :before-close="handleDrawerClose">
  <div slot="title" class="param-edit-title">
    <div class="param-edit-desc">{{$t('page.commandPanel.paramPanel.edit-title')}}</div>
    <el-tooltip effect="dark" :content="$t('page.commandPanel.paramPanel.add')" placement="left">
      <i class="param-edit-option el-icon-circle-plus-outline" @click="addParam"></i>
    </el-tooltip>
  </div>
<div
      @drop="drop($event)"
      @dragover="dragover($event)"
      @dragexit.capture="dragexit($event)"
      >
  <transition-group name="flip-list">
  <div style="display: flex;"
    class="param-list-each"
    :draggable="index === choiceIndex"
    @dragstart.capture="dragstart($event, index)"
    @dragend.capture="dragend(index)"
    @dragenter.capture="dragenter(index)"
    @dragleave.capture="dragleave(index)"
    @drag.capture="drag($event, index)"
    v-for="(param, index) in params" :key="param.index">
    <div class="drag-icon"><i @mousedown="mousedown(index)" class="el-icon-rank" ></i></div>
    <el-input
      class="param-input"
      placeholder="请输入内容"
      v-model="param.value"
      @mousedown.stop
      clearable>
    </el-input>
    <el-tooltip effect="dark"
      :content="$t('page.commandPanel.paramPanel.remove')"
      placement="right">
      <i class="delete-icon el-icon-circle-close" @click="deleteParam(index)"></i>
    </el-tooltip>
  </div>
  </transition-group>
  </div>
</el-drawer>
</template>
<script>
import Param from '@/entities/Param';

export default {
  name: 'params-list-panel',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    params: {
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
    drawer: {
      set(val) {
        this.$emit('input', val);
      },
      get() {
        console.log(this.value);
        return this.value;
      },
    },
  },
  data() {
    return {
      cparams: [],
      choiceIndex: undefined,
      onIndex: undefined,
      inputValue: null,
      inputVisible: false,
      items: [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }],
      drag_name: false,
    };
  },
  methods: {
    addParam() {
      this.params.push(new Param({ index: this.params.length, value: '', selected: true }));
    },
    deleteParam(index) {
      // 删除指定位置的参数
      this.params.splice(index, 1);
      // const tempParams = [...this.params];
      // tempParams.splice(index, 1);
      // this.$emit('updateVal', tempParams);
    },
    handleDrawerClose() {
      this.drawer = false;
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
      this.drag_name = true;
      this.choiceIndex = index;
    },
    // 拖动结束
    dragend(event) {
      this.cparams = this.comp_paras;
      this.onIndex = undefined;
      this.choiceIndex = undefined;
      // this.params = params;
      this.drag_name = false;
      console.log('dragend', event);
    },
    // 拖动到某个块中
    dragenter(index) {
      this.onIndex = index;
      // this.choiceIndex = index;
      console.log('dragenter', index);
      // const tempParams = [...this.params];
      // const cParam = tempParams.splice(this.choiceIndex, 1)[0];
      // tempParams.splice(index, 0, cParam);
      // this.$emit('input', tempParams);
    },
    // 拖动到某个
    dragleave(event) {
      this.onIndex = event;
      console.log('dragleave', event);
    },
    dragexit(event) {
      event.preventDefault();
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
      const tempParams = [...this.params];
      const cParam = tempParams.splice(this.choiceIndex, 1)[0];
      tempParams.splice(this.onIndex, 0, cParam);
      this.$emit('updateVal', tempParams);
    },
    dragover(event) {
      // console.log(event);
      event.preventDefault();
    },
    mousedown(index) {
      this.choiceIndex = index;
    },
  },
  created() {
    // this.cparams = [{ value: 'aaa' }, { value: 'bbb' }, { value: 'ccc' }];
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
.per-option{
  margin-bottom: 10px;
}
.draing-tag{
  opacity: 0.5;
}
.flip-list-move {
  transition: transform 1s;
}
:focus{
  outline:0;
}
.param-list-each{
  display: flex;
  margin: 5px 0px;
  .drag-icon{
    opacity: 0.6;
    cursor: move;
    margin: 0px 10px;
    display: flex;
    align-items: center;
  }
  .drag-icon:hover{
    opacity: 1;
  }
  .param-input{
    flex: 1;
  }
  .delete-icon{
    opacity: 0.6;
    margin: 0px 10px;
    display: flex;
    align-items: center;
  }
  .delete-icon:hover{
    opacity: 1;
  }
}
.param-edit-title{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
