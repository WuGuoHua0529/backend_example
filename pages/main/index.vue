<template>
  <div class="main-page">
    <nuxt-child />
  </div>
</template>
<script>
export default {
  name: 'main-page',
  layout: 'main',
  created () {
    this.$router.push({ name: "main-user" });
  }
}
</script>