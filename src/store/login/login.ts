import { Module } from 'vuex'
import { accountLoginRequest, requestUserInfoById } from '@/service/login/login'
import { ILoginState } from './type'
import { IRootState } from '../type'
import { IAccount } from '@/service/login/type'
import localcache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {}
        }
    },
    getters: {},
    mutations: {
        changeToken(state, token: string) {
            state.token = token
        }
    },
    actions: {
        // async accountLoginAction({ commit }, payload: IAccount) {
        //     //1、登录逻辑
        //     const loginResult = await accountLoginRequest(payload)
        //     const { id, token } = loginResult.data
        //     commit('changeToken', token)
        //     localcache.setCache('token', token)
        //     //2、请求用户信息
        //     const userInfoResult = await requestUserInfoById(id)
        //     const userInfo = userInfoResult.data
        //     localcache.setCache('userInfo', userInfo)
        // }
        // phoneLoginAction({ commit }, payload: any) {
        //     console.log(payload)
        // }
    }
}

export default loginModule
