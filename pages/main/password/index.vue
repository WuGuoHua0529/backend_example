<template>
  <div class="password-page">
    <div class="password-title page-title">修改密码</div>
    <div class="password-form">
      <Form :label-width="150" :label-position="'left'" ref="pwuForm" :model="pwuForm" :rules="ruleValidate">
        <FormItem label="舊密码" :label-width="100" prop="oldpwu">
          <Input 
          type="password" 
          v-model="pwuForm.oldpwu" 
          password
          />
        </FormItem>
        <FormItem label="新密码" :label-width="100" prop="newpwu">
          <Input 
          type="password" 
          v-model="pwuForm.newpwu"
          password
          />
        </FormItem>
        <FormItem label="确认密码" :label-width="100" prop="checkpwu">
          <Input 
          type="password" 
          v-model="pwuForm.checkpwu"
          password
          />
        </FormItem>
        <FormItem class="btm">
          <Button type="primary" @click="validatePwuChange('pwuForm')">确认</Button> 
        </FormItem>
      </Form>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "password-page",
  data() {
    const checkpwuAction = (rule, value, callback) => {
      if (this.pwuForm.newpwu != value) {
        callback(new Error('请检查新密码与确认密码！'))
      } else {
        callback()
      }
    }
    return {
      pwuForm : {
        oldpwu: "",
        newpwu: "",
        checkpwu: "",
      },
      ruleValidate: {
        oldpwu: [
          { required: true, message: "此栏不得为空", trigger: "blur" },
        ],
        newpwu: [
          { required: true, message: "此栏不得为空", trigger: "blur" },
        ],
        checkpwu: [
          { required: true, validator: checkpwuAction, trigger: "blur" },
        ]
      },
    };
  },
  computed: {
    ...mapGetters(['getUserLoid']),
  },
  methods: {
    validatePwuChange (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.changePwuApi()
        } else {
          this.$Message.error("表单认证失败，请确栏位");
        }
      });
    },
    async changePwuApi () {
      try {
          const obj = {
            loid: this.getUserLoid,
            oldpass: this.pwuForm.oldpwu,
            pass: this.pwuForm.newpwu
          }
          let res = await this.$resources.common.pwu(obj)
          if (res.status.code == 1) {
            this.$Notice.success({title: "修改成功"});
            this.$router.push({ name: "main-index-path-choose" });   
          }
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    }
  },
};
</script>

<style lang="scss">
.password-page {
  .password-form {
    display: flex;
    justify-content: center;
  }
  .ivu-form {
    width: 25%;
  }
}
</style>