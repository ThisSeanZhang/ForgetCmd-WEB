<template>
  <div>
    <el-dialog
      center
      @open="cleanParam"
      title="编辑参数"
      :visible.sync="dialogVisible"
      width="700px">
      <div class="each-param" v-for="(param, index) in params" :key="index">
        <div class="param-switch">
          <el-switch
            v-model="param.selected"
            active-color="#13ce66">
          </el-switch>
        </div>
        <div class="param-del">
          <el-button type="danger" icon="el-icon-delete" circle
          @click="handleRemove(index)"></el-button>
        </div>
        <div class="param-value">
          <OptionParam :option="option" v-model="param.value" @input="handleAdd()" />
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmParam">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import OptionParam from './OptionParam.vue';
import Option from '../../entities/Option';
import StringUtils from '../../entities/StringUtils';
import ListUtils from '../../entities/ListUtils';

export default {
  name: 'multip-param',
  components: { OptionParam },
  props: {
    value: Boolean,
    option: Option,
  },
  data() {
    return {
      params: [],
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.value;
      },
      set(vNew) {
        this.$emit('input', vNew);
      },
    },
    realParams() {
      return this.params.filter(p => StringUtils.nonEmptyString(p.value));
    },
  },
  methods: {
    cleanParam() {
      if (ListUtils.isEmptyList(this.option.value)) {
        this.params = [{
          selected: true,
          value: '',
        }];
        return;
      }
      this.params = JSON.parse(JSON.stringify(this.option.value));
      this.handleAdd(this.option);
      // this.params.push({
      //   selected: true,
      //   value: '',
      // });
      console.log('params', this.params);
    },
    confirmParam() {
      this.dialogVisible = false;
      const result = {};
      this.realParams.forEach((p) => { result[p.value] = p; });
      const values = Object.values(result);
      if (values.length !== this.realParams.length) {
        this.$notify.info({
          title: '重复',
          message: '有重复的参数，已经去除',
        });
      }
      this.$emit('updateParam', values);
    },
    handleAdd() {
      if (this.option.isType(Option.TYPE.ENUM) && this.option.rules.length <= this.params.length) {
        return;
      }
      if (this.params.length - this.realParams.length >= 1) {
        return;
      }
      this.params.push({
        selected: true,
        value: '',
      });
    },
    handleRemove(index) {
      // if (!this.option.isType(Option.TYPE.ENUM) && this.params.length - 1 === index) return;
      // console.log(`params:${JSON.stringify(this.params)}`, `index: ${index}`);
      this.params = this.params.filter((_, i) => i !== index);
      this.handleAdd();
      // console.log(`after params:${JSON.stringify(this.params)}`, `index: ${index}`);
      // if (this.option.isType(Option.TYPE.ENUM)
      // && this.option.rules.length - 1 === this.realParams.length) {
      //   this.params.push({
      //     selected: true,
      //     value: '',
      //   });
      // }
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.param-switch{
  float: left;
  line-height: 40px;
  padding: 0px 10px;
}
.param-value{
  margin-left: 60px;
  margin-right: 60px;
}
.param-del{
  float: right;
  padding: 0px 10px;
}
.each-param{
  padding-bottom: 5px;
}
</style>
