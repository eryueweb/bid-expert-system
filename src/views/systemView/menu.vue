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
import {
  getUrlParams
} from '@/utils/common.js';
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
    this.setMenuList().then(()=>{}).catch(err=>{});
  },
  methods: {
    ...mapActions([
      'setMenuList'
    ]),
    toMenu(menu) {
      console.log('menu:',menu);
      console.log('router.options.routes:',this.$router.options.routes);
      const {
        menuName
      } = menu;
      this.$router.push({
        name: menuName,
        query: {
          token: getUrlParams().token
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .scroll-wrapper {
    height: calc(100% - 45px);
  }
  // ::v-deep .el-scrollbar__view {
  //   height: calc(100vh - 0px)!important;
  // }
  ul.el-menu {
    // height: calc(100vh - 0px);
    box-sizing: border-box;
    // padding-top: 55px;
    // height: calc(100% - 0px);
    border-right: 1px solid #fff;
  }
  .left-menu {
    padding-top: 55px;
  }
  .fold-btn-container {
    text-align: right;
    padding-top: 10px;
    padding-right: 5px;
  }
  .el-aside {
    // min-height: 660px;
    // position: relative;
    background: #fff;
    transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -moz-transition: width 0.15s;
    -webkit-transition: width 0.15s;
    -o-transition: width 0.15s;
  }
  .left-top {
    // position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 1px);
    // z-index: 10;
    height: 45px;
    line-height: 45px;
    background: #00AAE6;
    color: white;
    font-size: 17px;
    .left-logo-text {
      padding-left: 6px;
    }
  }
</style>