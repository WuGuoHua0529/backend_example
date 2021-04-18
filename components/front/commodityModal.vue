<template>
  <div>
    <Modal
      :styles="{ top: '10vh', width: '50%', paddingLeft: '10px'}"
      v-model="moadlStatus"
      class="userModal"
    >
      <p slot="header" class="text-center">修改商品資訊</p>
      <Form :model="data" ref="formValidate" :rules="ruleValidate" label-position="left" :label-width="100">
          <FormItem label="商品名稱 :" prop="name">
            <Input
              type="text"
              v-model="data.name"
              placeholder="请输入商品名稱"
            />
          </FormItem>
          <FormItem label="價錢 :" prop="money">
            <Input 
            type="text" 
            v-model="data.money" 
            placeholder="请输入價錢"
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
    data: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      ruleValidate: {
        // useracc: [{ required: true, message: "此栏不得为空", trigger: "blur" }],
        // username: [{ required: true, message: "此栏不得为空", trigger: "blur"}],
      },
    };
  },
  computed: {
    moadlStatus: {
      get () {
        return this.status
      },
      set (val) {
        this.$emit('update:status', val)
      }
    }
  },
  methods: {
    ValidateLongin (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.postInfor()
        } else {
          this.$Message.error("请填写完整資料");
        }
      });
    },
    async postInfor() {
      try {
        const obj = {
          key: this.data.key,
          name: this.data.name,
          money: this.data.money
        }
        await this.$api.front.setCommodityInfor(obj)
        this.moadlStatus = false
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>