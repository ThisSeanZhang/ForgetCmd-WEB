<template>
  <el-card class="box-card" shadow="hover">
    <el-tag
      :type="item.action === 0 ? 'success' : (item.action === 1 ? 'info' : 'danger')"
    >{{item.key}}</el-tag>
    <div v-if="item.action === 0" class="value">
      <span>{{item.value}}</span>
    </div>
    <div v-else-if="item.action === 1" class="value">
      <span>{{item.oValue}}</span>=><span>{{item.value}}</span>
    </div>
    <div v-else-if="item.action === 2" class="value">
      <span>{{item.oVlaue}}</span>
    </div>
  </el-card>
</template>
<script>
import CommitItem from '../../entities/CommitItem';

export default {
  name: 'item-exhibit',
  data() {
    return {
    };
  },
  props: {
    item: {
      type: CommitItem,
      default: () => new CommitItem({}),
    },
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
.box-card{
  margin: 5px;
}
.value{
  display: inline;
}
</style>
