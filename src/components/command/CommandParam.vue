<template>
  <div>
    <div v-for="param in params" :key="param.cpid">
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="param.description"
        >
        <div class="per-option" slot="reference">
          <div class="param-brief">{{param.paramName}}</div>
          <div class="param-input">
            <el-input
              class="param-value"
              placeholder="请输入内容"
              v-model="param.value"
              clearable>
            </el-input>
          </div>
        </div>
      </el-popover>
    </div>
    <div
      @drop="drop($event)"
      @dragover="dragover($event)"
      >
      <div style="display:inline-block;"
        :class="choiceIndex === index ? 'draing-tag' : ''"
        :draggable="true"
        @drag.capture="drag($event, index)"
        @dragstart.capture="dragstart($event, index)"
        @dragend.capture="dragend(index)"
        @dragenter.capture="dragenter(index)"
        @dragleave.capture="dragleave(index)"
        @dragexit.capture="dragexit"

        v-for="(para, index) in comp_paras" :key="para.index">
        <!-- <div>{{para}}</div> -->
        <el-popover
          placement="top"
          trigger="hover"
          :content="para.value">
          <el-tag
            slot="reference"
            closable

            @dblclick.native="doubleClick"
            type="info">
            {{para.value}}
          </el-tag>
        </el-popover>
      </div>
    </div>
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>
<script>

export default {
  name: 'common-param',
  props: {
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
      const injectIndex = this.onIndex || this.choiceIndex;
      console.log(injectIndex);
      cparams.splice(injectIndex, 0, cParam);
      return cparams;
    },
  },
  data() {
    return {
      cparams: [],
      choiceIndex: undefined,
      onIndex: undefined,
      inputValue: null,
      inputVisible: false,
    };
  },
  methods: {
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
</style>
