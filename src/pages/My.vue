<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <p class="HEADER_TITLE_WALLET">我的</p>
        </div>
        <!--        <div class="header">-->
        <!--            <div-->
        <!--                class="HEADER_RIGHT notice"-->
        <!--                :class="{'active': hasNoReadNotice}"-->
        <!--                @click="go"-->
        <!--                data-path="/notice"-->
        <!--            ></div>-->
        <!--            <div class="wrapper">-->
        <!--                <div class="header_content mauto">-->
        <!--                    <div class="logo" @click="go" data-path="/personalCenter"></div>-->
        <!--                    <div v-if="!userinfo">-->
        <!--                        <div class="header_funs">-->
        <!--                            <div class="header_login header_fun" @click="go" data-path="/login">{{$t('my.my_login')}}</div>-->
        <!--                            <p class="header_funs_txt">/</p>-->
        <!--                            <div class="header_register header_fun" @click="go" data-path="/register">{{$t('my.my_register')}}</div>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                    <div v-else>-->
        <!--                        <div class="header_funs">-->
        <!--                            <p class="header_funs_txt thide" v-text="(userinfo && userinfo.nickName) || '&#45;&#45;&#45;&#45;'"></p>-->
        <!--                        </div>-->
        <!--                    </div>-->

        <!--                    <div class="header_links">-->
        <!--                        <div class="header_link" @click="go" data-path="/node">-->
        <!--                            <div class="header_link_icon">-->
        <!--                                <img src="../static/images/icon/node_icon.png">-->
        <!--                            </div>-->
        <!--                            <p class="header_link_txt">{{$t('my.my_node')}}</p>-->
        <!--                        </div>-->
        <!--                        &lt;!&ndash;暂缓开通&ndash;&gt;-->
        <!--                        <div class="header_link disable" @click="go" data-path="/shop" data-disable="true" v-if="open">-->
        <!--                            <div class="header_link_icon">-->
        <!--                                <img src="../static/images/icon/store_icon.png">-->
        <!--                            </div>-->
        <!--                            <p class="header_link_txt">{{$t('my.my_shoppingMall')}}</p>-->
        <!--                        </div>-->
        <!--                        &lt;!&ndash;开放&ndash;&gt;-->
        <!--                        <div class="header_link" @click="go" data-path="/shop" v-if="!open">-->
        <!--                            <div class="header_link_icon">-->
        <!--                                <img src="../static/images/icon/store_active.png">-->
        <!--                            </div>-->
        <!--                            <p class="header_link_txt">{{$t('my.my_shoppingMall')}}</p>-->
        <!--                        </div>-->
        <!--                    </div>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </div>-->

        <div class="LIST ARROW">
