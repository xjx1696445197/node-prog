<template>
    <div class="page">
        <div class="header">
            <div
                    class="HEADER_LEFT select"
                    @click="toOpen"
            ></div>
            <div
                    class="HEADER_RIGHT notice"
                    :class="{'active': hasNoReadNotice}"
                    @click="toNotice"
            ></div>
            <div class="logo"></div>
            <p class="username" v-text="(userinfo && userinfo.nickName) || '----'"></p>
        </div>

        <div class="list">
            <div class="item"
                 v-for="(item, index) in accountList"
                 :key="index"
                 :data-name="item.currency"
                 @click="toDetail"
            >
                <div class="item_pic">
                    <img :src="sourceUrl + item.currencyImageUrl">
                </div>
                <div class="item_name" v-text="item.currency || '--'"></div>
                <div class="item_count">{{(item.amount || 0) | tofixed4}}</div>
            </div>
        </div>
        <div @click="submitpassword()">
            没有帐号
        </div>
        <div @click="Existingaccount()">
            有账号
        </div>
        <div @click="addaccount()">
            增加地址
        </div>
        <div @click="openDB()">
            打开数据库
        </div>
        <div @click="executeSQL2()">
            存储数据
        </div>
        <div @click="selectSQL()">
            查找数据
        </div>
        <div @click="addresshale()">
            生成hale地址
        </div>
        <p>
            {{mnemonic}}
        </p>
        <!--侧拉框-->
        <nlayer
                :visible="feeTipVisible"
                @close="feeTipDigClose"
                class="ANIMATITE_LEFT_TO_RIGHT"
                height="100%"
                :zIndex="999"
        >
            <div class="asset_sidebar">
                <div class="sidebar_content">
                    <div class="sidebar_title">
                        <p class="sidebar_txt1">{{$t('sidebar.sidebar_title')}}</p>
                        <div class="sidebar_icon"
                             @click="toClose"
                        ></div>
                    </div>
                    <div class="sidebar_scroll">
                        <div class="sidebar_list_wrapper" v-if="userList.length">
                            <div class="sidebar_list_padding">
                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_select')}}</p>
                                <div class="sidebar_list">
                                    <div class="sidebar_item"
                                         v-for="(item, index) in userList"
                                         :key="index"
                                         @click="selectUser"
                                         :data-id="index"
                                         :class="[item.active ? 'active' : '']"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_default"></div>
                                        <p class="sidebar_txt3">{{item.username}}</p>
                                        <div class="sidebar_active_icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar_list_wrapper">
                            <div class="sidebar_list_padding">
                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_other')}}</p>
                                <div class="sidebar_list">
                                    <div class="sidebar_item"
                                         @click="toRegister"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_create"></div>
                                        <p class="sidebar_txt3">{{$t('sidebar.sidebar_create')}}</p>
                                    </div>
                                    <div class="sidebar_item"
                                         @click="toImport"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_import"></div>
                                        <p class="sidebar_txt3">{{$t('sidebar.sidebar_import')}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </nlayer>

        <nlayer
                :maskCancel="false"
                maskBackgroundColor="rgba(0,0,0,0.1)"
                :visible="loadingVisible"
                class="NLOADING"
                :zIndex="1001"
        >
            <div class="LOADING">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px"
                     y="0px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve" width="0.8rem"
                     height="0.8rem">
                    <path opacity="0.1" fill="#fff"
                          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                    <path fill="#fff"
                          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z">
                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20"
                                          to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                    </path>
                </svg>
                <p class="LOADING_TXT">{{$t('layerdate.layerdate_changeing')}}</p>
            </div>
        </nlayer>


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
    import {sourceUrl} from '@/config'
    import {mapGetters, mapActions} from 'vuex'
    import {dip, SeedPhrase, Submitpasswords,addaccounts,Existingaccounts} from '../util/dip.js'
    // const cosmosjs = require("@cosmostation/cosmosjs");

    // const bitcoin = require('bitcoinjs-lib'),
    //     bip39 = require('bip39');
    // // const ethUtil = require('ethereumjs-util');
    // const KeyringController = require('eth-keyring-controller')
    // const SimpleKeyring = require('eth-simple-keyring')
    //
    // const keyringController = new KeyringController({
    //     keyringTypes: [SimpleKeyring], // optional array of types to support.
    // })
    // var keyring=""

    // console.log(2)
    // keyring.on('newAccount', (address) => {
    //         console.log(`New account created: ${address}`)
    //     })
    // keyringController.addNewAccount(keyring)

    // addNewKeyring
    // addNewAccount
    // The KeyringController is also an event emitter
    // keyringController.on('removedAccount', handleThat)

    export default {
        name: "Asset",
        components: {
            Nlayer
        },
        data() {
            return {
                sourceUrl,
                accountList: [],
                updateDialog: null,
                tips: '',
                tipsVisible: false,
                userList: [
                    {
                        username: 'dmy00001',
                        active: false
                    },
                    {
                        username: 'yl000051',
                        active: false
                    },
                    {
                        username: 'zhy11111',
                        active: false
                    }
                ],
                feeTipVisible: false,
                loadingVisible: false,
                mnemonic:""
            }
        },
        mounted() {
            // dip()
            // SeedPhrase()
            // console.log(111)
            // SeedPhrase().then((res)=>{
            //     console.log(res)
            //      }).catch((err) => {
            //                // catch - 失败后执行
            //             })
            // var keyring = ""
            // console.log(keyringController.createNewVaultAndKeychain("1234567890"))
            // keyringController.addNewKeyring("Simple Key Pair")
            //     .then((res) => {
            //     console.log(1)
            //     keyring = res   // then - 成功后执行
            //     // console.log(keyring)
            //     }).then((res) => {
            //     keyringController.addNewAccount(keyring).then((res) => {
            //         console.log(res)
            //         console.log(2)
            //     }).catch((err) => {
            //         console.error(err);      // catch - 失败后执行
            //     })
            //     }).then((res) => {
            //     keyringController.getAccounts().then((res) => {
            //         console.log(res)
            //         console.log(3)
            //
            //     }).catch((err) => {
            //         console.error(err);      // catch - 失败后执行
            //     })
            // }).catch((err) => {
            //     console.error(err);      // catch - 失败后执行
            // })

            // keyringController.createNewVaultAndKeychain("1234567890")
            // // keyring.on('newAccount', (address) => {
            // //         console.log(`New account created: ${address}`)
            // //     })
            // // console.log(keyring)
            // keyringController.addNewAccount(keyringController.addNewKeyring("Simple Key Pair"))
            // alert(1)
            // this.keyringController.on('newAccount', (address) => {
            //     console.log(`New account created: ${address}`)
            // })
            // let
            //     checkedAddr = '0xA1885f23B7Df9847443Cfe9C24C98959fc0ce37b',
            //     invalidAddr = '0xA1885f23B7Df9847443Cfe9C24C98959fc0ce37b';
            //
            // console.log(ethUtil.isValidChecksumAddress(checkedAddr));
            // console.log(ethUtil.isValidChecksumAddress(invalidAddr));
            // console.log(ethUtil)
            // console.log(bip39)
            // console.log(bitcoin)
            // 判断是否有数据
            this.isSidebars()
            this.isLogin()

            // 判断是否要更新
            if (this.needUpdate == -1) {
                this.setNeedUpdate()
            } else {
                if (this.needUpdate) {
                    this.createUpdateDialog()
                    this.updateDialog.open()
                }
            }
        },
        computed: {
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.userId
            },
            hasNoReadNotice() {
                return this.getTransferNotice() || this.getSystemNotice()
            },
            needUpdate() {
                return this.getNeedUpdate()
            },
            updateDetail() {
                return this.getUpdateDetail()
            },
            loginTip() {
                return this.$t('login.login_tips')
            },
            userName() {
                return this.userinfo.userName
            },
            Sidebars() {
                return this.getSidebars()
            },
        },
        methods: {
            ...mapActions(['setUserNoticeState', 'setNeedUpdate', 'setUserinfo', 'setUsers', 'removeUserinfo', 'setSidebars']),
            ...mapGetters(['getUserinfo', 'getSystemNotice', 'getTransferNotice', 'getNeedUpdate', 'getUpdateDetail', 'getSidebars']),
            addresshale(){

            },
            openDB(){
                plus.sqlite.openDatabase({
                    name: 'first',
                    path: '_doc/test.db',
                    success: function(){
                        console.log('openDatabase success!');
                    },
                    fail: function(e){
                        console.log('openDatabase failed: '+JSON.stringify(e));
                    }
                });
            },
            selectSQL(){

            },
            submitpassword() {
                Submitpasswords("5556555++5+",1).then((res)=>{
                    console.log(res)
                })
            },
            Existingaccount(){
                Existingaccounts("5556555++5+")
            },
            addaccount(){
                addaccounts().then((res)=>{
                    console.log(res)
                })
            },
            // NewKeyring() {
            //     addNewKeyring()
            // },
            // 创建版本更新弹窗
            createUpdateDialog() {
                const h = this.$createElement
                // const cons = this.updateDetail.content.replace(/(\r\n)|(\n)/g, '<br/>');
                // console.log(cons)
                const content = h('div', {
                    class: 'DIALOG'
                }, [
                    h('div', {class: 'DIALOG_TITLE'}, "版本" + this.$t('aboutUs.aboutUs_edition')),
                    // h('div', {class: 'DIALOG_CONTENT'}, this.updateDetail.content),
                    h('div', {class: 'DIALOG_BTNS clearfix'}, [
                        h('div', {
                            class: 'DIALOG_BTN CONFIRM',
                            on: {
                                click: () => {
                                    this.openPage()
                                }
                            }
                        }, this.$t('aboutUs.aboutUs_update'))
                    ]),
                ])

                this.updateDialog = this.$layer({
                    content,
                    width: '80%',
                    maskCancel: false
                })
            },
            // 原生打开新页面
            openPage() {
                window.plus && window.plus.runtime.openURL(this.updateDetail.downloadPath)
            },
            // 检测缓存是否有数据
            isSidebars() {
                if (this.Sidebars.length > 0) {
                    this.userList = this.Sidebars
                } else {
                    this.userList = []
                }
            },
            // 检测用户是否登录
            isLogin() {
                if (this.userinfo) {
                    // 获取用户是否有未读消息
                    this.setUserNoticeState()
                    // 获取登录时的资产列表
                    this.getAccountList()
                    //    获取状态
                    this.setStatus()
                } else {
                    // 获取没有登录时的资产列表
                    this.getAccountListNoLogin()
                }
            },
            // 获取登录时的资产列表
            getAccountList() {
                this.$http.get('js/userWallet/getUserWallet', {
                    userId: this.userId
                }).then((res) => {
                    if (res.success) {
                        this.accountList = res.result.list
                    }
                })
            },
            // 获取没有登录时的资产列表
            getAccountListNoLogin() {
                this.$http.get('js/usersLogin/getUserWallet').then((res) => {
                    if (res.success) {
                        this.accountList = res.result
                    }
                })
            },
            //
            setStatus() {
                this.userList.forEach((item, i) => {
                    // console.log(item.username,this.userName)

                    if (item.username == this.userName) {

                        item.active = true
                    } else {
                        item.active = false
                    }

                })
            },
            // 跳转到币详情
            toDetail(e) {
                if (!this.userinfo) {
                    this.showTips(this.loginTip)
                    return
                }
                const {name} = e.currentTarget.dataset

                this.$push({
                    path: '/currencyDetail',
                    query: {
                        currencyName: name
                    }
                })
            },
            // 跳转到消息页面
            toNotice() {
                if (!this.userinfo) {
                    this.showTips(this.loginTip)
                    return
                }
                this.$push({
                    path: '/notice'
                })
            },
            // 选择
            selectUser(e) {
                const {
                    id
                } = e.currentTarget.dataset
                // console.log(id)
                // 打开加载层
                this.showLoading()
                this.userList.forEach((item, i) => {

                    if (i == id) {

                        item.active = true
                    } else {
                        item.active = false
                    }

                })

                // 根据当前选择的用户名去请求切换接口
                this.$http.post('js/usersLogin/getTokenByUserId', {
                    userName: this.userList[id].username,
                    __HEADERSAUTH: true
                }).then((res) => {
                    // 关闭加载层
                    this.closeLoading()
                    // console.log(res,res.headers)
                    if (res.data.success) {
                        // console.log(res.headers)
                        let userinfo = res.data.result
                        const {token} = res.headers
                        // this.removeUserinfo()
                        // 保存用户信息
                        this.setUserinfo({
                            ...userinfo,
                            token
                        })
                        // 保存用户名
                        this.setUsers(userinfo.userName)

                        this.loginSuccess = true

                        this.isLogin()
                        this.showTips(res.data.message, false)

                    } else {
                        this.showTips(res.data.message)
                        //    未找到该用户 然后进行删除操作
                    }

                })


                // console.log(this.userList)

            },
            // 去注册
            toRegister() {
                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/register',
                    query: {
                        from: 'create'
                    }
                })

            },
            // 去导入
            toImport() {
                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/importWallet',
                    query: {
                        from: '/asset'
                    }

                })
            },
            // 打开
            toOpen() {
                this.feeTipVisible = true
            },
            feeTipDigClose() {
                this.feeTipVisible = false
            },
            toClose() {
                this.feeTipVisible = false
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
            },
            // 打开加载
            showLoading() {
                // console.log('执行了')
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
            }
        }
    }
