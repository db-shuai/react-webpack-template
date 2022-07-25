// import { useMessage } from '@/hooks/web/useMessage'

// const { createMessage } = useMessage()
// const appStore = useAppStoreWithOut()
// 创建loading类
class LoadingInstance {
  ElInstance: any;
  constructor() {
    this.ElInstance = null;
  }
  start(): void {
    // appStore.setLoading(true)
  }

  close(): void {
    // appStore.setLoading(false)
  }

  error(err: string): void {
    // createMessage.error(err)
  }
}

export default LoadingInstance;
