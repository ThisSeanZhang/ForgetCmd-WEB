function isEmptyString(str) {
  return str === undefined || str === null || str === '';
}
function nonEmptyString(str) {
  return !isEmptyString(str);
}
const type = {
  object: str => JSON.stringify(str),
  string: str => str.trim(),
};
function eq(str1, str2) {
  // 都为空 true
  if (isEmptyString(str1) && isEmptyString(str2)) {
    return true;
  }
  // 有一个为空 false
  if (isEmptyString(str1) || isEmptyString(str2)) {
    return false;
  }
  const s1 = type[typeof str1](str1);
  const s2 = type[typeof str2](str2);
  console.log(s1, s2);
  // 长度不同 false
  if (s1.length !== s2.length) {
    return false;
  }
  // 比较每一个字符
  for (let i = 0; i < s1.length; i += 1) {
    if (s1[i] !== s2[i]) {
      return false;
    }
  }
  return true;
}
export default {
  isEmptyString,
  nonEmptyString,
  eq,
};
