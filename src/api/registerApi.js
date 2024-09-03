import HttpRequest from '@/utils/axios.js';
const axios = new HttpRequest();
// 发送验证码
// @phone String
// @sendType String 验证码类型 专家注册固定传1
export function sendMessageCode(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/sendMessageCode',
      method: 'get',
      params
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
// 验证码校验
// @phone
// @messageCode String 验证码
export function checkMessageCode(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/checkMessageCode',
      method: 'get',
      params
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
// 注册页面跳转展示
// @phone String 验证码校验返回的加密手机号
export function registerTpzzjbTo(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/registerTpzzjbTo',
      method: 'get',
      params
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
// 注册专家
// @专家所有的注册信息 new FormData()
export function registerTpzzjb(formData, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/registerTpzzjb',
      method: 'post',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: formData
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
// 申报专业
// @parentId
export function getZyflListByParentId(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/getZyflListByParentId',
      method: 'post',
      params
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
// 删除其他附件
// @fileid String 附件id
// @phone String 加密的手机号
export function deleteQtFj(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/deleteQtFj',
      method: 'get',
      params
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
// 查询注册进度
// @phone
export function findReviewProgress(params, isOperate){
  const _v = this;
  _v[isOperate] = true;
  return new Promise(function(resolve,reject) {
    axios.request({
      url: 'tpzjjb/findReviewProgress',
      method: 'get',
      params
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