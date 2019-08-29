<template>
  <div>
    <div v-for="option in options" :key="option.oid">
      <el-popover
        placement="right"
        width="200"
        trigger="hover"
        :content="option.description"
        >
        <div class="per-option" slot="reference">
          <div class="option-brief">{{option.showName()}}</div>
          <div class="option-switch">
            <el-switch
              v-model="option.selected"
              active-color="#13ce66">
            </el-switch>
          </div>
          <!-- {{option.type + 'vvv'}}
          {{optionType.ENUM + 'aaa'}}
          {{option.type === optionType.ENUM}} -->
          <div v-if="option.type === optionType.ENUM" class="option-enum" >
            <el-radio-group v-model="option.value">
              <el-radio-button v-for="s in option.rules" :key="s" :label="s">
              </el-radio-button>
            </el-radio-group>
          </div>
          <div v-else-if="option.type === optionType.NONE" class="option-none" >无参数可填</div>
          <div class="option-input" v-else>
            <el-input
              class="option-value"
              placeholder="请输入内容"
              v-model="option.value"
              clearable>
            </el-input>
          <!-- <el-tooltip class="item" effect="dark"
          :content="option.description" placement="right-start">
            <el-input
              class="option-value"
              placeholder="请输入内容"
              v-model="option.value"
              clearable>
            </el-input>
          </el-tooltip> -->
        </div>
        </div>
      </el-popover>
    </div>
  </div>
</template>
<script>
import { ajax, wantNothing } from '../../api/fetch';
import Option from '../../entities/Option';

export default {
  name: 'common-option',
  props: {
    cid: Number,
  },
  data() {
    return {
      options: [],
      value: false,
      optionType: Option.TYPE,
    };
  },
  watch: {
    selectedOption(newV, oldV) {
      console.log(newV, oldV);
      this.$emit('update', newV);
    },
  },
  computed: {
    selectedOption: {
      get() {
        return this.options.filter(op => op.selected);
      },
      set(val) {
        console.log(val);
      },
    },
  },
  methods: {
    getAllOption(cid) {
      const request = {
        method: 'GET',
        url: `cmds/${cid}/options`,
      };
      ajax(request).then((resp) => {
        this.options = resp.data.data.map(param => new Option(param));
        // this.loading = false;
        console.log(resp.data);
        // this.options = resp.data.data;
      }).catch((error) => {
        // this.loading = false;
        wantNothing(error);
        // this.options = [];
      });
    },
  },
  created() {
    this.options = [];
    this.params = [];
    console.log(this.cid);
    this.getAllOption(this.cid);
    // console.log(`enum${this.optionType.ENUM}`);
    console.log(Option.getType());
  },
};
</script>
<style lang="scss" scoped>
.option-value, .option-desc{
  display: inline-block;
}
.option-brief{
  width: 80px;
  text-align: right;
  vertical-align: middle;
  float: left;
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.option-none{
  line-height: 40px;
  text-align: center;
}
.option-input, .option-enum,.option-none{
  display: flex;
  margin-left: 150px;
  justify-content: center;
}
.option-switch{
  // margin-left: 80px;
  float: left;
  line-height: 40px;
  padding: 0px 10px;
}
.per-option{
  margin-bottom: 10px;
}
</style>
