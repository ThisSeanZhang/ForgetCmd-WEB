<template>
<div v-loading="loading.doing" >
  <!-- <div>
    搜索
  </div> -->
  <CommandTable v-if="loading.success" :cmds="cmds" />
  <LoadPanel v-bind:loading="loading"
        v-else class="cmd-perview" v-bind:callBack="fetchCommandsInfo" />

</div>
</template>
<script>
import { ajax, wantNothing } from '@/api/fetch';
// import Commit from '@/entities/CommandCommit';
import CommandTable from '../../components/command/CommandsTable.vue';
import LoadPanel from '../../components/common/LoadPanel.vue';
import Command from '../../entities/Command';
// import CommitPanel from '@/components/commits/CommitPanel.vue';
// import CommandPanel from '@/components/command/CommandPanel.vue';

export default {
  name: 'admin-commit-history',
  components: { CommandTable, LoadPanel },
  data() {
    return {
      cmds: [],
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
  },
  methods: {
    fetchCommandsInfo() {
      const request = {
        url: '/manager/cmds',
        method: 'GET',
      };
      ajax(request, this.loading).then((resp) => {
        this.cmds = resp.data.data.map(cmd => new Command(cmd));
      }).catch(wantNothing);
    },
  },
  created() {
    this.fetchCommandsInfo();
    this.$emit('flash', this.fetchCommandsInfo);
  },
};
</script>
<style lang="scss" scoped>
</style>
