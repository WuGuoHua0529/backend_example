<template>
  <div class="information-page">
    <div class="information-title page-title">登入资讯</div>
    <div class="information-online-row">
      <div>
        <p class="information-online-title mb-2">前台-在线人数</p>
        <div class="information-online-people">
          <Icon type="md-contacts" />
          <div class="ml-2">29,5187</div>
        </div>
      </div>
      <div>
        <p class="information-online-title mb-2">后台-在线管理员</p>
        <div class="information-online-people">
          <Icon type="md-contact" />
          <div class="ml-2">2</div>
        </div>
      </div>
    </div>
    <p class="information-online-title my-5">历史造访统计</p>
    <v-chart :options="option" style="width:100%;" />
  </div>
</template>
<script>
import ECharts from 'vue-echarts'
export default {
  name: "information-page",
  components: {
    'v-chart': ECharts,
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
      option:{
        color: ['#c23531','#2f4554'],
        calculable: true,
        grid: {
            top: '12%',
            left: '10%',
            right: '10%',
            containLabel: true
        },
        xAxis: [
          {   
            name: '小时',
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
            {
              name: '人数',
              type: 'value',
            }
        ],
        dataZoom: [
          {
              show: true,
              start: 0,
              end: 100
          },
        ],
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }
        ]
      }
    }
  }
}
</script>
<style lang="scss">
.information-page {
  .information-online-row {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .information-online-title {
    font-weight: bold;
    font-size: 24px;
  }
  .information-online-people {
    font-size: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
    width: 150px;
    background-color: #DCDCDC;
  }
}
</style>