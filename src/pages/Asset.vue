<template>
    <div class="page">
        <div class="header">
            <div>
                <img src="../static/images/newWallet/icon_HALE2.png">
                <span>  HALE</span>
            </div>
            <div v-show="false">
                <img src="../static/images/newWallet/icon_qh.png" @click="toOpen()" >
            </div>
        </div>
        <div class="assetdetails">
            <div>
                <div>{{walltname}}<img src="../static/images/newWallet/icon_yj.png" @click="hide()"></div>
                <div>{{addrees|addressFormat}}<img src="../static/images/newWallet/icon_imgcode.png"
                                                   @click="qcode()"></div>
                <div>
                    ￥<span v-if="show==1">{{Rmbbalance|tofixed4}}</span><span v-if="show==0">****.**</span>
                </div>
            </div>
            <div v-show="false">
                <div>
                    <P>可用总额</P>
                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>
                </div>
                <div>
                    <P>委托总额</P>
                    <P>￥<span v-if="show==1">6520.35</span><span v-if="show==0">****.**</span></P>
                </div>
            </div>
            <div @click="goIncomeexpendituredetails">
                <div>
                    <img src="../static/images/newWallet/icon_HALE2.png">
                    <span>HALE</span>
                </div>
                <div>
                    <P><span v-if="show==1">{{balance.toFixed(7).slice(0, -1)}}</span><span v-if="show==0">****.****</span></P>
                    <P>￥<span v-if="show==1">{{Rmbbalance|tofixed4}}</span><span v-if="show==0">****.**</span></P>
                </div>
            </div>
        </div>
        <div>

        </div>

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
                        <p class="sidebar_txt1">切换钱包</p>
                        <!--                        <div class="sidebar_icon"-->
                        <!--                             @click="toClose"-->
                        <!--                        ></div>-->
                    </div>
                    <div class="sidebar_scroll">
                        <div class="sidebar_list_wrapper" v-if="userList.length">
                            <div class="sidebar_list_padding scroll">
                                <div class="sidebar_list">
                                    <div class="sidebar_itemaddress"
                                         v-for="(item, index) in userList"
                                         :key="index"
                                         @click="selectUser"
                                         :data-id="index"
                                         :data-accounts="item.accounts"
                                         :class="[item.active ? 'active' : '']"
                                    >
                                        <p class="sidebar_txt3">{{item.name}}</p>
                                        <p class="sidebar_txt3">{{addrees|addressFormat}}</p>
                                        <p class="sidebar_txt3">{{balance | tofixed4}} HALE</p>
                                        <div class="sidebar_active_icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar_list_wrapperimport">
                            <div class="sidebar_list_padding">
                                <!--                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_other')}}</p>-->
                                <div class="sidebar_listaddimport">
                                    <div class="sidebar_item"
                                         @click="toRegister"
                                    >
                                        <div class="sidebar_item_pic sidebar_item_create"></div>
                                        <p class="sidebar_txt3">创建钱包</p>
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
    </div>
</template>

