<template>
  <div class="operator-page">
    <div class="operator-title page-title">操作员管理</div>
    <div class="operator-contant">
      <Button type="primary" @click="addOperator('add')">新增操作员</Button>
      <!-- <LidaTable class="gray-table" :propscolumns="columns" :data="operltData" :isSearch="false" /> -->
    </div>
    <OperatorModal :status.sync="moadlStatus" :action="actionStatus" :editID="editIDStatus" @refreshOperator="refreshList" />
    <!-- <OperatorLogModal :status.sync="logMoadlStatus" :opid="editIDStatus" :data="logData" /> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex"
export default {
  name: "operator-page",
  component: {
    // LidaTable: () => import("~/components/common/LidaTable.vue"),
    OperatorModal: () => import("~/components/operator/OperatorModal.vue"),
    // OperatorLogModal: () => import("~/components/operator/OperatorLogModal.vue"),
  },
  async asyncData ({app, error}) {
    try {
      const res = await app.$resources.operator.operlt()
      return { operltData: res.data }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: '网路异常：LRR001' })
    }
  },
  data() {
    return {
      actionStatus: '',
      moadlStatus: false,
      logMoadlStatus: false,
      editIDStatus: 0,
      logData: [],
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
          title: "状态",
          key: "state",
          align: "center",
          width: "95px",
          render: (h, params) => {
            let sta = params.row.state;
            if (sta == 1) {
              return h("span", {
                style: {
                  color: "green",
                }
              }, "啟用");
            } else {
              return h("span", {
                style: {
                  color: "red",
                }
              }, "停用");
            }
          },
        },
        {
          title: "封锁状态",
          key: "blockade",
          align: "center",
          width: "95px",
          render: (h, params) => {
            let sta = params.row.blockade;
            if (sta == 1) {
              return h("span", {
                style: {
                  color: "green",
                }
              }, "解锁");
            } else {
              return h("span", {
                style: {
                  color: "red",
                }
              }, "锁定");
            }
          },
        },
        {
          title: "最后更新时间",
          key: "updetm",
          align: "center",
        },
        {
          title: "啟用/停用",
          align: "center",
          width: "95px",
          render: (h, params) => {
            const actionBtn= h("Button", {
                props: {
                  type: params.row.state == 1 ? "error" : "success" ,
                  size: "small",
                },
                on: {
                  click: () => {
                    const action = params.row.state == 1 ? 0 : 1
                    this.postOpersaene(params.row.opid, action)
                  },
                },
            }, params.row.state == 1 ? "停用" : "啟用");
            return actionBtn
          }
        },
        {
          title: "解锁/锁定",
          align: "center",
          width: "95px",
          render: (h, params) => {
            const actionBtn= h("Button", {
                props: {
                  type: params.row.blockade == 1 ? "error" : "success" ,
                  size: "small",
                },
                on: {
                  click: () => {
                    const action = params.row.blockade == 1 ? 0 : 1
                    this.postOpersalkl(params.row.opid, action)
                  },
                },
            }, params.row.blockade == 1 ? "锁定" : "解锁");
            return actionBtn
          }
        },
        {
          title: "修改",
          width: "95px",
          align: "center",
          render: (h, params) => {
            return h("Button", {
              props: {
                  type: "primary",
                  size: "small",
                },
                on: {
                  click: () => {
                    this.editIDStatus = params.row.opid
                    this.addOperator('edit')
                  },
                },
            },"修改");
          }
        },
        {
          title: "日志",
          width: "95px",
          align: "center",
          render: (h, params) => {
            return h("Button", {
              props: {
                  type: "warning",
                  size: "small",
                },
                on: {
                  click: () => {
                    this.logMoadlStatus = true
                    this.getOperlog(params.row.opid)
                  },
                },
            },"日志");
          }
        },
      ]
    }
  },
  computed: {
    ...mapGetters(['getUserLoid']),
  },
  methods: {
    async postOpersaene (opid, actio) { //啟用
      try {
        console.log(8888);
        const obj = {
          loid: this.getUserLoid,
          opid: opid,
          actio: actio
        }
        const res = await this.$resources.operator.opersaene(obj)
        if (res.data.status.code === 1) {
          this.$nuxt.refresh()
        }
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    },
    async postOpersalkl (opid, actio) { //锁定
      try {
        const obj = {
          loid: this.getUserLoid,
          opid: opid,
          actio: actio
        }
        const res = await this.$resources.operator.opersalkl(obj)
        if (res.data.status.code === 1) {
          this.$nuxt.refresh()
        }
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    },
    async getOperlog (opid) {
      try {
        const res = await this.$resources.operator.operlog(opid)
        console.log(res);
        this.logData = res.data.data
      } catch (error) {
        console.error(error);
        this.$Notice.error({ title: `网路异常:(LLT003)` });
      }
    },
    addOperator (action) {
      this.moadlStatus = true
      this.actionStatus = action
    },
    refreshList () {
      this.$nuxt.refresh()
    }
  }
};
</script>

<style lang="scss">
.operator-page {
}
</style>