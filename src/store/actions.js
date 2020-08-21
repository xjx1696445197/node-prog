// 设置异步、多种状态改变方法
import types from './mutation-types'
import storage from 'static/js/storage'
import axios from 'axios'
import urlUtil from '../util/apiUtil.js'


export default {
    // 设置用户名
    setUsers({commit, state}, user){
        commit(types.SET_USERS, user)
        storage.setItem('users', state.users)
    },
    // 设置侧边栏信息
    setSidebars({commit, state}, sidebars){
        commit(types.SET_SIDEBARS, sidebars)
        storage.setItem('sidebars', state.sidebars)
    },
    // 设置地址簿个人信息
    setAddressInfo({commit, state}, addressInfo){
        commit(types.SET_ADDRESSINFO, addressInfo)
        storage.setItem('addressInfo', state.addressInfo)
    },
    // 删除地址簿信息
    removeAddressInfo({commit, state}){
        commit(types.SET_ADDRESSINFO, undefined)
        storage.removeItem('addressInfo')
    },
    // 设置用户信息
    setUserinfo({commit, state}, userinfo){
        commit(types.SET_USERINFO, userinfo)
        storage.setItem('userinfo', userinfo)
    },
    // 删除用户信息
    removeUserinfo({commit, state}){
        commit(types.SET_USERINFO, undefined)
        storage.removeItem('userinfo')
    },
    // 设置用户消息状态
    setUserNoticeState({commit, state}){
        const http = this._vm.$http
        const { userinfo } = state

        if( userinfo ){
            http.get(`js/message/getUnreadMsg/${userinfo.userId}`).then((res) => {
                if( res.success ){
                    const {
                        transfer,
                        system
                    } = res.result

                    commit(types.SET_TRANSFERNOTICE, transfer)
                    commit(types.SET_SYSTEMNOTICE, system)
                }
            })
        } else {
            commit(types.SET_TRANSFERNOTICE, false)
            commit(types.SET_SYSTEMNOTICE, false)
        }
    },
    setNeedUpdate({commit, state}){
        const http = this._vm.$http
        const { needUpdate, code } = state

        if( needUpdate === -1 ){
            axios.get(urlUtil.getApiUrl("api_rootlist")+"/v1/app_version/get", {
            },).then((res) => {
                console.log( res.data.version)
               if("1"!=Number(res.data.version)){
                   console.log( res.data.downloadurl)
                commit(types.SET_NEEDUPDATE, true)
                commit(types.SET_UPDATEDETAIL, res.data.downloadurl) 
               }else{
                commit(types.SET_NEEDUPDATE, false)
               }
            })
            // http.get('js/hAppEditioinApp/findNewEdition', {
            //     code
            // }).then((res) => {
            //     if( res.success ){
            //         if( res.result.isNewRecord ){
            //             commit(types.SET_NEEDUPDATE, true)
            //             commit(types.SET_UPDATEDETAIL, res.result)
            //         } else {
            //             commit(types.SET_NEEDUPDATE, false)
            //         }
            //     }
            // })
        }
    }
}
