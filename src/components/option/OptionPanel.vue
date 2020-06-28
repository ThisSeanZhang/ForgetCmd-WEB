<template>
  <div>
    <OptionSearchBar
      :optionDef="optionDef"
      :limitOption="limitOption"
      v-on:addOption="addOption($event)"></OptionSearchBar>
    <el-scrollbar style="height: calc(100% - 40px);">
    <div v-for="(option, index) in optionVal" :key="index">
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="getDescription(option.description)"
        >
        <div class="per-option" slot="reference">
          <div class="option-brief">
            <div>{{option.showName()}}</div>
            <div  v-if="!option.sameBriefAndFull()">({{option.fullName}})</div>
          </div>
          <div class="option-switch">
            <el-switch
              v-model="option.selected"
              active-color="#13ce66">
            </el-switch>
          </div>
          <OptionParam class="option-value-bar" :option="option" v-model="option.value" />
          <div class="option-operation">
            <el-tooltip class="item" effect="dark"
              :content="$t('page.commandPanel.optionPanel.ignore')" placement="top">
              <el-checkbox v-model="option.ignore"></el-checkbox>
            </el-tooltip>
            <el-tooltip class="item" effect="dark"
              :content="$t('page.commandPanel.optionPanel.remove')" placement="top">
              <i class="option-delete el-icon-delete" @click="removeOptionVal(index)"></i>
            </el-tooltip>
          </div>
        </div>
      </el-popover>
    </div>
    </el-scrollbar>
    <MultipParam v-model="optionParamDialog"
      :option="dialogOption" v-on:updateParam="updateParam($event)"
    />
  </div>
</template>
<script>
// import { ajax, wantNothing } from '../../api/fetch';
// import Option from '../../entities/Option';
import OptionSearchBar from './OptionSearchBar.vue';
import OptionParam from './EachOption.vue';
import MultipParam from '../command/MultipParam.vue';
import ListUtils from '../../entities/ListUtils';

export default {
  name: 'option-panel',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    optionDef: {
      type: Array,
      default: () => [],
    },
    optionVal: {
      type: Array,
      default: () => [],
    },
  },
  components: { OptionSearchBar, OptionParam, MultipParam },
  data() {
    return {
      optionParamDialog: false,
      dialogOption: null,
      boxs: [],
    };
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
    limitOption() {
      return this.optionVal.filter(op => !op.duplicate).map(op => op.fullName);
    },
  },
  methods: {
    getDescription(desc) {
      return desc && desc[this.currentLang] ? desc[this.currentLang] : '';
    },
    removeOptionVal(index) {
      this.optionVal.splice(index, 1);
    },
    addOption(option) {
      this.optionVal.push(option);
    },
    editMultip(option) {
      this.dialogOption = option;
      this.optionParamDialog = true;
    },
    updateParam(value) {
      this.dialogOption.value = value;
    },
    isEmptyList(params) {
      return ListUtils.isEmptyList(params);
    },
    // closeTag(option, index) {
    //   // option.value = option.filter((_, i) => i !== index);
    // },
  },
  created() {
    // console.log(`enum${this.optionType.ENUM}`);
    // console.log(Option.getType());
    console.log(this.optionDef);
  },
};
</script>
<style lang="scss" scoped>
.option-value, .option-desc{
  display: inline-block;
}
.option-brief{
  // 文字居中
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80px;
  min-height: 40px;
  // text-align: right;
  float: left;
  // line-height: 40px;
  margin-right: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  div {
    vertical-align: middle;
    text-align: center;
    font-size: 14px;
    color: #606266;
  }
}

.option-switch{
  // margin-left: 80px;
  display: flex;
  padding: 0px 10px;
  align-items: center;
}
.per-option{
  display: flex;
  margin: 10px 0px;
}
.option-mulit{
  float: right;
}
.option-value-bar{
  // display: flex;
  // margin-left: 150px;
  flex: 1;
  // margin-right: 60px;
  // justify-content: center;
}
.option-operation{
  display: flex;
  align-items: center;
  margin-left: 5px;
  margin-right: 10px;
}
.is-multip{
  margin-right: 60px;
  overflow: hidden;
  line-height: 40px;
  text-align: center;
  min-height: 40px;
}
.value-tag{
  margin-left: 10px;
}
.value-tag{
  margin-left: 10px;
}
.value-tag:hover {
  cursor: pointer;
}
.fade-enter-active, .fade-leave-active {
  height: 0px;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
  opacity: 0;
}
</style>
