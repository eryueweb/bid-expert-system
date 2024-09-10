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