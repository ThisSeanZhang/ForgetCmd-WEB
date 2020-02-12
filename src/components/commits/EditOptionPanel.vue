<template>
  <el-drawer
    center
    title="添加可选参数"
    @open="cleanParam"
    :before-close="handleDrawerClose"
    :visible.sync="drawerVisible"
    ref="drawer"
    direction="rtl"
    custom-class="params-drawer"
    size="50%">
    <div class="params-drawer-content">
      <el-form :model="option" label-width="80px">
        <el-form-item label="简写">
          <el-input v-model="option.briefName"></el-input>
        </el-form-item>
        <el-form-item label="完整名称">
          <el-input v-model="option.fullName"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            placeholder="请输入描述"
            v-model="option.description">
          </el-input>
        </el-form-item>
        <el-form-item label="启用时间">
          <el-date-picker type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            placeholder="选择日期"
            v-model="option.whenEnable"
            style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="option.type" placeholder="请选择">
            <el-option
              v-for="item in optionType"
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
import Option from '../../entities/Option';
import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-option',
  props: {
    value: {
      type: Boolean,
    },
    InOption: {
      type: Option,
      default: function name() {
        return new Option({});
      },
    },
    existName: {
      type: Array,
    },
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
  data() {
    return {
      params: [],
      option: new Option({}),
      optionType: [],
      enums: {
        rules: [],
        inputValue: '',
        inputVisible: false,
      },
    };
  },
  methods: {
    confirmParam() {
      this.option.rules = this.enums.rules;
      this.$emit('updateOption', this.option);
      this.option = new Option({});
      this.enums = {
        rules: [],
        inputValue: '',
        inputVisible: false,
      };
      this.drawerVisible = false;
    },
    cleanParam() {
      // console.log(this.existName);
      this.option = this.InOption.deepCopy();
      this.option.value = '';
      this.enums.rules = this.option.rules;
      console.log(JSON.stringify(this.option));
      Option.loadType().then((resp) => {
        this.optionType = resp.data.data;
      }).catch(wantNothing);
    },
    handleDrawerClose(done) {
      if (JSON.stringify(this.InOption) === JSON.stringify(this.option)) {
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
    handleClose(tag) {
      this.enums.rules.splice(this.enums.rules.indexOf(tag), 1);
    },
    showInput() {
      this.enums.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      if (this.enums.rules.indexOf(this.enums.inputValue) > -1) {
        this.$notify({
          title: '重复的枚举值',
        });
        return;
      }
      if (this.enums.inputValue) {
        this.enums.rules.push(this.enums.inputValue);
      }
      this.enums.inputVisible = false;
      this.enums.inputValue = '';
    },
    isEnum() {
      return this.option.isType(Option.TYPE.ENUM);
    },
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
