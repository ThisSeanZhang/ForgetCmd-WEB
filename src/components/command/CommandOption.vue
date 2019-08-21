<template>
  <div>
    <div>
      <el-switch
      v-model="value"
      active-color="#13ce66"
      >
    </el-switch>
    </div>
  </div>
</template>
<script>
import { ajax, wantNothing } from '../../api/fetch';

export default {
  name: 'common-option',
  props: {
    cid: Number,
  },
  data() {
    return{
      options: [],
      value: false,
    };
  },
  methods: {
    getAllOption(cid) {
      const request = {
        method: 'GET',
        url: `cmds/${cid}`,
      };
      ajax(request).then((resp) => {
        this.cmd = new Command(resp.data.data);
        // this.loading = false;
        console.log(resp.data);
        // this.options = resp.data.data;
      }).catch((error) => {
        // this.loading = false;
        wantNothing(error);
        // this.options = [];
      });
    }
  },
  created () {
    options = []
  },
}
</script>