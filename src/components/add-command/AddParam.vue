<template>
  <div>
    <el-drawer
      center
      title="添加参数"
      @open="cleanParam"
      :before-close="handleClose"
      :visible.sync="drawerVisible"
      ref="drawer"
      direction="rtl"
      custom-class="params-drawer"
      size="50%">
      <div class="params-drawer-content">
        <div>
          <div class="param-switch">必填</div>
          <div class="head-value">参数名</div>
        </div>
        <!-- <div > -->
          <el-scrollbar class="params">
          <div class="each-param" v-for="(param, index) in params" :key="index">
            <div class="param-switch">
              <el-switch
                v-model="param.selected">
              </el-switch>
            </div>
            <div class="param-del">
              <el-button type="danger" icon="el-icon-delete" circle
              @click="handleRemove(index)"></el-button>
            </div>
            <div class="param-value">
              <el-input v-model="param.value" placeholder="请输入内容" @input="handleAdd()"></el-input>
            </div>
          </div>
          </el-scrollbar>
        <!-- </div> -->
        <div class="params-drawer-footer">
          <el-button @click="drawerVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmParam">确 定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import StringUtils from '../../entities/StringUtils';

export default {
  name: 'add-param',
  props: {
    value: {
      type: Boolean,
    },
    InParams: {
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
    realParams() {
      return this.params.filter(p => StringUtils.nonEmptyString(p.value));
    },
  },
  methods: {
    cleanParam() {
      if (ListUtils.isEmptyList(this.InParams)) {
        this.params = [{
          selected: true,
          value: '',
        }];
        return;
      }
      this.params = JSON.parse(JSON.stringify(this.InParams));
      this.handleAdd();
      console.log('params', this.params);
    },
    confirmParam() {
      this.drawerVisible = false;
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
      if (this.params.length - this.realParams.length >= 1) {
        return;
      }
      this.params.push({
        selected: true,
        value: '',
      });
    },
    handleRemove(index) {
      this.params = this.params.filter((_, i) => i !== index);
      this.handleAdd();
    },
    handleClose(done) {
      this.$confirm('要保存已经修改的吗？')
        .then(() => {
          this.confirmParam();
          done();
        })
        .catch(() => {
          this.drawerVisible = false;
        });
    },
  },
  data() {
    return {
      params: [],
    };
  },
  created() {
    console.log(this.value);
    this.params.push({
      selected: true,
      value: '',
    });
  },
};
</script>
<style lang="scss" scoped>
.param-value{
  margin-left: 60px;
  margin-right: 60px;
}
.param-del{
  float: right;
  padding: 0px 10px;
}

.params-drawer-content{
  padding: 0px 20px 20px 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.each-param{
  padding-bottom: 5px;
}
.head-value{
  line-height: 40px;
  margin-left: 60px;
  margin-right: 60px;
  text-align: center;
}
.param-switch{
  float: left;
  line-height: 40px;
  padding: 0px 10px;
}
.params-drawer-footer{
  display: flex;
  .el-button{
    flex: 1;
  }
}
.params{
  flex: 1;
  // overflow: hidden;
  .el-scrollbar__wrap{
    overflow-x: auto;
  }
}
.el-dialog__wrapper{
  overflow: hidden;
}
</style>
<style lang="scss">
.params-drawer{
  .el-drawer__body{
    overflow: hidden;
  }
}
.params{
  flex: 1;
  // overflow: hidden;
  .el-scrollbar__wrap{
    overflow-x: auto;
  }
}
</style>
