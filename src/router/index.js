import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store/index'


import Main from 'pages/Main'
import Asset from 'pages/Asset'
import Market from 'pages/Market'
import Product from 'pages/Product'
import News from 'pages/News'
import My from 'pages/My'

// 新钱包路由开始
import WalletIndex from 'pages/WalletIndex'
import WalletCreate from 'pages/WalletCreate'
import WalletImport from 'pages/WalletImport'
import WalletBackup from 'pages/WalletBackup'
import Backupmnemonics from 'pages/Backupmnemonics'
import Verificationmnemonics from 'pages/Verificationmnemonics'
import Importaddress from 'pages/Importaddress'


// 增加谷歌验证
import GoogleVerification from 'pages/GoogleVerification'
import GoogleVerificationSecound from 'pages/GoogleVerificationSecound'
import ChangeGoogle from 'pages/ChangeGoogle'
import ChangeGoogleBind from 'pages/ChangeGoogleBind'



import CurrencyDetail from 'pages/CurrencyDetail'
import CurrencyCollect from 'pages/CurrencyCollect'
import CurrencyTransfer from 'pages/CurrencyTransfer'
import CurrencyExchange from 'pages/CurrencyExchange'
import CurrencyDealDetail from 'pages/CurrencyDealDetail'
import Notice from 'pages/Notice'
import NoticeDetail from 'pages/NoticeDetail'
import Login from 'pages/Login'
import Register from 'pages/Register'
import NotFound from 'pages/NotFound'
import NewsDetail from 'pages/NewsDetail'
import NewsList from 'pages/NewsList'
import LockedPosition from 'pages/LockedPosition'
import Group from 'pages/Group'
import CalculatePower from 'pages/CalculatePower'
import PersonalCenter from 'pages/PersonalCenter'
import WalletList from 'pages/WalletList'
import WalletDetail from 'pages/WalletDetail'
import Share from 'pages/Share'
import Feedback from 'pages/Feedback'
import AboutUs from 'pages/AboutUs'
import UserAgreement from 'pages/UserAgreement'
import UserAgreements from 'pages/Useragreements'
import PrivacyAgreement from 'pages/PrivacyAgreement'
import ModifyPassword from 'pages/ModifyPassword'
import ExportMnemonicWord from 'pages/ExportMnemonicWord'
import FillMnemonicWord from 'pages/FillMnemonicWord'
import LockedPositionDetail from 'pages/LockedPositionDetail'
import IncomeRecord from 'pages/IncomeRecord'
import PowerTabInvestDetail from 'pages/PowerTabInvestDetail'
import SetPassword from 'pages/SetPassword'
import ForgetPassword from 'pages/ForgetPassword'
import FindPwdForMnemonicWord from 'pages/FindPwdForMnemonicWord'
import ModifyPassword2 from 'pages/ModifyPassword2'
import BackupMnemonicWord from 'pages/BackupMnemonicWord'
import UsingAgreement from 'pages/UsingAgreement'
import FindPass from 'pages/FindPass'
import Node from 'pages/Node'
import WalkThough from 'pages/WalkThough'
import Scan from 'pages/Scan'
import ChangeLanguage from 'pages/ChangeLanguage'
import FindPassTabTel from 'pages/FindPassTab/FindPassTabTel'
import FindPassTabEmail from 'pages/FindPassTab/FindPassTabEmail'
import FindPassTabWord from 'pages/FindPassTab/FindPassTabWord'
import RegisterTabTel from 'pages/registerTab/RegisterTabTel'
import RegisterTabEmail from 'pages/registerTab/RegisterTabEmail'
import NoticeTabTransfer from 'pages/noticeTab/NoticeTabTransfer'
import NoticeTabSystem from 'pages/noticeTab/NoticeTabSystem'
import PowerTabInvest from 'pages/PowerTab/PowerTabInvest'
import PowerTabExchange from 'pages/PowerTab/PowerTabExchange'
import PowerTabAward from 'pages/PowerTab/PowerTabAward'
import Bind from 'pages/Bind'
import ModifyBind from 'pages/ModifyBind'
import AddressBook from 'pages/AddressBook'
import AddBook from 'pages/AddBook'
import AddressBookDetail from 'pages/AddressBookDetail'
import EditAddressBook from 'pages/EditAddressBook'
import Updatelog from 'pages/Updatelog'
import Incomeexpendituredetails from 'pages/Incomeexpendituredetails'
import entrust from 'pages/Entrust'
import vote from 'pages/vote'


import nlayerExample from '../example/LayerExample'
import swtichLang from '../example/SwtichLang'
import scrollExample from '../example/ScrollExample'

Vue.use(Router)

const example = [
    {
        path: '/nlayerExample',
        name: 'nlayerExample',
        component: nlayerExample
    },
    {
        path: '/swtichLang',
        name: 'swtichLang',
        component: swtichLang
    },
    {
        path: '/scrollExample',
        name: 'scrollExample',
        component: scrollExample
    }
]


