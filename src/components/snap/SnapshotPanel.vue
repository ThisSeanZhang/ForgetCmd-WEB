<template>
<el-dialog
  @open="onOpen"
  :title="title"
  :visible.sync="dialogVisible"
  width="500px">
  <div >
    <!-- title -->
    <MessageInput
    :label="$t('entities.snap.title')"
    :value="snap.title"
    v-on:status="status.title = $event"
    v-slot="{ error }"
    :rules="limit.title">
      <el-input v-model="snap.title"
        maxlength="20"
        :class="error ? 'error-input' : ''"
        show-word-limit></el-input>
    </MessageInput>
    <!-- share -->
    <MessageInput
    :label="$t('entities.snap.share')"
    :value="snap.shareCode"
    v-on:status="status.shareCode = $event"
    v-slot="{ error }"
    :allowEmpty="true"
    :rules="limit.shareCode">
      <el-switch
        v-model="snap.share">
      </el-switch>
      <transition name="el-fade-in-linear">
      <div class="two-item" v-show="snap.share">
        <div class="label" >{{$t('entities.snap.share-code')}}</div>
        <div>
          <el-input v-model="snap.shareCode"
          maxlength="10"
          :class="error ? 'error-input' : ''"
          show-word-limit></el-input>
        </div>
      </div>
      </transition>
    </MessageInput>
    <!-- copy -->
    <!-- <MessageInput :label="$t('entities.snap.copy')" >
      <el-switch
          v-model="snap.allowCopy">
        </el-switch>
    </MessageInput> -->
    <!-- desc -->
    <MessageInput :label="$t('entities.snap.remark')" v-model="snap.desc" >
      <el-input
          type="textarea"
          :rows="3"
          v-model="snap.desc"
          maxlength="60"
          show-word-limit
        ></el-input>
    </MessageInput>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">{{$t('other.btn.cancel')}}</el-button>
    <el-button type="primary" :disabled="!allPass"
    v-if="!edit"
    @click="createSnap">{{$t('other.btn.ok')}}</el-button>
    <el-button type="primary" :disabled="!allPass"
    v-else
    @click="submitSnap">{{$t('other.btn.submit')}}</el-button>
  </span>
</el-dialog>
</template>
<script>
import Snapshot from '../../entities/Snapshot';
import SnapApi from '../../api/SnapShotApi';
import MessageInput from '../base/MessageInput.vue';
import StrRegexConstant from '../../entities/StrRegexConstant';

export default {
  name: 'snap-panel',
  components: { MessageInput },
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
    inSnap: {
      type: Snapshot,
      default: () => new Snapshot({}),
    },
    edit: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      snap: new Snapshot({}),
      limit: {
        title: [
          { regx: /^.{1,20}$/gi, message: 'other.str.LIMIT_LENGTH_1_20' },
          StrRegexConstant.JUST_ALLOW_NORMAL_WORD,
          StrRegexConstant.NOT_BLANK_START,
        ],
        shareCode: [
          { regx: /^.{4,10}$/gi, message: 'other.str.LIMIT_LENGTH_4_10' },
          StrRegexConstant.NOT_BLANK_START,
        ],
      },
      status: {
        title: false,
        shareCode: true,
      },
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
    allPass() {
      return Object.values(this.status).filter(e => !e).length === 0;
    },
    title() {
      return this.$t(this.edit ? 'page.snapPanel.editTitle' : 'page.snapPanel.createTitle');
    },
  },
  methods: {
    onOpen() {
      this.snap = new Snapshot(this.inSnap);
    },
    createSnap() {
      SnapApi.createSnapshot(this.snap.toData())
        .then(() => {
          this.dialogVisible = false;
        });
    },
    submitSnap() {},
  },
};
</script>
<style lang="scss" scoped>
// .each-item{
//   display: flex;
//   // margin-bottom: 15px;
//   // min-height: 40px;
//   height: 45px;
// }
.label{
  width: 60px;
  padding: 0px 10px 0px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
// .item-value{
//   display: flex;
//   flex: 1;
//   align-items: center;
//   height: 100%;
// }
// // .item-input{
// //   flex: 1;
// //   align-items: center;
// // }
.two-item{
  // flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

</style>
<style >
.error-input .el-input__inner:focus{
  border-color: lightcoral;
}
.error-input .el-input__inner{
  border-color: lightcoral;
}
</style>
