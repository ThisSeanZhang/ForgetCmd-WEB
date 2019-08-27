function isEmptyString(str) {
  return str === undefined || str === null || str === '';
}
function nonEmptyString(str) {
  return !isEmptyString(str);
}
export default {
  isEmptyString,
  nonEmptyString,
};
