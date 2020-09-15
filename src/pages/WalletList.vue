<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">管理钱包</p>
        </div>
        <div class="wrapper">
            <div class="asset_sidebar">
                <div class="sidebar_content">

                    <div class="sidebar_scroll">
                        <div class="sidebar_list_wrapper" v-if="userList.length">
                            <div class="sidebar_list_padding scroll">
                                <div class="sidebar_list">
                                    <div class="sidebar_itemaddress"
                                         v-for="(item, index) in userList"
                                         :key="index"
                                         @click="selectUser"
                                         :data-id="index"
                                         :data-accounts="addrees"
                                         :class="[item.active ? 'active' : '']"
                                    >
                                        <p class="sidebar_txt3">{{item.name}}</p>
                                        <p class="sidebar_txt3"><span>{{addrees|addressFormat}}</span><img
                                                @click="initCopyer(addrees)"
                                                src="../static/images/newWallet/detail_copy_iconh.png"
                                                data-initcopyer="true"></p>
                                        <p class="sidebar_txt3"><span>￥{{Rmbbalance+RmbTokenbalance|tofixed4}}</span><img @click="showmb(index)"
                                                                                          src="../static/images/newWallet/sgd.png">
                                        </p>
                                        <div class="sidebar_active_icon"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar_list_wrapperimport" v-show="false">
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
        <div class="footermb" v-if="mbfooter">
            <div class="footerlist">
                <div @click="Namemodification">修改名称</div>
                <div @click="exrportremover(1)">导出 <span>助记词</span></div>

                    <div @click="exrportremover(2)" v-show="false">删除钱包</div>
                <div @click="hidemb">取消</div>

            </div>
        </div>
        <!--修改昵称-->
        <nlayer
                :visible="walletnameDigVisible"
                @close="walletnameDigClose"
                class="ANIMATITE_BOTTOM_TO_TOP NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
                <div class='DIALOG_GE_TITLE'
                     @click='closewalletnameDig'
                >
                   请输入钱包名称
                </div>
                <div class='DIALOG_GE_CONTENT'>
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="text"
                                   class="PASSWORD_GE_INPUT"
                                   placeholder="请输入钱包名称"
                                   v-model="walletname"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_BTNS'>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto'

                            @click='walletnameDigClose'
                    >取消
                    </div>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto'

                            @click='checkwalletname'
                    >确定
                    </div>
                </div>
            </div>
        </nlayer>

        <!--输入密码弹窗-->
        <nlayer
                :visible="passwordDigVisible"
                @close="passwordDigClose"
                class="ANIMATITE_BOTTOM_TO_TOPS NDIALOG"
                width="100%"
                :zIndex="999"
        >
            <div class='DIALOGS'>
                <div class='DIALOG_GE_TITLE'
                     @click='closePasswordDig'
                >
                    密码
                </div>
                <div class='DIALOG_GE_CONTENT'>
                    <div class="DIALOG_CONTENT_LIST">
                        <div class="DIALOG_CONTENT_ITEM">
                            <input type="password"
                                   class="PASSWORD_GE_INPUTS"
                                   placeholder="请输入钱包密码"
                                   v-model="password"
                            >
                        </div>
                    </div>

                </div>
                <div class='DIALOG_BTNSS'>
                    <div
                            class='DIALOG_GE_BTN CONFIRM mauto btntop'
                            :class="[isCheckPassword ? 'active' : '']"
                            @click='checkPassword'
                    >确认
                    </div>
                </div>
            </div>
        </nlayer>
        <!--认证弹窗-->
        <nlayer
                :visible="realAuthenErrorDig"
                @close="realAuthenErrorDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG DIALOGts'>
                <div class="DIALOG_TITLE_ERROR">
                    <div class="realAuthenIcon"></div>
                    <p class="realAuthentxt1">请勿截图</p>
                    <p class="realAuthentxt2">拥有助记词就能完全控制你的钱包资产！请抄写下你的助记词并妥善存放。</p>
                    <div class="realAuthenBtn"
                         @click="toAgainAuthen"
                    >我知道了</div>
                </div>
            </div>
        </nlayer>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Nlayer from '@/components/Nlayer'
    import {Submitpasswords, addaccountsss, SeedPhrase,Derivingmnemonics, Ethtohelle} from '../util/dip.js'
    import ClipboardJS from 'clipboard'
    import Web3 from 'web3'
    import urlUtil from "../util/apiUtil";
    import txu from '@/util/txUtil'

    export default {
        name: "WalletList",
        components: {
            Nlayer
        },
        data() {
            return {
                userList: [],
                loadingVisible: false,
                tipsVisible: false,
                tips: "",
                mbfooter: false,
                walletnameDigVisible:false,
                walletname:"",
                passwordDigVisible:false,
                password:"",
                isCheckPassword:"",
                realAuthenErrorDig:false,
                operationtype:"",
                Mnemonic:[],
                walletindex:"",
                balance:"",
                Rmbbalance:0,
                web3: {},
                addrees:"",
                Tokenbalance:"",
                RmbTokenbalance:""
            }
        },
        mounted() {
            var that=this;
            this.userList = JSON.parse(localStorage.getItem("Addressinformation"));
            this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalance"));
            this.getBalance(localStorage.getItem("assetaddress"))
            Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                that.addrees = res;
            })
            txu.balanceOf(that.web3,localStorage.getItem("assetaddress")).then((res) => {
                that.Tokenbalance=res/1000000000000000000
            })
            this.$http.get('http://120.77.247.234:8984/js/hCurrencyRate/findCurrencyParameter', {
                currency:"haleusdt"
            }).then((res) => {
                that.Rmbbalance=that.balance*res.result.usdtCny*res.result.haleUsdt.firstPrice
                that.RmbTokenbalance = that.Tokenbalance * res.result.usdtCny * res.result.chmcUsdt.firstPrice

            })
        },
        computed: {},
        methods: {
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
            // 获取给定地址余额
            getBalance(fromAddress){
                var that=this;
                const _from = fromAddress;
                const web3 = this.web3
                web3.eth.getBalance(_from, function (err, value) {
                    that.balance=value/1000000
                    // console.log('-------getBalance-------err--------'+err)
                    // console.log('-------getBalance--------value-------'+value)
                    if (err) {
                        this.balance = ''
                        this.msg = '未获取到余额'
                        // console.warn(err.message)
                        return
                    }

                }.bind(this))
            },
            Namemodification(){
                this.hidemb();
                this.showwalletnameDig();
            },
            checkPassword(){
                var that=this;
                var regex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                if(that.password==""){
                    this.passwordDigVisible = false;
                    that.showTips("密码不能为空")
                    return;
                } else if (!regex.test(that.password)){
                    this.closePasswordDig()
                    that.showTips("密码格式错误")
                    return;
                }
                var pnum=that.password
                if (this.operationtype==1){
                    Derivingmnemonics(pnum).then((res)=>{
                        this.closePasswordDig()
                        that.Mnemonic.push(res)
                        // console.log(res)
                        this.openRealAuthenErrorDig()
                    }).catch((res)=>{
                        this.closePasswordDig()
                        that.showTips("密码错误")
                    })
                }else {
                    this.showTips("删除成功")
                }
            },
            // 确认修改昵称
            checkwalletname(){
                if (this.walletname==""){
                    this.closewalletnameDig()
                    this.showTips("昵称不能为空")
                    return
                }else if (/[\u4E00-\u9FA5]/i.test(this.walletname)){
                    this.showTips("昵称不能为中文")
                    return
                }else if (this.walletname.length>20){
                    this.closewalletnameDig()
                    this.showTips("昵称不能超过20个字符")
                    this.walletname=""
                    return
                }
                this.userList[this.walletindex].name=this.walletname;
                localStorage.setItem("Addressinformation", JSON.stringify(this.userList))
                this.closewalletnameDig()
                this.showTips("修改成功")
            },
            // 打开提示弹窗
            openRealAuthenErrorDig(){
                this.realAuthenErrorDig = true;
            },
            // 监听提示弹框
            realAuthenErrorDigClose(){
                this.realAuthenErrorDig = false;
            },
            // 点击下一步
            toAgainAuthen(){
                this.$push({
                    path: '/Backupmnemonics',
                    query: {
                        Mnemonics: this.Mnemonic,
                        store:1
                    }
                });
                this.realAuthenErrorDig = false;
            },
            // 删除  和 导出助记词
            exrportremover(i){
                this.operationtype=i;
                this.hidemb();
                this.openPasswordDig();
            },
            // 关闭密码弹窗
            closePasswordDig(){
                this.passwordDigVisible = false;
                this.password = '';
            },
            // 打开密码弹窗
            openPasswordDig(){
                this.passwordDigVisible = true;
            },
            // 监听关闭密码弹窗事件
            passwordDigClose(){
                this.passwordDigVisible = false;
                this.password = '';
            },
            // 打开昵称弹窗
            showwalletnameDig() {
                this.walletnameDigVisible = true;
            },
            // 关闭昵称弹窗
            closewalletnameDig() {
                this.walletnameDigVisible = false;
                this.walletname = "";
            },
            // 监听昵称弹窗事件
            walletnameDigClose() {
                this.walletnameDigVisible = false;
                this.walletname = "";
            },
            // 初始化复制器
            initCopyer(value) {
                if (this.copyer) {
                    this.copyer.destroy();
                }

                this.copyer = new ClipboardJS('[data-initcopyer]', {
                    text() {
                        return value;
                    }
                }).on('success', () => {
                    this.showTips("复制成功");

                });
            },
            // 创建
            // 去注册
            toRegister() {
                // 关闭侧边栏
                this.$push({
                    path: '/walletcreate'
                })

            },
            // 去导入
            toImport() {

                // 关闭侧边栏
                this.$push({
                    path: '/walletImport'
                })
            },
            showmb(i) {
                this.walletindex=i;
                this.mbfooter = true;
            },
            hidemb() {
                this.mbfooter = false;
            },
            selectUser(e) {
                var that = this;
                const {
                    id,
                    accounts
                } = e.currentTarget.dataset;
                // console.log(id)
                // 打开加载层
                this.userList.forEach((item, i) => {

                    if (i == id) {
                        if (item.active) {

                        } else {
                            this.showLoading();
                            item.active = true;
                        }
                    } else {
                        item.active = false;
                    }

                })
                setTimeout(function () {
                    that.closeLoading();
                }, 200)
                localStorage.setItem("Addressinformation", JSON.stringify(that.userList));
            },
            showTips(msg) {
                this.tips = msg;
                this.tipsVisible = true;
            },
            // 监听消息提示关闭
            tipsClosed() {
                this.msg = '';
                this.tipsVisible = false;
            },
            // 打开加载
            showLoading() {
                // console.log('执行了')
                this.loadingVisible = true;
            },
            // 关闭加载层
            closeLoading() {
                this.loadingVisible = false;
            },
        }
    }
