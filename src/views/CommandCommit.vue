<template>
  <el-container>
    <el-header>
      添加命令
    </el-header>
    <el-main>
      <add-cmd />
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</template>
<script>
import AddCmd from '../components/add-command/AddCmd-1.vue';

export default {
  name: 'command-commit',
  components: { AddCmd },
};
</script>
<style lang="scss" scoped>
.el-main, .el-container {
  height: 100%;
}
.el-main {
  width: 700px;
  margin: auto;
  overflow: visible;
}
</style>
