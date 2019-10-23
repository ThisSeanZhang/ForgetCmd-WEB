<template>
  <div class="param-container">
    <el-button icon="el-icon-set-up" @click="editParam(undefined)"></el-button>
    <div>
      <div v-for="(param, index) in params" :key="index" class="per-param">
        <div style="flex: 2;">
          <div>{{param.paramName}}</div>
        </div>
        <div style="flex: 1;">
          <div>{{param.type}}</div>
        </div>
        <div style="flex: 4;">
          <div>{{param.description}}</div>
        </div>
        <div class="per-operation" style="width: 80px;">
          <i @click="editParam(index)"
            class="el-icon-edit"></i>
          <i class="el-icon-delete-solid"></i>
        </div>
      </div>
      <div class="per-param">
        <div style="flex: 2;">
          <div>参数名</div>
        </div>
        <div style="flex: 1;">
          <div>类型</div>
        </div>
        <div style="flex: 4;">
          <div>简述</div>
        </div>
        <div class="per-operation" style="width: 80px;">
          <i class="el-icon-edit"></i>
          <i class="el-icon-delete-solid"></i>
        </div>
      </div>
      <div class="per-param">
        <div style="flex: 2;">文件夹名称</div>
        <div style="flex: 1;">STRING</div>
        <div style="flex: 4;">指定文件夹</div>
        <div class="per-operation" style="width: 80px;">
          <i class="el-icon-edit"></i>
          <i class="el-icon-delete-solid"></i>
        </div>
      </div>
    </div>
    <!-- 底部空白填充 -->
    <div style="flex: 1;"></div>
    <div class="per-delete-param" style="display: none">
      <div style="flex: 2;">文件夹名称</div>
      <div style="flex: 1;">STRING</div>
      <div style="flex: 4;">指定文件夹</div>
      <div class="per-operation" style="width: 80px;">
        <el-popover
          placement="top"
          width="160">
          <p>这是一段内容这是一段内容确定删除吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
          <i slot="reference" class="el-icon-refresh-right"></i>
        </el-popover>
      </div>
    </div>
    <edit-param-panel v-model="paramDdrawerShow"
      :InParam="currentParam" v-on:updateParam="updateParam($event)" />
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import EditParamPanel from './EditParamPanel.vue';
import CmdParam from '../../entities/CmdParam';

export default {
  name: 'edit-param-info',
  components: { EditParamPanel },
  data() {
    return {
      params: [],
      paramDdrawerShow: false,
      editIndex: undefined,
    };
  },
  computed: {
    currentParam() {
      return this.params.length > 0 && this.editIndex !== undefined
        ? this.params[this.editIndex]
        : new CmdParam({});
    },
  },
  methods: {
    isEmptyList(params) {
      return ListUtils.isEmptyList(params);
    },
    editParam(index) {
      this.editIndex = index;
      console.log(this.currentParam);
      this.paramDdrawerShow = true;
    },
    updateParam(param) {
      if (this.editIndex !== undefined) {
        this.params.splice(this.editIndex, 1, param);
      } else {
        this.params.push(param);
      }
    },
  },
  created() {
    this.params.push(new CmdParam({ paramName: 'aaaa' }));
    this.params.push(new CmdParam({ paramName: 'bbb' }));
    console.log(this.params);
  },
};
</script>
<style lang="scss" scoped>
.param-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  // background: rgb(210,210,210);
  // border-radius: 20px;
  // box-shadow: 0px 5px 6px rgb(160,160,160);
  // filter: (2px);
  // -webkit-filter: blur(15px);
}
.per-param, .per-delete-param{
  display: flex;
  // flex: 1;
  height: 40px;
  margin: 10px 0px;
  // border: 1px solid #DCDFE6;
  border-radius: 4px;
  transition: all .5s;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    div{
      vertical-align: middle;
      text-align: center;
      font-size: 14px;
      color: #606266;
    }
  }
}
.per-param:hover {
  -moz-box-shadow:4px 4px 10px #575757;
  -webkit-box-shadow:4px 4px 10px #575757;
  box-shadow:4px 4px 10px #575757;
}
.per-operation{
  color: rgb(96, 98, 102);
  font-size: 20px;
  display: flex;
  i {
    flex: 1;
    text-align: center;
    cursor: pointer;
  }
  i:hover {
    color: #5cb6ff;
  }
}
</style>
