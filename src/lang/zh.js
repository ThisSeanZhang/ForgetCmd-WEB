
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
    commandPanel: {
      param: '命令参数',
      option: '命令参数',
      preview: '命令预览',
      paramPanel: {
        'edit-title': '编辑参数',
        add: '添加参数',
        remove: '删除参数',
      },
      optionPanel: {
        ignore: '忽略定义的类型',
        remove: '删除选项',
        searchBar: '选项名称或描述关键字',
      },
      previewPanel: {
        copy: '复制',
        oneLine: '单行模式',
        multiple: '多行模式',
        snapshot: '创建快照',
      },
    },
  },
  ccc: {
    aaa: '顶顶顶顶',
  },
  ele: { ...zhLocale }, // 或者用 Object.assign({ message: '你好' }, zhLocale)
};
