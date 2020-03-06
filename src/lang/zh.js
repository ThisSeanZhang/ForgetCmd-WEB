
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
  message: '你好',
  ccc: {
    aaa: '顶顶顶顶',
  },
  ele: { ...zhLocale }, // 或者用 Object.assign({ message: '你好' }, zhLocale)
};
