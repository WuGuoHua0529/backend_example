<template>
  <div>
    <Modal
      :styles="{ top: '10vh', width: '50%', paddingLeft: '10px'}"
      v-model="moadlStatus"
      class="userModal"
    >
      <p slot="header" class="text-center">修改使用者</p>
      <Form :model="modalData" ref="formValidate" :rules="ruleValidate" label-position="left" :label-width="100">
          <FormItem label="使用者帐号 :" prop="useracc">
            <Input
              type="text"
              v-model="modalData.useracc"
              placeholder="请输入帳号"
            />
          </FormItem>
          <FormItem label="使用者姓名 :" prop="username">
            <Input 
            type="text" 
            v-model="modalData.username" 
            placeholder="请输入姓名"
            />
          </FormItem>
      </Form>
      <div slot="footer" class="text-center">
        <Button type="warning" @click="ValidateLongin('formValidate')">确定</Button>
        <Button type="info" @click="moadlStatus = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "userModal",
  props: {
    status: {
      type: Boolean,
      default: false
    },
    editID: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      modalData: {
        useracc: '',
        username: ''
      },
      ruleValidate: {
        // useracc: [{ required: true, message: "此栏不得为空", trigger: "blur" }],
        // username: [{ required: true, message: "此栏不得为空", trigger: "blur"}],
      },
    };
  },
  computed: {
    moadlStatus: {
      get () {
        if (this.status) {
          this.getapi()
        } else {
          this.modalData.useracc = ''
          this.modalData.username = ''
        }
        return this.status
      },
      set (val) {
        this.$emit('update:status', val)
      }
    }
  },
  methods: {
    async getapi() {
      try {
        const res = await this.$api.user.userList()
        const editdata = res.data.list.find(it => it.key == this.editID)
        this.modalData.useracc = editdata.user
        this.modalData.username = editdata.name
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss">
.userModal {
}
</style>