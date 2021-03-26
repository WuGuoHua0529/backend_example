<template>
  <Row>
    <Col span="12">
      <Button class="backBtn" type="primary" @click="backBtn" v-if="isBackBtn">
        <Icon type="ios-arrow-back" />返回
      </Button>
      <Checkbox v-model="tableShow" v-if="isCheckbox">額外欄位</Checkbox>
      <slot name="headerSelect"></slot>
      <span v-show="LeaveSpace">&nbsp</span>
    </Col>
    <Col span="12" class="text-right" v-if="isSearch">
      搜尋:
      <Input v-model="searchInput" style="width: 150px" />
    </Col>
    <Col span="24">
      <Table
        class="lida-table my-1"
        :columns="columns"
        :data="historyData"
        :row-class-name="rowClassName"
        @on-sort-change="sortColum"
        @on-row-click="rowClick"
      >
        <div slot="header" v-if="isHeader">
          <slot name="headerTitle"></slot>
        </div>
      </Table>
    </Col>
    <Col span="24" class="mt-1" v-if="page">
      <Page
        ref="pages"
        class="text-right"
        show-sizer
        show-total
        :current.sync="current"
        :total="total"
        :page-size="pageSize"
        :page-size-opts="pageSizeOpts"
        @on-change="changepage"
        @on-page-size-change="changePageSize"
        :simple="propsPageSimple"
      >
        <span>从第 {{ pageindex }} 至 {{ pageSize }} 项，共{{ total }}项 {{InputFilterText}}</span>
      </Page>
    </Col>
    <Spin fix v-show="SpinLoading">
      <Icon type="ios-loading" size="18" class="demo-spin-icon-load"></Icon>
      <div>Loading</div>
    </Spin>
  </Row>
