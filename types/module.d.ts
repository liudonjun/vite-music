/**Vue文件声明文件 */
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const Component: DefineComponent<{}, {}, any>
  export default Component
}

/**播放器模式声明文件 */
declare module '@/util/common.ts' {
  export namespace PLAY_MODE {
    const sequence: number
    const loop: number
    const random: number
  }
}
/**API声明文件 */
declare module '@/api/api.ts' {
  export function getBanner(): Promise
  export function getplayList(): Promise
}

/**axios声明 */
declare module 'axios' {
  interface AxiosResponse<T = any> {
    success?: object
    data?: Array | object | undefined | null
    // 这里追加你的参数
  }
  export function create(config?: AxiosRequestConfig): AxiosInstance
}
