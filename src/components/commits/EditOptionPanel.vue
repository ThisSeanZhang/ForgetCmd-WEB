<template>
  <el-drawer
    center
    @open="cleanParam"
    :before-close="handleDrawerClose"
    :visible.sync="drawerVisible"
    ref="drawer"
    direction="rtl"
    custom-class="params-drawer"
    size="50%">
    <div slot="title">{{$t('page.commitPanel.editOption.edit-title')}}</div>
    <div class="params-drawer-content">
      <el-form :model="option" label-width="80px">
        <el-form-item :label="$t('entities.option.briefName')">
          <el-input v-model="option.briefName"
            :placeholder="$t('entities.option.b-name-input')">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('entities.option.full-name')">
          <el-input v-model="option.fullName"
            :placeholder="$t('entities.option.full-name-input')">
          </el-input>
        </el-form-item>
        <el-form-item :label="$t('entities.option.description')">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 6}"
            :placeholder="$t('entities.option.desc-input')"
            v-model="option.description[currentLang]">
          </el-input>
          <el-tooltip  :content="$t('other.lang.moreLang')" placement="top">
            <el-button @click="multipLangDescDialog = true" icon="el-icon-more"></el-button>
          </el-tooltip>
        </el-form-item>
        <!-- <el-form-item label="启用时间">
          <el-date-picker type="date"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
            placeholder="选择日期"
            v-model="option.whenEnable"
            style="width: 100%;"></el-date-picker>
        </el-form-item> -->
        <el-form-item :label="$t('entities.option.repeat')">
          <el-switch v-model="option.repeat"></el-switch>
        </el-form-item>
        <el-form-item :label="$t('entities.option.type')">
          <el-select v-model="option.type" :placeholder="$t('entities.option.choice-type')">
            <el-option
              v-for="item in optionType"
              :key="item.value"
              :label="item.value"
              :value="item.key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="isEnum()" :label="$t('entities.option.enum')">
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
          size="small" @click="showInput">{{$t('entities.option.enum-add')}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="drawerVisible = false">{{$t('other.btn.cancel')}}</el-button>
          <el-button type="primary" @click="confirmParam">{{$t('other.btn.ok')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <MultipLangDesc v-model="multipLangDescDialog"
      :appendToBody='true'
      v-on:updateDesc='option.description = $event'
      :inDesc="option.description"
    />
  </el-drawer>
</template>
<script>
// import ListUtils from '../../entities/ListUtils';
import Option from '../../entities/CommandOption';
import MultipLangDesc from './MultipLangDesc.vue';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-option',
  components: { MultipLangDesc },
  props: {
    value: {
      type: Boolean,
    },
    InOption: {
      type: Option,
      default: () => new Option({}),
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
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  data() {
    return {
      option: new Option({}),
      optionType: [{ key: 0, value: 'NONE' }, { key: 2, value: 'ENUM' }],
      enums: {
        rules: [],
        inputValue: '',
        inputVisible: false,
      },
      multipLangDescDialog: false,
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
      // Option.loadType().then((resp) => {
      //   this.optionType = resp.data.data;
      // }).catch(wantNothing);
    },
    handleDrawerClose(done) {
      if (JSON.stringify(this.InOption) === JSON.stringify(this.option)) {
        done();
        return;
      }
      this.$confirm(this.$t('other.leave.want-save'))
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
          title: this.$t('page.commitPanel.editOption.repeat-enum'),
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
