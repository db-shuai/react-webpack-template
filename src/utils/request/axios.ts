import instance from './request'
import { AxiosRequest, CustomResponse } from './request.interface'

class Abstract {
  private apiAxios({ method, url, data, params, headers }: AxiosRequest): Promise<CustomResponse> {
    return new Promise((resolve, reject) => {
      instance({
        method,
        url,
        params,
        data,
        headers
      })
        .then((res) => {
          const { code, status, message, data } = res.data
          if (status === 200 || status === true || code === 200) {
            resolve({
              status,
              code,
              data,
              message
            })
          } else {
            reject({
              message,
              data
            })
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * GET类型的网络请求
   */
  protected get({ url, data, params, headers }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({ method: 'GET', url, data, params, headers })
  }

  /**
   * POST类型的网络请求
   */
  protected post({ url, data, params, headers }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({ method: 'POST', url, data, params, headers })
  }

  /**
   * PUT类型的网络请求
   */
  protected put({ url, data, params, headers }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({ method: 'PUT', url, data, params, headers })
  }

  /**
   * DELETE类型的网络请求
   */
  protected delete({ url, data, params, headers }: AxiosRequest): Promise<CustomResponse> {
    return this.apiAxios({ method: 'DELETE', url, data, params, headers })
  }
}

export default Abstract
