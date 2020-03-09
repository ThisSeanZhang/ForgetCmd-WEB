<template>
  <div class="item-wrapper">
    <el-scrollbar style="height: 100%; flex: 1;">
      <el-collapse class="item-choose" value="activeName" >
        <el-collapse-item v-for="(items, key) in chooseItemsMap" :key="key"
          :title="key" :name="key">
          <!-- <div>{{item}}</div> -->
          <div v-for="(value, index) in items" :key="index" class="per-item">
            <ItemExhibit style="flex: 1;"  :item="value"  />
            <el-tooltip class="item" effect="dark" content="移除" placement="top">
              <i @click="removeChoose(value.keyPath)" class='el-icon-caret-right'></i>
            </el-tooltip>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
    <!-- <div class="item-choose">
      <div @click="removeChoose(index)"
        v-for="(value, index) in Object.values(this.chooseItemMap)" :key="index">
        <el-tag
          :type="value.action === 0 ? 'success' : (value.action === 1 ? 'info' : 'danger')"
        >{{value.key}}</el-tag>
        <span>{{value.oVlaue}}</span>=><span>{{value.value}}</span>
      </div>
    </div> -->
    <el-scrollbar style="height: 100%; flex: 1;">
      <div class="item-alternative">
        <div v-for="(value, index) in alternativeItems" :key="index" class="per-item">
          <el-tooltip class="item" effect="dark" content="Top Left 提示文字" placement="top">
            <i @click="addToChoose(value)" class='el-icon-caret-left'></i>
          </el-tooltip>
          <ItemExhibit style="flex: 1;" :item="value"  />
        </div>
        <!-- <div @click="addToChoose(value)"
          v-for="(value, index) in alternativeItems" :key="index">
          <el-tag
            :type="value.action === 0 ? 'success' : (value.action === 1 ? 'info' : 'danger')"
          >{{value.key}}</el-tag>
          <span>{{value.oVlaue}}</span>=><span>{{value.value}}</span>
        </div> -->
      </div>
    </el-scrollbar>
  </div>
</template>
<script>
import Vue from 'vue';
import CommitItem from '../../entities/CommitItem';
import Command from '../../entities/Command';
import ItemExhibit from './ItemExhibit.vue';

export default {
  name: 'item-confirm',
  components: { ItemExhibit },
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
      return this.processedItems.filter(item => !this.chooseItemsKeys.includes(item.keyPath));
      // return this.items;
    },
    chooseItemsMap() {
      const result = {};
      Object.values(this.chooseItemMap)
        .forEach((item) => {
          const maiKey = item.type === 'options'
            ? item.keyPath.split('.')[0] : item.type;
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
      Vue.set(this.chooseItemMap, value.keyPath, value);
      console.log(Object.values(this.chooseItemMap));
      this.$emit('effectItems', Object.values(this.chooseItemMap));
    },
    removeChoose(index) {
      // this.chooseItems.splice(index, 1);
      // this.$emit('effectItems', this.chooseItems);
      this.$delete(this.chooseItemMap, index);
      this.$emit('effectItems', Object.values(this.chooseItemMap));
    },
    getCreateDuplicateKey(items) {
      const keyCount = {};
      items.filter(item => item.action === CommitItem.ACTION.CREATE)
        .filter(item => !item.keyPath.includes('.'))
        .forEach((item) => { keyCount[item.keyPath] = (keyCount[item.keyPath] || 0) + 1; });
      return Object.keys(keyCount).filter(key => keyCount[key] > 1);
    },
    expandCreateDuplicateItem(items, keys) {
      return items.filter(item => keys.includes(item.keyPath))
        .map(item => item.expend())
        .reduce((i1, i2) => i1.concat(i2));
    },
  },
  created() {
    const keys = this.getCreateDuplicateKey(this.items);
    const expend = this.expandCreateDuplicateItem(this.items, keys);
    this.processedItems = this.items.filter(item => !keys.includes(item.keyPath)).concat(expend);
  },
};
</script>
<style lang="scss" scoped>
.item-wrapper{
  width: 60%;
  display: flex;
  // flex-direction: column;
  // .item-alternative{
  //   width: 50%;
  // }
  // .item-choose{
  //   width: 50%;
  // }
}
.per-item{
  display: flex;
  // flex-direction: column;
  align-items: center;
}
</style>
