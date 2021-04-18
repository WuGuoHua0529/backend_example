<template>
  <div class="login-page">
    <Header>
      <h2 class="white-text">後台系統 - BACKEND SYSTEM</h2>
    </Header>
    <div class="login-page-row">
      <h1 class="login-site-title">SHOP - 後台</h1>
      <div class="login-form">
        <Form :model="login" ref="formValidate" :rules="ruleValidate">
          <FormItem label="帐号 :" prop="username">
            <Input
              type="text"
              v-model="login.username"
              placeholder="请输入帳号"
              @on-enter="ValidateLongin('formValidate')"
            />
          </FormItem>
          <FormItem label="密码 :" prop="password">
            <Input 
            type="password" 
            v-model="login.password" 
            placeholder="请输入密碼"
            password
            @on-enter="ValidateLongin('formValidate')"
            />
          </FormItem>
          <FormItem class="btm">
            <Button type="warning" @click="ValidateLongin('formValidate')">登入</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login-page",
  layout: 'login',
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      ruleValidate: {
        username: [
          { required: true, message: "此栏不得为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "此栏不得为空", trigger: "blur" },
        ]
      },
    };
  },
  methods: {
    async longin() {
      try {
        const obj = {
          uname: this.login.username,
          upass: this.login.password,
        };
        this.$cookies.removeAll();
        let res = await this.$api.login.loginUser(obj);
        if (res.data) {
          this.$cookies.set('USER_NAME', '暂时登入人', {maxAge: 60 * 60 * 24})
          await this.$router.push({ name: "main-information" });
        }
      } catch (error) {
        this.$Notice.error({ title: `登入错误！` });
      }
    },
    ValidateLongin (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.longin()
        } else {
          this.$Message.error("请填写完整帐号/密码");
        }
      });
    }
  }
}
</script>
<style lang="scss">
html,
body {
  height: 100%;
}
.login-page {
  min-height: 100%;
  .login-title {
    color: #fff;
  }
  .ivu-layout-header {
    background-color: #515a6e;
  }
  .login-page-row {
    text-align: center;
    .login-site-title {
      padding: 2% 0;
    }
    .login-form {
      display: flex;
      justify-content: center;
      .ivu-form {
        .ivu-form-item-content {
          float: left;
        }
        .btm {
          margin-left: 80px;
        }
      }
    }
  }
}
</style>
