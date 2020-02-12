<template>
  <el-drawer
    center
    title="添加参数"
    @open="cleanParam"
    :before-close="handleDrawerClose"
    :visible.sync="drawerVisible"
    ref="drawer"
    direction="rtl"
    custom-class="params-drawer"
    size="50%">
    <div class="params-drawer-content">
      <el-form :model="param" label-width="80px">
          <!-- <el-form-item label="参数名">
            <el-input v-model="param.paramName"></el-input>
          </el-form-item> -->
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入描述"
              v-model="param.description[currentLang]">
            </el-input>
            <el-tooltip  content="更多语言" placement="top">
              <el-button @click="multipLangDescDialog = true" icon="el-icon-more"></el-button>
            </el-tooltip>
          </el-form-item>
          <!-- <el-form-item label="类型">
            <el-select v-model="param.type" placeholder="请选择">
              <el-option
                v-for="item in paramType"
                :key="item.value"
                :label="item.value"
                :value="item.key">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item v-if="isEnum()" label="枚举值">
            <el-tag
              :key="tag"
              v-for="tag in enums.rules"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)">
              {{tag}}
            </el-tag>
            <el-input
              class="input-new-tag"
              v-if="enums.inputVisible"
              v-model="enums.inputValue"
              ref="saveTagInput"
              size="small"
              @keyup.enter.native="handleInputConfirm"
              @blur="handleInputConfirm"
            >
            </el-input>
            <el-button v-else class="button-new-tag"
            size="small" @click="showInput">+ New Tag</el-button>
          </el-form-item> -->
          <el-form-item>
            <el-button @click="drawerVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmParam">确定</el-button>
          </el-form-item>
        </el-form>
    </div>
    <MultipLangDesc v-model="multipLangDescDialog"
      :appendToBody='true'
      v-on:updateDesc='param.description = $event'
      :inDesc="param.description"
    />
  </el-drawer>
</template>
<script>
// import ListUtils from '../../entities/ListUtils';
import CmdParam from '../../entities/Param';
import MultipLangDesc from './MultipLangDesc.vue';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'edit-param-panel',
  components: { MultipLangDesc },
  props: {
    value: {
      type: Boolean,
    },
    InParam: {
      type: CmdParam,
      default: () => undefined,
    },
  },
  data() {
    return {
      param: new CmdParam({}),
      paramType: [],
      currentLang: 'zh',
      multipLangDescDialog: false,
    };
  },
  computed: {
    drawerVisible: {
      get() {
        return this.value;
      },
      set(vNew) {
        this.$emit('input', vNew);
      },
    },
  },
  methods: {
    confirmParam() {
      console.log(JSON.stringify(this.param));
      this.$emit('updateParam', this.param);
      this.drawerVisible = false;
    },
    cleanParam() {
      this.param = this.InParam.deepCopy();
    },
    handleDrawerClose(done) {
      if (JSON.stringify(this.InParam) === JSON.stringify(this.param)) {
        done();
        return;
      }
      this.$confirm('要保存已经修改的吗？')
        .then(() => {
          this.confirmParam();
          done();
        })
        .catch(() => {
          this.drawerVisible = false;
        });
    },
    handleClose() {},
    showInput() {
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {},
    isEnum() { return false; },
  },
};
</script>
<style lang="scss" scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.params-drawer-content{
  padding: 0px 20px 20px 20px;
}
</style>
