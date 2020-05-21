<template>
  <div class="param-container">
    <el-button icon="el-icon-plus" @click="editOption(undefined)"></el-button>
    <div class="params-c">
      <div v-for="(option, index) in options" :key="index" class="per-param">
        <div style="flex: 2;">
          <div>{{option.briefName}}</div>
        </div>
        <div style="flex: 1;">
          <div>{{convertType(option.type)}}</div>
        </div>
        <div style="flex: 4;">
          <div>{{option.getCurrentLangDesc(currentLang)}}</div>
        </div>
        <div class="per-operation" style="width: 80px;">
          <i @click="editOption(index)"
            class="el-icon-edit"></i>
          <i class="el-icon-delete-solid" @click="delDelete(index)"></i>
        </div>
      </div>
    </div>
    <!-- 底部空白填充 -->
    <div style="flex: 1;"></div>
    <edit-option-panel v-model="optionDdrawerShow"
      :InOption="currentOption" v-on:updateOption="updateOption($event)" />
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import EditOptionPanel from './EditOptionPanel.vue';
import CommandOption from '../../entities/CommandOption';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'edit-option-info',
  components: { EditOptionPanel },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: null,
      optionDdrawerShow: false,
      editIndex: undefined,
    };
  },
  computed: {
    currentOption() {
      return this.options.length > 0 && this.editIndex !== undefined
        ? this.options[this.editIndex]
        : new CommandOption({});
    },
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    convertType(key) {
      const typeList = CommandOption.types().filter(p => p.key === key);
      return typeList.length > 0 ? typeList[0].value : 'STRING';
    },
    isEmptyList(options) {
      return ListUtils.isEmptyList(options);
    },
    editOption(index) {
      this.editIndex = index;
      this.optionDdrawerShow = true;
    },
    updateOption(option) {
      // console.log(`commit option ${JSON.stringify(option)}`);
      if (this.editIndex !== undefined) {
        this.options.splice(this.editIndex, 1, option);
        // console.log(`commit option ${JSON.stringify(this.options)}`);
      } else {
        this.options.push(option);
      }
    },
    delDelete(index) {
      this.options.splice(index, 1);
    },
  },
  created() {
    this.options = this.value;
    // console.log(`传入的Option${this.options}`);
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
</style>
