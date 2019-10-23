<template>
  <div class="param-container">
    <el-button icon="el-icon-set-up" @click="paramDdrawerShow = true"></el-button>
    <div class="per-param">
      <div style="flex: 2;">参数名</div>
      <div style="flex: 1;">类型</div>
      <div style="flex: 4;">简述</div>
      <div style="width: 80px;">操作</div>
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
    <div class="per-option">
      <div class="option-brief">命令参数</div>
      <div class="option-mulit" >
        <el-button icon="el-icon-set-up" @click="paramDdrawerShow = true"></el-button>
      </div>
      <div class="option-value-bar is-multip" >
        <transition name="fade">
        <div v-if="isEmptyList(params)">请点击右侧按钮进行配置参数</div>
        </transition>
        <el-tag closable
        class="value-tag" v-for="tag in params"
        @close="params = params.filter( val => val.paramName !== tag.paramName)"
        :key="tag.paramName" effect="dark">{{tag.paramName}}</el-tag>
      </div>
    </div>
    <AddParam v-model="paramDdrawerShow"
      :InParams="params" v-on:updateParam="params = $event" />
  </div>
</template>
<script>
import ListUtils from '../../entities/ListUtils';
import AddParam from './AddParam.vue';

export default {
  name: 'edit-param-info',
  components: { AddParam },
  data() {
    return {
      params: [],
      paramDdrawerShow: false,
    };
  },
  methods: {
    isEmptyList(params) {
      return ListUtils.isEmptyList(params);
    },
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
}
</style>
