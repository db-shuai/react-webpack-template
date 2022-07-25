export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE'

export type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream'

export interface AxiosRequest {
  baseURL?: string
  url?: string
  data?: any
  params?: any
  method?: Method
  headers?: any
  timeout?: number
  responseType?: ResponseType
}

export interface AxiosResponse {
  data: any
  headers: any
  request?: any
  status: boolean
  config: AxiosRequest
}

export interface CustomResponse {
  readonly status?: boolean | number
  readonly code?: number
  readonly errorMsg?: string
  readonly errorCode?: number | null
  readonly msg?: string
  readonly message?: string
  data?: any
}
