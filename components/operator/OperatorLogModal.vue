<template>
  <div>
    <Modal
      :styles="{ top: '5vh', width: '80%', paddingLeft: '10px'}"
      v-model="moadlStatus"
      class="OperatorLogModal"
    >
      <p slot="header" class="text-center">操作日志</p>
      <LidaTable class="gray-table" :propscolumns="columns" :data="data" :isSearch="false" />
      <div slot="footer" class="text-center">
        <Button type="info" @click="moadlStatus = false">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "OperatorLogModal",
  component: {
    LidaTable: () => import("~/components/common/LidaTable.vue"),
  },
  props: {
    status: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      columns: [
        {
          title: "帐号",
          key: "username",
          align: "center",
        },
        {
          title: "名称",
          key: "memname",
          align: "center",
        },
        {
          title: "登入IP",
          key: "ip",
          align: "center",
        },
        {
          title: "装置",
          width: 320,
          key: "browser",
          align: "center",
        },
        {
          title: "国家",
          key: "country",
          align: "center",
        },
        {
          title: "登入时间",
          width: 180,
          key: "logdate",
          align: "center",
        },
        {
          title: "登出时间",
          width: 180,
          key: "outdate",
          align: "center",
        },
        {
          title: "登出入说明",
          key: "explain	",
          align: "center",
        }
      ]
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
  }
};
</script>

<style lang="scss">
.OperatorLogModal {
}
</style>