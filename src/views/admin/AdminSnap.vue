<template>
<el-scrollbar style="width: 100%;">
  <CommandExhibitCard style="margin-bottom: 10px;"
    :snap='snap'
    :index='index'
    v-on:restore="restore(snap)"
    v-on:delThis="delHis(snap.snapId)"
    v-for="(snap, index) in snaps" :key="snap.createTime" />
</el-scrollbar>
</template>
<script>
import SnapShotApi from '../../api/SnapShotApi';
import Snapshot from '../../entities/Snapshot';
import CommandExhibitCard from '../../components/command/CommandExhibitCard.vue';

export default {
  name: 'admin-snap',
  components: { CommandExhibitCard },
  data() {
    return {
      snaps: [],
    };
  },
  methods: {
    getManageSnap() {
      SnapShotApi.adminAllSnap().then((resp) => {
        console.log(resp);
        this.snaps = resp.data.data.map(Snapshot.fromObj);
      });
    },
    restore(snap) {
      const routeUrl = this.$router.resolve({
        path: `/cmd/padding/${snap.cid}/${snap.location}/${snap.snapId}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    delHis(snapId) {
      SnapShotApi.adminDeleteSnap(snapId).then((resp) => {
        console.log(resp);
        this.getManageSnap();
      });
    },
  },
  created() {
    this.getManageSnap();
    this.$emit('flash', this.getManageSnap);
  },
};
</script>
<style lang="scss" scoped>
</style>
