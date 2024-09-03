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