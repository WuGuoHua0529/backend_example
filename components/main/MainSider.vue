<template>
  <Sider
    width="200"
    class="layout-sider"
  >
    <div class="layout-sider-logo">
      <router-link :to="{ name: 'index' }">
        <span class="layout-sider-logo-link">LOTTERY-ADMIN</span>
      </router-link>
      
    </div>
    <div class="layout-sider-content">
      <Menu
        ref="lidaMenu"
        theme="dark"
        width="auto"
        accordion
      >
        <template v-for="(it, idx) in Menuitems">
          <Submenu
            v-if="it.show && it.child"
            :name="idx"
          >
            <template slot="title">
              <span>{{ it.title }}</span>
            </template>
            <MenuItem
              v-for="(cit, cidx) in it.child"
              :name="cit.linkName"
              :key="'c' + cidx"
              :to="{ name: `main-${cit.linkName}` }"
            >
            {{ cit.title }}
            </MenuItem>
          </Submenu>
          <MenuItem
            v-if="it.show && !it.child"
            :name="it.linkName"
            :to="{ name: `main-${it.linkName}` }"
            style="padding-left: 14px"
            :class="{ 'ivu-menu-item-active': linkNowActive(it.linkName) }"
          >
          <Icon
            :type="it.icon"
            style="font-size: 1.5rem"
          />
          <span>{{ it.title }}</span>
          </MenuItem>
        </template>
      </Menu>
    </div>
  </Sider>
</template>
<script>
export default {
  name: "MainSider",
  data () {
    return {
      tabsActive: "",
      tabs: [],
    };
  },
  computed: {
    Menuitems () {
      let items = [
        { title: '登入资讯', linkName: 'information', show: true },
        { title: '使用者设定', linkName: 'user', show: true },
        { title: '前台管理', linkName: 'operator', show: true, child: [
          {title: '公告资讯', linkName: ''},
          {title: '商品管理', linkName: ''},
          {title: '图片上传', linkName: ''}
        ] }
      ]
      return items
    },
  },
  methods: {
    linkNowActive (linkName) {
      const linkArray = this.$route.path.split("/")
      return linkArray.some(item => item == linkName)
    }
  }
};
</script>

<style lang="scss">
.layout-sider {
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
  user-select: none;
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened {
    background: #395b9f;
    .ivu-menu-submenu-title {
      background: #24478d;
    }
  }
  .ivu-menu-dark.ivu-menu-vertical
    .ivu-menu-item-active:not(.ivu-menu-submenu) {
    color: #fff;
    background: #1877f2;
  }
}
.ivu-layout-sider {
  position: fixed;
  z-index: 12;
  height: 100%;
  max-width: 100%;
  left: 0;
  top: 0;
  .layout-sider-logo {
    height: 64px;
    line-height: 70px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    overflow: hidden;
    .layout-sider-logo-link {
      font-family: MicrosoftJhengHei;
      font-size: 24px;
      font-weight: bold;
      font-style: normal;
      font-stretch: normal;
      line-height: normal;
      letter-spacing: normal;
      text-align: left;
      color: #fffefe;
    }
    img {
      height: 80%;
      vertical-align: middle;
    }
  }
  .layout-sider-content {
    -ms-overflow-style: none;
    overflow: -moz-scrollbars-none;
    overflow-y: auto;
    height: calc(100% - 60px);
    width: 100%;
    position: absolute;
    &::-webkit-scrollbar {
      width: 0 !important;
    }
  }
}
</style>
