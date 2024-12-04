<template>
  <div class="tab-wrapper" id="bidsysytem-tab">
    <el-tabs :value="currentTab.name" :closable="tabsClosable" type="border-card" @tab-remove="toRemoveTab" @tab-click="toTab">
      <el-tab-pane
        v-for="(item) in tabs"
        :key="item.menuName"
        :name="item.menuName"
      >
        <span class="tab-label" slot="label">{{ item.menuDisplayName }}</span>
        <keep-alive>
          <router-view :name="item.menuName"></router-view>
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState({
      tabs: state => state.leftMoudle.tabs,
      tabsClosable: state => state.leftMoudle.tabsClosable,
      currentTab: state => state.leftMoudle.currentTab,
      currentTabName: state => state.leftMoudle.currentTabName,
      navs: state => state.leftMoudle.navs
    })
  },
  mounted() {
    if (this.tabs.length < 2) {
      this.noTabClose();
    }
  },
  methods: {
    ...mapMutations([
      'removeTab',
      'setCurrentTab',
      'changeCurrentNav',
      'viewNav',
      'noTabClose'
    ]),
    toTab(tab) {
      this.setCurrentTab(this.tabs[tab.index]);
      this.changeCurrentNav(this.tabs[tab.index]);
      const {
        path
      } = this.tabs[tab.index];
      this.$router.push(path).catch(data => {  });
    },
    toRemoveTab(tabName) {
      this.removeTab(tabName);
      this.$nextTick(() => {
        this.$router.push(this.currentTab.path).catch(data => {  });
      });
    }
  }
}
</script>
<style lang="scss" scoped>
.el-tabs__nav div.is-active{
  span.tab-label {
    color: #00AAE6!important;
  }
}
// .tab-label {
//   color: rgba(0,0,0.65);
// }
// .tab-wrapper{
//   // min-height: 638px;
// }
</style>  
<style lang="scss">
#bidsysytem-tab>.el-tabs>.el-tabs__content{
  height: calc(100vh - 135px);
  overflow-y: auto;
}
</style>