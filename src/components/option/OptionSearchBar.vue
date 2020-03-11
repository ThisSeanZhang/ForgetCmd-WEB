<template>
  <el-autocomplete
  style="width: 100%"
  popper-class='my-autocomplete'
  v-model='state'
  :fetch-suggestions='querySearch'
  :placeholder="$t('page.commandPanel.optionPanel.searchBar')"
  clearable
  @select='handleSelect'>
  <!-- <i
    class='el-icon-edit el-input__icon'
    slot='suffix'
    @click='handleIconClick'>
  </i> -->
  <template slot-scope='{ item }'>
    <div class='name'>
      <div>
        {{ optionKey(item) }}
      </div>
      <div>
        {{ description(item.description) }}
      </div>
    </div>
  </template>
</el-autocomplete>
</template>

<script>
import Option from '../../entities/CommandOption';
import StringUtils from '../../entities/StringUtils';

export default {
  name: 'option-search-bar',
  props: {
    optionDef: {
      type: Array,
      default: () => [],
    },
    limitOption: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: [],
      state: '',
    };
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    querySearch(queryString, cb) {
      const results = queryString
        ? this.optionDef.filter(option => option.searchKey(queryString))
        : this.optionDef;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.state = '';
      // if (this.limitOption.includes(item.fullName)) {
      //   this.$message({
      //     showClose: true,
      //     message: '该选项不能重复添加',
      //     type: 'warning',
      //   });
      //   return;
      // }
      this.$emit('addOption', new Option(item));
      console.log(this.state);
      console.log(JSON.stringify(item));
    },
    description(description) {
      return description && description[this.currentLang] ? description[this.currentLang] : '';
    },
    optionKey(item) {
      return [item.briefName, item.fullName].filter(StringUtils.nonEmptyString).join('/');
    },
  },
  created() {
    this.options = this.optionDef;
  },
};
</script>

<style  lang="scss" scoped>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
