import { IArticleList } from '@/views/home/config/home-config'

export interface IArticleState {
    searchList: IArticleList[]
    searchValue: string
    isAnchorShow: boolean
    article_id: string
}
