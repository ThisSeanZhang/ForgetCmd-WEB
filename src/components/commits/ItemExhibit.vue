<template>
  <div>
  </div>
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
</style>
