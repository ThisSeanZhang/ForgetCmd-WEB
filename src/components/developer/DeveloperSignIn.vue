<template>
  <div>
    <el-form :model="loginform" label-position="top" :rules="rules"
    ref="loginForm"  label-width="80px">
      <el-form-item prop="nameOrEmail" >
        <el-input v-model="loginform.nameOrEmail" @focus="clearLogError"
        placeholder="昵称或者邮件地址"></el-input>
      </el-form-item>
      <el-form-item prop="pass" >
        <el-input v-model="loginform.pass" @focus="clearLogError"
        placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item v-if="false">
        记住我 &nbsp;&nbsp;&nbsp;<el-switch v-model="loginform.remeberme"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="developerLogin">登录</el-button>
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
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            min: 1, max: 16, message: '长度在 4 到 16 个字符', trigger: 'blur',
          },
          { validator: chepass },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
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
        if (error.response.status === 404) {
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
