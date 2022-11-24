export function brightenKeyword(val: string, keyword: string) {
    const Reg = new RegExp(keyword, 'i')
    let res = ''

    res = val.replace(Reg, `<span style="color: red;">${keyword}</span>`)
    return res
}
