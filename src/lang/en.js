import enLocale from 'element-ui/lib/locale/lang/en';

export default {
  message: 'hello',
  desc: 'English',
  page: {
    index: {
      title: 'Forget(っ °Д °;)っ For Get[]~(￣▽￣)~*',
    },
    searchBar: {
      placeholder: 'input full cmd or key word',
      'no-data-text': 'Sorry we don\'t has this recoard(ˉ▽ˉ；)...',
    },
    commandPanel: {
      param: 'PARAMS',
      option: 'OPTIONS',
      preview: 'PREVIEW',
      improve: 'Improve The Command',
      paramPanel: {
        'edit-title': 'Edit Params',
        add: 'add',
        remove: 'Remove',
      },
      optionPanel: {
        ignore: 'ignore type limit',
        remove: 'Remove Option',
        searchBar: 'brief or full or key word',
      },
      previewPanel: {
        oneLine: 'one line mode',
        multiple: 'multiple line mode',
        snapshot: 'create snapshot',
      },
    },
    commitPanel: {
      stepInfo: {
        base: 'Base',
        params: 'Params',
        options: 'Options',
        conclude: 'Conclude',
        result: 'Result',
      },
      editBaseInfo: {
      },
      editParams: {
        'edit-title': 'Edit Param',
      },
      editOption: {
        'edit-title': 'Edit Option',
        'duplicate-enum': 'Repeat ENUM',
      },
    },
    signIn: {
      'name-or-email': 'nick name or email',
      'please-input-name-or-email': 'please input name or email',
      'limit-length-4-6': 'length limit 4-6 char',
      pass: 'password here',
      'please-input-pass': 'please input password',
      'rember-me': 'Rember Me',
    },
    snapPanel: {
      createTitle: 'CREATE SNAPSHOT',
      editTitle: 'EDIT SNAPSHOT',
    },
  },
  entities: {
    command: {
      commandName: 'CMD',
      'name-input': 'Command Name',
      briefDesc: 'Brief',
      'b-desc-input': 'Command Brief Description',
      description: 'DESC',
      'desc-input': 'Command Description',
    },
    param: {
      'index-name': 'param index',
      description: 'DESC',
      'desc-input': 'Param Description',
    },
    option: {
      briefName: 'Brief',
      'b-name-input': 'Option Brief Name',
      'full-name': 'Full',
      'full-name-input': 'Option Full Name',
      description: 'DESC',
      'desc-input': 'Option Description',
      duplicate: 'Repeat',
      type: 'TYPE',
      'choice-type': 'Choice Type',
      enum: 'Enum',
      'enum-add': 'NEW ENUM',
      'enum-option': '',
      rules: '',
      types: {
        NONE: 'NONE', NUMBER: 'NUMBER', ENUM: 'ENUM', STRING: 'STRING', MAP: 'MAP',
      },
    },
    commit: {
      commandName: 'CMD',
      'name-input': 'Command Name',
      briefDesc: 'Brief',
      'b-desc-input': 'Command Brief Description',
      description: 'DESC',
      'desc-input': 'Command Description',
      status: 'Status',
    },
    snap: {
      title: 'Title',
      share: 'Share',
      'share-code': 'Code',
      copy: 'Copy',
      remark: 'Remark',
    },
  },
  other: {
    lang: {
      moreLang: 'More Language',
      choiceLang: 'Choice Lang',
    },
    btn: {
      operate: 'Operate',
      cancel: 'Cancel',
      ok: 'OK',
      per: 'Per',
      next: 'Next',
      submit: 'Submit',
      perview: 'Preview',
      remove: 'Remove',
      inject: 'Inject',
      copy: 'Copy',
      restore: 'Restore',
      pause: 'Pause',
      edit: 'Edit',
      'jump-to-padding': 'To Padding',
      'sign-in': 'Sign In',
      'sign-out': 'Sign out',
      'sign-up': 'Sign Up',
    },
    copy: {
      message: {
        success: 'SUCCESS <(￣︶￣)↗[GO!]',
        fail: 'ERROR இ௰இ',
      },
    },
    leave: {
      'want-save': 'do you want save your input?',
    },
    delete: {
      message: {
        ask: 'confirm to delete?',
        success: 'YES I DELETE IT ( •̀ ω •́ )y',
        fail: 'a-ha~ DELETE FAIL <(＿ ＿)>',
      },
    },
    pause: {
      message: {
        ask: 'confirm to pause?',
      },
    },
    input: {
      message: 'input some thing',
    },
    str: {
      LIMIT_LENGTH_1_20: 'Length Limit 1-20',
      LIMIT_LENGTH_4_10: 'Length Limit 1-20',
      JUST_ALLOW_NORMAL_WORD: 'Special symbols allowed: -,_, ,',
      NOT_BLANK_START: 'Not begin with space',
      NOT_EMPTY: 'Not empty',
    },
  },
  lang: {
    zh: 'Chinese',
    en: 'English',
    jp: 'Japanese',
  },
  ele: { ...enLocale }, // 或者用 Object.assign({ message: 'hello' }, enLocale)
};
