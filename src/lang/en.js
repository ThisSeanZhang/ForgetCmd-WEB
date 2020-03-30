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
        copy: 'copy',
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
        'repeat-enum': 'Repeat ENUM',
      },
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
      repeat: 'Repeat',
      type: 'Type',
      'choice-type': 'Choice Type',
      enum: 'Enum',
      'enum-add': 'NEW ENUM',
      'enum-option': '',
      rules: '',
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
  },
  other: {
    lang: {
      moreLang: 'More Language',
      choiceLang: 'Choice Lang',
    },
    btn: {
      operate: 'Operate',
      cancel: 'cancel',
      ok: 'OK',
      per: 'Per',
      next: 'Next',
      submit: 'Submit',
      perview: 'Preview',
    },
    copy: {
      message: {
        success: 'COPY SUCCESS <(￣︶￣)↗[GO!]',
        error: 'COPY ERROR இ௰இ',
      },
    },
    action: {
      'want-save': 'do you want save your input？',
    },
  },
  lang: {
    zh: 'Chinese',
    en: 'English',
    jp: 'Japanese',
  },
  ele: { ...enLocale }, // 或者用 Object.assign({ message: 'hello' }, enLocale)
};
