import { PendingType } from '../request'
import axios, { AxiosRequestConfig } from 'axios'
import { getToken } from '../auth'

// 设置请求分类
const CancelToken = axios.CancelToken

class CancelTokenModule {
  pending: Array<PendingType>
  constructor() {
    // 重复请求列表
    this.pending = []
  }
  // 清除重复请求
  removePending(config: AxiosRequestConfig): void {
    for (const key in this.pending) {
      const item: number = +key
      const list: PendingType = this.pending[+key]
      // 当前请求在数组中存在时执行函数体
      if (
        list.url === config.url &&
        list.method === config.method &&
        JSON.stringify(list.params) === JSON.stringify(config.params) &&
        JSON.stringify(list.data) === JSON.stringify(config.data)
      ) {
        // 执行取消操作
        list?.cancel('操作太频繁，请稍后再试')
        // 从数组中移除记录
        this.pending.splice(item, 1)
      }
    }
  }

  interceptors(request: AxiosRequestConfig): AxiosRequestConfig {
    // 防止重新登录无法获取token
    const { headers } = request
    if (headers) {
      headers['Authorization'] = getToken()
    }
    this.removePending(request)
    request.cancelToken = new CancelToken((c: (val: any) => void) => {
      this.pending.push({
        url: request.url,
        method: request.method,
        params: request.params,
        data: request.data,
        cancel: c
      })
    })
    return request
  }
}

export default CancelTokenModule