<!--            <div class="ITEM" @click="go" data-path="/notice">-->
<!--                <div class="item_icon">-->
<!--                    <img src="../static/images/newWallet/icon_messge.png">-->
<!--                </div>-->
<!--                <p class="ITEM_TXT">我的消息</p>-->
<!--            </div>-->
            <div class="ITEM" @click="go" data-path="/walletList">
                <div class="item_icon">
                    <img src="../static/images/newWallet/icon_wallet.png">
                </div>
                <p class="ITEM_TXT">{{$t('my.my_walletManagement')}}</p>
            </div>
            <div class="ITEM" style="border-bottom: none" @click="go" data-path="/changeGoogleBind">
                <div class="item_icon">
                    <img src="../static/images/newWallet/google.png">
                </div>

                <p class="ITEM_TXT" style="display: flex;justify-content: space-between;width: 100%">绑定谷歌验证码 <span class="hexs" v-if="googleVerification==1">已绑定</span></p>
            </div>
            <!--            <div class="ITEM" @click="go" data-path="/addressBook">-->
            <!--                <div class="item_icon">-->
            <!--                    <img src="../static/images/icon/my_icon002.png">-->
            <!--                </div>-->
            <!--                <p class="ITEM_TXT">{{$t('my.my_addressBook')}}</p>-->
            <!--            </div>-->
            <!--            <div class="ITEM" @click="goShare">-->
            <!--                <div class="item_icon">-->
            <!--                    <img src="../static/images/icon/my_icon003.png">-->
            <!--                </div>-->
            <!--                <p class="ITEM_TXT">{{$t('my.my_inviteGoodFriends')}}</p>-->
            <!--            </div>-->

            <!--            <div class="ITEM" @click="go" data-path="/changeLanguage">-->
            <!--                <div class="item_icon">-->
            <!--                    <img src="../static/images/icon/my_icon004.png">-->
            <!--                </div>-->
            <!--                <p class="ITEM_TXT">{{$t('my.my_displayLanguage')}}</p>-->
            <!--            </div>-->
            <!--            <div class="ITEM" @click="go" data-path="/feedback">-->
            <!--                <div class="item_icon">-->
            <!--                    <img src="../static/images/icon/my_icon005.png">-->
            <!--                </div>-->
            <!--                <p class="ITEM_TXT">{{$t('my.my_feedback')}}</p>-->
            <!--            </div>-->

        </div>
        <div class="LISTs ARROW">

            <div class="ITEM" @click="go" data-path="/aboutUs">
                <div class="item_icon">
                    <img src="../static/images/newWallet/icon_gy.png">
                </div>
                <p class="ITEM_TXT">{{$t('my.my_aboutUs')}}</p>
            </div>
        </div>
        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0)"
                :autoClose="1500"
                :visible="tipsVisible"
                @close="tipsClosed"
                class="NTOAST ANIMATITE_SCALE_TO_BIG"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
    </div>

</template>

<script>

    import Nlayer from '@/components/Nlayer'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: 'My',
        components: {
            Nlayer
        },
        data() {
            return {
                tips: '',
                tipsVisible: false,
                system: '',
                transfer: '',
                open: true,
                googleVerification:""
            }
        },
        mounted() {
            console.log()
            this.isLogin()
            this.googleVerification=localStorage.getItem("googleVerification")
        },
        computed: {
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.userId
            },
            userName() {
                return this.userinfo.userName
            },
            hasNoReadNotice() {
                return this.getTransferNotice() || this.getSystemNotice()
            },
            loginTip() {
                return this.$t('login.login_tips')
            },
            authorize() {
                return this.userinfo.authorize
            }
        },
        methods: {
            ...mapActions(['setUserNoticeState']),
            ...mapGetters(['getUserinfo', 'getSystemNotice', 'getTransferNotice']),
            // 检测是否登录
            isLogin() {
                if (this.userinfo) {
                    this.setUserNoticeState()
                }
            },
            // // 获取用户是否登陆过商城 http://39.106.90.111:8983/js/users/updateAuthorize?userId=10007
            // getIsAuthen(){
            //     this.$http.post('js/users/updateAuthorize?userId='+this.userId).then((res) => {
            //         console.log(res)
            //         if( res.success ){
            //
            //         }
            //     })
            //
            // },
            // 去分享
            goShare() {
                if (!this.userinfo) {
                    this.showTips(this.loginTip)
                    return
                }
                this.$http.get('js/users/validateInvite', {
                    userId: this.userId
                }).then((res) => {
                    if (res.success) {
                        this.$push({
                            path: '/share'
                        })
                    } else {
                        this.showTips(res.message)
                    }
                })
            },
            // 页面跳转
            go(e) {

                console.log(e)
                const {
                    path,
                    disable
                } = e.currentTarget.dataset
                if (path == '/changeGoogleBind') {
                    if (localStorage.getItem("googleVerification")==1) {
                        this.$push(
                            {
                                path: "/changeGoogleBind",
                                query: {
                                    googleType: 0
                                }
                            }
                        )
                        return
                    } else {
                        this.$push(
                            {
                                path: "/googleVerification",
                                query: {
                                    googleType: 2
                                }
                            }
                        )
                        return;
                    }
                }
                this.$push({path})

                // if(path == '/personalCenter' ){
                //     this.showTips(this.loginTip)
                //     return
                // }
                // if(path == '/walletList' ){
                //     this.showTips(this.loginTip)
                //     return
                // }
                // if(path == '/node' ){
                //     this.showTips(this.loginTip)
                //     return
                // }
                // if(path == '/notice' ){
                //     this.showTips(this.loginTip)
                //     return
                // }
                // if(path == '/addressBook' ){
                //     this.showTips(this.loginTip)
                //     return
                // }
                //
                // // 商城开放开始
                // if(path == '/notice' ){
                //     return
                //     this.showTips(this.loginTip)
                //     return
                // }
                //
                // // 商城开放开始
                // if(path == '/shop' ){
                //
                //     this.showTips(this.loginTip)
                //     return
                // }
                // // 商城开放结束
                //
                //
                // if( disable ){
                //     this.showTips(this.$t('layerdate.layerdate_open'))
                //     return
                // }
                //
                // if( path == '/register' ){
                //     this.$push({
                //         path: '/register',
                //         query: {
                //             from: 'register'
                //         }
                //     })
                // }else if( path == '/shop' && this.authorize == 1){
                //     this.$push({
                //         path: '/shopAuthorize'
                //     })
                // }else{
                //     if (path == '/shop'){
                //         this.$push({ path })
                //         if (localStorage.getItem("ponename")==null){
                //             localStorage.setItem("ponename",this.userName);
                //             setTimeout(function(){
                //                 location.reload(true)
                //             }, 100);
                //         }else if (localStorage.getItem("ponename")==this.userName){
                //
                //         }else {
                //             localStorage.setItem("ponename",this.userName);
                //             setTimeout(function(){
                //                 location.reload(true)
                //             }, 100);
                //         }
                //     }

                // }


            },
            // 打开消息提示
            showTips(msg) {
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed() {
                this.msg = ''
                this.tipsVisible = false
            }
        }
    }
