<template>
    <div class="userLog-page">
      <div class="userLog-title page-title">登入纪录</div>
      <Button type="primary" :to="{ name: 'main-user' }">返回</Button>
      <PageTable
        class="gray-table"
        :columns="columns"
        :data="tableData"
      />
    </div>
</template>
<script>
export default {
  name: "user-userLog",
  components: {
    PageTable: () => import("~/components/common/PageTable.vue"),
  },
  async asyncData ({app, route, error}) {
    try {
      const res = await app.$api.user.userLogList()
      const data = res.data.find(it => it.key == route.query.id)
      return { tableData:  data.logRecord }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: 'api错误！' })
    }
  },
  data() {
    return {
      columns: [
        {
          title: "登入时间",
          key: "logStart",
          align: "center",
        },
        {
          title: "登出时间",
          key: "logEnd",
          align: "center",
        },
      ]
    }
  }
}
</script>
<style lang="scss">
.userLog-page {
}
</style>