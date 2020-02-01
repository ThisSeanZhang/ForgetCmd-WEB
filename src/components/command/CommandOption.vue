<template>
  <div>
    <OptionSearchBar :optionDef="optionDef" v-on:addOption="addOption($event)"></OptionSearchBar>
    <div v-for="(option, index) in optionVal" :key="index">
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="option.description.zh"
        >
        <div class="per-option" slot="reference">
          <div class="option-brief"><div>{{option.showName()}}</div></div>
          <div class="option-switch">
            <el-switch
              v-model="option.selected"
              active-color="#13ce66">
            </el-switch>
          </div>
          <div class="option-mulit" v-if="option.isMultip()">
            <el-button icon="el-icon-set-up" @click="editMultip(option)"></el-button>
          </div>
          <div v-if="option.isMultip()" class="option-value-bar is-multip" >
            <transition name="fade">
              <div v-if="isEmptyList(option.value)">请点击右侧按钮进行配置参数</div>
            </transition>
            <!-- <el-checkbox-group v-model="boxs" size="mini"> -->
              <!-- <el-checkbox v-model="tag.selected" v-for="(tag, index) in option.value"
                :key="index" border size="mini">{{tag.value}}</el-checkbox> -->
            <!-- </el-checkbox-group> -->
            <el-tag closable
              class="value-tag" v-for="tag in option.value"
              :effect="tag.selected ? 'dark' : 'plain'"
              @click="tag.selected = !tag.selected"
              @close="option.value = option.value.filter( val => val.value !== tag.value)"
              :key="tag.value" type="info">{{tag.value}}</el-tag>
            <!-- {{multipParam(option.value)}} -->
          </div>
          <div v-else class="option-value-bar" >
            <OptionParam :option="option" v-model="option.value" />
          </div>
          <i class="el-icon-delete" @click="removeOptionVal(index)"></i>
        </div>
      </el-popover>
    </div>
    <MultipParam v-model="optionParamDialog"
      :option="dialogOption" v-on:updateParam="updateParam($event)"
    />
  </div>
</template>
<script>
// import { ajax, wantNothing } from '../../api/fetch';
// import Option from '../../entities/Option';
import OptionSearchBar from '../option/OptionSearchBar.vue';
import OptionParam from './OptionParam.vue';
import MultipParam from './MultipParam.vue';
import ListUtils from '../../entities/ListUtils';

export default {
  name: 'common-option',
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
  },
  methods: {
    removeOptionVal(index) {
      this.optionVal.splice(index, 1);
    },
    addOption(option) {
      // 接收到Bar发送的添加请求 是否要对已有的进行排序 或者改拖动就不需要了
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
  width: 80px;
  min-height: 40px;
  // text-align: right;
  float: left;
  // line-height: 40px;
  padding: 0 12px 0 0;
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
  float: left;
  line-height: 40px;
  padding: 0px 10px;
}
.per-option{
  margin-bottom: 10px;
}
.option-mulit{
  float: right;
}
.option-value-bar{
  // display: flex;
  margin-left: 150px;
  // margin-right: 60px;
  // justify-content: center;
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
