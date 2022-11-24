import HYRequest from '../index'
import { IDataType, IArticleList, ITitleList } from './type'

enum ArticleAPI {
    getAllArticles = 'articles/getAllArticles',
    getArticleById = 'articles/getArticleById',
    searchArticle = 'articles/search',
    getTitleChild = 'articles/getTitleChild'
}

//获取文章列表
export function articleListRequest() {
    return HYRequest.get<IDataType<IArticleList[]>>({
        url: ArticleAPI.getAllArticles
    })
}

//获取文章内容
export function getArticleById(article_id: string | string[]) {
    return HYRequest.post<IDataType<IArticleList>>({
        url: ArticleAPI.getArticleById,
        data: { article_id }
    })
}

//搜索
export function searchArticle(searchValue: string) {
    return HYRequest.post<IDataType<IArticleList[]>>({
        url: ArticleAPI.searchArticle,
        data: { searchValue }
    })
}

//获取文章内容
export function getTitleChild(article_id: string | string[]) {
    return HYRequest.post<IDataType<ITitleList>>({
        url: ArticleAPI.getTitleChild,
        data: { article_id }
    })
}
