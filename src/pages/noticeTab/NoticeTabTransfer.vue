<template>
    <div class="page">
        <div class="content">
            <div class="setAllRead_wrapper">
                <div
                        class="setAllRead"
                        @click="setAllRead"
                ><span></span> <span>全部已读</span></div>
                <div
                        class="setAllRead"
                        @click="setAllRead"
                ><span></span> <span>全部清除</span></div>
            </div>
            <div class="main">
                <div class="scroll">

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

                        <div class="notice_list">
                            <div
                                class="notice_item"
                                :class="{
                                    'active': !item.readStatus
                                }"
                                v-for="(item, index) in list"
                                :key="item.id"
                                @click="toDetail"
                                :data-id="item.id"
                                :data-type="item.type"
                                :data-cid="item.bizId"
                                :data-currency="item.currency"
                            >


                                <p class="notice_item_txt1 thide" v-text="item.title"></p>
                                <p
                                    class="notice_item_txt2 thide"
                                    v-if="item.type == 1"
                                >
                                    {{$t('currencyDetail.currencyDetail_receiveed')}}：{{item.origin | addressFormat}}
                                </p>
                                <p
                                    class="notice_item_txt2 thide"
                                    v-else
                                >
                                    {{$t('currencyDetail.currencyDetail_address')}}：{{item.destination | addressFormat}}
                                </p>
                                <p class="notice_item_txt3">{{item.confirmTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
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

</template>

<script>
    import ScrollView from 'mand-mobile/lib/scroll-view'
    import ScrollViewRefresh from 'mand-mobile/lib/scroll-view-refresh'
    import ScrollViewMore from 'mand-mobile/lib/scroll-view-more'

    import { mapGetters, mapActions } from 'vuex'

    const PAGENO = 1

    export default {
        name: "NoticeTabTransfer",
        components: {
            [ScrollView.name]: ScrollView,
            [ScrollViewRefresh.name]: ScrollViewRefresh,
            [ScrollViewMore.name]: ScrollViewMore
        },
        data(){
            return {
                pageNo: PAGENO,
                pageSize: 8,
                list: [],
                type: "1",
                isFinished: false
            }
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.userId
            }
        },
        mounted(){
            this.initScrollView()
        },
        methods: {
            ...mapActions(['setUserNoticeState']),
            ...mapGetters(['getUserinfo']),
            // 初始化scrollview
            initScrollView(){
                this.$refs.scrollView.init()
            },
            // 全标已读
            setAllRead(){
                this.$http.get('js/message/markReadMsg', {
                    userId: this.userId,
                    msgType: this.type
                }).then((res) => {
                    if( res.success ){
                        this.$refs.scrollView.triggerRefresh()
                        this.setUserNoticeState()
                    }
                })
            },
            // 加载数据
            getData(refresh=false){
                return this.$http.get('js/message/getMsgPageListByUserId', {
                    userId: this.userId,
                    msgType: this.type,
                    languageType: 1,
                    pageSize: this.pageSize,
                    pageNo: this.pageNo
                }).then((res) => {
                    if( res.success ){
                        if( refresh ){
                            this.list = res.result
                        } else {
                            this.list.push(...res.result)
                        }

                        this.$refs.scrollView.finishRefresh()
                        this.$refs.scrollView.finishLoadMore()
                        this.pageNo += 1

                        if( res.result.length < this.pageSize ){
                            this.isFinished = true
                            this.$refs.scrollView.loadend()
                        }
                    }
                })
            },
            // 滚动触底事件 此时要加载数据
            $_onEndReached() {
                if (this.isFinished) {
                    return
                }

                this.getData()
            },
            // 刷新中事件 此时要刷新数据
            $_onRefresh() {
                this.isFinished = false
                this.pageNo = PAGENO

                this.getData(true)
            },
            // 跳转到详情
            toDetail(e){
                const {
                    id,
                    cid,
                    type,
                    currency
                } = e.currentTarget.dataset

                this.$push({
                    path: '/currencyDealDetail',
                    query: {
                        id: cid,
                        newsId: id,
                        currencyName: currency,
                        dealName: type,
                        dealResState: 1
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content{
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .setAllRead_wrapper{
        padding: 0.3rem 0.3rem 0.2rem;
    }
    .setAllRead{
        font-size: .24rem;
        color: #070707;
        line-height: 1.5;
        /*background: #fafafa;*/
        padding:0.05rem .15rem;
        /*border: 1px solid #eee;*/
        border-radius: .1rem;
        display: inline-block;
        box-sizing: border-box;
    }
    .setAllRead>span:nth-of-type(1){
        display: inline-block;
        width: .3rem;
        height: .3rem;
        background: #E6821E;
        vertical-align: middle;
    }
    .main{
        flex: 1;
        position: relative;
    }
    .scroll{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .notice_list{
        padding: 0 0.4rem;
    }
    .notice_item{
        position: relative;
        border-bottom: 1px solid #ccc;
        padding: 0.2rem 0.6rem 0.2rem 0.25rem;
    }
    .notice_item:before{
        content: '';
        position: absolute;
        width: 0.12rem;
        height: 0.12rem;
        background: #e41d1d;
        border-radius: 100%;
        left: 0;
        top: 0.37rem;
        display: none;
    }
    .notice_item.active:before{
        display: block;
    }
    .notice_item.active .notice_item_txt1{
        font-weight: bold;
    }
    .notice_item:after{
        width: 0.4rem;
        height: 0.4rem;
        background: url("../../static/images/icon/notice_icon_right.png") no-repeat center center / cover;
        position: absolute;
        right: 0.05rem;
        top: 50%;
        content: '';
        transform: translateY(-50%);
    }
    .notice_item_txt1{
        font-size: .26rem;
        color: #333;
        line-height: .35rem;
    }
    .notice_item_txt2{
        font-size: .2rem;
        color: #666;
        line-height: .3rem;
    }
    .notice_item_txt3{
        font-size: .2rem;
        color: #666;
        line-height: .3rem;
        margin-top: .15rem;
    }
</style>
