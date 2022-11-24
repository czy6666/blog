export interface ITagName {
    tagName: string
}

export interface IGetByTag {
    article_id: string
    title: string
}

export interface IDataType<T = any> {
    data: T
}
