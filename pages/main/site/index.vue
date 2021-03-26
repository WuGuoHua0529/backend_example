<template>
    <div class="seo-seting-page">
      <div class="seo-seting-title page-title">SEO设定</div>
      <LidaTable class="gray-table" :propscolumns="columns" :data="tableData" :isSearch="false" :sortStatus="false" />
    </div>
</template>
<script>
export default {
  name: "site-page",
  components: {
    LidaTable: () => import("~/components/common/LidaTable.vue"),
  },
  async asyncData ({app, error}) {
    try {
      const res = await app.$api.site.siteList()
      console.log(res);
      return { tableData:  res.data.list }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: 'api错误！' })
    }
  },
  data() {
    return {
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
                    // this.$router.push({name: 'main-seo-seting-site-pag-site', params:{ site: params.row.siteId} })
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
                    // this.$router.push({name: 'main-seo-seting-site-pag-site', params:{ site: params.row.siteId} })
                  },
                },
              }
            , "登入纪录")
            return h("div", [edit, log]);
          }
        },
      ]
    }
  }
}
</script>
<style lang="scss">
.seo-seting-page {
}
</style>