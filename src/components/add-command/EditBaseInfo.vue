<template>
  <div class="edit-base-info">
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
  </div>
</template>
<script>
import Command from '../../entities/Command';

export default {
  name: 'edit-base-info',
  props: {
    value: {
      type: Command,
      default: () => new Command({}),
    },
  },
  created() {
    this.cmd = this.value;
  },
  data() {
    return {
      cmd: null,
    };
  },
};
</script>
<style lang="scss" scoped>
.edit-base-info{
  padding: 10px;
}
.per-option{
  margin-bottom: 10px;
}
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
.option-value-bar{
  margin-left: 80px;
}
</style>