</script>

<style scoped>
    .page {
        background: #F5F5F5;
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
        top: 0rem;
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
        background: #fafafa;
    }

    .sidebar_title {
        width: 100%;
        height: 0.88rem;
        position: relative;
    }

    .sidebar_txt1 {
        background: white;
        font-size: 0.32rem;
        color: #070707;
        height: 1.2rem;
        line-height: 1.2rem;
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
        background: #fafafa;
    }

    .sidebar_list_wrapperimport {
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .sidebar_list_padding {
        padding: 0 0.3rem;
    }

    .scroll {
        overflow: scroll;
        height: 100%;
        margin-bottom: 2.5rem;
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
        font-size: .30rem;
        font-weight: bold;
    }

    .sidebar_itemaddress p:nth-of-type(2) {
        display: flex;
        font-size: .24rem;
        margin-top: .1rem;
    }

    .sidebar_itemaddress p:nth-of-type(2) img {
        margin-left: .15rem;
        width: .3rem;
        height: .3rem;
        vertical-align: middle;
    }

    .sidebar_itemaddress p:nth-of-type(2) span {
        vertical-align: middle;
    }

    .sidebar_itemaddress p:nth-of-type(3) {
        display: flex;
        justify-content: space-between;
        line-height: .65rem;
        font-size: .54rem;
        margin-top: .3rem;
        font-weight: bold;
    }

    .sidebar_itemaddress p:nth-of-type(3) img {
        margin-top: .4rem;
        width: .43rem;
        height: .11rem;
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
        opacity: 0.7;
        margin-top: .2rem;
        padding: .3rem;
        border-radius: .2rem;
        border: 1px solid #CCCCCC;
        background: white;
        height: 1.9rem;
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

    .footerlist {
        width: 100%;
        height: 3.2rem;
        border-radius: .2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #EEEEEE;
    }

    .footerlist > div:nth-of-type(1) {
        border-top-right-radius: .2rem;
        border-top-left-radius: .2rem;

    }

    .footerlist > div span {
        color: #E6821E;
    }

    .footerlist > div:nth-of-type(3) {
        color: #FF0000;
    }

    .footerlist > div {
        background: white;
        border-bottom: 1px solid #EEEEEE;
        text-align: center;
        height: 1rem;
        line-height: 1rem;

    }

    .footerlist > div:nth-of-type(4) {
        margin-top: .2rem;
    }

    .footermb {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999999;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
    }
    .DIALOG{
        width: 6rem;
        height: 3.3rem;
    }
    .DIALOGS{
        height: 4.5rem;
    }
    .DIALOG_GE_TITLE{
        text-align: center;
        font-size: .3rem;
        font-weight: bold;
        line-height: 1rem;
    }
    .DIALOG_BTNS{
        margin-top: .2rem;
        height: 1.05rem;
        line-height:1.05rem;
    }
    .DIALOG_BTNSS{
        margin-top: .3rem;
        height: 1.05rem;
        line-height:1.05rem;
    }
    .DIALOG_BTNSS>div{
        width: 5rem;
        height: .8rem;
        line-height: .8rem;
        text-align: center;
        background: #E6821E;
        color: white;
        border-radius: .5rem;
    }
    .DIALOG_TITLE_ERROR{
        padding: 0.35rem 0 0.35rem;
    }
    .realAuthenIcon{
        margin: 0 auto;
        width: 1.4rem;
        height: 1.4rem;
        background: url("../static/images/newWallet/icon_tanhao.png")no-repeat center center / cover;
    }
    .realAuthentxt1{
        font-size: 0.30rem;
        color: #333;
        line-height: 0.45rem;
        font-weight: bold;
        padding: 0.2rem 0 0.2rem;
    }
    .realAuthentxt2{
        font-size: 0.24rem;
        padding:0 .3rem;
        color: #666;
        line-height: 0.45rem;
    }
    .realAuthenBtn{
        width:2.1rem;
        height: 0.6rem;
        background: #E6821E;
        font-size: 0.24rem;
        color: #FEFEFE;
        line-height: 0.6rem;
        border-radius: 50rem;
        margin: 0.5rem auto 0;
    }
    .DIALOGts{
        height: 5rem;
    }
    .btntop{
        margin-top: 1rem;
    }
</style>
