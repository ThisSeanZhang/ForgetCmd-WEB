<template>
  <div class="main-container">
    <div style="width: 100%;">
      <el-steps :active="1" finish-status="success">
        <el-step status="error" title="基本信息"></el-step>
        <el-step title="参数"></el-step>
        <el-step title="可选项"></el-step>
        <el-step title="总览"></el-step>
      </el-steps>
    </div>
    <div class="page-container">
      <transition name="fade" mode="in-out">
        <div
          v-show="currentStep === procedure.BASE_INFO" class="transition-box">
          <edit-base-info></edit-base-info>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="2"
          v-show="currentStep === procedure.PARAMS_INFO" class="transition-box">
          <edit-param-info></edit-param-info>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="3" v-show="currentStep === procedure.OPTIONS_INFO" class="transition-box">
          .el-fade-in OPTIONS_INF
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="4" v-show="currentStep === procedure.DONE" class="transition-box">
          .el-fade-in DONE
        </div>
      </transition>
    </div>
    <div style="width: 100%;">
      <el-button
        v-show="hasPer" type="primary"
        @click="perStep"
        style="float: left;"
        >上一步</el-button>
      <el-button
        v-show="hasNext" type="primary"
        @click="nextStep"
        style="float: right;"
        >下一步</el-button>
      <el-button
        v-show="currentStep === procedure.DONE" type="primary"
        style="float: right;"
        >提交</el-button>
    </div>
  </div>
</template>
<script>
// import Command from '../../entities/Command';
// // import Option from '../../entities/Option';
import EditBaseInfo from './EditBaseInfo.vue';
import EditParamInfo from './EditParamInfo.vue';
// import AddOption from './AddOption.vue';
// import ListUtils from '../../entities/ListUtils';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-cmd',
  components: {
    EditBaseInfo,
    EditParamInfo,
  },
  data() {
    return {
      procedure: {
        BASE_INFO: Symbol('start add status'),
        PARAMS_INFO: Symbol('add params'),
        OPTIONS_INFO: Symbol('add options'),
        DONE: Symbol('Done!'),
      },
      currentStep: null,
    };
  },
  methods: {
    nextStep() {
      const index = Object.values(this.procedure).indexOf(this.currentStep);
      this.currentStep = Object.values(this.procedure)[index + 1];
    },
    perStep() {
      const index = Object.values(this.procedure).indexOf(this.currentStep);
      this.currentStep = Object.values(this.procedure)[index - 1];
    },
  },
  computed: {
    hasNext() {
      return this.currentStep !== this.procedure.DONE;
    },
    hasPer() {
      return this.currentStep !== this.procedure.BASE_INFO;
    },
  },
  created() {
    this.currentStep = this.procedure.BASE_INFO;
    console.log(this.currentStep);
    console.log(this.procedure.BASE_INFO);
    console.log(this.currentStep === this.procedure.BASE_INFO);
  },
};
</script>
<style lang="scss" scoped>
.main-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.page-container{
  position: relative;
  height: 100%;
  width: 100%;
  // flex-direction: column;
}
.transition-box {
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-sizing: border-box;
  position: absolute;
}
.fade-enter-active, .fade-leave-active {
  // position: absolute;
  transition: all .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  // height: 100px;
  opacity: 0;
}
.fade-enter {
  transform: translateX(200px);
}
.fade-leave-to {
  transform: translateX(-200px);
}
</style>
