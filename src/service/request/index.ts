import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus/lib/index'
import { LoadingInstance } from 'element-plus/lib/components/loading/src/loading'

/*
    1.封装一个request类
        类里面含有两个成员变量
         instance: AxiosInstance  用来发送请求 注册拦截器
         interceptors?:HYRequestInterceptors 可选参数  具体看创建实例时是否传入
    2.拦截器一共有三种触发方式
        （1）在创建实例时传入，那么每次调用实例方法时，都会触发该拦截
        （2）在调用实例方法时传入，相当于可以自定义每次请求的拦截
        （3）都不传入，则会调用通用拦截器，无论如何都会执行
 */

class HYRequest {
    instance: AxiosInstance
    interceptors?: HYRequestInterceptors
    loading?: LoadingInstance
    showLoading: boolean

    constructor(config: HYRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors = config.interceptors
        this.showLoading = config.showLoading ?? true

        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        )
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        )

        //添加所有实例都有的拦截器
        this.instance.interceptors.request.use(
            (config) => {
                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        lock: true,
                        text: '正在加载...'
                    })
                }

                return config
            },
            (err) => {
                return err
            }
        )

        this.instance.interceptors.response.use(
            (res) => {
                this.loading?.close()

                const data = res.data
                return res
            },
            (err) => {
                if (err.response.status === 404) {
                    console.log('404错误了')
                }
                return err
            }
        )
    }

    request<T>(config: HYRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {
            //1、对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }

            //2、判断是否需要loading
            if (config.showLoading === false) {
                this.showLoading = config.showLoading ?? true
            }

            this.instance
                .request<any, T>(config)
                .then((res) => {
                    //1、单个请求对数据的处理
                    if (config.interceptors?.responseInterceptor) {
                        res = config.interceptors.responseInterceptor(res)
                    }
                    // console.log(res)

                    //2、将showLoading设置为true
                    this.showLoading = true

                    //3、将结果resolve返回
                    resolve(res)
                })
                .catch((err) => {
                    this.showLoading = true
                    reject(err)
                    return err
                })
        })
    }

    get<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'GET' })
    }

    post<T>(config: HYRequestConfig<T>): Promise<T> {
        return this.request<T>({ ...config, method: 'POST' })
    }
}

export default HYRequest
