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
import {
  value as Wapper, watch, onMounted,
} from 'vue-function-api';
import { ajax, wantNothing } from '../../api/fetch';
import router from '../../router';

export default {
  setup() {
    const options = Wapper([]);
    const value = Wapper('');
    let list = [];
    let loading = false;
    const states = ['Alabama', 'Alaska', 'Arizona',
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
      'Wyoming'];

    onMounted(() => {
      list = states.map(item => ({ value: item, label: item }));
      console.log(list);
    });
    const remoteMethod = (query) => {
      if (query !== '') {
        console.log(query);
        loading = true;
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
          console.log(resp.data);
          options.value = resp.data.data;
        }).catch((error) => {
          wantNothing(error);
          options.value = [];
        });
      } else {
        options.value = [];
      }
    };
    const submit = (event) => {
      console.log(event.value);
    };
    const handelChange = (item) => {
      console.log('handle', item);
      router.push(`/cmds/${item}`);
    };
    watch(
      () => value.value,
      val => console.log(`/cmds/ ${val}`),
    );
    // expose bindings on render context
    return {
      options,
      value,
      list,
      loading,
      remoteMethod,
      submit,
      handelChange,
    };
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
