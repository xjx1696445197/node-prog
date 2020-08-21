<template>
    <div class="page">
        <div class="HEADER">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE" v-text="currencyName"></p>
        </div>

        <div class="wrapper">
            <div class="header">
                <div class="main">
                    <div class="top">
                        <div
                            class="avatar radius-round"
                            :style="{
                                'background': `url(${sourceUrl + detail.currencyImageUrl}) no-repeat center center / cover`
                            }"
                        ></div>
                        <div class="top_main">
                            <p class="currency_name" v-text="currencyName"></p>
                            <p class="currency_count">{{detail.amount | tofixed4}}</p>
                        </div>
                    </div>
                    <div class="currency_address" data-initcopyer="true">
                        <p class="currency_address_txt">{{(detail.address || '------') | addressFormat('11')}}</p>
                    </div>

                    <div class="btns" v-if="currencyName == 'USDT'">
                        <div
                            class="btn BUTTON_BG radius-half"
                            @click="toCurrencyCollect"
                        >{{$t('currencyDetail.currencyDetail_receivables')}}</div>
                        <div
                            class="btn BUTTON_BG radius-half"
                            @click="toCurrencyTransfer"
                        >{{$t('currencyDetail.currencyDetail_transferAccounts')}}</div>
                        <div
                            class="btn BUTTON_BG radius-half"
                            @click="toCurrencyExchange"
                        >{{$t('currencyDetail.currencyDetail_exchange')}}</div>
                    </div>

                    <div class="btns" v-else>
                        <div
                            class="btn BUTTON_BG radius-half"
                            @click="toCurrencyCollect"
                        >{{$t('currencyDetail.currencyDetail_receivables')}}</div>
                        <div
                            class="btn BUTTON_BG radius-half"
                            @click="toCurrencyTransfer"
                        >{{$t('currencyDetail.currencyDetail_transferAccounts')}}</div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="content_pos">
                    <md-tab-bar
                            :items="tabs"
                            @change="onTabChange"
                            class="COMMON_TABS"
                    ></md-tab-bar>
                    <div class="scroll_wrapper">
                        <div class="scroll_pos">
                            <md-scroll-view
                                    ref="scrollView"
                                    :scrolling-x="false"
                                    :auto-reflow="true"
                                    :manual-init="true"
                                    :immediate-check-end-reaching="true"
                                    @refreshing="$_onRefresh"
                                    @end-reached="$_onEndReached"
                            >
                                <md-scroll-view-refresh
                                        slot="refresh"
                                        slot-scope="{ scrollTop, isRefreshActive, isRefreshing }"
                                        :scroll-top="scrollTop"
                                        :is-refreshing="isRefreshing"
                                        :is-refresh-active="isRefreshActive"
                                        :refreshText="$t('statustest.status_refresh')"
                                        :refreshActiveText="$t('statustest.status_refreshed')"
                                        :refreshingText="$t('statustest.status_refreshing')"
                                ></md-scroll-view-refresh>

                                <div class="list">
                                    <div class="item_wrapper"
                                         v-for="(item, index) in list"
                                         :key="item.id"
                                         @click="toDetail"
                                         :data-id="item.id"
                                         :data-state="item.confirmStatus"
                                         :data-type="item.transferType"
                                    >
                                        <div
                                            class="item type1"
                                            v-if="item.transferType == 1"
                                        >
                                            <div class="item_icon"></div>
                                            <div class="item_arr"></div>
                                            <div class="item_top">
                                                <p class="item_txt1">{{item.origin | addressFormat}}</p>
                                                <p class="item_txt2">{{'+'}}{{ item.amount | tofixed4}}{{` ${currencyName}`}}</p>
                                            </div>
                                            <div class="item_sub">
                                                <p class="item_txt3">{{item.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                                                <p class="item_txt4">
                                                    {{item.confirmStatus == 1 ? $t('currencyDetail.currencyDetail_complete') : $t('currencyDetail.currencyDetail_haveInHand')}}
                                                </p>
                                            </div>
                                        </div>


                                        <div
                                            class="item type2"
                                            v-if="item.transferType == 2"
                                        >
                                            <div class="item_icon"></div>
                                            <div class="item_arr"></div>
                                            <div class="item_top">
                                                <p class="item_txt1">{{item.destination | addressFormat}}</p>
                                                <p class="item_txt2">{{'-'}}{{ item.amount | tofixed4}}{{` ${currencyName}`}}</p>
                                            </div>
                                            <div class="item_sub">
                                                <p class="item_txt3">{{item.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                                                <p class="item_txt4">
                                                    {{item.confirmStatus == 1 ? $t('currencyDetail.currencyDetail_complete') : $t('currencyDetail.currencyDetail_haveInHand')}}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            class="item type3"
                                            v-if="item.transferType == 4"
                                        >
                                            <div class="item_icon"></div>
                                            <div class="item_arr"></div>
                                            <div class="item_top">
                                                <p class="item_txt1">{{$t('currencyDetail.currencyDetail_exchanged')}}</p>
                                                <p class="item_txt2" v-if="currencyName == 'HALE'">{{'+'}}{{ item.amount | tofixed4}}{{' HALE'}}</p>
                                                <p class="item_txt2" v-else>{{'-'}}{{ item.amount | tofixed4}}{{' USDT'}}</p>
                                            </div>
                                            <div class="item_sub">
                                                <p class="item_txt3">{{item.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                                            </div>
                                        </div>

                                        <!--<div-->
                                                <!--class="item type3"-->
                                                <!--v-if="item.transferType == 13"-->
                                        <!--&gt;-->
                                            <!--<div class="item_icon"></div>-->
                                            <!--<div class="item_arr"></div>-->
                                            <!--<div class="item_top">-->
                                                <!--<p class="item_txt1">{{$t('currencyDetail.currencyDetail_exchanged')}}</p>-->
                                                <!--<p class="item_txt2" v-if="currencyName == 'HALE'">{{'-'}}{{ item.amount | tofixed4}}{{' HALE'}}</p>-->
                                                <!--<p class="item_txt2" v-else>{{'-'}}{{ item.amount | tofixed4}}{{' USDT'}}</p>-->
                                            <!--</div>-->
                                            <!--<div class="item_sub">-->
                                                <!--<p class="item_txt3">{{item.addTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    </div>

                                </div>

                                <md-scroll-view-more
                                        slot="more"
                                        :is-finished="isFinished"
                                        :finishedText="$t('statustest.status_All_loaded')"
                                        :loadingText="$t('statustest.status_loading')"
                                >
                                </md-scroll-view-more>
                            </md-scroll-view>
                        </div>

                    </div>



                </div>

            </div>
        </div>



        <nlayer
            :maskCancel="false"
            maskBackgroundColor="rgba(0,0,0,0)"
            :autoClose="1200"
            :visible="tipsVisible"
            @close="tipsClosed"
            class="NTOAST ANIMATITE_SCALE_TO_BIG"
        >
            <div class='TOAST' v-text="tips"></div>
        </nlayer>
    </div>

</template>

<script>

    import TabBar from 'mand-mobile/lib/tab-bar'
    import ScrollView from 'mand-mobile/lib/scroll-view'
    import ScrollViewRefresh from 'mand-mobile/lib/scroll-view-refresh'
    import ScrollViewMore from 'mand-mobile/lib/scroll-view-more'
    import Nlayer from '@/components/Nlayer'

    import ClipboardJS from 'clipboard'

    import { mapGetters } from 'vuex'
    import { sourceUrl } from "@/config"

    const PAGENO = 1

    export default {
        name: "CurrencyDetail",
        components: {
            [TabBar.name]: TabBar,
            [ScrollView.name]: ScrollView,
            [ScrollViewRefresh.name]: ScrollViewRefresh,
            [ScrollViewMore.name]: ScrollViewMore,
            Nlayer
        },
        data(){
            return {
                sourceUrl,
                pageNo: PAGENO,
                pageSize: 5,
                list: [],
                type: null,
                isFinished: false,
                locked: false,
                detail: {},
                tips: '',
                tipsVisible: false,
                copyer: null
            }
        },
        computed: {
            currencyName(){
                return this.$route.query.currencyName
            },
            allTip(){
                return this.$t('currencyDetail.currencyDetail_all')
            },
            receiveTip(){
                return this.$t('currencyDetail.currencyDetail_receivables')
            },
            transferTip(){
                return this.$t('currencyDetail.currencyDetail_transferAccounts')
            },
            exchangeTip(){
                return this.$t('currencyDetail.currencyDetail_exchange')
            },
            shareTip1(){
                return this.$t('share.share_tips1')
            },
            tabs(){
                const original = [
                    {name: 0, label: this.allTip, type: '0'},
                    {name: 1, label: this.receiveTip, type: '1'},
                    {name: 2, label: this.transferTip, type: '2'},
                    {name: 3, label: this.exchangeTip, type: '4'}
                ]

                return original
            },
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.userId
            }
        },
        mounted(){
            this.getDetail()
            this.setType()
            this.initScrollView()
        },
        destroyed(){
            this.copyer.destroy()
        },
        methods: {
            ...mapGetters(['getUserinfo']),
            // 打开消息提示
            showTips(msg, refresh=true){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            },
            // 初始化复制器
            initCopyer(value){
                this.copyer = new ClipboardJS('[data-initcopyer]', {
                    text (){
                        return value
                    }
                }).on('success', () => {
                    this.showTips(this.shareTip1)
                })

            },
            // 获取币详情
            getDetail(){
                this.$http.get('js/userWallet/getUserWalletDetail', {
                    userId: this.userId,
                    currency: this.currencyName
                }).then((res) => {
                    if( res.success ){
                        this.detail = res.result
                        this.initCopyer(res.result.address)
                    }
                })
            },
            // 设置初始type
            setType(){
                this.type = this.tabs[0].type
            },
            // 初始化scrollview
            initScrollView(){
                this.$refs.scrollView.init()
            },
            // 加载数据
            getData(refresh=false){
                return this.$http.get('js/userWallet/getUserWalletTransfer', {
                    userId: this.userId,
                    type: this.type,
                    currency: this.currencyName,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo,
                    stater:2
                }).then((res) => {
                    console.log(res)
                    if( res.success ){
                        if( refresh ){
                            this.list = res.result
                            this.$refs.scrollView.finishRefresh()
                        } else {
                            this.$refs.scrollView.finishLoadMore()
                            this.list.push(...res.result)
                        }

                        this.pageNo += 1
                        this.locked = false

                        if( res.result.length < this.pageSize ){
                            this.isFinished = true
                            this.$refs.scrollView.loadend()
                        }
                    }
                })
            },
            // 切换tab
            onTabChange(item) {
                const {
                    type
                } = item

                this.type = type

                if( this.$refs.scrollView ){
                    this.$refs.scrollView.finishLoadMore()
                    this.$refs.scrollView.triggerRefresh()
                }
            },
            // 滚动触底事件 此时要加载数据
            $_onEndReached(index) {
                if (this.isFinished || this.locked) {
                    return
                }

                this.locked = true

                this.getData()
            },

            // 刷新中事件 此时要刷新数据
            $_onRefresh() {
                if( this.locked ){
                    return
                }

                this.isFinished = false
                this.pageNo = PAGENO
                this.locked = true

                this.getData(true)
            },
            // 去详情
            toDetail(e){
                const {
                    id,
                    state,
                    type
                } = e.currentTarget.dataset


                if( type == 4 ){
                    return
                }

                this.$push({
                    path: '/currencyDealDetail',
                    query: {
                        id: id,
                        currencyName: this.currencyName,
                        dealResState: state,
                        dealName: type
                    }
                })
            },
            // 去币收款
            toCurrencyCollect(){
                this.$push({
                    path: '/currencyCollect',
                    query: {
                        currencyName: this.currencyName
                    }
                })
            },
            // 去币转账
            toCurrencyTransfer(){
                this.$push({
                    path: '/currencyTransfer',
                    query: {
                        currencyName: this.currencyName
                    }
                })
            },
            // 去币兑换
            toCurrencyExchange(){
                this.$push({
                    path: '/currencyExchange',
                    query: {
                        currencyName: this.currencyName
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .COMMON_TABS{
        height: 0.85rem;
    }
    .scroll_wrapper{
        flex: 1;
        position: relative;
    }
    .content_pos{
        height: 100%;
        position: absolute;
        left: 0;
        top: 0; flex-direction: column;
        width: 100%;
        display: flex;
    }
    .scroll_pos{
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        width: 100%;
    }
    .wrapper{
        height: 100%;
        display: flex; position: relative;
        flex-direction: column; box-sizing: border-box;
    }
    .content{
        flex: 1; background: #fff; position: relative;
    }
    .page{
        background: #fafafa;
    }
    .header{
        padding: 0.3rem;
    }
    .main{
        padding: 0.5rem 0.45rem 0.45rem;
        background: #fff;
        border-radius: 0.2rem;
        box-shadow: 0 0.05rem 0.15rem rgba(102,102,102,0.1);
    }
    .top{
        display: flex;
    }
    .avatar{
        width: 1rem; background: #000;
        height: 1rem;
    }
    .top_main{
        display: flex; justify-content: space-between;
        flex: 1;
        margin-left: 0.2rem;
    }
    .currency_name{
        font-size: 0.4rem;
        color: #333;
        line-height: 1rem;
    }
    .currency_count{
        font-size: 0.4rem;
        color: #333;
        line-height: 1rem;
    }
    .currency_address{
        position: relative;
        padding: 0.3rem 0;
        margin-top: 0.15rem;
        padding-right: 0.3rem;
        border-bottom: 1px solid #aaa;
    }
    .currency_address:after{
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.3rem;
        height: 0.3rem;
        background: url("../static/images/icon/detail_copy_icon.png") no-repeat center center / cover;
    }
    .currency_address_txt{
        font-size: 0.3rem;
        color: #333;
        line-height: 0.5rem;
        padding: 0 0.2rem;
        text-align: right;
    }
    .btns{
        display: flex; justify-content: center;
        margin-top: 0.4rem;

    }
    .btn{
        width: 2.2rem;
        font-size: 0.3rem;
        color: #fff;
        line-height: 0.65rem;
        text-align: center;
    }
    .btn+.btn{
        margin-left: 0.3rem;
    }
    .list{
        padding: 0 0.3rem;
    }
    .item{
        position: relative;
        padding: 0.3rem 0.6rem;
        border-bottom: 1px solid #aaa;
    }



    .item.type1 .item_icon{
        background: url("../static/images/icon/come_green_icon.png") no-repeat center center / cover;
    }
    .item.type1 .item_txt2{
        color: #21b369;
    }
    .item.type2 .item_icon{
        background: url("../static/images/icon/out_blue_icon.png") no-repeat center center / cover;
    }
    .item.type2 .item_txt2{
        color: #e41d1d;
    }
    .item.type3 .item_icon{
        background: url("../static/images/icon/exchange_red_icon.png") no-repeat center center / cover;
    }
    .item.type3 .item_txt2{
        color: #1d92e4;
    }
    .item.type3 .item_arr{
        display: none;
    }

    .item_arr{
        position: absolute;
        right: 0;
        top: 50%;
        width: 0.4rem;
        height: 0.4rem;
        transform: translateY(-50%);
        background: url("../static/images/icon/notice_icon_right.png") no-repeat center center / cover;
    }
    .item_icon{
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0.4rem;
        height: 0.4rem;
    }
    .item_top{
        display: flex; justify-content: space-between;
    }
    .item_sub{
        display: flex; justify-content: space-between;
    }
    .item_txt1{
        font-size: 0.26rem;
        color: #333;
        line-height: 0.45rem;
    }
    .item_txt2{
        font-size: 0.26rem;
        color: #333;
        line-height: 0.45rem;
    }
    .item_txt3{
        font-size: 0.2rem;
        color: #aaa;
        line-height: 0.35rem;
    }
    .item_txt4{
        font-size: 0.2rem;
        color: #aaa;
        line-height: 0.35rem;
    }
</style>
