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
      <!-- <div class="user-info">用户信息/登录</div> -->
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';
import SelectSearchBar from '@/components/search/SelectSearchBar.vue';

export default {
  name: 'cmd-header',
  components: { SelectSearchBar },
  props: {
    searchBar: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      currentLang: null,
    };
  },
  methods: {
    handleCommand(value) {
      this.$i18n.locale = value;
      this.upadteLang(value);
    },
    ...mapMutations('Language', ['upadteLang']),
  },
  computed: {
    ...mapGetters('Language', ['allLangs', 'lang', 'langDesc']),
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
</style>
