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
      improve: '改进命令',
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
        'duplicate-enum': '重复的枚举值',
      },
    },
    signIn: {
      'name-or-email': '昵称或邮件地址',
      'please-input-name-or-email': '请输入邮件地址',
      'limit-length-4-6': '长度限制4至6个字符',
      pass: '密码',
      'please-input-pass': '请输入密码',
      'rember-me': '记住我',
    },
    createSnap: {
      title: '创建快照',
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
      duplicate: '重复',
      type: '类型',
      'choice-type': '请选择类型',
      enum: '枚举值',
      'enum-add': '新增枚举',
      'enum-option': '',
      rules: '',
      types: {
        NONE: '无', NUMBER: '数字', ENUM: '枚举', STRING: '字符串', MAP: '键值对',
      },
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
    snap: {
      title: '标题',
      share: '分享',
      'share-code': '密码',
      copy: '允许复制',
      remark: '备注',
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
      pause: '暂停',
      'jump-to-padding': '跳转至填充界面',
      'sign-in': '登入',
      'sign-out': '退出',
      'sign-up': '注册',
    },
    copy: {
      message: {
        success: '复制成功 <(￣︶￣)↗[GO!]',
        fail: '复制失败 இ௰இ',
      },
    },
    leave: {
      'want-save': '要保存已做的修改的吗？',
    },
    delete: {
      message: {
        ask: '确定删除吗？',
        success: '删除成功 ( •̀ ω •́ )y',
        fail: '啊欧~删除失败 <(＿ ＿)>',
      },
    },
    pause: {
      message: {
        ask: '暂停使用?',
      },
    },
    input: {
      message: '输入点什么',
    },
    str: {
      LIMIT_LENGTH_1_20: '长度限制在1,20之间',
      LIMIT_LENGTH_4_10: '长度限制在4,10之间',
      JUST_ALLOW_NORMAL_WORD: '仅“-,_, ”为允许的特殊符号',
      NOT_BLANK_START: '不允许空格开头',
      NOT_EMPTY: '不允许为空',
    },
  },
  lang: {
    zh: '中文',
    en: '英文',
    jp: '日文',
  },
  ele: { ...zhLocale }, // 或者用 Object.assign({ message: '你好' }, zhLocale)
};
