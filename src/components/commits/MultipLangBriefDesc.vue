<template>
  <div>
    <el-dialog
      center
      @open="cleanParam"
      :title="$t('other.lang.moreLang')"
      :visible.sync="dialogVisible"
      width="700px">
      <div class="each-param" v-for="(de, index) in desc" :key="index">
        <div class="param-switch">
          <el-select v-model="de.lang"
            :placeholder="$t('other.lang.choiceLang')"
          >
            <el-option
              v-for="lang in reaminLang"
              :key="lang"
              :label="lang"
              :value="lang">
            </el-option>
          </el-select>
        </div>
        <div class="param-value">
          <el-input
            class="option-value"
            :placeholder="$t('entities.command.b-desc-input')"
            v-model="de.value"
            @input="handleAdd()"
            clearable>
          </el-input>
        </div>
        <div class="param-del">
          <el-button type="danger" icon="el-icon-delete" circle
          @click="handleRemove(index)"></el-button>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('other.btn.cancel')}}</el-button>
        <el-button type="primary" @click="confirmParam">{{$t('other.btn.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import StringUtils from '../../entities/StringUtils';

export default {
  name: 'multip-lang-brief-desc',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    inDesc: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      desc: [],
      currentLang: 'zh',
      langs: ['zh', 'en', 'jp'],
    };
  },
  computed: {
    reaminLang() {
      const chosenLangs = this.desc.map(lang => lang.lang);
      return this.langs.filter(lang => !chosenLangs.includes(lang));
    },
    dialogVisible: {
      get() {
        return this.value;
      },
      set(vNew) {
        this.$emit('input', vNew);
      },
    },
    realParams() {
      return this.desc.filter(p => StringUtils.nonEmptyString(p.value));
    },
  },
  methods: {
    cleanParam() {
      if (!this.inDesc) {
        this.desc = [{
          lang: this.currentLang,
          value: '',
        }];
        return;
      }
      this.desc = Object.keys(this.inDesc).map(key => ({ lang: key, value: this.inDesc[key] }));
      this.handleAdd();
      console.log('desc', this.desc);
    },
    confirmParam() {
      this.dialogVisible = false;
      const result = {};
      this.desc.filter(lang => StringUtils.nonEmptyString(lang.value)
        && StringUtils.nonEmptyString(lang.lang))
        .forEach((lang) => { result[lang.lang] = lang.value; });
      console.log(JSON.stringify(result));
      this.$emit('updateBriefDesc', result);
    },
    handleAdd() {
      if (this.desc.length >= this.langs.length) return;
      this.desc.push({
        lang: '',
        value: '',
      });
    },
    handleRemove(index) {
      this.desc = this.desc.filter((_, i) => i !== index)
        .filter(lang => StringUtils.nonEmptyString(lang.value)
        && StringUtils.nonEmptyString(lang.lang));
      this.handleAdd();
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.param-switch{
  width: 130px;
  margin: 0px 10px;
}
.param-value{
  flex: 1;
}
.param-del{
  float: right;
  padding: 0px 10px;
}
.each-param{
  display: flex;
  padding-bottom: 5px;
}
</style>
