<template>
  <div class="main-container">
    <div style="width: 100%;">
      <el-steps :active="1" finish-status="success">
        <el-step status="error" title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
      </el-steps>
    </div>
    <div class="page-container">
      <transition name="fade" mode="in-out">
        <div @click="currentStep = procedure.PARAMS_INFO"
          v-show="currentStep === procedure.BASE_INFO" class="transition-box">
          <edit-base-info></edit-base-info>
        </div>
      </transition>
      <transition name="fade">
        <div key="2" @click="currentStep = procedure.BASE_INFO"
          v-show="currentStep === procedure.PARAMS_INFO" class="transition-box">
          .el-fade-in PARAMS_INFO
        </div>
      </transition>
      <transition name="fade">
        <div key="3" v-show="currentStep === procedure.OPTIONS_INFO" class="transition-box">
          .el-fade-in OPTIONS_INF
        </div>
      </transition>
      <transition name="fade">
        <div key="4" v-show="currentStep === procedure.DONE" class="transition-box">
          .el-fade-in DONE
        </div>
      </transition>
    </div>
    <div style="width: 100%;">
      <el-button type="primary" @click="submitCmd" >下一步</el-button>
      <el-button type="primary" @click="submitCmd" >下一步</el-button>
    </div>
  </div>
</template>
<script>
// import Command from '../../entities/Command';
// // import Option from '../../entities/Option';
import EditBaseInfo from './EditBaseInfo.vue';
// import AddParam from './AddParam.vue';
// import AddOption from './AddOption.vue';
// import ListUtils from '../../entities/ListUtils';
// import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-cmd',
  components: {
    EditBaseInfo,
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
  },
  computed: {
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
  // height: 100px;
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
