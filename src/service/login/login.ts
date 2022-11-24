import HYRequest from '../index'
import { IAccount, IDataType, ILoginResult } from './type'

enum LoginAPI {
    AccountLogin = '/login',
    LoginUserInfo = '/users/'
}

export function accountLoginRequest(account: IAccount) {
    return HYRequest.post<IDataType<ILoginResult>>({
        url: LoginAPI.AccountLogin,
        data: account
    })
}

export function requestUserInfoById(id: number) {
    return HYRequest.get<IDataType<ILoginResult>>({
        url: LoginAPI.LoginUserInfo + id
    })
}
