import { Module } from 'vuex'
import { IArticleState } from './type'
import { IRootState } from '../type'
import { IArticleList } from '@/views/home/config/home-config'
import { searchArticle } from '@/service/article/article'
import { brightenKeyword } from '@/utils/brightenKeyword'

const articleModule: Module<IArticleState, IRootState> = {
    namespaced: true,
    state() {
        return {
            searchList: [],
            searchValue: '',
            isAnchorShow: false,
            article_id: ''
        }
    },
    getters: {},
    mutations: {
        searchShow(state, searchList: IArticleList[]) {
            state.searchList = searchList
        },
        anchorShow(state, isAnchorShow: boolean) {
            state.isAnchorShow = isAnchorShow
        },
        articleId(state, article_id: string) {
            state.article_id = article_id
        }
    },
    actions: {
        async searchAction({ commit }, payload: string) {
            const searchResult = await searchArticle(payload)
            const { data } = searchResult
            data.forEach((d) => {
                d.title = brightenKeyword(d.title, payload)
            })
            commit('searchShow', data)
        },
        anchorShowAction({ commit }, payload: boolean) {
            commit('anchorShow', payload)
        },
        articleIdAction({ commit }, payload: string) {
            commit('articleId', payload)
        }
    }
}

export default articleModule
