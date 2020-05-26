<template>
<el-dialog
  @open="onOpen"
  title="创建快照"
  :visible.sync="dialogVisible"
  width="500px">
  <div>
    <div class="each-item">
      <div class="item-label">标题</div>
      <div class="item-value">
        <el-input v-model="snap.title"
        placeholder="请输入内容"
        maxlength="20"
        show-word-limit></el-input>
      </div>
    </div>
    <div class="each-item">
      <div class="two-item">
        <div class="item-label">分享</div>
        <div class="item-value">
          <el-switch
            v-model="snap.share">
          </el-switch>
        </div>
      </div>
      <transition name="el-fade-in-linear">
      <div class="two-item" v-show="snap.share">
        <div class="item-label" >分享码</div>
        <div><el-input v-model="snap.shareCode" placeholder="请输入内容"></el-input></div>
      </div>
      </transition>
    </div>
    <div class="each-item">
      <div class="item-label">允许复制</div>
      <div class="item-value">
        <el-switch
          v-model="snap.allowCopy">
        </el-switch>
      </div>
    </div>
    <div class="each-item">
      <div class="item-label">备注</div>
      <div class="item-value">
        <el-input
          type="textarea"
          :rows="3"
          placeholder="请输入内容"
          v-model="snap.desc"
          maxlength="60"
          show-word-limit
        >
        </el-input>
      </div>
    </div>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="createSnap">确 定</el-button>
  </span>
</el-dialog>
</template>
<script>
import Snapshot from '../../entities/Snapshot';
import SnapApi from '../../api/SnapShotApi';

export default {
  name: 'snap-panel',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    inSnap: {
      type: Snapshot,
      default: () => new Snapshot({}),
    },
  },
  data() {
    return {
      snap: new Snapshot({}),
    };
  },
  computed: {
    dialogVisible: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
  methods: {
    onOpen() {
      this.snap = new Snapshot(this.inSnap);
    },
    createSnap() {
      SnapApi.createSnapshot(this.snap.toData());
      this.dialogVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.each-item{
  display: flex;
  margin-bottom: 15px;
  min-height: 40px;
}
.item-label{
  width: 60px;
  padding: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-value{
  display: flex;
  flex: 1;
  align-items: center;
}
// .item-input{
//   flex: 1;
//   align-items: center;
// }
.two-item{
  flex: 1;
  display: flex;
  flex-direction: row;
}
</style>
