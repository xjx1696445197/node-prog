// 测试服
// const devRequestUrl = 'http://39.106.90.111:8984/'
// const devSourceUrl = 'http://39.106.90.111:8983/js/'

// 兴链测试服
const devRequestUrl = 'http://39.106.90.111:8987/'
const devSourceUrl = 'http://39.106.90.111:8983/js/'

const prodRequestUrl = 'http://120.77.247.234:8984/'
const prodSourceUrl = 'http://120.77.247.234:8983/js/'

// 占鹏本地
// const devRequestUrl = 'http://192.168.3.95:8983/'
// const devSourceUrl = 'http://39.106.90.111:8983/js/'

// 闫猛本地
// const devRequestUrl = 'http://192.168.3.149:8983/'
// const devSourceUrl = 'http://192.168.3.149:8983/js/'

// 测试用
const sourceUrlShop1 = 'http://halleshoptestserver.hallechain.cn/'
const sourceUrlShop2 = 'http://halleshoptestserver.hallechain.cn/'

const baseURL = PROJECT_ENV === 'production' ? prodRequestUrl : devRequestUrl

// const baseURL = PROJECT_ENV === 'production' ? prodRequestUrl : sourceUrlShop1

const sourceUrl = PROJECT_ENV === 'production' ? prodSourceUrl : devSourceUrl
const sourceUrlShop = PROJECT_ENV === 'production' ? sourceUrlShop1 : sourceUrlShop2
const version = '1.1.0'
const code = 30

export {
    baseURL,
    sourceUrl,
    sourceUrlShop,
    version,
    code
}
