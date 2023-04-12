import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Qs from "qs"
export interface Result<T = any> {
    code: 0.
    data: {},
    message: "ok"
}


const service: AxiosInstance = axios.create({
    baseURL: '/api',
    timeout: 50000,
    responseEncoding: "UTF-8",
    responseType: "json"
})

/**
 * 请求拦截器
 */
// @ts-ignore
service.interceptors.request.use((config: AxiosRequestConfig) => {
    config.transformRequest = [function (data) {
        // 对 data 进行任意转换处理
        return Qs.stringify(data)
    }]
    return config;
}, (error: AxiosError) => {
    return Promise.reject(error)
})


// @ts-ignore
service.interceptors.response.use((response: AxiosResponse) => {
    const {code, data, msg} = response.data
    if (code == 50000) {
        return
    }
    return data;
}, (error: AxiosError) => {
    return Promise.reject(error)
})

/* 导出封装的请求方法 */
export const http = {
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },

    post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },

    postAny<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },

    put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<T> {
        return service.put(url, data, config)
    },

    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.delete(url, config)
    }
}



