<template>
<!-- <div style="height: 100%;"> -->
  <!-- <div class="side-head">
    snap info
  </div> -->
  <div class="side-main">
    <!-- <el-radio-group style="display: inline-flex; justify-content: center;" v-model="tag">
      <el-radio-button v-for="lab in Object.keys(tags)" :key="lab" :label="lab"
      >{{tags[lab]}}</el-radio-button>
    </el-radio-group> -->
    <div class="side-contant">
      <!-- 历史记录 -->
      <CommandHistory
        v-if="tag === 'local-browser'"
        :cid="cid"
        :commandName="commandName" />
      <!-- 快照 -->
      <RemoteSnaps
        v-else-if="tag === 'online-remote'"
        :cid="cid"
        :commandName="commandName" />
      <!-- 基本信息 -->
      <SnapInfoPanel
      v-else-if="tag === 'snap-info'"
      :snap="snap" />
    </div>
    <div class="right-btn">
      <div class="panel-btn"
      @click="tag = lab"
      v-for="lab in Object.keys(tags)" :key="lab">{{tags[lab]}}</div>
    </div>
  </div>
<!-- </div> -->
</template>
<script>
import CommandHistory from '../components/history/CommandHistory.vue';
import RemoteSnaps from '../components/snap/RemoteSnaps.vue';
import SnapInfoPanel from './snap/SnapInfoPanel.vue';
import Snapshot from '../entities/Snapshot';

export default {
  name: 'side-of-padding-command',
  components: { CommandHistory, RemoteSnaps, SnapInfoPanel },
  props: {
    cid: {
      type: String,
    },
    snap: {
      type: Snapshot,
      default: () => null,
    },
    location: {
      type: String,
      default: () => 'local-browser',
    },
    commandName: {
      type: String,
    },
  },
  data() {
    return {
      tag: null,
      tags: {
        'local-browser': '历史',
        'online-remote': '快照',
        'snap-info': '信息',
        // 'blog': '博客',
      },
    };
  },
  created() {
    // this.tag = this.location;
    this.tag = 'local-browser';
    if (this.location === 'local-browser') {
      delete this.tags['snap-info'];
    }
  },
};
</script>
<style lang="scss" scoped>
.side-main {
  flex-direction: row;
  height: 100%;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
}
.side-contant {
  margin-top: 5px;
  height: 100%;
  overflow: hidden;
  width: 100%;
}
.right-btn{
  width: 0px;
  padding-left:25px;
}
.panel-btn{
  display: flex;
  width: 100px;
  margin-bottom: 85px;
  transform: rotate(90deg);
  background-color: #909399;
  color: #ffffff;
  transform-origin: top left;
  display: inline-flex;
  justify-content: center;
  user-select: none;
  cursor: pointer;
}
</style>
