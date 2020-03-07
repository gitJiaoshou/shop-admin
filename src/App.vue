<template>
  <keep-alive>
    <router-view/>
  </keep-alive>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    let storageStore = localStorage.getItem('store')
    if (storageStore) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(storageStore)))
      localStorage.removeItem('store')
    }
    window.addEventListener('unload', () => {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.css";     /*深色主题*/
</style>
