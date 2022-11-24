export interface IArticleList {
    article_id: string
    author_id: string
    title: string
    date: Date
    content: string
    views: number
    likes: number
    comments: number
    __v: number
    _id: string
}

export interface IDataType<T = any> {
    data: T
}

export interface ITitleList {
    titleChild: string[]
}
