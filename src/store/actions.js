import {
  getMenu
} from '@/api/layoutApi.js';
import HomeView from '@/views/homeView/homeView.vue';
import router from '@/router';
// 菜单获取
export default {
  setMenuList(context) {
    console.log('HomeView:',HomeView);
    window.localStorage.setItem('batchid','Encrypted:8R2PLegFSywzsYqm8nxyRsPsS0bKUQpUCG2dHgVTVMXjF6WCzrXQ0RsEdVSCZ-1h');
    getMenu({
      batchid: window.localStorage.getItem('batchid')
    }).then(res => {
      context.commit('SET_MENU_LIST', res.data);
      const menuListToRoute = JSON.parse(JSON.stringify(res.data));
      modifyNestedArray(menuListToRoute, menuToRoute);
      console.log('menuListToRoute:',menuListToRoute);
      router.addRoutes(menuListToRoute);
      // console.log('router.getRoutes:',router.getRoutes());
      // menuListToRoute.forEach(route => {
      //   addRouteWithChildren(router, route)
      // });
      console.log('router:',router);
    }).catch(rej => {
      if (rej.header && rej.header.ret === 1) {
        this.$message.error(rej.header.msg)
      } else {
        console.log(rej)
      }
    })
  }
}
// 循环更新
function modifyNestedArray(arr, modifyFn) {
  arr.forEach((item, index) => {
    const {
      childrenMenus
    } = item;
    if (childrenMenus.length) {
      arr[index] = modifyFn(item);
      arr[index].children = childrenMenus;
      modifyNestedArray(arr[index].children, modifyFn)
    } else {
      arr[index] = modifyFn(item)
    }
  })
}
function menuToRoute(menu) {
  const {
    menuName,
    menuPath,
    componentPath,
    menuDisplayName,
    childrenMenus
  } = menu;
  if (childrenMenus.length) {
    return {
      name: menuName,
      path: menuPath,
      meta: {
        title: menuDisplayName
      }
    }
  }
  else {
    return {
      name: menuName,
      path: menuPath,
      component: () => import(`@/views/${componentPath}.vue`),
      // (resolve) => require([`@/views/${view}`], resolve)
      meta: {
        title: menuDisplayName
      }
    }
  }
}
// 添加路由
function addRouteWithChildren(router, route) {
  router.addRoute(route);
  if (route.children) {
    route.children.forEach(childRoute => {
      addRouteWithChildren(router, childRoute)
    })
  }
}
// 菜单转路由
// function formatMenuList() {
//   menuList.forEach((menu) => {
//     const {
//       childrenMenus
//     } = menu;
//     if (childrenMenus.length) {
//       formatMenuList(childrenMenus);
//     } else {
//       const {
//         menuDisplayName,
//         menuName,
//         menuPath,
//         componentPath
//       } = menu;
//       menu = {
//         name: menuName,
//         path: menuPath,
//         components: () => import(`@/${componentPath}`),
//         meta: {
//           title: menuDisplayName
//         }
//       };
//       console.log('menu:',menu);
//     }
//   });
// }
// async function runFormatMenu(menuList) {
//   const routes = await formatMenuList();
//   console.log('routes:',routes);
// }