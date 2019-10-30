<template>
  <div class="main-container">
    <div style="width: 100%;">
      {{stepConfig}}
      <el-steps :active="stepConfig.active" :finish-status="stepConfig.finish">
        <el-step v-for="(step, index) in stepsInfos"
          :key="index" :status="step.status" :title="step.title"></el-step>
      </el-steps>
    </div>
    <div class="page-container">
      <transition name="fade" mode="in-out">
        <div
          v-show="currentStep === procedure.BASE_INFO" class="transition-box">
          <edit-base-info v-model="cmd"></edit-base-info>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="2"
          v-show="currentStep === procedure.PARAMS_INFO" class="transition-box">
          <edit-param-info v-model="cmd.params"></edit-param-info>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="3" v-show="currentStep === procedure.OPTIONS_INFO" class="transition-box">
          <el-scrollbar style="height: 100%;">
          <edit-option-info v-model="cmd.options"></edit-option-info>
          </el-scrollbar>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="4" v-show="currentStep === procedure.PER_VIEW" class="transition-box">
          <el-scrollbar style="height: 100%;">
            <command-panel v-bind:inCmd="cmd"></command-panel>
          </el-scrollbar>
        </div>
      </transition>
      <transition name="fade"  mode="in-out">
        <div key="5" v-show="currentStep === procedure.DONE" class="transition-box">
          <div class="share-panel">
            <div>提交成功</div>
            <div>
              <span>{{shareUrl}}</span>
              <el-tooltip effect="dark" content="复制" placement="top">
                <el-button
                  type="info"
                  plain
                  v-clipboard:copy="shareUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"
                  icon="el-icon-copy-document">
                </el-button>
              </el-tooltip>
              <el-tooltip effect="dark" content="转到" placement="top">
                <el-button
                  type="info"
                  plain
                  @click="gotoPerView"
                  icon="el-icon-s-promotion">
                </el-button>
              </el-tooltip>
            </div>
            <div>
              <el-button
                plain
                type="primary"
                @click="reflashPage"
              >再添加一个</el-button>
              <el-button
                type="primary"
                @click="gotoMainPage"
              >去搜索</el-button>
            </div>
          </div>
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
        v-show="currentStep === procedure.PER_VIEW" type="primary"
        style="float: right;"
        @click="submitCmd"
        >提交</el-button>
    </div>
    <!-- {{cmd}} -->
  </div>
</template>
<script>
import Command from '../../entities/Command';
import EditOptionInfo from './EditOptionInfo.vue';
import EditBaseInfo from './EditBaseInfo.vue';
import EditParamInfo from './EditParamInfo.vue';
import CommandPanel from '../command/CommandPanel.vue';
import { wantNothing } from '../../api/fetch';

export default {
  name: 'add-cmd',
  components: {
    EditBaseInfo,
    EditParamInfo,
    EditOptionInfo,
    CommandPanel,
  },
  data() {
    return {
      cmd: new Command({}),
      procedure: {
        BASE_INFO: Symbol('start add status'),
        PARAMS_INFO: Symbol('add params'),
        OPTIONS_INFO: Symbol('add options'),
        PER_VIEW: Symbol('per view'),
        DONE: Symbol('Done!'),
      },
      currentStep: null,
      // stepConfig: {
      //   active: 0,
      //   finish: 'success',
      // },
      stepsInfos: [],
      ccid: null,
    };
  },
  methods: {
    submitCmd() {
      Command.createCommit(this.cmd).then((resp) => {
        console.log(JSON.stringify(resp));
        this.ccid = resp.data.data.ccid;
        this.$message('添加成功');
        this.currentStep = this.procedure.DONE;
      }).catch(wantNothing);
    },
    nextStep() {
      const index = Object.values(this.procedure).indexOf(this.currentStep);
      // this.stepConfig.active = index + 1;
      this.currentStep = Object.values(this.procedure)[index + 1];
    },
    perStep() {
      const index = Object.values(this.procedure).indexOf(this.currentStep);
      // this.stepConfig.active = index - 1;
      this.currentStep = Object.values(this.procedure)[index - 1];
    },
    onCopy() {
      this.$notify({
        title: '复制成功',
        type: 'success',
      });
    },
    onError() {
      this.$notify.error({
        title: '复制失败！',
      });
    },
    gotoPerView() {
      this.$router.push({ path: `/commits/cmds/${this.ccid}` });
    },
    gotoMainPage() {
      this.$router.push({ path: '/' });
    },
    reflashPage() {
      this.$router.go(0);
    },
    initStep() {
      return [{
        status: '',
        title: '基本信息',
      }, {
        status: '',
        title: '参数',
      }, {
        status: '',
        title: '可选项',
      }, {
        status: '',
        title: '预览',
      }, {
        status: '',
        title: '结果',
      }];
    },
  },
  computed: {
    hasNext() {
      return this.currentStep !== this.procedure.DONE
        && this.currentStep !== this.procedure.PER_VIEW;
    },
    hasPer() {
      return this.currentStep !== this.procedure.BASE_INFO
        && this.currentStep !== this.procedure.DONE;
    },
    stepConfig() {
      return {
        active: Object.values(this.procedure).indexOf(this.currentStep),
        finish: 'success',
      };
    },
    shareUrl() {
      return `${window.location.href.replace(this.$route.path, '')}/commits/cmds/${this.ccid}`;
    },
  },
  created() {
    this.currentStep = this.procedure.BASE_INFO;
    console.log(this.currentStep);
    console.log(this.procedure.BASE_INFO);
    console.log(this.currentStep === this.procedure.BASE_INFO);
    this.stepsInfos = this.initStep();
  },
};
</script>
<style lang="scss" scoped>
.share-panel{
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div{
    display: flex;
    // width: 100%;
    // padding: 0xp 30px;
    span{
      line-height: 40px;
      margin-right: 30px;
    }
  }
}
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
