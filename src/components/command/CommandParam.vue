<template>
  <div>
    <div v-for="param in params" :key="param.cpid">
      <div class="param-brief">{{param.description}}</div>
      <div class="param-input">
        <el-input
          class="param-value"
          placeholder="请输入内容"
          v-model="param.value"
          clearable>
        </el-input>
      </div>
    </div>
    <!-- <el-form ref="form" :model="form" label-width="80px">
      <el-form-item v-for="param in params" :key="param.cpid" :label="param.description">
        <el-input
          class="param-value"
          placeholder="请输入内容"
          v-model="param.value"
          clearable>
        </el-input>
      </el-form-item>
    </el-form> -->
  </div>
</template>
<script>
import { wantNothing } from '../../api/fetch';
import CmdParam from '../../entities/CmdParam';
import StringUtils from '../../entities/StringUtils';

export default {
  name: 'common-param',
  props: {
    cid: {
      type: Number,
    },
  },
  data() {
    return {
      params: [],
      value: false,
    };
  },
  watch: {
    selectedParam(newV, oldV) {
      console.log(newV, oldV);
      console.log(newV);
      this.$emit('update', newV);
    },
  },
  computed: {
    selectedParam: {
      get() {
        return this.params.filter(p => StringUtils.nonEmptyString(p.value));
      },
      set(val) {
        console.log(val);
      },
    },
  },
  methods: {
    getAllOption(cid) {
      CmdParam.findByCid(cid).then((resp) => {
        this.params = resp.data.data.map(param => new CmdParam(param));
        // this.loading = false;
        console.log(this.params);
        // this.params = resp.data.data;
      }).catch((error) => {
        // this.loading = false;
        wantNothing(error);
        // this.params = [];
      });
    },
  },
  created() {
    this.params = [];
    console.log(this.cid);
    this.getAllOption(this.cid);
  },
};
</script>
<style lang="scss" scoped>
.param-value, .param-desc{
  display: inline-block;
}
.param-brief{
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
.param-input{
  margin-left: 80px;
}
</style>
