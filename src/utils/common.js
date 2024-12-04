export function getUrlParams(callback) {
  const urlParam = {};
  const search = window.location.href;
  if(search.indexOf('?') != -1){
    let str = search.split('?', 2)[1];
    let strs = str.split('&');
    strs.forEach(strItem=>{
      let itemArr = strItem.split('=');
      urlParam[itemArr[0]] = decodeURIComponent(itemArr[1])
    });
    callback && callback(urlParam);
  }
  return urlParam;
}
export function deepclone(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  let newObj;
  if (Object.prototype.toString.call(obj) === '[object Object]') {
    newObj = {};
    Reflect.ownKeys(obj).forEach(key => {
      newObj[key] = deepclone(obj[key])
    })
  }
  else if (Array.isArray(obj)) {
    newObj = [];
    obj.forEach(item => {
      newObj.push(deepclone(item))
    })
  }
  else if (Object.prototype.toString.call(obj) === '[objec Set]') {//不重复性，唯一性。
    newObj = new Set([...obj]);
  }
  else if (Object.prototype.toString.call(obj) === '[objec Map]') {//键值对集合，键可以是任何类型，函数对象基本类型等。快速查找数据。复杂数据去重。
    newObj = new Map([...obj]);
  }
  return newObj;
}
// 数组扁平化
export function flatternArray(arr) {
  return arr.reduce((newArr, val) => {
    if (Array.isArray(val))  {
      newArr.push(...flatternArray(val))
    }
    else {
      newArr.push(val)
    }
    return newArr;
  }, [])
}
// 深度优先搜索，修改全部叶子结点数据，并提取出来，本系统主要应用于菜单格式化为路由
export function dfs(source, childrenName, modifyFunc) {
  const result = [];
  const recursion = data => {
    data.forEach(item => {
      if (item[childrenName] && item[childrenName].length) {
        recursion(item[childrenName])
      } else {
        const newItem = modifyFunc(item);
        result.push(newItem);
      }
    })
  };
  recursion(source);
  return result;
}