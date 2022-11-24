import { createStore } from 'vuex'
import login from './login/login'
import article from './article/article'
import { IRootState } from './type'

export default createStore<IRootState>({
    state() {
        return {
            name: 'why',
            age: 18
        }
    },
    mutations: {},
    actions: {},
    modules: {
        login,
        article
    }
})
