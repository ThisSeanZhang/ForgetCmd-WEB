<template>
  <div>
    <div class="per-option">
      <div class="option-brief">命令名称</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="cmd.commandName" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">简述</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="cmd.briefDesc" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">详细描述</div>
      <div class="option-value-bar" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入描述"
          v-model="cmd.description">
        </el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">版本</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="cmd.version" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">平台</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="cmd.platform" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">参数数量</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="cmd.argNum" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">启用时间</div>
      <div class="option-value-bar" >
        <el-date-picker type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          placeholder="选择日期"
          v-model="cmd.whenEnable"
          style="width: 100%;"></el-date-picker>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">命令参数</div>
      <div class="option-mulit" >
        <el-button icon="el-icon-set-up" @click="paramDdrawerShow = true"></el-button>
      </div>
      <div class="option-value-bar is-multip" >
        <transition name="fade">
          <div v-if="isEmptyList(cmd.params)">请点击右侧按钮进行配置参数</div>
        </transition>
        <el-tag closable
          class="value-tag" v-for="tag in cmd.params"
          @close="cmd.params = cmd.params.filter( val => val.paramName !== tag.paramName)"
          :key="tag.paramName" effect="dark">{{tag.paramName}}</el-tag>
      </div>
    </div>
    <!-- <div class="per-option">
      <div class="option-brief">命令选项</div>
      <div class="option-mulit" >
        <el-button icon="el-icon-set-up" @click="optionDdrawerShow = true"></el-button>
      </div>
      <div class="option-value-bar is-multip" >
        <transition name="fade">
          <div v-if="isEmptyList(cmd.options)">请点击右侧按钮进行配置参数</div>
        </transition>
        <el-tag closable
          class="value-tag" v-for="tag in cmd.options"
          @close="cmd.options = cmd.options.filter( val => val.value !== tag.value)"
          :key="tag.value" effect="dark">{{tag.value}}</el-tag>
      </div>
    </div> -->
    <div class="per-option">
      <div class="option-brief">命令选项</div>
      <div class="option-value-bar" >
        <el-table
          :data="cmd.options"
          style="width: 100%">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="何时启用">
                  <span>{{ props.row.whenEnable }}</span>
                </el-form-item>
                <el-form-item label="枚举值">
                  <span>{{ props.row.rules.join(',') }}</span>
                </el-form-item>
                <el-form-item label="描述">
                  <span>{{ props.row.description }}</span>
                </el-form-item>
                <el-form-item label="操作">
                  <el-button @click="openOptionDrawer(props.$index)"
                    size="small" icon="el-icon-edit"></el-button>
                  <el-button @click="removeOption(props.$index)"
                    size="small" type="danger" icon="el-icon-delete"></el-button>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column
            label="简写"
            prop="briefName">
          </el-table-column>
          <el-table-column
            label="完整"
            prop="fullName">
          </el-table-column>
          <el-table-column
            label="类型"
            prop="type">
          </el-table-column>
          <el-table-column
            width="66">
            <template slot="header">
              <el-button @click="openOptionDrawer(undefined)" icon="el-icon-plus"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="per-option">
      <!-- <el-button >取消</el-button> -->
      <el-button type="primary" @click="submitCmd" >确定</el-button>
    </div>
    <AddParam v-model="paramDdrawerShow"
      :InParams="cmd.params" v-on:updateParam="cmd.params = $event" />
    <AddOption v-model="optionDdrawerShow"
      :InOption="currentOption"
      :existName="existOptionName"
      v-on:updateOption="updateOption( $event )" />
  </div>
</template>
<script>
import Command from '../../entities/Command';
// import Option from '../../entities/Option';
import AddParam from './AddParam.vue';
import AddOption from './AddOption.vue';
import ListUtils from '../../entities/ListUtils';
import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-cmd',
  components: { AddParam, AddOption },
  watch: {
    cmd(nVal, oVal) {
      console.log(nVal, oVal);
    },
  },
  data() {
    return {
      cmd: new Command({}),
      currentOptionIndex: undefined,
      paramDdrawerShow: false,
      optionDdrawerShow: false,
    };
  },
  methods: {
    submitCmd() {
      Command.createAddLog(this.cmd).then((resp) => {
        console.log(JSON.stringify(resp));
        this.$message('添加成功');
      }).catch(wantNothing);
    },
    removeOption(index) {
      this.cmd.options = this.cmd.options.filter((_, i) => i !== index);
    },
    openOptionDrawer(index) {
      this.currentOptionIndex = index;
      this.optionDdrawerShow = true;
      // console.log(JSON.stringify(this.currentOption));
    },
    updateOption(option) {
      if (this.currentOptionIndex !== undefined) {
        this.cmd.options.splice(this.currentOptionIndex, 1, option);
      } else {
        this.cmd.options.push(option);
      }
    },
    onSubmit() {
      console.log('submit!', JSON.stringify(this.cmd));
    },
    isEmptyList(params) {
      return ListUtils.isEmptyList(params);
    },
  },
  computed: {
    currentOption() {
      return this.currentOptionIndex === undefined
        ? undefined : this.cmd.options[this.currentOptionIndex];
    },
    existOptionName() {
      return this.cmd.options.flatMap(o => [o.briefName, o.fullName]);
    },
  },
};
</script>
<style lang="scss" scoped>
.option-brief{
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
.option-mulit{
  float: right;
}
.option-value-bar{
  margin-left: 80px;
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
.fade-enter-active, .fade-leave-active {
  height: 0px;
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  height: 0px;
  opacity: 0;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
