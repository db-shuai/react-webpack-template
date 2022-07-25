import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken, removeToken, goToLogin } from './auth'
import LoadingInstance from './utils/utils.loading'
import CancelTokenModule from './utils/axios.cancel'

export interface PendingType {
  url?: string
  method?: String | undefined
  params?: any
  data?: any
  cancel: (val: any) => void
}
export const baseURL = '/api'
const Loading = new LoadingInstance()
const CancelToken = new CancelTokenModule()

// axios实例
const instance = axios.create({
  timeout: 30000,
  params: {},
  baseURL,
  data: {},
  headers: {
    ContentType: 'application/json;charset=UTF-8',
    accessToken: getToken()
  },
  responseType: 'json'
})

// 添加请求拦截器
instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    Loading.start()
    // 添加参数，并设置请求取消flag
    Object.assign(request, CancelToken.interceptors(request))
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 添加相应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    CancelToken.removePending(response.config)
    const { code, msg, errorMsg } = response.data
    if ((Number.isFinite(code) && code !== 200) || (typeof code === 'boolean' && code === false)) {
      Loading.error(msg || errorMsg || '请求失败')
    }
    Loading.close()
    return response
  },
  (error) => {
    if (!error || !error.response) {
      return Promise.reject('请求出错')
    }
    if (typeof error === 'string') Loading.error(error)

    const {
      status,
      data: { msg, errorMsg }
    } = error.response
    switch (status) {
      case 401:
        Loading.error(msg || errorMsg || error.response.data.error || '请求失败')
        const timer = setTimeout(() => {
          removeToken()
          goToLogin()
          clearTimeout(timer)
        }, 1500)
        break
      case 403:
        // 跳转
        removeToken()
        goToLogin()
        break
      default:
        Loading.error(msg || errorMsg || error.response.data.error || '请求失败')
        break
    }
    Loading.close()
    return Promise.reject(error?.response)
  }
)

export default instance
