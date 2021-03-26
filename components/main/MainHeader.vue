<template >
  <Header class="main-header">
    <p>
      <Dropdown v-for="(it, idx) in items" :key="idx" v-if="it.show">
        <nuxt-link
          :to="it.child ? {} : { name: it.linkName }"
          class="nuxt-link-btn"
        >
          {{ it.title }}
        </nuxt-link>
        <DropdownMenu slot="list" v-if="it.child">
          <DropdownItem v-for="(cit, cidx) in it.child" :key="'c' + cidx">
            <nuxt-link :to="{ name: cit.linkName }">
              {{ cit.title }}
            </nuxt-link>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </p>
  </Header>
</template>
<script>
export default {
  name: "main-header",
  computed: {
    items () {
      let items = [
        {
          title: '游戏管理', linkName: 'game', show: true,
          child: [
            { title: '赛程表', linkName: 'game-schedule', show: true },
            { title: '采种管理', linkName: 'game-lotteryType', show: true },
            { title: '风控设定', linkName: 'game-riskControl', show: true },
            { title: '即时注单', linkName: 'game-instantbet', show: true },
            { title: '期数管理', linkName: 'game-period', show: true },
            { title: '开奖结果', linkName: 'game-lotteryResult', show: true },
          ]
        },
        {
          title: '营商管理', linkName: 'business', show: true,
          child: [
            { title: '营商主站', linkName: 'business-mainStation', show: true },
            { title: '营商子站', linkName: 'business-subStation', show: true },
            { title: '限额模版', linkName: 'business-quotaTemplate', show: true },
            { title: '赔率模版', linkName: 'business-oddsTemplate', show: true },
            { title: '限红模版', linkName: 'business-redTemplate', show: true },
          ]
        },
        { title: '会员管理', linkName: 'member', show: true, },
        { title: '钱包日志', linkName: 'wallet', show: true, },
        { title: '报表', linkName: 'report', show: true, },
        { title: '公告管理', linkName: 'announcement', show: true, },
        { title: '帐号管理', linkName: 'account', show: true, },
        {
          title: '网路管理', linkName: 'network', show: true,
          child: [
            { title: '线路伺服器', linkName: 'business-lineServer', show: true },
            { title: '黑白名单', linkName: 'business-accessList', show: true },
            { title: '系统维运', linkName: 'business-maintenance', show: true },
          ]
        },
      ]
      return items
    },
  },
  methods: {},
};
</script>
<style lang="scss">
.main-header {
  height: auto;
  line-height: normal;
  padding: 10px 50px;
  padding-bottom: 5px;
  .nuxt-link-btn {
    text-align: center;
    display: inline-block;
    padding: 5px 16px;
    border-radius: 5px;
    border: solid 1px #fff;
    margin-left: 5px;
    min-width: 80px;
  }
}
</style>