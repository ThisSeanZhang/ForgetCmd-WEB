<template>
  <el-card class="box-card" shadow="hover">
      <div class="panel-head">
        <div @click="isOpen = !isOpen" class="head-title">
          {{cmd.commandName}}
        </div>
        <span class="head-arrow">
          <i @click="sortOut" class="el-icon-files" ></i>
          <i @click="isOpen = !isOpen"
            :class="isOpen ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
        </span>
      </div>
      <div>
        <el-collapse-transition >
          <div  v-if="isOpen" class="show-table">
            <CommitsTable v-on:reviewCmd="$emit('reviewCmd', $event)" :single="false" :cmd="cmd" />
          </div>
        </el-collapse-transition>
      </div>
  </el-card>
</template>
<script>
import { mapGetters } from 'vuex';
import CommitsTable from '@/components/commits/CommitsTable.vue';

export default {
  name: 'command-list-commit',
  components: { CommitsTable },
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    cmd: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
    ...mapGetters('Language', ['allLangs']),
  },
  methods: {
    getLangKey(langKey) {
      // const remain = this.allLangs.filter(l => l.key === langKey);
      // return remain.length > 0 ? remain[0].desc : langKey;
      return this.$t(`lang.${langKey}`);
    },
    sortOut() {
      this.$router.push({ path: `/commits/review/${btoa(this.cmd.ccids)}` });
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.box-card{
  margin: 5px;
}
.transition-box {
  .item {
    padding: 5px 0px;
  }
}

// 以下是确定需要的
.panel-head{
  display: flex;
}
.head-title{
  flex: 1;
}
.head-arrow{
  padding: 5px 0px;
}
</style>
