import HttpRequest from '@/utils/axios.js';
const newbidAxios = new HttpRequest(process.env.EXPERT_SYSTEM_NEWBID_API);
// 获取菜单
// @batchid String
export function getMenu(params) {
  return new Promise(function(resolve,reject) {
    newbidAxios.request({
      url: 'user/getMenuListNew',
      method: 'post',
      data: params
    }).then(res => {
      if(res.header.ret === 0) resolve(res)
      else reject(res)
    }).catch(rej => {
      alert(rej);
    })
  })
}