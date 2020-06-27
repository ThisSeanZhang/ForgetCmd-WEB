function dateFormat(fmt, time) {
  const date = time instanceof Object ? time : new Date(time);
  let result = fmt;
  const opt = {
    'Y+': date.getFullYear().toString(),
    'y+': date.getFullYear().toString(),
    'M+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'm+': date.getMinutes().toString(),
    's+': date.getSeconds().toString(),
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  Object.keys(opt).forEach((key) => {
    const ret = new RegExp(`(${key})`).exec(result);
    if (ret) {
      result = result.replace(ret[1], (ret[1].length === 1) ? (opt[key]) : (opt[key].padStart(ret[1].length, '0')));
    }
  });
  return result;
}

export default {
  dateFormat,
};
