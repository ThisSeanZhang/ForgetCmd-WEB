<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'app',
  setup() {
    const isPro = Object.is(process.env.NODE_ENV, 'development');
    const baseUrl = isPro ? 'api' : '/';
    axios.defaults.baseURL = baseUrl;
  },
};
</script>

<style>
#app, body, html{
  height: 100%;
  margin: 0px;
}
</style>