</template>
<script>
import NP from 'number-precision'
export default {
  props: {
    isHeader: {
      type: Boolean,
      default: false
    },
    // 是否显示 搜尋欄位
    isSearch: {
      type: Boolean,
      default: true
    },
    // 是否显示 额外栏位checkbox
    isCheckbox: {
      type: Boolean,
      default: false
    },
    // 是否保留 checkbox此區域空格
    LeaveSpace: {
      type: Boolean,
      default: true
    },
    // 表格栏位表头 
    /**
     * hide: Boolean        | default: false | 移除此欄位
     * triggerShow: Boolean | default: false | 是否為額外欄位
     * total: Boolean,      | default: false | 是否要計算总计
     * totaltext: String    | default: ''    | 要替換的总计名稱
     * note: Boolean        | default: false | 是否要計算小计
     * notetext: String     | default: ''    | 要替換的小计名稱
     */
    propscolumns: {
      type: [Array, Object],
      default: []
    },
    // 表格资料
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    page: {
      type: Boolean,
      default: true
    },
    // 页面显示几笔页数
    propsPageSize: {
      type: [Number, String],
      default: 50
    },
    // 页面显示几笔長度
    propsTotal: {
      type: [Number, String],
      default: 0
    },
    // 頁數樣式
    propsPageSimple: {
      type: Boolean,
      default: false
    },
    // 排序状态 预设 indexNumber 大-小
    sortStatus: {
      type: Boolean,
      default: true
    },
    isBackBtn: {
      type: Boolean,
      default: false
    },
    SpinLoading: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      // tableShow: false,
      columns: [],
      allData: [],
      filterdata: [],
      historyData: [],
      total: this.propsTotal,
      pageSizeOpts: [1, 10, 15, 20, 25, 50, 100, 1000],
      pageSize: this.propsPageSize,
      pageindex: 1,
      Input: null,
      InputFilterText: '',
      current: 1
    }
  },
  computed: {
    searchInput: {
      get () {
        return this.Input
      },
      set (val) {
        this.Input = val.replace(/ +/g, '')
      }
    },
    footerNote () {
      const keys = Object.keys(this.propscolumns)
      const result = {}
      const noteArray = []
      for (let i = 0, keylen = keys.length; i < keylen; i++) {
        const it = keys[i]
        if ('note' in this.propscolumns[it]) {
          noteArray.push(it)
          result[it] = 0
        } else {
          result[it] = this.propscolumns[it].notetext || ''
        }
      }
      for (let h = 0, len = this.filterdata.length; h < len; h++) {
        const hit = this.filterdata[h]
        for (let i = 0, notelen = noteArray.length; i < notelen; i++) {
          const it = noteArray[i];
          result[it] = NP.plus(parseFloat(result[it]).toFixed(4), parseFloat(hit[it]).toFixed(4))
        }
      }
      return result
    },
    footerTotal () {
      const keys = Object.keys(this.propscolumns)
      const result = {}
      const totalArray = []
      for (let i = 0, keylen = keys.length; i < keylen; i++) {
        const it = keys[i]
        if ('total' in this.propscolumns[it]) {
          totalArray.push(it)
          result[it] = 0
        } else {
          result[it] = this.propscolumns[it].totaltext || ''
        }
      }
      for (let h = 0, len = this.filterdata.length; h < len; h++) {
        const hit = this.filterdata[h]
        for (let i = 0, totallen = totalArray.length; i < totallen; i++) {
          const it = totalArray[i];
          result[it] = NP.plus(parseFloat(result[it]).toFixed(4), parseFloat(hit[it]).toFixed(4))
        }
      }
      return result
    },
    notNote () {
      return !Object.values(this.footerNote).every(it => it == "")
    },
    notTotal () {
      return !Object.values(this.footerTotal).every(it => it == "")
    }
  },
  created () {
    this.combinationColumns(this.tableShow)
  },
  watch: {
    tableShow: 'combinationColumns',
    data: {
      handler (val) {
        this.removeSortStyle()
        this.searchInput = ''
        const array = val.map((it, i) => {
          it.indexNumber = i + 1
          return it
        })
        this.allData = this.sortStatus ? array.sort((a, b) => b.indexNumber - a.indexNumber) : array
        this.filterdata = this.allData
        this.handleListApproveHistory(this.allData)
        // if (this.isSearchData) {
        //   this.Input = this.isSearchData
        //   this.InputFilterMethods(this.Input)
        // }
      },
      immediate: true
    },
    Input (val) {
      this.removeSortStyle()
      const keywords = val.toLowerCase();
      this.pageindex = 1
      this.filterdata = this.allData.filter((it, i) => {
        const text = Object.values(it).join('').toLowerCase()
        return text.indexOf(keywords) != '-1'
      })
      this.handleListApproveHistory(this.filterdata)
      if (val.length && this.filterdata.length != this.allData.length) {
        this.InputFilterText = `(从 ${this.allData.length} 项过滤)`
      } else {
        this.InputFilterText = ''
      }
    },
    propscolumns (val) {
      this.combinationColumns(this.tableShow)
    },
    allData () {
      this.$refs['pages'].currentPage = 1;
    }
  },
  methods: {
    FristInData (val) {
      this.removeSortStyle()
      const array = val.map((it, i) => {
        it.indexNumber = i + 1
        return it
      })
      this.allData = this.sortStatus ? array.sort((a, b) => b.indexNumber - a.indexNumber) : array
      this.filterdata = this.allData
      this.handleListApproveHistory(this.allData)
    },
    handleListApproveHistory (val) {
      this.total = val.length;
      if (val.length < this.pageSize || !this.page) {
        this.historyData = val.slice();
      } else {
        this.historyData = val.slice(0, this.pageSize);
      }
      this.notNote && this.historyData.length ? this.historyData.push(this.footerNote) : null
      this.notTotal && this.historyData.length ? this.historyData.push(this.footerTotal) : null
    },
    changepage (index) {
      this.pageindex = index
      const _start = (index - 1) * this.pageSize;
      const _end = index * this.pageSize;
      this.historyData = this.filterdata.slice(_start, _end);
      this.notNote && this.historyData.length ? this.historyData.push(this.footerNote) : null
      this.notTotal && this.historyData.length ? this.historyData.push(this.footerTotal) : null
    },
    changePageSize (value) {
      this.pageSize = value
      this.pageindex = 1
      this.changepage(this.pageindex)
    },
    combinationColumns (val) {
      const col = Object.keys(this.propscolumns).map(it => this.propscolumns[it])
      if (val) {
        this.columns = col.filter(it => !it.hide)
      } else {
        this.columns = col.filter(it => !it.triggerShow).filter(it => !it.hide)
      }
    },
    rowClassName (row, index) {
      let rowArry = Object.values(row)
      let bgColor = rowArry.map((it, key) => {
        if (it == "总计" || it == '小计') {
          return 'totalBackgroundColor'
        }
      });
      return bgColor
    },
    backBtn () {
      this.$router.go(-1)
    },
    restart (val) {
      this.current = val
    },
    removeSortStyle () {
      const dom = document.getElementsByClassName("ivu-icon ivu-icon-md-arrow-dropup")
      if (!dom.length) return
      for (let i = 0; i < dom.length; i++) {
        let udom = dom[i]
        let ddom = document.getElementsByClassName("ivu-icon ivu-icon-md-arrow-dropdown")[i]
        if (udom.classList.contains('on')) udom.classList.remove('on')
        if (ddom.classList.contains('on')) ddom.classList.remove('on')
      }
    },
    sortColum ({ column, key, order }) {
      if (order != 'normal') {
        let _data = this.filterdata.sort((a, b) => {
          if (order === 'asc') {
            return a[key] > b[key] ? 1 : -1;
          } else if (order === 'desc') {
            return a[key] < b[key] ? 1 : -1;
          }
        })
        this.handleListApproveHistory(_data)
      } else {
        this.FristInData(this.data)
      }
    },
    rowClick (data) {
      this.$emit("rowClick", data)
    },
  }
}
</script>
<style lang="scss">
.lida-table {
  thead {
    tr {
      th {
        color: #fff;
        background-color: #515a6e;
        border-right: 1px solid #c5c8ca;
      }
    }
  }
  tbody {
    tr {
      td:nth-child(1) { 
        border-left: 1px solid #c5c8ca;
      }
      td {
        border-bottom: 1px solid #c5c8ca;
        border-right: 1px solid #c5c8ca;
      }
    }
  }
}
.totalBackgroundColor td {
  background-color: rgb(244, 247, 238) !important;
}
.backBtn {
  margin-right: 10px;
}
.demo-spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
  from {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.demo-spin-col {
  height: 100px;
  position: relative;
  border: 1px solid #eee;
}
</style>