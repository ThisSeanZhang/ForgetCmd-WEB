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
        oneLine: '单行模式',
        multiple: '多行模式',
        snapshot: '创建快照',
      },
    },
    commitPanel: {
      stepInfo: {
        base: '基础信息',
        params: '参数信息',
        options: '选项信息',
        conclude: '总览',
        result: '结果',
      },
      editBaseInfo: {
      },
      editParams: {
        'edit-title': '编辑参数',
      },
      editOption: {
        'edit-title': '编辑可选项',
        'repeat-enum': '重复的枚举值',
      },
    },
  },
  entities: {
    command: {
      commandName: '命令名称',
      'name-input': '请输入命令名称',
      briefDesc: '简述',
      'b-desc-input': '请输入命令简述',
      description: '详细描述',
      'desc-input': '请输入命令完整描述',
    },
    param: {
      'index-name': '参数位置',
      description: '描述',
      'desc-input': '请输入描述',
    },
    option: {
      briefName: '简写',
      'b-name-input': '请输入选项简称',
      'full-name': '全称',
      'full-name-input': '请输入完整命令',
      description: '描述',
      'desc-input': '请输入描述',
      repeat: '重复',
      type: '类型',
      'choice-type': '请选择类型',
      enum: '枚举值',
      'enum-add': '新增枚举',
      'enum-option': '',
      rules: '',
    },
    commit: {
      commandName: '命令名称',
      'name-input': '请输入命令名称',
      briefDesc: '简述',
      'b-desc-input': '请输入命令简述',
      description: '详细描述',
      'desc-input': '请输入命令完整描述',
      status: '状态',
    },
  },
  other: {
    lang: {
      moreLang: '更多语言',
      choiceLang: '请选择语言',
    },
    btn: {
      operate: '操作',
      cancel: '取 消',
      ok: '确 定',
      per: '上一步',
      next: '下一步',
      submit: '提交',
      perview: '预 览',
      remove: '移除',
      inject: '添加',
      copy: '复制',
      restore: '恢复',
    },
    copy: {
      message: {
        success: '复制成功 <(￣︶￣)↗[GO!]',
        error: '复制失败 இ௰இ',
      },
    },
    leave: {
      'want-save': '要保存已做的修改的吗？',
    },
    delete: {
      message: {
        ask: '确定删除吗？',
      },
    },
  },
  lang: {
    zh: '中文',
    en: '英文',
    jp: '日文',
  },
  ele: { ...zhLocale }, // 或者用 Object.assign({ message: '你好' }, zhLocale)
};
