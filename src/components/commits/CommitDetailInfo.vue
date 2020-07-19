<template>
  <div style="width: 100%;">
    <el-card shadow="hover" style="height: 30%; margin: 0px 6px;">
      <div class="info-head">
        <el-tooltip class="" effect="dark" :content="$t('other.btn.toCmd')" placement="top">
          <i @click="toCmdPadding" style="cursor: pointer"
          v-show="commit.cid"
          class="el-icon-s-promotion"></i>
        </el-tooltip>
        <!-- 编辑 完善命令请求 按钮 -->
        <el-tooltip class="" effect="dark" :content="$t('other.btn.edit')" placement="top">
          <i @click="editDialogVisible = true" style="cursor: pointer"
            v-if="edit"
            class="el-icon-edit"></i>
        </el-tooltip>
      </div>
      <div>
        <div>version</div>
        <div>{{commit.version}}</div>
      </div>
      <div>
        <div>status</div>
        <div>{{commit.status}}</div>
      </div>
      <div>
        <div>createTime</div>
        <div>{{commit.createTime}}</div>
      </div>
      <div>
        <div>remark</div>
        <div>{{commit.remark}}</div>
      </div>
      <!-- {{commit}} -->
    </el-card>
    <!-- commit items -->
    <el-scrollbar style="height: 70%">
      <ItemExhibit v-for="(value, index) in items" :item="value" :key="index" />
    </el-scrollbar>
  </div>
</template>
<script>
import { wantNothing } from '../../api/fetch';
import CommandCommit from '../../entities/CommandCommit';
import CommitAPI from '../../api/CommitAPI';
import CommitItem from '../../entities/CommitItem';
import ItemExhibit from './ItemExhibit.vue';

export default {
  name: 'commit-detail-info',
  components: { ItemExhibit },
  props: {
    commit: CommandCommit,
    default: () => new CommandCommit({}),
  },
  data() {
    return {
      items: [],
      loading: {
        doing: true,
        success: false,
      },
    };
  },
  watch: {
    ccid() {
      this.getCommitItems();
    },
  },
  computed: {
    ccid() {
      return this.commit.ccid;
    },
    edit() {
      return true;
    },
  },
  methods: {
    getCommitItems() {
      CommitAPI.getCommitItemInfoById(this.ccid, this.loading)
        .then((resp) => {
          this.items = resp.data.data.map(CommitItem.fromObj);
        }).catch(wantNothing);
    },
    toCmdPadding() {
      const routeUrl = this.$router.resolve({
        path: `/cmd/padding/${this.commit.cid}`,
      });
      window.open(routeUrl.href, '_blank');
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.info-head {
  float: right;
  i {
    padding: 3px 3px
  }
}
</style>
