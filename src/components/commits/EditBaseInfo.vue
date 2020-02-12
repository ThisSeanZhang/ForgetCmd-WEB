<template>
  <div class="edit-base-info">
    <div class="per-option">
      <div class="option-brief">命令名称</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="commit.commandName" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">简述</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="commit.briefDesc[currentLang]" clearable>
          <el-tooltip slot="append" content="更多语言" placement="top">
             <el-button  icon="el-icon-more" @click="multipLangBriefDescDialog = true"></el-button>
          </el-tooltip>
        </el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">详细描述</div>
      <div class="option-value-bar" >
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 6}"
          placeholder="请输入描述"
          v-model="commit.description[currentLang]">
        </el-input>
        <el-tooltip  content="更多语言" placement="top">
          <el-button @click="multipLangDescDialog = true" icon="el-icon-more"></el-button>
        </el-tooltip>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">版本</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="commit.version" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">平台</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="commit.platform" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">参数数量</div>
      <div class="option-value-bar" >
        <el-input placeholder="请输入内容" v-model="commit.argNum" clearable></el-input>
      </div>
    </div>
    <div class="per-option">
      <div class="option-brief">启用时间</div>
      <div class="option-value-bar" >
        <el-date-picker type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
          placeholder="选择日期"
          v-model="commit.whenEnable"
          style="width: 100%;"></el-date-picker>
      </div>
    </div>
    <MultipLangBriefDesc v-model="multipLangBriefDescDialog"
      v-on:updateBriefDesc='commit.briefDesc = $event'
      :inDesc="commit.briefDesc"
    />
    <MultipLangDesc v-model="multipLangDescDialog"
      v-on:updateDesc='commit.description = $event'
      :inDesc="commit.description"
    />
  </div>
</template>
<script>
import CommandCommit from '../../entities/CommandCommit';
import MultipLangBriefDesc from './MultipLangBriefDesc.vue';
import MultipLangDesc from './MultipLangDesc.vue';

export default {
  name: 'edit-base-info',
  components: { MultipLangBriefDesc, MultipLangDesc },
  props: {
    value: {
      type: CommandCommit,
      default: () => new CommandCommit({}),
    },
  },
  data() {
    return {
      commit: null,
      currentLang: 'zh',
      multipLangBriefDescDialog: false,
      multipLangDescDialog: false,
    };
  },
  computed: {
    // briefDesc: {
    //   get() {
    //     // 如果 briefDesc 对象都不是  那就给他初始化成对象
    //     if (typeof this.commit.briefDesc !== 'object') {
    //       this.commit.briefDesc = { [this.currentLang]: '' }
    //     }
    //     // 如果 briefDesc 是对象 但是没有当前语言的值  那就赋值
    //     if ( !this.commit.briefDesc.hasOwnProperty(this.currentLang) ) {
    //       this.commit.briefDesc[this.currentLang] = '';
    //     }
    //     return this.commit.briefDesc[this.currentLang];
    //   },
    //   set(val) {
    //     this.commit.briefDesc[this.currentLang] = val;
    //   },
    // },
    // description: {
    //   get() {
    //     // 如果 Desc 对象都不是  那就给他初始化成对象
    //     if (typeof this.commit.description !== 'object') {
    //       this.commit.description = { [this.currentLang]: '' }
    //     }
    //     // 如果 Desc 是对象 但是没有当前语言的值  那就赋值
    //     if ( !this.commit.description.hasOwnProperty(this.currentLang) ) {
    //       this.commit.description[this.currentLang] = '';
    //     }
    //     return this.commit.description[this.currentLang];
    //     // return this.commit.description ? this.commit.description[this.currentLang] : '';
    //   },
    //   set(val) {
    //     this.commit.description[this.currentLang] = val;
    //   },
    // },
  },
  mounted() {
  },
  created() {
    this.commit = this.value;
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
