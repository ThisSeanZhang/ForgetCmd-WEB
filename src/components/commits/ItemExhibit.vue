<template>
  <el-card class="box-card modify" shadow="hover">
    <!-- <div>
      <el-tag @click="isOpen = !isOpen"
        :type="item.action === 0 ? 'success' : (item.action === 1 ? 'info' : 'danger')"
      >{{item.key}}</el-tag>
      <span></span>
    </div> -->
    <div v-if="item.action === 0" class="value">
      <div>
        <el-tag @click="isOpen = !isOpen" type='success' >{{splitExhibitKey}}:</el-tag>
      </div>
      <div v-if="isObj(item.value)">
        <el-collapse-transition>
          <div class="transition-box" v-show="isOpen">
            {{item.value}}
          </div>
        </el-collapse-transition>
      </div>
      <span v-else>{{item.value}}</span>
    </div>
    <div v-else-if="item.action === 1" class="value">
      <el-tag type='info' >{{item.key}}</el-tag>
      <span>{{item.oValue}}</span>=><span>{{item.value}}</span>
    </div>
    <div v-else-if="item.action === 2" class="value">
      <div>
        <el-tag @click="isOpen = !isOpen" type='danger' >{{item.key}}</el-tag>
      </div>
      <div v-if="isObj(item.oValue)">
        <el-collapse-transition>
          <div class="transition-box" v-show="isOpen">
            {{item.oValue}}
          </div>
        </el-collapse-transition>
      </div>
      <span v-else>{{item.oValue}}</span>
    </div>
  </el-card>
</template>
<script>
import CommitItem from '../../entities/CommitItem';

export default {
  name: 'item-exhibit',
  data() {
    return {
      isOpen: false,
    };
  },
  props: {
    item: {
      type: CommitItem,
      default: () => new CommitItem({}),
    },
  },
  computed: {
    valueIsObj() {
      if (this.item.action === 1) return false;
      if (this.item.type === 'base') return false;
      if (String(this.item.key).includes('.')) return false;
      return true;
    },
    splitExhibitKey() {
      if (this.item.type === 'base') return this.item.key;
      const keys = this.item.key.split('.');
      if (keys.length >= 2) {
        // TODO need lang map translate
        return `${keys.shift()} ${keys.join('.')}`;
      }
      return this.item.key;
    },
  },
  methods: {
    isObj(value) {
      const type = Object.prototype.toString.call(value);
      if (type === '[object String]') {
        try {
          const obj = JSON.parse(value);
          return Object.prototype.toString.call(obj) === '[object Object]';
        } catch {
          return false;
        }
      }
      return type === '[object Object]';
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
.value{
  display: inline;
}
.base-block{
  background-color: #5e7c86;
}
.option-block{
  background-color: #429aa0;
}
.param-block{
  background-color: #7cb458;
}
.transition-box {
  // height: 100px;
  // border-radius: 4px;
  box-sizing: border-box;
  margin-right: 20px;
}
.modify{
  // background-color: #f4f4f5;
  // background-color: #f0f9eb;
  // background-color: #f0f9eb;
}
</style>
