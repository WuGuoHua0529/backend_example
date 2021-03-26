<template>
  <div>
    <Nuxt />
    <div class="login-footer">
      <Copyright />
    </div>
  </div>
</template>
<script>
import Copyright from "@/components/main/Copyright.vue";
export default {
  components: {
    Copyright
  },
};
</script>
<style>
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
html,
body {
  height: 100%;
  background: #f5f7f9;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.login-footer {
  position: absolute;
  bottom: 0;
  left: 40%;
}
</style>
