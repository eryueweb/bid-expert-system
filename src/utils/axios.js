import axios from 'axios';
import {
  getUrlParams
} from './common.js';
export default class HttpRequest {
  constructor(baseURL=process.env.EXPERT_SYSTEM_BASE_API) {
    this.baseURL = baseURL;
  }

  getInsideConfig(){
    return {
      baseURL: this.baseURL
    }
  }
  interceptors(instance){
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        Object.assign(config.headers, {
          'X-AUTH-TOKEN': getUrlParams().token
        });
        return config
      },
      error => Promise.reject(error),
    );
    // 响应拦截
    instance.interceptors.response.use(res=>{
      return res.data;
    },
    error => {
      return Promise.reject(error)
    })
  }
  request(opt){
    const instance = axios.create();
    const insideConfig = this.getInsideConfig();
    const options = Object.assign(insideConfig, opt);
    this.interceptors(instance);
    return instance(options);
  }
}

