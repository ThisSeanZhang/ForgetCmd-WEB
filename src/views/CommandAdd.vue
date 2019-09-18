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
import AddCmd from '../components/add-command/AddCmd.vue';

export default {
  name: 'command-add',
  components: { AddCmd },
};
</script>
