<template>
<el-card
  v-loading="cmdLoading.doing"
  shadow="hover">
  <div @click="expand = !expand" class="command-table-head">
    <el-row :gutter="20">
      <el-col :span="6">{{cmd.commandName}}</el-col>
      <el-col :span="2">{{cmd.version}}</el-col>
      <el-col :span="12">{{cmd.briefDesc[currentLang]}}</el-col>
    </el-row>
    <!-- <div class="cmd-info-bar">
      <div>{{cmd.commandName}}</div>
      <div>版本: {{cmd.version}}</div>
      <div>简述: {{cmd.briefDesc[currentLang]}}</div>
    </div> -->
    <div class="operator" @click.stop>
      <el-tooltip class="item" effect="dark"
      :content="$t('other.btn.jump-to-padding')"
      placement="top">
        <i style="padding: 3px 3px" @click="goToPadding" class="el-icon-position"></i>
      </el-tooltip>
      <!-- 停用按钮 -->
      <el-popover
        placement="top"
        width="140"
        v-model="btn.pauseCmd">
        <p>{{$t('other.pause.message.ask')}}</p>
        <div  style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="btn.pauseCmd = false">
            {{$t('other.btn.cancel')}}
          </el-button>
          <el-button type="primary" size="mini" @click="confirmPause()">
            {{$t('other.btn.ok')}}
          </el-button>
        </div>
        <el-tooltip class="" effect="dark"
        :content="$t('other.btn.pause')" placement="top"
        :disabled="btn.pauseCmd"
        slot="reference" >
          <i style="padding: 3px 3px" class="el-icon-video-pause"></i>
        </el-tooltip>
      </el-popover>
      <!-- <span class="head-arrow">
        <i :class="expand ? 'el-icon-arrow-down' : 'el-icon-arrow-left'"></i>
      </span> -->
    </div>
  </div>
  <el-collapse-transition  >
    <div v-show="expand">
      {{cmd}}
    </div>
  </el-collapse-transition>
</el-card>
</template>
<script>
import { mapGetters } from 'vuex';
import { ajax, wantNothing } from '@/api/fetch';
import Command from '../../entities/Command';

export default {
  name: 'command-table-item',
  props: {
    cmd: {
      type: Command,
      default: () => new Command({}),
    },
  },
  data() {
    return {
      expand: false,
      btn: {
        pauseCmd: false,
      },
      cmdLoading: {
        doing: false,
        success: false,
      },
    };
  },
  computed: {
    currentLang() {
      return this.$i18n.locale || 'zh';
    },
    ...mapGetters('Language', ['allLangs']),
  },
  methods: {
    confirmPause() {
      this.btn.pauseCmd = false;
      const request = {
        method: 'PUT',
        url: `manager/cmds/${this.cmd.cid}/status/pause`,
      };
      ajax(request, this.cmdLoading).then((resp) => {
        this.$emit('updateCmd', Command.fromObj(resp.data.data));
      }).catch(wantNothing);
    },
    goToPadding() {
      const routeUrl = this.$router.resolve({
        path: `/cmd/padding/${this.cmd.cid}`,
      });
      window.open(routeUrl.href, '_blank');
    },
  },
};
</script>
<style lang="scss" scoped>
.command-table-head{
  display: flex;
  justify-content: space-between;
}
.el-card{
  margin: 10px 0px;
}
.cmd-info-bar{
}
.el-row{
  flex: 1;
}
</style>
