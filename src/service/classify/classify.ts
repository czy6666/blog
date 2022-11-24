import HYRequest from '../index'
import { IDataType, IClassifyName } from './type'

enum ClassifyAPI {
    getClassifyById = 'classifies/getClassifyById',
    getAllClassifies = 'classifies/getAllClassifies',
    getClassifies = 'classifies/getClassifies'
}

//获取单个文章分类
export function getClassifyById(article_id: string | string[]) {
    return HYRequest.post<IDataType<IClassifyName[]>>({
        url: ClassifyAPI.getClassifyById,
        data: { article_id }
    })
}

//获取全部分类包括显示
export function getAllClassifies() {
    return HYRequest.get<IDataType<any>>({
        url: ClassifyAPI.getAllClassifies
    })
}

//获取分类
//获取全部分类
export function getClassifies() {
    return HYRequest.get<IDataType<IClassifyName[]>>({
        url: ClassifyAPI.getClassifies
    })
}
