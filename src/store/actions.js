import {
  getMenu
} from '@/api/layoutApi.js';
// 菜单获取
export default {
  setMenuList(context) {
    window.localStorage.setItem('batchid','Encrypted:8R2PLegFSywzsYqm8nxyRsPsS0bKUQpUCG2dHgVTVMXjF6WCzrXQ0RsEdVSCZ-1h');
    getMenu({
      batchid: window.localStorage.getItem('batchid')
    }).then(res => {
      context.commit('SET_MENU_LIST', res.data);
      const menuList = res.data;
      runFormatMenu(menuList);
    }).catch(rej => {
      if (rej.header && rej.header.ret === 1) {
        this.$message.error(rej.header.msg)
      } else {
        console.log(rej)
      }
    })
  }
}
// 菜单转路由
function formatMenuList() {
  menuList.forEach((menu) => {
    const {
      childrenMenus
    } = menu;
    if (childrenMenus.length) {
      formatMenuList(childrenMenus);
    } else {
      const {
        menuDisplayName,
        menuName,
        menuPath,
        componentPath
      } = menu;
      menu = {
        name: menuName,
        path: menuPath,
        components: () => import(`@/${componentPath}`),
        meta: {
          title: menuDisplayName
        }
      };
      console.log('menu:',menu);
    }
  });
}
async function runFormatMenu(menuList) {
  const routes = await formatMenuList();
  console.log('routes:',routes);
}