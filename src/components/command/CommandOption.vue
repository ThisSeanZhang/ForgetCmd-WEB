<template>
  <div>
    <div v-for="option in options" :key="option.oid">
      <div class="option-brief">{{option.briefName + '\n(' + option.fullName + ')'}}</div>
      <div class="option-switch">
        <el-switch
          v-model="option.selected"
          active-color="#13ce66">
        </el-switch>
      </div>
      <div class="option-input">
        <el-input
          class="option-value"
          placeholder="请输入内容"
          v-model="option.value"
          clearable>
        </el-input>
      </div>
    </div>
  </div>
</template>
<script>
import { ajax, wantNothing } from '../../api/fetch';
import Option from '../../entities/Option';

export default {
  name: 'common-option',
  props: {
    cid: Number,
  },
  data() {
    return {
      options: [],
      value: false,
    };
  },
  watch: {
    selectedOption(newV, oldV) {
      console.log(newV, oldV);
    },
  },
  computed: {
    selectedOption: {
      get() {
        return this.options.filter(op => op.selected);
      },
      set(val) {
        console.log(val);
      },
    },
  },
  methods: {
    getAllOption(cid) {
      const request = {
        method: 'GET',
        url: `cmds/${cid}/options`,
      };
      ajax(request).then((resp) => {
        this.options = resp.data.data.map(param => new Option(param));
        // this.loading = false;
        console.log(resp.data);
        // this.options = resp.data.data;
      }).catch((error) => {
        // this.loading = false;
        wantNothing(error);
        // this.options = [];
      });
    },
  },
  created() {
    this.options = [];
    this.params = [];
    console.log(this.cid);
    this.getAllOption(this.cid);
  },
};
</script>
<style lang="scss" scoped>
.option-value, .option-desc{
  display: inline-block;
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
.option-input{
  margin-left: 150px;
}
.option-switch{
  // margin-left: 80px;
  float: left;
  line-height: 40px;
  padding: 0px 10px;
}
</style>