</script>

<style scoped>
    .page {
        background: #F5F5F5;
    }

    .HEADER {
        background: none;
    }

    .header {
        position: relative;
        height: 4.7rem;
        background: url("../static/images/bg/bg_top470.png") no-repeat center center / cover;
    }

    .notice {
        z-index: 99999;
        background: url("../static/images/asset_notice_icon.png") no-repeat center center / cover;
    }

    .notice.active:after {
        position: absolute;
        content: '';
        width: .12rem;
        height: .12rem;
        background: #e41d1d;
        border-radius: 100%;
        right: .36rem;
        top: .1rem;
    }

    .header_content {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 5.8rem;
    }

    .logo {
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 100%;
        background: url("../static/images/default/default_headImg.png") no-repeat center center / cover;
    }

    .header_funs {
        display: flex;
        height: 1rem;
        align-items: center;
    }

    .header_fun {
        font-size: .34rem;
        color: #fff;
        padding: 0 0.15rem;
        line-height: .5rem;
    }

    .username {
        height: 1rem;
        display: flex;

    }

    .header_funs_txt {
        font-size: .34rem;
        color: #fff;
        line-height: .5rem;
    }

    .header_links {
        display: flex;
        width: 100%;
    }

    .header_link {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
    }

    .header_link + .header_link:after {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 1px;
        height: .5rem;
        background: #fff;
        content: '';
        left: 0;
    }

    .header_link_icon {
        width: .54rem;
        height: .54rem;
    }

    .header_link_icon img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .header_link_txt {
        font-size: .26rem;
        color: #fff;
        line-height: .5rem;
    }

    .header_link.disable .header_link_txt {
        color: #ccc;
    }

    .LIST {
        background: white;
        margin-top: .88rem;
        padding: 0 0.3rem 0 0.3rem;
    }

    .LISTs {
        background: white;
        margin-top: .2rem;
        padding: 0 0.3rem 0 0.3rem;
    }

    .LISTs .ITEM {
        border: none;
    }

    .item_icon {
        width: .5rem;
        height: .5rem;
    }

    .ITEM_TXT {
        padding: 0 .15rem;
    }

    .item_icon img {
        display: block;
        width: 80%;
        margin-top: .05rem;
        height: 80%;
    }

    .ITEM {
        border-bottom: 1px solid #EEEEEE;
    }
    .hexs{
        color: #E6821E;
    }
</style>
