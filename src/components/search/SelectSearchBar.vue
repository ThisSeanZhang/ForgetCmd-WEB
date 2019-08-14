<template>
  <el-select
    v-model="value"
    filterable
    class="aaaa"
    popper-class="main-search"
    remote
    placeholder="请输入命令的部分或者全部"
    no-data-text="暂时还没有这条命令的记录呢(ˉ▽ˉ；)..."
    :remote-method="remoteMethod"
    v-on:keyup.enter.native="submit(value)"
    @change="handelChange"
    :loading="loading">
    <el-option
      v-for="item in options"
      :key="item.cid"
      :label="item.commandName"
      :value="item.cid">
      <div class="select-result-option">
        <span>{{item.commandName}}</span>
        <span>{{item.briefDesc}}</span>
      </div>
    </el-option>
  </el-select>
</template>
<script>
// import {
//   value as Wapper, watch, onMounted,
// } from 'vue-function-api';
import { ajax, wantNothing } from '../../api/fetch';

export default {
  name: 'select-search-bar',
  data() {
    return {
      options: [],
      value: '',
      list: [],
      loading: false,
      states: ['Alabama', 'Alaska', 'Arizona',
        'Arkansas', 'California', 'Colorado',
        'Connecticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois',
        'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota',
        'Mississippi', 'Missouri', 'Montana',
        'Nebraska', 'Nevada', 'New Hampshire',
        'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Ohio',
        'Oklahoma', 'Oregon', 'Pennsylvania',
        'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas',
        'Utah', 'Vermont', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin',
        'Wyoming'],
    };
  },
  mounted() {
    this.list = this.states.map(item => ({ value: item, label: item }));
    console.log(this.list);
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        console.log(query);
        this.loading = true;
        // setTimeout(() => {
        //   loading = false;
        //   options.value = list
        //     .filter(item => (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1));
        //   console.log(options);
        // }, 200);
        const request = {
          method: 'GET',
          url: 'cmds/search-bar',
          data: {
            keyword: query,
          },
        };
        ajax(request).then((resp) => {
          this.loading = false;
          console.log(resp.data);
          this.options = resp.data.data;
        }).catch((error) => {
          this.loading = false;
          wantNothing(error);
          this.options = [];
        });
      } else {
        this.options = [];
      }
    },
    submit(event) {
      console.log(event.value);
    },
    handelChange(item) {
      console.log('handle', item);
      this.$emit('currentSelect', item);
      // this.$router.push(`/cmds/${item}`);
    },
  },
};
</script>
<style style="scss" scoped>
.aaaa {
  width: 100%;
}
.main-search {
  width: 100%!important;
  background-color: aquamarine;
}
.select-result-option{
  display: flex;
  justify-content: space-between;
}
</style>
