
<template>
  <div>
    <div
      v-for="(menu, index) in  childrenMenus"
      :key="String(menu.menuId+'_'+index)">
      <el-submenu v-if="menu.subMenuList" :index="`${String(menu.menuId)}`">
        <span slot="title">{{ menu.menuDisplayName }}</span>
        <sub-menu :childrenMenus="menu.subMenuList"></sub-menu>
      </el-submenu>
      <el-menu-item v-else :index="`${String(menu.menuId)}`" @click="toMenu(menu)">
        <span slot="title">{{ menu.menuDisplayName }}</span>
      </el-menu-item>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      childrenMenus: Array,
      parentIndex: String
    },
    data() {
      return {

      }
    },
    methods: {
      toMenu(menu) {
        this.$emit('toMenu', menu)
      }
    }
  }
</script>
<style lang="scss" scoped>

</style>