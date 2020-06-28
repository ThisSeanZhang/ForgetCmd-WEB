<template>
<div>
  <div>
    <div>标题</div>
    <div>{{snap.title}}</div>
  </div>
  <div>
    <div>创建时间</div>
    <div>{{createTime}}</div>
  </div>
  <div>
    <div>是否分享</div>
    <div>{{snap.share ? '是' : '否'}}</div>
  </div>
  <div>
    <div>密码</div>
    <div v-if="hasShareCode">{{snap.shareCode}}</div>
    <div v-else>无</div>
  </div>
  <div>
    <div>所属的命令版本</div>
    <div>{{snap.version}}</div>
  </div>
  <div>
    <div>描述</div>
    <div>{{snap.desc}}</div>
  </div>
  <div>
    <div>类型</div>
    <div>{{snap.type}}</div>
  </div>
</div>
</template>
<script>
import Snapshot from '../../entities/Snapshot';
import TimeUtils from '../../entities/TimeUtils';
import StrUtils from '../../entities/StringUtils';

export default {
  name: 'snap-info-panel',
  props: {
    snap: Snapshot,
    default: () => new Snapshot({}),
  },
  computed: {
    createTime() {
      return TimeUtils.dateFormat('YYYY-MM-dd HH:mm:ss', this.snap.createTime);
    },
    hasShareCode() {
      return StrUtils.nonEmptyString(this.snap.shareCode);
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
