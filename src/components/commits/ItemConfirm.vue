<template>
  <div class="item-wrapper">
    <el-collapse class="item-choose" value="activeName" accordion>
      <el-collapse-item v-for="(item, key) in chooseItemsMap" :key="key" :title="key" :name="key">
        <div>{{item}}</div>
      </el-collapse-item>
    </el-collapse>
    <!-- <div class="item-choose">
      <div @click="removeChoose(index)"
        v-for="(value, index) in Object.values(this.chooseItemMap)" :key="index">
        <el-tag
          :type="value.action === 0 ? 'success' : (value.action === 1 ? 'info' : 'danger')"
        >{{value.key}}</el-tag>
        <span>{{value.oVlaue}}</span>=><span>{{value.value}}</span>
      </div>
    </div> -->
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
import Vue from 'vue';
import CommitItem from '../../entities/CommitItem';
import Command from '../../entities/Command';

export default {
  name: 'item-confirm',
  data() {
    return {
      // 当前使用的key map
      currentUseKeyMap: {},
      chooseItems: [],
      chooseItemMap: {},
      processedItems: [],
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
      // return this.chooseItems.map(i => i.key);
      return Object.keys(this.chooseItemMap);
    },
    alternativeItems() {
      return this.processedItems.filter(item => !this.chooseItemsKeys.includes(item.key));
      // return this.items;
    },
    chooseItemsMap() {
      const result = {};
      Object.values(this.chooseItemMap)
        .forEach((item) => {
          const maiKey = item.key.split('.')[0];
          let tmp = result[maiKey];
          if (!tmp) {
            result[maiKey] = [];
            tmp = result[maiKey];
          }
          tmp.push(item);
        });
      return result;
    },
  },
  methods: {
    addToChoose(value) {
      // this.chooseItems.push(value);
      Vue.set(this.chooseItemMap, value.key, value);
      console.log(Object.values(this.chooseItemMap));
      this.$emit('effectItems', Object.values(this.chooseItemMap));
    },
    removeChoose(index) {
      this.chooseItems.splice(index, 1);
      this.$emit('effectItems', this.chooseItems);
    },
    getCreateDuplicateKey(items) {
      const keyCount = {};
      items.filter(item => item.action === CommitItem.ACTION.CREATE)
        .filter(item => !item.key.includes('.'))
        .forEach((item) => { keyCount[item.key] = (keyCount[item.key] || 0) + 1; });
      return Object.keys(keyCount).filter(key => keyCount[key] > 1);
    },
    expandCreateDuplicateItem(items, keys) {
      return items.filter(item => keys.includes(item.key))
        .map(item => item.expend())
        .reduce((i1, i2) => i1.concat(i2));
    },
  },
  created() {
    const keys = this.getCreateDuplicateKey(this.items);
    const expend = this.expandCreateDuplicateItem(this.items, keys);
    this.processedItems = this.items.filter(item => !keys.includes(item.key)).concat(expend);
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
