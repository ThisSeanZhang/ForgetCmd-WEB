<template>
  <div>
    aaaa
  </div>
</template>
<script>
import { wantNothing } from '../api/fetch';
import Command from '../entities/Command';
import Snapshot from '../entities/Snapshot';

export default {
  name: 'snapshot-inject',
  data() {
    return {
      cmd: null,
    };
  },
  methods: {
    fetchCmd(cid) {
      Command.findByCid(cid).then((resp) => {
        this.cmd = new Command(resp.data.data);
        // console.log(resp.data);
      }).catch((error) => {
        wantNothing(error);
      });
    },
    fetchSnapShot(sid) {
      Snapshot.findByCid(sid).then((resp) => {
        const snapshot = new Snapshot(resp.data.data);
        console.log(snapshot);
      }).catch((error) => {
        wantNothing(error);
      });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      console.log(to.params.sid);
      vm.fetchSnapShot(to.params.sid);
    });
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to.params.sid);
    this.fetchSnapShot(to.params.sid);
    next();
  },
};
</script>
<style lang="scss" scoped>

</style>
