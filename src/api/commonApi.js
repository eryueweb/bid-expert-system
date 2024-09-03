import HttpRequest from '@/utils/axios.js';
const axios = new HttpRequest();
// 获取省/市 通用
// @level String 地区级别1-国2-大区3-省/直辖市4-市5-区
// @parentcode String 父级编码6位数字组成
export function selectRegionListByCode(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/selectRegionListByCode',
      method: 'post',
      data: params
    }).then(res => {
      _v[isOperate] = false;
      if(res.header.ret === 0) resolve(res)
      else reject(res)
    }).catch(rej => {
      _v[isOperate] = false;
      alert(rej);
    })
  })
}