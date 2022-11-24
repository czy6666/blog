//service出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

export default new HYRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            // const token = localCache.getCache('token')

            // if (token) {
            //     if (!config) config = {}
            //     if (!config.headers) config.headers = {}
            //     config.headers.Authorization = `Bearer ${token}`
            // }
            return config
        },
        requestInterceptorCatch: (err) => err,
        responseInterceptor: (res) => res,
        responseInterceptorCatch: (err) => err
    }
})
