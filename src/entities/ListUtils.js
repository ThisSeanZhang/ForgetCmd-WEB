function isEmptyList(list) {
  return list === undefined || list === null || list.length < 1;
}
function nonEmptyList(list) {
  return !isEmptyList(list);
}
export default {
  isEmptyList,
  nonEmptyList,
};
