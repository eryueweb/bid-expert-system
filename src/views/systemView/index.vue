<template>
  <div>
    <Menu />
    <router-view></router-view>
  </div>
</template>
<script>
import Menu from './menu.vue';
export default {
  components: {
    Menu
  },
  mounted() {
    console.log('router.options.routes:',this.$router.options.routes);
  }
}
</script>