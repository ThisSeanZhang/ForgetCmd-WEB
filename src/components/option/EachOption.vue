<template>
  <div>
    <div v-if="option.isType(optionType.ENUM)" class="option-enum" >
      <el-radio-group v-model="optionArg">
        <el-radio-button v-for="s in option.rules" :key="s" :label="s">
        </el-radio-button>
      </el-radio-group>
    </div>
    <div v-else-if="option.isType(optionType.MAP)" class="option-none" >
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item >
          <el-input :value="mapForm.key"
          @input="mapForm = { key: $event, value: mapForm.value }" placeholder="key"></el-input>
        </el-form-item>
        :
        <el-form-item >
          <el-input :value="mapForm.value"
          @input="mapForm = { key: mapForm.key, value: $event }" placeholder="value"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div v-else-if="option.isType(optionType.NONE)" class="option-none" >无参数可填</div>
    <div class="option-input" v-else>
      <el-input
        class="option-value"
        placeholder="请输入内容"
        v-model="optionArg"
        clearable>
      </el-input>
    </div>
  </div>
</template>
<script>
import Option from '../../entities/CommandOption';
import StringUtils from '../../entities/StringUtils';
// TODO 因为有自定义输入，所以要增加格式校验

export default {
  name: 'each-option',
  props: {
    option: {
      type: Option,
    },
    value: {
      type: String,
    },
  },
  // watch: {
  //   optionArg(vNew) {
  //     this.$emit('input', vNew);
  //   },
  // },
  data() {
    return {
      optionType: Option.TYPE,
      mapKey: null,
      mapValue: null,
    };
  },
  computed: {
    optionArg: {
      get() {
        return this.value;
      },
      set(vNew) {
        this.$emit('input', vNew);
      },
    },
    mapForm: {
      get() {
        const map = { key: '', value: '' };
        if (StringUtils.isEmptyString(this.value)) {
          return map;
        }
        const mapArr = this.value.split(':');
        if (mapArr.length <= 1) {
          [map.key] = mapArr;
          return map;
        }
        [map.key, map.value] = mapArr;
        return map;
      },
      set(vNew) {
        console.log(vNew);
        this.$emit('input', `${vNew.key}:${vNew.value}`);
      },
    },
  },
  methods: {
    initMap() {
      this.mapValue = '';
      if (StringUtils.isEmptyString(this.value)) {
        this.mapKey = '';
        return;
      }
      const map = this.value.split(':');
      if (map.length <= 1) {
        [this.mapKey] = map;
        return;
      }
      [this.mapKey, this.mapValue] = map;
    },
  },
  created() {
    if (this.option.isType(this.optionType.MAP)) {
      this.initMap();
    }
  },
};
</script>
<style lang="scss" scoped>
// .option-input, .option-enum,.option-none{
//   display: flex;
//   margin-left: 150px;
//   margin-right: 80px;
//   justify-content: center;
// }
.option-none{
  line-height: 40px;
  text-align: center;
}
.option-enum{
  line-height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
}
</style>
