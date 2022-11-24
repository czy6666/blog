export function formatDate(time: any): string {
    const date = new Date(time)

    const YY = date.getFullYear()
    const MM =
        date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hh = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const mm =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const ss =
        date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()

    // 这里修改返回时间的格式
    return YY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
}

export function utctobeijing(utc_datetime: any) {
    // 转为正常的时间格式 年-月-日 时:分:秒
    const new_datetime =
        utc_datetime.split('T')[0] +
        ' ' +
        utc_datetime.split('T')[1].split('.')[0]

    // 处理成为时间戳
    let timestamp = new Date(new_datetime.replace(/-/g, '/')).getTime()
    timestamp = timestamp / 1000
    // 增加8个小时，北京时间比utc时间多八个时区
    timestamp = timestamp + 8 * 60 * 60

    // 时间戳转为时间
    const date = new Date(parseInt(timestamp + '') * 1000)
    const YY = date.getFullYear() + '-'
    const MM =
        (date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1) + '-'
    const DD = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()

    return YY + MM + DD
}
