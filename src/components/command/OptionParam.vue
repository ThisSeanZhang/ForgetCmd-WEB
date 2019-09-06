<template>
  <div>
    <div v-if="option.isType(optionType.ENUM)" class="option-enum" >
      <el-radio-group v-model="optionArg">
        <el-radio-button v-for="s in option.rules" :key="s" :label="s">
        </el-radio-button>
      </el-radio-group>
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
import Option from '../../entities/Option';

export default {
  name: 'option-param',
  props: {
    option: Option,
    value: String,
  },
  // watch: {
  //   optionArg(vNew) {
  //     this.$emit('input', vNew);
  //   },
  // },
  computed: {
    optionArg: {
      get() {
        return this.value;
      },
      set(vNew) {
        this.$emit('input', vNew);
      },
    },
  },
  data() {
    return {
      optionType: Option.TYPE,
    };
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
