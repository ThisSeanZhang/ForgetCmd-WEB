<template>
<el-container>
  <el-header>
    <CMDHeader/>
  </el-header>
  <el-container>
    <el-aside>
      <el-menu :default-active="defaultActive" class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose" :collapse="isCollapse"
      >
        <!-- <el-menu-item index="1">
          <i class="el-icon-location"></i>
          <span slot="title">快照</span>
        </el-menu-item> -->
        <el-menu-item index="0" @click="toPath('commits')">
          <i class="el-icon-menu"></i>
          <span slot="title">改进历史</span>
        </el-menu-item>
        <el-menu-item index="1" @click="toPath('commands')">
          <i class="el-icon-document"></i>
          <span slot="title">命令管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="4" @click="toPath('snapshout')">
          <i class="el-icon-setting"></i>
          <span slot="title">快照管理</span>
        </el-menu-item>
        <el-menu-item index="5" @click="toPath('setting')">
          <i class="el-icon-setting"></i>
          <span slot="title">用户</span>
        </el-menu-item>
        <el-menu-item index="6" @click="toPath('')">
          <i class="el-icon-setting"></i>
          <span slot="title">设置</span>
        </el-menu-item> -->
      </el-menu>
    </el-aside>
    <el-main style="flex: 1;">
      <router-view v-on:flash="flash = $event" :key="routeKey" style="flex: 1;" />
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'admin-manage',
  components: { CMDHeader },
  data() {
    return {
      isCollapse: false,
      flash: () => {},
    };
  },
  computed: {
    routeKey() {
      return `admin-manage${new Date().getTime()}`;
    },
    defaultActive() {
      const path = this.$route.path.split('/');
      const index = ['commits', 'commands'].indexOf(path[path.length - 1]);
      return index > -1 ? String(index) : '0';
    },
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    toPath(model) {
      this.$router.push({ path: `/admin/${model}` }, () => {}, this.flash);
    },
  },
  created() {
    console.log(this.$route);
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
  height: 100%;
}
</style>
