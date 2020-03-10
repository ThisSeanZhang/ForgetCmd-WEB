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
      optionPanel: {
        ignore: 'ignore type limit',
        searchBar: 'brief or full or key word',
      },
      previewPanel: {
        copy: 'copy',
        oneLine: 'one line mode',
        multiple: 'multiple line mode',
        snapshot: 'create snapshot',
      },
    },
  },
  ccc: {
    aaa: 'dddd',
  },
  ele: { ...enLocale }, // 或者用 Object.assign({ message: 'hello' }, enLocale)
};
