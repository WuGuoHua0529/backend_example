<template>
  <div class="default-main-layout">
    <Header>
      <div class="main-user-infor">
        <Icon type="ios-contact" size="25" />
        <div class="main-user-dropdown">
          <Dropdown @on-click="signout">
          <a href="javascript:void(0)" style="font-size: 16px;color: #515A6E">
            {{ userName }}
            <Icon type="ios-arrow-down"></Icon>
          </a>
          <DropdownMenu slot="list" > 
            <DropdownItem name="main-password">修改密码</DropdownItem>
            <DropdownItem name="index">会员登出</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        </div> 
      </div>
    </Header>
    <MainSider />
    <div class="layout-contain">
      <Card shadow>
        <Nuxt />
      </Card>
    </div>
    <Footer>
      <Copyright />
    </Footer>
  </div>
</template>
<script>
import MainSider from "@/components/main/MainSider.vue";
import Copyright from "@/components/main/Copyright.vue";
export default {
  components: {
    MainSider,
    Copyright
  },
  data() {
    return {
      userName: ''
    };
  },
  created () {
    this.userName = this.$cookies.get("USER_NAME")
  },
  methods: {
    signout (to) {
      if(to == 'index') {
        this.$cookies.removeAll();
      }
      this.$router.push({name: to})
    }
  }
};
</script>
<style lang='scss'>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.default-main-layout {
  min-height: 100%;
  background: #e9e9e9;
  display: flex; 
  flex-direction: column;
  .ivu-layout-header {
    position: fixed;
    width: 100%;
    z-index: 11;
    background: rgb(255, 255, 255);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 2px 0px;
    .main-user-infor {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      i {
        margin-right: 10px;
      }
      .ivu-select-dropdown {
        margin-top: -16px;
      }
    }
  }
  .layout-contain {
    margin-left: 200px;
    position: relative;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: calc(65px + 1vmax);
    min-height: 100vh;
  }
  .ivu-layout-footer {
    background: transparent;
    padding: 12px 50px;
  }
}
</style>
