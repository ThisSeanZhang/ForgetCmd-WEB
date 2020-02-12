<template>
  <el-autocomplete
  style="width: 100%"
  popper-class='my-autocomplete'
  v-model='state'
  :fetch-suggestions='querySearch'
  placeholder='请输入内容'
  clearable
  @select='handleSelect'>
  <!-- <i
    class='el-icon-edit el-input__icon'
    slot='suffix'
    @click='handleIconClick'>
  </i> -->
  <template slot-scope='{ item }'>
    <div class='name'>{{ item.briefName }}{{ item.description }}</div>
    <span class='addr'>{{ item.address }}</span>
  </template>
</el-autocomplete>
</template>

<script>
import Option from '../../entities/CommandOption';

export default {
  name: 'option-search-bar',
  props: {
    optionDef: {
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
  methods: {
    querySearch(queryString, cb) {
      const results = queryString
        ? this.options.filter(option => option.searchKey(queryString))
        : this.options;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      this.$emit('addOption', new Option(item));
      console.log(JSON.stringify(item));
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
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }
    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>