<script>
    import {addaccountsss, Importprivatekey, Existingaccounts, Ethtohelle, getPrivat} from '../util/dip.js'
    import Nlayer from '@/components/Nlayer'
    import Web3 from 'web3'
    import {mapGetters, mapActions} from 'vuex'
    import {sourceUrl} from '@/config'

    import urlUtil from "../util/apiUtil";
    export default {
        name: "Asset",
        components: {
            Nlayer
        },
        data() {
            return {
                updateDialog: null,
                addrees: "",
                feeTipVisible: false,
                userList: [],
                loadingVisible: false,
                show: 1,
                walltname: "",
                web3: {},
                balance: "",
                Rmbbalance: ""
            }
        },
        computed: {
               needUpdate() {
                return this.getNeedUpdate()
            },
             updateDetail() {
                return this.getUpdateDetail()
            },
        },
        mounted(){
            var that = this;
              // 判断是否要更新
            if (this.needUpdate == -1) {
                this.setNeedUpdate()
            } else {
                if (this.needUpdate) {
                    this.createUpdateDialog()
                    this.updateDialog.open()
                }
            }
            that.show = localStorage.getItem("show")
            that.userList = JSON.parse(localStorage.getItem("Addressinformation"))
            that.walltname = localStorage.getItem("walltname")
            Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                that.addrees = res;
                // console.log(typeof res)
            })
            // getPrivat(localStorage.getItem("assetaddress")).then((res) => {
            //     console.log(res)
            // })
            this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalance"));
            // console.log(this.web3)
            this.getBalance(localStorage.getItem("assetaddress"))
            this.$http.get('http://120.77.247.234:8983/js/hCurrencyRate/findCurrencyParameter', {
                currency: "haleusdt"
            }).then((res) => {
                that.Rmbbalance = that.balance * res.result.usdtCny * res.result.haleUsdt.firstPrice
            })
        },
        methods: {
              ...mapActions(['setUserNoticeState', 'setNeedUpdate', 'setUserinfo', 'setUsers', 'removeUserinfo', 'setSidebars']),
            ...mapGetters(['getUserinfo', 'getSystemNotice', 'getTransferNotice', 'getNeedUpdate', 'getUpdateDetail', 'getSidebars']),
           
            //初始化
            // createWeb3() {
            //     // console.log("---------createWeb3----------")
            //     // //let web3 = new Web3()
            //     // //let provider = new Web3.providers.HttpProvider("http://192.168.3.100:8545")
            //     // //web3.setProvider(provider)
            //     // // if (!provider.isConnected) {
            //     // //     throw new Error('Please check    your interenet!')
            //     // // }
            //     // // console.log("---------createWeb3--web3.setProvider(provider)--------")
            //
            //     let web3 = new Web3(Web3.givenProvider ||  "http://192.168.3.100:8545");
            //
            //     return web3
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
              openPage() {
                window.plus && window.plus.runtime.openURL(this.updateDetail)
            },
            // 获取给定地址余额
            getBalance(fromAddress) {
                var that = this;
                const _from = fromAddress;
                const web3 = this.web3
                web3.eth.getBalance(_from, function (err, value) {
                    that.balance = value/1000000
                    // console.log('-------getBalance-------err--------' + err)
                    // console.log('-------getBalance--------value-------' + value)
                    if (err) {
                        this.balance = ''
                        this.msg = '未获取到余额'
                        console.warn(err.message)
                        return
                    }
                }.bind(this))
            },
            goIncomeexpendituredetails() {
                this.$push({
                    path: '/Incomeexpendituredetails'
                })
            },
            // addaccount(){
            //     Importprivatekey()
            // }
            hide() {
                if (this.show == 1) {
                    localStorage.setItem("show", 0)
                    this.show = 0
                } else {
                    localStorage.setItem("show", 1)
                    this.show = 1
                }
            },
            // 选择
            selectUser(e) {
                var that = this;
                const {
                    id,
                    accounts
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
                setTimeout(function () {
                    that.closeLoading()
                    localStorage.setItem("assetaddress", accounts)
                }, 200)
                // console.log(this.userList)

            },
            // 去注册
            toRegister() {
                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/walletcreate'
                })

            },
            // 去导入
            toImport() {

                // 关闭侧边栏
                this.feeTipDigClose()
                this.$push({
                    path: '/walletImport'
                })
            },
            toOpen() {
                this.feeTipVisible = true
            },
            feeTipDigClose() {
                this.feeTipVisible = false
            },
            toClose() {
                this.feeTipVisible = false
            },
            // 打开加载
            showLoading() {
                // console.log('执行了')
                this.loadingVisible = true
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false
            },
            qcode() {
                this.$push({
                    path: '/currencyCollect',
                    query: {
                        addrees: this.addrees
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .header {
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
        height: .88rem;
        line-height: .88rem;
        background: white;
    }

    .header div:nth-of-type(1) img {
        margin-top: .19rem;
        width: .5rem;
        height: .5rem;
    }

    .header div:nth-of-type(1) {
        display: flex;
        justify-content: space-between;
    }

    .header div:nth-of-type(1) span {
        font-size: .3rem;
        font-weight: bold;
        margin-left: .15rem;
    }

    .header div:nth-of-type(2) img {
        margin-top: .24rem;
        width: .4rem;
        height: .4rem;
    }

    .assetdetails {
        width: 6.9rem;
        margin: 0 auto;
        padding-top: .2rem;
    }

    .assetdetails > div:nth-of-type(1) {
        padding: .3rem;
        color: white;
        background: url(../static/images/newWallet/assetbackground.png);
        background-size: 100%;
        width: 6.3rem;
        height: 1.9rem;

    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(1), .assetdetails > div:nth-of-type(1) > div:nth-of-type(2) {
        display: flex;

    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(1) img {
        width: .3rem;
        height: .3rem;
    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(1) {
        font-size: .3rem;
    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(2) {
        font-size: .24rem;
    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(2) img {
        margin-top: .075rem;
        margin-left: .15rem;
        width: .3rem;
        height: .3rem;
    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(1) {
        margin-bottom: .1rem;
        justify-content: space-between;
    }

    .assetdetails > div:nth-of-type(1) > div:nth-of-type(3) {
        font-size: .54rem;
        font-weight: bold;
        margin-top: .25rem;
    }

    .assetdetails > div:nth-of-type(2) {
        color: #070707;
        display: flex;
        width: 6.9rem;
        margin: 0 auto;
        margin-top: .2rem;
        justify-content: space-between;
    }

    .assetdetails > div:nth-of-type(2) div {
        width: 2.7rem;
        height: .9rem;
        padding: .2rem .3rem;
        background: white;
        border-radius: .2rem;
    }

    .assetdetails > div:nth-of-type(2) div p:nth-of-type(1) {
        font-size: .24rem;
    }

    .assetdetails > div:nth-of-type(2) div p:nth-of-type(2) {
        font-size: .42rem;
        font-weight: bold;
    }

    .assetdetails > div:nth-of-type(3) {
        margin-top: .2rem;
        border-radius: .2rem;
        display: flex;
        width: 6.3rem;
        padding: .2rem .3rem;
        height: .9rem;
        line-height: .9rem;
        background: white;
        justify-content: space-between;
    }

    .assetdetails > div:nth-of-type(3) > div:nth-of-type(1) {
        display: flex;

    }

    .assetdetails > div:nth-of-type(3) > div:nth-of-type(1) img {
        width: .9rem;
        height: .9rem;
    }

    .assetdetails > div:nth-of-type(3) > div:nth-of-type(1) span {
        font-size: .3rem;
        margin-left: .15rem;
    }

    .assetdetails > div:nth-of-type(3) > div:nth-of-type(2) {
        line-height: .4rem;
        text-align: right;
        font-size: .3rem;
        font-weight: bold;
        margin-top: .025rem;
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
        top: 1.2rem;
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
        /*background: #fafafa;*/
    }

    .sidebar_title {
        width: 100%;
        height: 0.88rem;
    }

    .sidebar_txt1 {
        background: white;
        font-size: 0.32rem;
        color: #070707;
        height: 1.2rem;
        line-height: 1.2rem;
        /*padding-top: 0.4rem;*/
        margin-left: 0.3rem;
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
        background: #fafafa;
    }

    .sidebar_list_wrapperimport {
        position: absolute;
        bottom: .5rem;
        left: 0;
        width: 100%;
    }

    .sidebar_list_padding {

        background: #fff;
        padding: 0 0.3rem;
    }

    .scroll {
        overflow: scroll;
        height: 10rem;
    }

    .sidebar_txt2 {
        font-size: 0.3rem;
        color: #333;
        line-height: 0.8rem;
        padding-top: 0.2rem;
    }

    .sidebar_item {
        padding: 0.2rem;
        position: relative;
    }

    .sidebar_itemaddress.active {
        opacity: 1;
        color: #070707;
        position: relative;
        border: 1px solid #FE7940;
    }

    .sidebar_itemaddress p {
        line-height: .4rem;
    }

    .sidebar_itemaddress p:nth-of-type(1) {
        font-size: .24rem;
        font-weight: bold;
    }

    .sidebar_itemaddress p:nth-of-type(3) {
        line-height: .65rem;
        font-size: .3rem;
        font-weight: bold;
    }

    .sidebar_itemaddress.active .sidebar_active_icon {
        background: url("../static/images/newWallet/chebox.png") no-repeat center center / cover;
        width: 0.4rem;
        height: 0.4rem;
        position: absolute;
        top: .2rem;
        transform: translateY(-50%);
        right: 0rem;
    }

    .sidebar_active_icon {

    }

    .sidebar_item_pic {
        width: 0.9rem;
        height: 0.9rem;
    }

    .sidebar_item_default {
        background: url("../static/images/default/default_headImg.png") no-repeat center center / cover;
    }

    .sidebar_item_create {
        background: url("../static/images/newWallet/icon_add.png") no-repeat center center / cover;
    }

    .sidebar_item_import {
        background: url("../static/images/newWallet/icon_import.png") no-repeat center center / cover;
    }

    .sidebar_itemaddress {
        opacity: 0.5;
        margin-top: .2rem;
        padding: .2rem;
        border-radius: .2rem;
        border: 1px solid #CCCCCC;
        height: 1.45rem;
    }

    .sidebar_txt3 {
        font-size: 0.24rem;
        color: #333;
        line-height: 0.3rem;

    }

    .sidebar_listaddimport {
        display: flex;
        justify-content: space-around;
    }
    .LOADING_TXT {
        color: white;
        padding-left: 0.15rem;
        padding-right: .15rem;
    }
</style>
