<template>
  <div class="header">
    <div class="left-bar">
      <div>logo</div>
      <div v-if="searchBar" class="header-search-bar" >
        <SelectSearchBar v-on:currentSelect="$emit('currentSelect', $event)"/>
      </div>
    </div>
    <div class="right-bar">
      <div class="lang-change">
        <el-dropdown @command="handleCommand" trigger="click">
          <span class="el-dropdown-link">
            {{$t('desc')}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(lang, index) in allLangs" :key="index" :command="lang.key"
              >{{lang.desc}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="user-info">
          <div v-if="signed">
            <el-button @click="logOut" type="info" >
              {{$t('other.btn.sign-out')}}<i class="el-icon-d-arrow-right"></i>
            </el-button>
          </div>
          <div v-else>
            <el-button @click.stop="SignInVisible = true" type="warning">
              {{$t('other.btn.sign-in')}}<i class="el-icon-back"></i>
            </el-button>
          </div>
        <el-dialog :show-close='false' width='395px' custom-class="loginPanel"
        :visible.sync="SignInVisible">
          <div class="loginPanel-body"></div>
          <account-main v-if="SignInVisible" v-on:login:success='SignInVisible = false' >
          </account-main>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';
import { ajax } from '../../api/fetch';
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';
import AccountMain from '../developer/AccountMain.vue';

export default {
  name: 'cmd-header',
  components: { SelectSearchBar, AccountMain },
  props: {
    searchBar: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      currentLang: null,
      SignInVisible: false,
    };
  },
  methods: {
    handleCommand(value) {
      this.$i18n.locale = value;
      this.upadteLang(value);
    },
    logOut() {
      const request = {
        method: 'DELETE',
        url: `/sessions/${this.did}`,
      };
      ajax(request)
        .then(() => {
          this.$message('退出成功');
          this.delUserInfo();
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
          this.$message('退出失败');
        });
    },
    ...mapMutations('Language', ['upadteLang']),
    ...mapActions('UserInfo', ['delUserInfo']),
  },
  computed: {
    ...mapGetters('Language', ['allLangs', 'lang', 'langDesc']),
    ...mapGetters('UserInfo', ['signed', 'nickName', 'did']),
  },
  created() {
    this.currentLang = this.lang;
  },
};
</script>
<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.left-bar{
  display: flex;
  align-items: center;
  width: 50%;
}
.right-bar{
  display: flex;
  align-items: center;
  .lang-change{
    margin: 0px 10px;
  }
  .user-info {
    margin: 0px 10px;
  }
}
.header-search-bar{
  flex: 1;
  padding-left: 10px;
}

.loginPanel{
    border-radius: 5px!important;
    .loginPanel-body{
      height: 305px;
    }
  }
</style>
