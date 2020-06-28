export default {
  JUST_ALLOW_NORMAL_WORD: {
    regx: /^[\u4e00-\u9fa5a-zA-Z0-9 \-_]+$/i,
    message: 'other.str.JUST_ALLOW_NORMAL_WORD',
  },
  NOT_BLANK_START: {
    regx: /^[^ ]{1}.*$/i,
    message: 'other.str.NOT_BLANK_START',
  },
  NOT_EMPTY: {
    regx: /^$/i,
    message: 'other.str.NOT_EMPTY',
  },
};
