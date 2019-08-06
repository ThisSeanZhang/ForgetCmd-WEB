<template>
  <div>
    <div class="search-bar-wapper">
      <div><h1>忘记命令怎么使用了(っ °Д °;)っ让我来帮帮你吧[]~(￣▽￣)~*</h1></div>
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
        :loading="loading">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>
<script>
import {
  value as Wapper, watch, onMounted,
} from 'vue-function-api';

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
        loading = true;
        setTimeout(() => {
          loading = false;
          options.value = list
            .filter(item => (item.label.toLowerCase().indexOf(query.toLowerCase()) > -1));
          console.log(options);
        }, 200);
      } else {
        options.value = [];
      }
    };
    const submit = (event) => {
      console.log(event.value);
    };
    watch(
      () => value.value,
      val => console.log('value is ', val),
    );
    // expose bindings on render context
    return {
      options,
      value,
      list,
      loading,
      remoteMethod,
      submit,
    };
  },
};
</script>
<style style="scss" scoped>
.search-bar-wapper{
  /* height: 100%; */
  padding-top: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.aaaa {
  width: 50%;
}
.main-search{
  width: 100%;
  background-color: aquamarine;
}
</style>
