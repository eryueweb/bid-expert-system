<template>
  <el-aside>
    <div class="left-top">
      <symbol-icon class="svg-logo" :size="[25, 25]" name="logo" />
      <span class="left-logo-text">评标系统</span>
    </div>
    <el-scrollbar class="scroll-wrapper" id="leftMenu">
      <el-menu
        :collapse-transition="false"
        text-color="#333">
          <template
            v-for="(menu, index) in  menuList">
            <el-submenu v-if="menu.childrenMenus.length" :index="String(menu.menuId)" :key="String(menu.menuId+'_'+index)">
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span slot="title">{{ menu.menuDisplayName }}</span>
              </template>
              <SubMenu :childrenMenus="menu.childrenMenus" @toMenu="toMenu"></SubMenu>
            </el-submenu>
            <el-menu-item v-else :index="String(menu.menuId)" @click="toMenu(menu)" :key="`${String(menu.menuId+'_'+index)}`">
              <i class="el-icon-location"></i>
              <span slot="title">{{ menu.menuDisplayName }}</span>
            </el-menu-item>
          </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>
<script>
import { 
  mapState,
  mapActions
} from 'vuex';
import SubMenu from './subMenu.vue';
export default {
  computed: {
    ...mapState([
      'menuList'
    ])
  },
  components: {
    SubMenu
  },
  created() {
    this.setMenuList();
  },
  methods: {
    ...mapActions([
      'setMenuList'
    ]),
    toMenu() {

    }
  }
}
</script>