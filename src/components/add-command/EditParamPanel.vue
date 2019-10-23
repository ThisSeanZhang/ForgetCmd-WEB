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
          <el-form-item label="参数名">
            <el-input v-model="param.paramName"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 6}"
              placeholder="请输入描述"
              v-model="param.description">
            </el-input>
          </el-form-item>
          <el-form-item label="类型">
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
          </el-form-item>
          <el-form-item>
            <el-button @click="drawerVisible = false">取消</el-button>
            <el-button type="primary" @click="confirmParam">确定</el-button>
          </el-form-item>
        </el-form>
    </div>
  </el-drawer>
</template>
<script>
// import ListUtils from '../../entities/ListUtils';
import CmdParam from '../../entities/CmdParam';
import { wantNothing } from '../../api/fetch';

export default {
  name: 'edit-param-panel',
  props: {
    value: {
      type: Boolean,
    },
    InParam: {
      type: CmdParam,
      default: function name() {
        return new CmdParam({});
      },
    },
  },
  data() {
    return {
      param: new CmdParam({}),
      paramType: [],
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
      console.log(JSON.stringify(this.InParam));
      this.$emit('updateParam', this.param);
      this.drawerVisible = false;
    },
    cleanParam() {
      this.param = this.InParam.deepCopy();
      CmdParam.loadType().then((resp) => {
        this.paramType = resp.data.data;
      }).catch(wantNothing);
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
