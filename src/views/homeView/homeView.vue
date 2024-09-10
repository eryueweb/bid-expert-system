<template>
  <div>home</div>
</template>
<script>
export default {
  data() {
    return {
      name: 'home'
    }
  },
  mounted() {
    console.log('router.options.routes:',this.$router.options.routes);
  }
}
</script>