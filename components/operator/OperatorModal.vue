<template>
  <div>
    <Modal
      :styles="{ top: '15vh', width: '450px', paddingLeft: '10px' }"
      v-model="moadlStatus"
      class="OperatorModal"
    >
      <p slot="header" class="text-center">{{ status == 'add' ? "新增" : "修改" }}操作員</p>
      <!-- 彈出視窗內文 -->
      <div class="page-setting-fix">
        <Form ref="modalData" :model="modalData" :label-width="120" :rules="ruleValidate">
          <FormItem prop="uname" label="操作员帐户" required>
            <Input v-model="modalData.uname" placeholder="操作员帐户" :disabled="action == 'edit'" />
          </FormItem>
          <FormItem prop="upass" label="操作员密码" :required="this.action == 'add' ? true : false">
            <Input type="password" v-model="modalData.upass" placeholder="操作员密码" password />
          </FormItem>
          <FormItem prop="name" label="操作员名称" required>
            <Input v-model="modalData.name" placeholder="操作员名称" />
          </FormItem>
          <FormItem prop="remark" label="备注">
            <Input type="textarea" v-model="modalData.remark" placeholder="备注" />
          </FormItem>
        </Form>
      </div>
      <div slot="footer" class="text-center OperatorModal-footer">
        <Button type="info" @click="formSubmit('modalData')">确定</Button>
        <Button type="error" @click="moadlStatus = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "OperatorModal",
  props: {
    action: { // add 新增 edit 修改
      type: String,
      default: "add"
    },
    status: {
      type: Boolean,
      default: false
    },
    editID: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      modalData: {
        uname: '',
        upass: '',
        name: '',
        remark: ''
      },
      ruleValidate: {
        uname: [{ required: true, message: "此栏不得为空", trigger: "blur" }],
        upass: [{ required: true, message: "此栏不得为空", trigger: "blur"}],
        name: [{ required: true, message: "此栏不得为空", trigger: "blur" }],
        // remark: [{ required: true, message: "此栏不得为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(['getUserLoid']),
    moadlStatus: {
      get () {
        if (this.action == 'edit') {
          delete this.ruleValidate.upass
          this.getEditData()
        } else {
          for(let key in this.modalData){
            this.modalData[key] = ""
          }
        }
        return this.status
      },
      set (val) {
        this.$emit('update:status', val)
      }
    },
  },
  methods: {
    formSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          if (this.action == 'add') {
            this.postAddOperator()
          } else if (this.action == 'edit') {
            this.postEditOperator()
          }
        } else {
          this.$Message.error("表单认证失败");
        }
      });
    },
    async postAddOperator () {
      try {
        const obj = {
          loid: this.getUserLoid,
          uname: this.modalData.uname,
          upass: this.modalData.upass,
          name: this.modalData.name,
          remark: this.modalData.remark,
        }
        const res = await this.$resources.operator.operad(obj)
        if (res.data.status.code === 1) {
          this.$Notice.success({title: "新增成功"});
          this.moadlStatus = false
          this.$emit('refreshOperator', true)
        }
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    },
    async getEditData () {
      try {
        const res = await this.$resources.operator.operupge(this.editID)
        const editRes = res.data.data[0]
        this.modalData.uname = editRes.username
        this.modalData.name = editRes.memname
        this.modalData.remark = editRes.remark
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    },
    async postEditOperator () {
      try {
        const obj = {
          loid: this.getUserLoid,
          opid: this.editID,
          upass: this.modalData.upass,
          name: this.modalData.name,
          remark: this.modalData.remark,
        }
        const res = await this.$resources.operator.operuppo(obj)
        console.log(res);
        if (res.data.status.code === 1) {
          this.$Notice.success({title: "修改成功"});
          this.moadlStatus = false
          this.$emit('refreshOperator', true)
        }
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    }
  }
};
</script>
<style lang="scss">
.OperatorModal {
  .OperatorModal-footer {
    .ivu-btn {
      width: 80px;
    }
  }
}
</style>