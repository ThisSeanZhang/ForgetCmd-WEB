<template>
<el-container>
  <el-header>
    <CMDHeader/>
  </el-header>
  <el-container>
    <el-aside>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose" :collapse="isCollapse"
      >
        <!-- <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">快照</span>
        </el-menu-item> -->
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span @click="toPath('commits')" slot="title">改进历史</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-document"></i>
          <span slot="title">命令历史</span>
        </el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">基本信息</span>
        </el-menu-item>
        <el-menu-item index="5">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
        <el-menu-item index="6">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main style="flex: 1;">
      <router-view style="flex: 1;" />
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'developer-info',
  components: { CMDHeader },
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    toPath(model) {
      this.$router.push({ path: `/developer/${this.$route.params.did}/${model}` });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-container{
  height: 100%;
  flex: 1;
}
.el-aside{
  display: flex;
  flex: 1;
  max-width: 200px;
  ul {
    width: 199px;
  }
}
.el-main{
  display: flex;
}
</style>
