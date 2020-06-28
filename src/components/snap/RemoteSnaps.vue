<template>
<el-scrollbar v-loading="loading.doing" style="width: 100%; height: 100%">
  <CommandExhibitCard style="margin-bottom: 10px;"
    :snap='snap'
    :index='index'
    v-on:restore="restore(snap)"
    v-on:delThis="delHis(snap.snapId)"
    v-for="(snap, index) in snaps" :key="snap.createTime" />
</el-scrollbar>
</template>
<script>
import { mapGetters } from 'vuex';
import SnapShotApi from '../../api/SnapShotApi';
import Snapshot from '../../entities/Snapshot';
import CommandExhibitCard from '../command/CommandExhibitCard.vue';

export default {
  name: 'remote-snaps',
  components: { CommandExhibitCard },
  props: {
    commandName: {
      type: String,
    },
  },
  data() {
    return {
      snaps: [],
      loading: {
        doing: false,
        success: false,
      },
    };
  },
  computed: {
    ...mapGetters('UserInfo', ['did', 'admin']),
    getSnapFunc() {
      const request = {
        did: this.did,
        commandName: this.commandName,
      };
      // if (this.admin) return SnapShotApi.adminAllSnap();
      return SnapShotApi.searchSnap(request, this.loading);
    },
  },
  methods: {
    getManageSnap() {
      this.getSnapFunc.then((resp) => {
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
