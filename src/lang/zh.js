
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';

export default {
  message: '你好',
  desc: '中文',
  page: {
    index: {
      title: '忘记命令怎么使用了(っ °Д °;)っ让我来帮帮你吧[]~(￣▽￣)~*',
    },
    searchBar: {
      placeholder: '请输入命令的部分或者全部',
      'no-data-text': '暂时还没有这条命令的记录呢(ˉ▽ˉ；)...',
    },
  },
  ccc: {
    aaa: '顶顶顶顶',
  },
  ele: { ...zhLocale }, // 或者用 Object.assign({ message: '你好' }, zhLocale)
};
