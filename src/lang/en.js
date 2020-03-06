import enLocale from 'element-ui/lib/locale/lang/en';

export default {
  message: 'hello',
  ccc: {
    aaa: 'dddd',
  },
  ele: { ...enLocale }, // 或者用 Object.assign({ message: 'hello' }, enLocale)
};
