<template>
  <div class="param-container">
    <el-button icon="el-icon-plus" @click="editParam(undefined)"></el-button>
    <div class="params-c" @drop="drop($event)" @dragover="dragover($event)">
      <transition-group name="flip-list">
        <div v-for="(param, index) in params" :key="param.index"
          class="per-param"
          :draggable="index === choiceIndex"
          @mousedown="mousedown(index)"
          @dragstart.capture="dragstart($event, index)"
          @dragend.capture="dragend(index)"
          @dragenter.capture="dragenter(index)"
        >
          <!-- <div style="flex: 2;">
            <div>{{param.paramName}}</div>
          </div> -->
          <!-- <div style="flex: 1;">
            <div>{{convertType(param.type)}}</div>
          </div> -->
          <div style="flex: 4;">
            <div>{{param.getCurrentLangDesc(currentLang)}}</div>
          </div>
          <div class="per-operation" style="width: 80px;">
            <i @click="editParam(index)"
              class="el-icon-edit"></i>
            <i class="el-icon-delete-solid"  @click.stop="delDelete(index)"></i>
          </div>
        </div>
      </transition-group>
    </div>
    <!-- 底部空白填充 -->
    <div style="flex: 1;"></div>
    <edit-param-panel v-model="paramDdrawerShow"
      :InParam="currentParam" v-on:updateParam="updateParam($event)" />
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import EditParamPanel from './EditParamPanel.vue';
import CmdParam from '../../entities/Param';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'edit-param-info',
  components: { EditParamPanel },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      params: null,
      paramDdrawerShow: false,
      editIndex: undefined,
      paramTypeEnum: [],
      choiceIndex: undefined,
      onIndex: undefined,
    };
  },
  computed: {
    currentParam() {
      return this.params.length > 0 && this.editIndex !== undefined
        ? this.params[this.editIndex]
        : new CmdParam({ index: this.params.length });
    },
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    convertType(key) {
      // console.log(this.paramTypeEnum.filter(p => p.key === key));
      const typeList = this.paramTypeEnum.filter(p => p.key === key);
      return typeList.length > 0 ? typeList[0].value : 'UNDEFINED';
    },
    isEmptyList(params) {
      return ListUtils.isEmptyList(params);
    },
    editParam(index) {
      this.editIndex = index;
      console.log(this.currentParam);
      this.paramDdrawerShow = true;
    },
    updateParam(param) {
      if (this.editIndex !== undefined) {
        this.params.splice(this.editIndex, 1, param);
      } else {
        this.params.push(param);
      }
    },
    delDelete(index) {
      // this.$emit('input', this.params.filter((_, i) => i !== index));
      this.params.splice(index, 1);
    },
    drop(event) {
      event.preventDefault();
      console.log('drop');
      const cParam = this.params.splice(this.choiceIndex, 1)[0];
      console.log(cParam);
      this.params.splice(this.onIndex, 0, cParam);
      console.log(this.params);
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
      this.onIndex = undefined;
      this.choiceIndex = undefined;
      console.log('dragend', event);
    },
    // 拖动到某个块中
    dragenter(index) {
      this.onIndex = index;
      console.log('dragenter', index);
    },
    mousedown(index) {
      this.choiceIndex = index;
    },
    dragover(event) {
      // console.log(event);
      event.preventDefault();
    },
  },
  created() {
    this.params = this.value;
    // this.params.push(new CmdParam({ paramName: 'aaaa', type: 1 }));
    // this.params.push(new CmdParam({ paramName: 'bbb' }));
    console.log(this.params);
    // CmdParam.loadType().then((resp) => {
    //   this.paramTypeEnum = resp.data.data;
    // }).catch(wantNothing);
  },
};
</script>
<style lang="scss" scoped>
.params-c::-webkit-scrollbar {display:none}
.params-c{
  height: 100%;
  padding: 0px 12px;
  overflow: auto;
}
.param-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  // background: rgb(210,210,210);
  // border-radius: 20px;
  // box-shadow: 0px 5px 6px rgb(160,160,160);
  // filter: (2px);
  // -webkit-filter: blur(15px);
  button{
    margin: 0px 12px;
  }
}
.per-param, .per-delete-param{
  display: flex;
  // flex: 1;
  height: 40px;
  margin: 10px 0px;
  // border: 1px solid #DCDFE6;
  border-radius: 4px;
  transition: all .5s;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    div{
      vertical-align: middle;
      text-align: center;
      font-size: 14px;
      color: #606266;
    }
  }
}
.per-param:hover {
  -moz-box-shadow:4px 4px 10px #575757;
  -webkit-box-shadow:4px 4px 10px #575757;
  box-shadow:4px 4px 10px #575757;
}
.per-operation{
  color: rgb(96, 98, 102);
  font-size: 20px;
  display: flex;
  i {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  i:hover {
    color: #5cb6ff;
  }
}
.flip-list-move {
  transition: transform 0.6s;
}
</style>
