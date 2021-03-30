<template>
    <div class="user-page">
      <div class="user-title page-title">使用者设定</div>
      <PageTable
        class="gray-table"
        :columns="columns"
        :data="tableData"
      />
      <userModal :status.sync="logMoadlStatus" :editID="editIDStatus" @refresh="refreshApi" />
    </div>
</template>
<script>
export default {
  name: "user-page",
  components: {
    PageTable: () => import("~/components/common/PageTable.vue"),
    userModal: () => import("~/components/user/userModal.vue"),
  },
  async asyncData ({app, error}) {
    try {
      const res = await app.$api.user.userList()
      console.log(res);
      return { tableData:  res.data.list }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: 'api错误！' })
    }
  },
  data() {
    return {
      editIDStatus: '',
      logMoadlStatus: false,
      columns: [
        {
          title: "使用者帐号",
          key: "user",
          align: "center",
        },
        {
          title: "使用者姓名",
          key: "name",
          align: "center",
        },
        {
          title: "ip",
          key: "ip",
          align: "center",
        },
        {
          title: "登入日期",
          key: "logdate",
          align: "center",
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            const login = params.row.status == 1 ? "登入" : "尚未登入"
            const textColor = params.row.status == 1 ? "green" : "red"
            return h("span", { style:{ color: textColor } }, login)
          }
        },
        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            const edit = h("Button", 
              {
                style: { marginRight: "10px" },
                props:{ type: "primary", size: "small" },
                on: {
                  click: () => {
                    this.logMoadlStatus = true
                    this.editIDStatus = params.row.key
                  },
                },
              }
            , "修改")
            const log = h("Button", 
              {
                style: { marginRight: "10px" },
                props:{ type: "error", size: "small" },
                on: {
                  click: () => {
                    this.$router.push({name: 'main-user-userLog', query:{ id: params.row.key } })
                  },
                },
              }
            , "登入纪录")
            return h("div", [edit, log]);
          }
        },
      ]
    }
  },
  methods: {
    refreshApi () {
      console.log(8887);
      this.$nuxt.refresh()
    }
  }
}
</script>
<style lang="scss">
.user-page {
}
</style>