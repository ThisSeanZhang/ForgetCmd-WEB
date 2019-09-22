<template>
  <div>
    <el-table
      :data="addLogs"
      stripe
      style="width: 100%">
      <el-table-column
        prop="commandName"
        label="命令名称">
      </el-table-column>
      <el-table-column
        prop="briefDesc"
        label="简述">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="props">
          <el-button @click="showRawJson(props.$index)">原始JSON</el-button>
          <el-button @click="review(props.row.rid)">预览</el-button>
          <el-button @click="confirmLog">通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <ReviewJson v-if="currentLogIndex !== undefined" :InObj="currentLog" />
  </div>
</template>
<script>
import { ajax, wantNothing } from '../api/fetch';
import ReviewJson from '../components/common/ReviewJson.vue';

export default {
  components: { ReviewJson },
  name: 'wait-verify',
  data() {
    return {
      addLogs: [],
      currentLogIndex: undefined,
    };
  },
  computed: {
    currentLog() {
      console.log(this.currentLogIndex);
      console.log(this.addLogs[this.currentLogIndex]);
      const current = JSON.parse(JSON.stringify(this.addLogs[this.currentLogIndex]));
      current.options = JSON.parse(current.cmdOptions);
      current.params = JSON.parse(current.cmdParams);
      delete current.cmdOptions;
      delete current.cmdParams;
      return current;
    },
  },
  created() {
    const request = {
      url: '/verifies/search',
      method: 'GET',
    };
    ajax(request).then((resp) => {
      console.log(resp.data);
      this.addLogs = resp.data.data;
    }).catch(wantNothing);
  },
  methods: {
    showRawJson(index) {
      this.currentLogIndex = index;
    },
    confirmLog() {},
    review(cid) {
      this.$router.push(`cmds/${cid}`);
    },
  },
};
</script>
