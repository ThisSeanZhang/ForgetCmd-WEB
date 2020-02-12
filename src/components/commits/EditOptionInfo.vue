<template>
  <div class="param-container">
    <el-button icon="el-icon-plus" @click="editParam(undefined)"></el-button>
    <div class="params-c">
      <div v-for="(option, index) in options" :key="index" class="per-param">
        <div style="flex: 2;">
          <div>{{option.briefName}}</div>
        </div>
        <div style="flex: 1;">
          <div>{{convertType(option.type)}}</div>
        </div>
        <div style="flex: 4;">
          <div>{{option.description}}</div>
        </div>
        <div class="per-operation" style="width: 80px;">
          <i @click="editParam(index)"
            class="el-icon-edit"></i>
          <i class="el-icon-delete-solid" @click="delDelete(index)"></i>
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
    <edit-option-panel v-model="optionDdrawerShow"
      :InOption="currentParam" v-on:updateOption="updateOption($event)" />
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import EditOptionPanel from './EditOptionPanel.vue';
import Option from '../../entities/Option';
import { wantNothing } from '../../api/fetch';

export default {
  name: 'edit-option-info',
  components: { EditOptionPanel },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: null,
      optionDdrawerShow: false,
      editIndex: undefined,
      paramTypeEnum: [],
    };
  },
  computed: {
    currentParam() {
      return this.options.length > 0 && this.editIndex !== undefined
        ? this.options[this.editIndex]
        : new Option({});
    },
  },
  methods: {
    convertType(key) {
      // console.log(this.paramTypeEnum.filter(p => p.key === key));
      const typeList = this.paramTypeEnum.filter(p => p.key === key);
      return typeList.length > 0 ? typeList[0].value : 'UNDEFINED';
    },
    isEmptyList(options) {
      return ListUtils.isEmptyList(options);
    },
    editParam(index) {
      this.editIndex = index;
      console.log(this.currentParam);
      this.optionDdrawerShow = true;
    },
    updateOption(option) {
      if (this.editIndex !== undefined) {
        this.options.splice(this.editIndex, 1, option);
      } else {
        this.options.push(option);
      }
    },
    delDelete(index) {
      this.options.splice(index, 1);
    },
  },
  created() {
    this.options = this.value;
    // this.options.push(new Option({ paramName: 'aaaa', type: 1 }));
    // this.options.push(new Option({ paramName: 'bbb' }));
    console.log(this.options);
    Option.loadType().then((resp) => {
      this.paramTypeEnum = resp.data.data;
    }).catch(wantNothing);
  },
};
</script>
<style lang="scss" scoped>
.params-c::-webkit-scrollbar {display:none}
.params-c{
  height: 100%;
  padding: 0px 12px;
  overflow: auto;
}
.param-container{
  display: flex;
  flex-direction: column;
  height: 100%;
  // background: rgb(210,210,210);
  // border-radius: 20px;
  // box-shadow: 0px 5px 6px rgb(160,160,160);
  // filter: (2px);
  // -webkit-filter: blur(15px);
  button{
    margin: 0px 12px;
  }
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
    overflow: hidden;
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
