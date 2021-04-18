<template>
  <div class="commodity-page">
    <div class="commodity-title page-title">商品管理</div>
    <Select v-model="upStatus" style="width:200px">
        <Option v-for="item in upList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Button type="primary" @click="upSave">修改上/下架</Button>
    <PageTable
        class="gray-table"
        :columns="columns"
        :data="tableData"
    />
    <commodityModal :status.sync="commodityMoadlStatus" :data="commodityInfor" />
  </div>
</template>
<script>
export default {
  name: "commodity-page",
  components: {
    commodityModal: () => import("~/components/front/commodityModal.vue"),
  },
  async asyncData ({app, error}) {
    try {
      const res = await app.$api.front.commodity()
      console.log(res);
      return { tableData:  res.data.list }
    } catch (err) {
      console.log(err);
      error({ statusCode: 500, message: 'api错误！' })
    }
  },
  data() {
    return {
      commodityMoadlStatus: false,
      commodityInfor:{
        key: 1,
        check: false,
        name: '韓系刷毛大衣',
        money: 2600,
        up: true,
      },
      allCheck: false,
      upStatus: 1,
      upList: [
        { label: '上架', value: 1 },
        { label: '下架', value: 2 }
      ],
      columns: [
        {
          width: 60,
          key: "memname",
          align: "center",
          size: "small",
          renderHeader: (h, params) => {
            let _self = this 
            return h("Checkbox", {
              props: {
                value: _self.allCheck,
              },
              on: {
                "on-change": (value) => {
                  _self.allCheck = value
                  this.tableData.forEach((it) => {
                    it.check = value;
                  });
                },
              },
            });
          },
          render: (h, params) => {
            let _self = this 
            return h("Checkbox", {
              props: {
                value: params.row.check,
              },
              on: {
                "on-change": (value) => {
                  this.tableData.forEach(it => {
                    if (it.key == params.row.key) {
                      it.check = !it.check
                      let inputCheck = this.tableData.some(it => it.check == true);
                      if (!inputCheck) {
                        _self.allCheck = false
                      }
                    }
                  })
                },
              },
            });
          }
        },
        {
          title: "商品名稱",
          key: "name",
          align: "center",
        },
        {
          title: "價錢",
          key: "money",
          align: "center",
        },
        {
          title: "上 / 下架",
          key: "up",
          align: "center",
          render: (h, params) => {
            const login = params.row.up ? "上架" : "下架"
            const textColor = params.row.up ? "green" : "red"
            return h("span", { style:{ color: textColor } }, login)
          }
        },
        {
          title: "修改資訊",
          key: "edit",
          align: "center",
          render: (h, params) => {
           const edit = h("Button", 
              {
                style: { marginRight: "10px" },
                props:{ type: "primary", size: "small" },
                on: {
                  click: () => {
                    this.commodityMoadlStatus= true
                    this.commodityInfor = params.row
                  },
                },
              }
            , "修改")
            return h("div", [edit]);
          }
        },
      ],
    }
  },
  methods: {
    async upSave() {
      try {
        let changeArray = []
        this.tableData.forEach(item => {
          if(item.check) changeArray.push(item.key)
        })
        const obj = {
          status: this.upStatus,
          changeArray: changeArray
        };
        await this.$api.front.setCommodity(obj);
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error);
        this.$Notice.error({ title: `設置錯誤!` });
      }
    },
    async inforSave() {
      try {
        let changeArray = []
        this.tableData.forEach(item => {
          if(item.check) changeArray.push(item.key)
        })
        const obj = {
          status: this.upStatus,
          changeArray: changeArray
        };
        await this.$api.front.setCommodity(obj);
        await this.$nuxt.refresh()
      } catch (error) {
        console.log(error);
        this.$Notice.error({ title: `設置錯誤!` });
      }
    },
  }
};
</script>
<style lang="scss">

</style>