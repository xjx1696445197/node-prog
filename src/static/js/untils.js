// 时间戳转化
const dataFormat = (value, fmt) => {
    if( !value ){
        return ''
    }

    let getDate = new Date(Number(value))
    if( getDate.toString() === 'Invalid Date' ){
        return value
    }

    let o = {
        'M+': getDate.getMonth() + 1,
        'd+': getDate.getDate(),
        'h+': getDate.getHours(),
        'm+': getDate.getMinutes(),
        's+': getDate.getSeconds(),
        'q+': Math.floor((getDate.getMonth() + 3) / 3),
        'S': getDate.getMilliseconds()
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (getDate.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
    }

    return fmt
}


// 取后四位小数
const tofixed4 = (value) => {
    var nValue = Number(value)
    if( isNaN(nValue) ){
        return value
    }
    // console.log("------------------",value)
    return nValue.toFixed(5).slice(0, -1)
}
// 取后6位小数
const tofixed6 = (value) => {
    var nValue = Number(value)
    if( isNaN(nValue) ){
        return value
    }
    // console.log("------------------",value)
    return nValue.toFixed(7).slice(0, -1)
}
// 货币地址格式
const addressFormat = (value, length=6) => {
    if( !value ){
        return ''
    }
    return value.substr(0, length) + '...' + value.substr(-length, length)
}


export {
    dataFormat,
    tofixed4,
    addressFormat,
    tofixed6
}
