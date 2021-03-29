<template lang="pug">
.pageTable-row
  Table.mt-3(border, :columns="columns", :data="data")
  .page-col.mt-4
    span {{ pageText }}
    Page.inlineblock(
      :total="total",
      :show-total="showTotal",
      :show-sizer="showSize",
      :page-size="pageSize",
      :current="pageIndex",
      :page-size-opts="pageSizeOpts",
      @on-change="changePage",
      @on-page-size-change="changeSize"
    )
</template>
<script>
export default {
  name: 'PageTable',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    columns: {
      type: Array,
      default: function () {
        return []
      }
    },
    showTotal: {
      type: Boolean,
      default: true
    },
    showSize: {
      type: Boolean,
      default: true
    },
    pageTotal: {
      type: Number,
      default: 0
    },
    pageSizeOpts: {
      type: Array,
      default:()=>[10, 20, 30]
    }
  },
  data () {
    return {
      pageSize: 10, // pageSize/頁
      pageIndex: 1, // 當前的頁數
      total: this.pageTotal, // 總比數
    }
  },
  computed: {
    pageText () {
      let startIndex = this.pageIndex - 1
      // console.log(startIndex, startIndex * this.pageSize + this.pageSize, this.total, startIndex * this.pageSize + this.pageSize);
      let end = startIndex * this.pageSize + this.pageSize < this.total ? startIndex * this.pageSize + this.pageSize : this.total
      return `从第${startIndex * this.pageSize + 1}至${end}项，`
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(newValue, oldValue) {
        this.total = newValue.length
      }
    },
    pageTotal (val) { this.total = val }
  },
  methods: {
    upPageTotal (val) {
      this.pageSize = val.size
      this.pageIndex = val.page
      this.total = val.total_amount
    },
    changePage (val) {
      this.pageIndex = val
      this.$emit('on-change', { page: val, size: this.pageSize })
    },
    changeSize (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.$emit('on-page-size-change', { page: this.pageIndex, size: val })
    }
  }
}
</script>
<style lang="sass">
.pageTable-row
  .page-col
    display: flex
    align-items: baseline
    justify-content: flex-end
</style>