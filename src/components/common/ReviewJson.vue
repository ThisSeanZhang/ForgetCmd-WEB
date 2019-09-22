<template>
  <div v-if="getObjType(InObj, typeMap.OBJECT)">
    <span :style="getTextIndex(span - 1)">
      {{argumentName === '' ? '{' : `"${argumentName}": {`}}
    </span>
    <div :style="getTextIndex(span)" v-for="(key, index) in Object.keys(InObj)" :key="index">
      <review-json v-if="nonBaseType(InObj[key])"
        :needSplit="index < (Object.keys(InObj).length - 1)"
        :argumentName="key"
        :InObj="InObj[key]" :span="span + 1" />
      <div v-else>
        {{ `"${key}": ${formatData(InObj[key])}${
          index === (Object.keys(InObj).length - 1) ? '' : ','}`}}
      </div>
    </div>
    <span :style="getTextIndex(span - 1)">{{`}${needSplit ? ',' : ''}`}}</span>
  </div>
  <div v-else-if="getObjType(InObj, typeMap.ARRAY)">
    <span >
      {{argumentName === '' ? '[' : `"${argumentName}": [`}}
    </span>
    <div v-for="(key, index) in InObj" :key="index">
      <review-json v-if="nonBaseType(InObj)"
        :needSplit="index < (InObj.length - 1)"
        :InObj="key"
        :span="span + 1" />
      <div v-else>
        {{` ${InObj.join(',')} `}}
      </div>
    </div>
    <span>{{`]${needSplit ? ',' : ''}`}}</span>
  </div>
</template>
<script>
export default {
  name: 'review-json',
  props: {
    InObj: undefined,
    span: {
      type: Number,
      default: 1,
    },
    argumentName: {
      type: String,
      default: '',
    },
    needSplit: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      typeMap: {
        NUMBER: '[object Number]',
        ARRAY: '[object Array]',
        STRING: '[object String]',
        OBJECT: '[object Object]',
        BOOLEAN: '[object Boolean]',
      },
    };
  },
  methods: {
    nonBaseType(obj) {
      const type = Object.prototype.toString.call(obj);
      return type === this.typeMap.OBJECT || type === this.typeMap.ARRAY;
    },
    getObjType(obj, type) {
      return Object.prototype.toString.call(obj) === type;
    },
    getTextIndex(span) {
      return `margin-left:${span * 10}px`;
    },
    formatData(data) {
      const convert = {
        '[object Number]': n => n,
        '[object String]': s => `"${s}"`,
        '[object Boolean]': b => b,
      };
      return data ? convert[Object.prototype.toString.call(data)](data) : 'null';
    },
  },
};
</script>
<style lang="scss" scoped>

</style>