</script>

<style scoped>
    .page {
        position: relative;
    }

    .asset_sidebar {
        position: relative;
        /*top: 0;*/
        /*left: 0;*/
        /*right: 2.5rem;*/
        /*bottom: 0;*/
        /*width: 7.5rem;*/
        height: 100%;
        /*z-index: 999;*/
    }

    .sidebar_scroll {
        position: absolute;
        top: 0.9rem;
        left: 0;
        width: 100%;
        right: 0;
        bottom: 0;
        overflow-x: hidden;
        overflow-y: auto;
        overflow-scrolling: touch;
    }

    .sidebar_content {
        height: 100%;
        width: 5rem;
        background: #fafafa;
    }

    .sidebar_title {
        background: #e4811d;
        width: 100%;
        height: 0.88rem;
        position: relative;
    }

    .sidebar_txt1 {
        font-size: 0.32rem;
        color: #fff;
        line-height: 0.9rem;
        /*padding-top: 0.4rem;*/
        padding-left: 0.3rem;
    }

    .sidebar_icon {
        background: url("../static/images/icon/sidebar_up.png") no-repeat center center / cover;
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0.3rem;
        bottom: 0.15rem;
    }

    .sidebar_list_wrapper {
        padding-top: 0.24rem;
        background: #fafafa;
    }

    .sidebar_list_padding {
        background: #fff;
        padding: 0 0.3rem;
    }

    .sidebar_txt2 {
        font-size: 0.3rem;
        color: #333;
        line-height: 0.8rem;
        padding-top: 0.2rem;
    }

    .sidebar_item {
        padding: 0.2rem;
        border-top: 1px solid #ccc;
        position: relative;
    }

    .sidebar_item.active .sidebar_active_icon {
        background: url("../static/images/icon/select_active.png") no-repeat center center / cover;
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0.1rem;
    }

    .sidebar_active_icon {

    }

    .sidebar_item_pic {
        width: 0.6rem;
        height: 0.6rem;
    }

    .sidebar_item_default {
        background: url("../static/images/default/default_headImg.png") no-repeat center center / cover;
    }

    .sidebar_item_create {
        background: url("../static/images/icon/create_wallet.png") no-repeat center center / cover;
    }

    .sidebar_item_import {
        background: url("../static/images/icon/import_wallet.png") no-repeat center center / cover;
    }

    .sidebar_txt3 {
        font-size: 0.24rem;
        color: #333;
        line-height: 0.6rem;
        position: absolute;
        left: 1rem;
        top: 0.2rem;
    }


    .HEADER_LEFT {
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        top: 0.15rem;
        left: 0.3rem;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .select {
        background: url("../static/images/icon/sidebar_expand.png") no-repeat center center / cover;
    }

    .header {
        position: relative;
        height: 4.7rem;
        background: url("../static/images/bg/bg_top470.png") no-repeat center center / cover;
    }

    .notice {
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

    .logo {
        position: absolute;
        width: 1.82rem;
        height: 1.82rem;
        box-shadow: 0 0.05rem 0.15rem rgba(102, 102, 102, .3);
        left: 50%;
        border-radius: 100%;
        transform: translateX(-50%);
        top: 1.2rem;
        background: url("../static/images/default/default_headImg.png") no-repeat center center / cover;
    }

    .username {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 3.22rem;
        font-size: .4rem;
        color: #fff;
        line-height: .6rem;
        text-align: center;
        max-width: 3rem;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    .list {
        margin-top: 0.24rem;
        padding: 0 .3rem;
    }

    .item {
        overflow: hidden;
        display: flex;
        position: relative;
        height: 1.3rem;
        background: #fff;
        border-radius: .2rem;
        padding: 0 0.55rem 0 0.75rem;
        box-shadow: 0 0.05rem 0.15rem rgba(102, 102, 102, 0.1);
        align-items: center;
        justify-content: space-between;
    }

    .item + .item {
        margin-top: .24rem;
    }

    .item:after {
        position: absolute;
        right: 0.15rem;
        top: 50%;
        transform: translateY(-50%);
        width: 0.4rem;
        height: 0.4rem;
        content: '';
        background: url("../static/images/icon/notice_icon_right.png") no-repeat center center / cover;
    }

    .item_pic {
        width: 0.6rem;
        height: 0.6rem;
        -webkit-border-radius: 100%;
        -moz-border-radius: 100%;
        border-radius: 100%;
        overflow: hidden;
        position: absolute;
        left: 0.15rem;
    }

    .item_pic img {
        display: block;
        width: 100%;
        height: 100%;
    }

    .item_name {
        font-size: .34rem;
        color: #333;
        padding: 0 0.15rem;
        line-height: .6rem;
    }

    .item_count {
        font-size: .34rem;
        color: #333;
        padding: 0 0.15rem;
        line-height: .6rem;
    }

    .DIALOG_CONTENT {
        text-align: left;
        /*padding: 0 0.4rem;*/
    }

    .DIALOG_TITLE {
        font-size: .34rem;
        color: #333;
    }

    .DIALOG_CONTENT {
        white-space: pre-line;
    }
</style>




