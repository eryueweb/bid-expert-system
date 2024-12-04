import HttpRequest from '@/utils/axios.js';
export default class loginApi {
  static axios = new HttpRequest();
  // 登录
  // @username String
  // @password String
  static login(params, isOperate){
    const _v = this;
    _v[isOperate] = true;
    return new Promise(function(resolve,reject) {
      loginApi.axios.request({
        url: 'rbac/login',
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
  
  // 退出登录
  static logout(params, isOperate){
    const _v = this;
    _v[isOperate] = true;
    return new Promise(function(resolve,reject) {
      loginApi.axios.request({
        url: 'user/logout',
        method: 'post'
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
  
  // 修改密码
  // @oldPassword String
  // @newPassword String
  static updatePwd(params, isOperate){
    const _v = this;
    _v[isOperate] = true;
    return new Promise(function(resolve,reject) {
      loginApi.axios.request({
        url: 'user/updatePassword',
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
  // 登录校验接口
  // @username
  static loginCheck(params, isOperate){
    const _v = this;
    _v[isOperate] = true;
    return new Promise(function(resolve,reject) {
      loginApi.axios.request({
        url: 'rbac/loginCheck',
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
}