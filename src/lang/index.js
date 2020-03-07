import Vue from 'vue';
import Element from 'element-ui';
import VueI18n from 'vue-i18n';
import en from './en';
import zh from './zh';

Vue.use(VueI18n);

const messages = {
  en,
  zh,
};
const localLnag = localStorage.getItem('lang');
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: Object.keys(messages).includes(localLnag) ? localLnag : 'zh', // set locale
  messages, // set locale messages
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(`ele.${key}`, value),
});

// new Vue({ i18n }).$mount('#app')
export default i18n;
