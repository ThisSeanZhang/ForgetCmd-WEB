<template>
  <div>
    <el-form :model="registerForm" label-position="top" ref="register_form"
    :rules="rules"  label-width="80px">
      <el-form-item prop="nickName">
        <el-input v-model="registerForm.nickName" @focus="clearLogError"
        placeholder="昵称"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input v-model="registerForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <el-input v-model="registerForm.pass" placeholder="密码" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="confirmPass">
        <el-input v-model="registerForm.confirmPass" placeholder="确认密码" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="developerRegister">注册</el-button>
      </el-form-item>
    </el-form>
    <!-- <div class="forget"><span>忘记密码</span> </div> -->
  </div>
</template>

<script>
// import axios from 'axios'
import { Loading } from 'element-ui';
import { ajax, just404, wantNothing } from '../../api/fetch';

export default {
  name: 'register',
  props: ['value'],
  data() {
    const developerNameValidator = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入昵称'));
      } else if (this.developerNameExist) {
        callback(new Error('昵称已存在'));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.registerForm.confirmPass !== '') {
          this.$refs.register_form.validateField('confirmPass');
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        nickName: '',
        email: '',
        confirmPass: '',
        pass: '',
      },
      developerNameExist: false,
      rules: {
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          {
            min: 4, max: 16, message: '长度在 4 到 16 个字符', pattern: /^[a-zA-Z_\-!@#0-9=]{4,16}$/, trigger: 'blur',
          },
          { validator: developerNameValidator },
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            message: '长度在6到16个字符,只允许出现_-=!@#以及数字和字母', pattern: /^[a-zA-Z_\-!@#0-9=]{6,16}$/, trigger: 'blur',
          },
          { validator: validatePass, trigger: 'blur' },
        ],
        confirmPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            message: '长度在6到16个字符,只允许出现_-=!@#以及数字和字母', pattern: /^[a-zA-Z_\-!@#0-9]{6,16}$/, trigger: 'blur',
          },
          { validator: validatePass2, trigger: 'blur' },
        ],
        email: [
          {
            type: 'email', required: true, message: '邮箱格式不正确', trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    developerRegister() {
      this.$refs.register_form.validate((isAllPass) => {
        if (isAllPass) {
          const loding = Loading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(255, 255, 255, 0.6)',
          });
          const request = {
            method: 'GET', url: `developers/developer-name/${this.registerForm.nickName}`,
          };
          ajax(request).then(() => {
            // console.log(resp)
            this.developerNameExist = true;
            this.$refs.register_form.validateField('nickName');
            this.$message('当前用户名已存在(●ˇ∀ˇ●)');
            loding.close();
          }).catch((error) => {
            just404(error).then(this.sendRegisterInfo);
            loding.close();
          });
        }
      });
    },
    clearLogError() {
      this.developerNameExist = false;
      this.$refs.register_form.validateField('nickName');
    },
    sendRegisterInfo() {
      const request = { method: 'POST', url: 'developers', data: this.registerForm };
      return ajax(request).then((resp) => {
        console.log(resp);
        this.$message({ type: 'success', message: '注册成功[]~(￣▽￣)~*' });
        this.$emit('input', true);
      }).catch(wantNothing);
    },
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