const router =  new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Main',
            component: Main,
            redirect: '/walkThough',
            children: [
                {
                    path: '/asset',
                    name: 'Asset',
                    component: Asset
                },
                {
                    path: '/market',
                    name: 'Market',
                    component: Market
                },
                {
                    path: '/entrust',
                    name: 'entrust',
                    component: entrust
                },
                {
                    path: '/vote',
                    name: 'vote',
                    component: vote
                },
                {
                    path: '/product',
                    name: 'Product',
                    component: Product,
                    redirect: '/product/lockedPosition',
                    children: [
                        {
                            path: '/product/lockedPosition',
                            name: 'LockedPosition',
                            component: LockedPosition
                        },
                        {
                            path: '/product/group',
                            name: 'Group',
                            component: Group
                        },
                        {
                            path: '/product/calculatePower',
                            name: 'CalculatePower',
                            component: CalculatePower,
                            redirect: '/product/calculatePower/powerTabInvest',
                            children: [
                                {
                                    path: '/product/calculatePower/powerTabInvest',
                                    name: 'PowerTabInvest',
                                    component: PowerTabInvest
                                },
                                {
                                    path: '/product/calculatePower/powerTabExchange',
                                    name: 'PowerTabExchange',
                                    component: PowerTabExchange
                                },
                                {
                                    path: '/product/calculatePower/powerTabAward',
                                    name: 'PowerTabAward',
                                    component: PowerTabAward
                                }
                            ]
                        }
                    ]
                },
                {
                    path: '/news',
                    name: 'News',
                    component: News
                },
                {
                    path: '/my',
                    name: 'My',
                    component: My
                }
            ]
        },
        // 新钱包路由开始
        {
            path: '/walletIndex',
            name: 'WalletIndex',
            component: WalletIndex
        },
        {
            path: '/walletCreate',
            name: 'WalletCreate',
            component: WalletCreate
        },
        {
            path: '/walletImport',
            name: 'WalletImport',
            component: WalletImport
        },
        {
            path: '/walletBackup',
            name: 'WalletBackup',
            component: WalletBackup
        },
        {
            path: '/Backupmnemonics',
            name: 'Backupmnemonics',
            component: Backupmnemonics
        },
        {
            path: '/Verificationmnemonics',
            name: 'Verificationmnemonics',
            component: Verificationmnemonics
        },
        {
            path: '/Importaddress',
            name: 'Importaddress',
            component: Importaddress
        },


        // 新钱包路由结束
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/googleVerification',
            name: 'GoogleVerification',
            component: GoogleVerification
        },
        {
            path: '/googleVerificationSecound',
            name: 'GoogleVerificationSecound',
            component: GoogleVerificationSecound
        },
        {
            path: '/ChangeGoogle',
            name: 'ChangeGoogle',
            component: ChangeGoogle
        },

        {
            path: '/changeGoogleBind',
            name: 'ChangeGoogleBind',
            component: ChangeGoogleBind
        },

        {
            path: '/register',
            name: 'Register',
            component: Register,
            redirect: '/register/registerTabTel',
            children: [
                {
                    path: '/register/registerTabEmail',
                    name: 'RegisterTabEmail',
                    component: RegisterTabEmail
                },
                {
                    path: '/register/registerTabTel',
                    name: 'RegisterTabTel',
                    component: RegisterTabTel
                },
            ]
        },


        {
            path: '/currencyDetail',
            name: 'CurrencyDetail',
            component: CurrencyDetail,

        },
        {
            path: '/currencyCollect',
            name: 'CurrencyCollect',
            component: CurrencyCollect
        },
        {
            path: '/Incomeexpendituredetails',
            name: 'Incomeexpendituredetails',
            component: Incomeexpendituredetails
        },
        {
            path: '/currencyTransfer',
            name: 'CurrencyTransfer',
            component: CurrencyTransfer
        },
        {
            path: '/currencyExchange',
            name: 'CurrencyExchange',
            component: CurrencyExchange
        },
        {
            path: '/currencyDealDetail',
            name: 'CurrencyDealDetail',
            component: CurrencyDealDetail
        },
        {
            path: '/notice',
            name: 'Notice',
            component: Notice,
            redirect: '/notice/noticeTabTransfer',
            children: [
                {
                    path: '/notice/noticeTabTransfer',
                    name: 'NoticeTabTransfer',
                    component: NoticeTabTransfer,

                },
                {
                    path: '/notice/noticeTabSystem',
                    name: 'NoticeTabSystem',
                    component: NoticeTabSystem,

                }
            ]
        },
        {
            path: '/noticeDetail',
            name: 'NoticeDetail',
            component: NoticeDetail
        },
        {
            path: '/newsDetail',
            name: 'NewsDetail',
            component: NewsDetail
        },
        {
            path: '/newsList',
            name: 'NewsList',
            component: NewsList
        },
        {
            path: '/personalCenter',
            name: 'PersonalCenter',
            component: PersonalCenter,

        },

        // 商城功能结束




        {
            path: '/walletList',
            name: 'WalletList',
            component: WalletList,

        },
        {
            path: '/walletDetail',
            name: 'WalletDetail',
            component: WalletDetail
        },
        {
            path: '/addressBook',
            name: 'AddressBook',
            component: AddressBook,

        },
        {
            path: '/addBook',
            name: 'AddBook',
            component: AddBook,

        },
        {
            path: '/addressBookDetail',
            name: 'AddressBookDetail',
            component: AddressBookDetail,

        },
        {
            path: '/editAddressBook',
            name: 'EditAddressBook',
            component: EditAddressBook,

        },
        {
            path: '/share',
            name: 'Share',
            component: Share,

        },
        {
            path: '/feedback',
            name: 'Feedback',
            component: Feedback
        },
        {
            path: '/aboutUs',
            name: 'AboutUs',
            component: AboutUs
        },
        {
            path: '/userAgreement',
            name: 'UserAgreement',
            component: UserAgreement
        },
        {
            path: '/userAgreements',
            name: 'UserAgreements',
            component: UserAgreements
        },
        {
            path: '/updatelog',
            name: 'Updatelog',
            component: Updatelog
        },
        {
            path: '/privacyAgreement',
            name: 'PrivacyAgreement',
            component: PrivacyAgreement
        },
        {
            path: '/modifyPassword',
            name: 'ModifyPassword',
            component: ModifyPassword
        },
        {
            path: '/ExportMnemonicWord',
            name: 'exportMnemonicWord',
            component: ExportMnemonicWord
        },
        {
            path: '/fillMnemonicWord',
            name: 'FillMnemonicWord',
            component: FillMnemonicWord
        },
        {
            path: '/lockedPositionDetail',
            name: 'LockedPositionDetail',
            component: LockedPositionDetail
        },
        {
            path: '/incomeRecord',
            name: 'IncomeRecord',
            component: IncomeRecord
        },
        {
            path: '/powerTabInvestDetail',
            name: 'PowerTabInvestDetail',
            component: PowerTabInvestDetail
        },
        {
            path: '/setPassword',
            name: 'SetPassword',
            component: SetPassword
        },
        {
            path: '/forgetPassword',
            name: 'ForgetPassword',
            component: ForgetPassword
        },
        {
            path: '/findPwdForMnemonicWord',
            name: 'FindPwdForMnemonicWord',
            component: FindPwdForMnemonicWord
        },
        {
            path: '/modifyPassword2',
            name: 'ModifyPassword2',
            component: ModifyPassword2
        },
        {
            path: '/backupMnemonicWord',
            name: 'BackupMnemonicWord',
            component: BackupMnemonicWord
        },


        {
            path: '/usingAgreement',
            name: 'UsingAgreement',
            component: UsingAgreement
        },


        {
            path: '/node',
            name: 'Node',
            component: Node,

        },
        {
            path: '/changeLanguage',
            name: 'ChangeLanguage',
            component: ChangeLanguage
        },
        {
            path: '/walkThough',
            name: 'WalkThough',
            component: WalkThough
        },
        {
            path: '/scan',
            name: 'Scan',
            component: Scan
        },
        {
            path: '/findPass',
            name: 'FindPass',
            component: FindPass,
            redirect: '/findPass/findPassTabTel',
            children: [
                {
                    path: '/findPass/findPassTabTel',
                    name: 'FindPassTabTel',
                    component: FindPassTabTel
                },
                {
                    path: '/findPass/findPassTabEmail',
                    name: 'FindPassTabEmail',
                    component: FindPassTabEmail
                },
                {
                    path: '/findPass/findPassTabWord',
                    name: 'FindPassTabWord',
                    component: FindPassTabWord
                }
            ]
        },
        {
            path: '/bind',
            name: 'Bind',
            component: Bind
        },
        {
            path: '/modifyBind',
            name: 'ModifyBind',
            component: ModifyBind
        },

        {
            path: '*',
            name: 'notFound',
            component: NotFound
        }
    ].concat(process.env.NODE_ENV === 'development' ? example : [])
})


// 拦截器
// router.beforeEach((to, from, next) => {
//
//     // 判断是否登录
//     if( to.meta.mustLogin ){
//         if( store.state.userinfo ){
//             next()
//         } else {
//             Vue.prototype.$toast({
//                 content: '请登录后访问',
//                 autoClose: 1000,
//                 zIndex: 10000
//             }).open()
//         }
//     } else {
//         next()
//     }
// })


export default router


