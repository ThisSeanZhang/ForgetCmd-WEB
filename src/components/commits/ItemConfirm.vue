<template>
  <div class="item-wrapper">
    <div class="item-choose">
      <div @click="removeChoose(index)"
        v-for="(value, index) in chooseItems" :key="index">
        <el-tag
          :type="value.action === 0 ? 'success' : (value.action === 1 ? 'info' : 'danger')"
        >{{value.key}}</el-tag>
        <span>{{value.oVlaue}}</span>=><span>{{value.value}}</span>
      </div>
    </div>
    <div class="item-alternative">
      <div @click="addToChoose(value)"
        v-for="(value, index) in alternativeItems" :key="index">
        <el-tag
          :type="value.action === 0 ? 'success' : (value.action === 1 ? 'info' : 'danger')"
        >{{value.key}}</el-tag>
        <span>{{value.oVlaue}}</span>=><span>{{value.value}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import CommitItem from '../../entities/CommitItem';
import Command from '../../entities/Command';

export default {
  name: 'create-commit',
  data() {
    return {
      // 当前使用的key map
      currentUseKeyMap: {},
      chooseItems: [],
    };
  },
  props: {
    items: {
      type: Array,
      default: () => CommitItem.getItemsByCommitId(),
    },
    cmd: {
      type: Command,
      default: () => new Command({}),
    },
  },
  computed: {
    chooseItemsKeys() {
      return this.chooseItems.map(i => i.key);
    },
    alternativeItems() {
      return this.items.filter(item => !this.chooseItemsKeys.includes(item.key));
      // return this.items;
    },
  },
  methods: {
    takeEffect() {

    },
    invalid() {

    },
    addToChoose(value) {
      this.chooseItems.push(value);
      this.$emit('effectItems', this.chooseItems);
    },
    removeChoose(index) {
      this.chooseItems.splice(index, 1);
      this.$emit('effectItems', this.chooseItems);
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper{
  width: 60%;
  display: flex;
  // flex-direction: column;
  .item-alternative{
    width: 50%;
  }
  .item-choose{
    width: 50%;
  }
}
</style>
