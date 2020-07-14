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
        <el-menu-item index="0" @click="toPath('commits')">
          <i class="el-icon-menu"></i>
          <span slot="title">改进历史</span>
        </el-menu-item>
        <el-menu-item index="1" @click="toPath('snapshots')">
          <i class="el-icon-setting"></i>
          <span slot="title">快照管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="5" @click="toPath('setting')">
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
// import { mapGetters } from 'vuex';
import CMDHeader from '@/components/header/Header.vue';

export default {
  name: 'developer-manage',
  components: { CMDHeader },
  data() {
    return {
      isCollapse: false,
      flash: () => {},
    };
  },
  computed: {
    routeKey() {
      return `developer-manage${new Date().getTime()}`;
    },
    defaultActive() {
      const path = this.$route.path.split('/');
      const index = ['commits', 'snapshots'].indexOf(path[path.length - 1]);
      return index > -1 ? String(index) : '0';
    },
    visiDid() {
      return this.$route.params.did;
    },
    // ...mapGetters('UserInfo', ['did']),
  },
  methods: {
    handleOpen() {},
    handleClose() {},
    toPath(model) {
      this.$router.push({ path: `/developer/${this.visiDid}/${model}` }, () => {}, this.flash);
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
