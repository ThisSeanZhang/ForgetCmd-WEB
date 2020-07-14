<template>
  <el-select
    v-model="value"
    filterable
    class="aaaa"
    popper-class="main-search"
    remote
    :placeholder="$t('page.searchBar.placeholder')"
    :no-data-text="$t('page.searchBar.no-data-text')"
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
        <span>{{item.briefDesc[currentLang]}}</span>
      </div>
    </el-option>
  </el-select>
</template>
<script>
// import {
//   value as Wapper, watch, onMounted,
// } from 'vue-function-api';
import { mapGetters } from 'vuex';
import { ajax, wantNothing } from '../../api/fetch';

export default {
  name: 'select-search-bar',
  data() {
    return {
      options: [],
      value: '',
      query: '',
      loading: false,
    };
  },
  methods: {
    remoteMethod(query) {
      if (query !== '') {
        this.query = query;
        console.log(query);
        this.loading = true;
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
          this.options = resp.data.data.map(cmd => ({
            ...cmd,
            briefDesc: JSON.parse(cmd.briefDesc),
          }));
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
      this.value = this.query;
      // this.$router.push(`/cmds/${item}`);
    },
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
    ...mapGetters('Language', ['allLangs']),
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
