import HYRequest from '../index'
import { IDataType, ITagName, IGetByTag } from './type'

enum LabelAPI {
    getTagsById = 'tags/getTagsById',
    getAllTags = 'tags/getAllTags',
    getHotTags = 'tags/getHotTags',
    getArticleByTag = 'tags/getArticleByTag'
}

//获取单个文章标签
export function getTagsById(article_id: string | string[]) {
    return HYRequest.post<IDataType<ITagName[]>>({
        url: LabelAPI.getTagsById,
        data: { article_id }
    })
}

//获取全部标签
export function getAllTags() {
    return HYRequest.get<IDataType<string[]>>({
        url: LabelAPI.getAllTags
    })
}

//获取热门标签
export function getHotTags() {
    return HYRequest.get<IDataType<string[]>>({
        url: LabelAPI.getHotTags
    })
}

//根据标签获取文章列表
export function getArticleByTag(tagName: string | string[]) {
    return HYRequest.post<IDataType<IGetByTag[]>>({
        url: LabelAPI.getArticleByTag,
        data: { tagName }
    })
}
