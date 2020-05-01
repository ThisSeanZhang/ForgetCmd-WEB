<template>
  <div class="command-table">
    <el-scrollbar class="command-table-scrollbar">
      <CommandTableItem v-for="(cmd, index) in cmds"  :cmd="cmd" :key="index" />
      <!-- <el-table
        :data="showList"
        stripe
        style="width: 100%">
        <el-table-column
            prop="commandName"
            :label="$t('entities.commit.commandName')">
        </el-table-column>
        <el-table-column
            prop="briefDesc"
            :label="$t('entities.commit.briefDesc')">
        </el-table-column>
        <el-table-column
            prop="status"
            :label="$t('entities.commit.status')">
        </el-table-column>
        <el-table-column
            :label="$t('other.btn.operate')">
            <template slot-scope="{ row , $index}">
            <el-button @click="review($index)">{{$t('other.btn.perview')}}</el-button>
            </template>
        </el-table-column>
      </el-table> -->
    </el-scrollbar>
  </div>
</template>
<script>
// import { ajax, wantNothing } from '@/api/fetch';
import CommandTableItem from './CommandTableItem.vue';

export default {
  name: 'commands-table',
  components: { CommandTableItem },
  props: {
    cmds: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {
  },
  methods: {
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
</style>
