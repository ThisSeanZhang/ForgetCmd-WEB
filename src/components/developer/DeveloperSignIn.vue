<template>
  <div>
    <el-form :model="loginform" label-position="top" :rules="rules"
    ref="loginForm"  label-width="80px">
      <el-form-item prop="nameOrEmail" >
        <el-input v-model="loginform.nameOrEmail" @focus="clearLogError"
        :placeholder="$t('page.signIn.name-or-email')"></el-input>
      </el-form-item>
      <el-form-item prop="pass" >
        <el-input v-model="loginform.pass" @focus="clearLogError"
        :placeholder="$t('page.signIn.pass')" type="password"></el-input>
      </el-form-item>
      <el-form-item v-if="false">
        {{$t('page.signIn.rember-me')}} &nbsp;&nbsp;&nbsp;
        <el-switch v-model="loginform.remeberme"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="developerLogin">{{$t('other.btn.sign-in')}}</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="forget"><span>忘记密码</span> </div> -->
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
import { Loading } from 'element-ui';
import { ajax } from '../../api/fetch';

const { mapState, mapActions } = createNamespacedHelpers('UserInfo');

export default {
  name: 'sign-in',
  props: ['value'],
  data() {
    const chepass = (rule, value, callback) => {
      if (!this.loginPass) {
        callback(new Error('用户名或密码错误'));
      } else {
        callback();
      }
    };
    return {
      loginform: {
        nameOrEmail: '',
        pass: '',
        remeberme: false,
      },
      loginPass: true,
      rules: {
        nameOrEmail: [
          { required: true, message: this.$t('page.signIn.please-input-name-or-email'), trigger: 'blur' },
          {
            min: 1, max: 16, message: this.$t('page.signIn.limit-length-4-6'), trigger: 'blur',
          },
          { validator: chepass },
        ],
        pass: [
          { required: true, message: this.$t('page.signIn.please-input-pass'), trigger: 'blur' },
          { validator: chepass },
        ],
      },
    };
  },
  methods: {
    developerLogin() {
      this.$refs.loginForm.validate((isAllPass) => {
        if (isAllPass) {
          const loding = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(255, 255, 255, 0.6)',
          });
          const request = { method: 'POST', url: 'sessions', data: this.loginform };
          ajax(request).then((resp) => {
            console.log(resp);
            // TODO 登入成功后的相应操作
            this.$message('登入成功o(￣▽￣)ｄ');
            this.setUserInfo(resp.data.data);
            this.$emit('login:success', this.developerId);
            loding.close();
          }).catch((error) => {
            this.whenErrorMessage(error, () => {
              console.log('login fail');
              this.$message.warning('用户名或密码错误(●ˇ∀ˇ●)');
              this.loginPass = false;
              this.$refs.loginForm.validateField(['developerNameOrEmail', 'pass']);
            });
            loding.close();
          });
        }
      });
    },
    clearLogError() {
      this.loginPass = true;
      this.$refs.loginForm.validateField(['developerNameOrEmail', 'pass']);
    },
    whenErrorMessage(error, dowhat) {
      if (error.response) {
        if ([404, 400].includes(error.response.status)) {
          dowhat();
        }
      } else if (error.request) {
        // console.log(error.request)
        this.$message.error('发送失败请检查网络连接╮（╯＿╰）╭');
      } else {
        console.log('Error', error.message);
        this.$message('欸，好像出错了_(:з)∠)_，再试一次吧');
      }
    },
    ...mapActions(['setUserInfo']),
  },
  computed: {
    ...mapState(['developerId']),
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  padding: 20px 10px;
  .el-form-item {
    .el-button{
      width: 100%;
    }
  }
}
</style>
