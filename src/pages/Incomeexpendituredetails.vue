<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">HALE收支明细</p>
        </div>
        <div class="wrapper">
            <div class="Mybalance">
                <div>{{balance.toFixed(7).slice(0, -1)}}</div>
                <div>≈￥ {{Rmbbalance|tofixed4}}</div>
            </div>
<!--            <div class="tab">-->
<!--                <div @click="msgs(1)" :class="msg==1? 'ativetab' : ''">全部</div>-->
<!--                <div @click="msgs(2)" :class="msg==2? 'ativetab' : ''">收款</div>-->
<!--                <div @click="msgs(3)" :class="msg==3? 'ativetab' : ''">付款</div>-->
<!--            </div>-->
            <div class="he"></div>
            <div class="main" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
                 infinite-scroll-distance="10">
                <!--                全部-->
                <div v-if="msg==1">
                    <div v-for="(item,index) in list" @click="godetail(item)">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19).replace("T"," ")}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'" class="gree">+ {{(item.messages[0].value.amount[0].amount/1000000).toFixed(7).slice(0, -1)||0}} HALE</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'" class="gree">+ {{(item.messages[0].value.value/1000000).toFixed(7).slice(0, -1)||0}} HALE</p>

                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'" class="red">- {{(item.messages[0].value.value/1000000)  .toFixed(7).slice(0, -1)||0}} HALE</p>
                                <p v-if="item.code!==0" class="red">未完成</p>
                                <p v-if="item.code==0">已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
                <!--                收款-->
                <div v-if="msg==2">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress!==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='cosmos-sdk/MsgSend'" class="gree">+ {{item.messages[0].value.amount[0].amount/1000000||0}} HALE</p>
                                <p v-if="myaddress!==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'" class="gree">+ {{item.messages[0].value.value/1000000||0}} HALE</p>

                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>
                </div>
                <!--                付款-->
                <div v-if="msg==3">
                    <div v-for="(item,index) in list" @click="godetail(item)" v-if="myaddress==item.from_address">
                        <div>
                            <img src="../static/images/newWallet/icon_HALE11.png">
                            <div>
                                <p>
                                    <span class="red" v-if="myaddress==item.from_address">付款</span>
                                    <span class="gree" v-if="myaddress!==item.from_address">收款</span>
                                    <span v-if="myaddress==item.from_address">{{item.to_address|addressFormat}}</span>
                                    <span v-if="myaddress!==item.from_address">{{item.from_address|addressFormat}}</span>

                                </p>
                                <p style="white-space:nowrap">{{item.timestamp.substring(0,19)}}</p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p v-if="myaddress!==item.from_address" class="gree">+
                                    {{item.messages[0].value.value||0}} HALE</p>
                                <p v-if="myaddress==item.from_address&&item.messages[0].type=='ethermint/MsgEthermint'" class="red">- {{item.messages[0].value.value/1000000||0}} HALE</p>
                                <p>已完成</p>
                            </div>
                            <img src="../static/images/newWallet/icon_go.png">
                        </div>
                    </div>
                    <p>加载完成！</p>

                </div>
            </div>
        </div>
        <div class="sidebar_list_wrapperimport">
            <div class="sidebar_list_padding">
                <!--                                <p class="sidebar_txt2">{{$t('sidebar.sidebar_other')}}</p>-->
                <div class="sidebar_listaddimport">
                    <div class="sidebar_item"
                         @click="Collection"
                    >
                        <div class="sidebar_item_pic sidebar_item_create"></div>
                        <p class="sidebar_txt3">收款</p>
                    </div>
                    <div class="sidebar_item"
                         @click="payment"
                    >
                        <div class="sidebar_item_pic sidebar_item_import"></div>
                        <p class="sidebar_txt3">付款</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {Ethtohelle, Halletoeth} from "../util/dip";
    import Web3 from 'web3'
    import axios from 'axios'
    import urlUtil from '../util/apiUtil.js'
    import {InfiniteScroll} from 'mint-ui'
    Vue.use(InfiniteScroll)

    export default {
        name: "Incomeexpendituredetails",
        data() {
            return {
                msg: 1,
                addrees: "",
                web3: {},
                balance: "",
                Rmbbalance: 0,
                list: "",
                myaddress: "",
                pages:10,
                pagestore:true,
                after:0
            }
        },
        created() {
            var that = this;
            // this.getdata()
            this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalance"));
            this.getBalance(localStorage.getItem("assetaddress"))
            this.$http.get('http://120.77.247.234:8983/js/hCurrencyRate/findCurrencyParameter', {
                currency: "haleusdt"
            }).then((res) => {
                that.Rmbbalance = that.balance * res.result.usdtCny * res.result.haleUsdt.firstPrice
            })

        },
        methods: {
            //列表
            getdata(){
                var that = this;
                Ethtohelle(localStorage.getItem("assetaddress")).then((res) => {
                    that.myaddress = res;
                    axios.get(urlUtil.getApiUrl("api_rootlist")+"/v1/txs_address", {
                        params: {
                            limit: 30,
                            after:that.after,
                            address: that.myaddress
                        }
                    },).then((res) => {
                    //     console.log(res.data.data[4])
                    //     var bchearr=[];
                    // for (var i = 0; i <=res.data.data.length;i++) {
                    //         bchearr.push(res.data.data.pop());
                    //     }
                    //     that.after=bchearr[0].id
                    //     if(that.pages>res.data.data.length){
                    //         that.pagestore=false
                    //         that.list = bchearr
                    //     }else{
                    //         that.list = bchearr
                    //     }
                       
                 
                    //     console.log(that.list)
                    that.list=res.data.data.reverse()
                    })
                })
            },
            //余额
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
            //切换选项卡
            msgs(i) {
                this.msg = i;
                this.getdata()
                this.pages=10
                this.pagestore=true
            },
            //上拉加载
            loadMore: function () {
                console.log(this.pagestore)
                if(this.pagestore){
                    this.pages+=10
                    this.getdata()
                }

            },
            Collection() {
                this.$push({
                    path: '/currencyCollect',
                    query: {
                        addrees: this.myaddress
                    }
                })
            },
            payment() {
                this.$push({
                    path: '/currencyTransfer'
                })
            },
            godetail(i) {
                this.$push({
                    path: '/currencyDealDetail',
                    query: {
                        i
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .wrapper {
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

    .sidebar_listaddimport {
        display: flex;
        justify-content: space-around;
    }

    .sidebar_item {
        padding: 0.2rem;
        position: relative;
    }

    .sidebar_item_pic {
        width: 0.9rem;
        height: 0.9rem;
    }

    .sidebar_item_create {
        background: url("../static/images/newWallet/icon_sk.png") no-repeat center center / cover;
    }

    .sidebar_item_import {
        background: url("../static/images/newWallet/icon_fk.png") no-repeat center center / cover;
    }

    .sidebar_txt3 {
        text-align: center;
        font-size: 0.24rem;
        color: #333;
        line-height: 0.3rem;

    }

    .Mybalance {
        padding: .3rem;
    }

    .Mybalance > div:nth-of-type(1) {
        font-size: .36rem;
        color: #E6821E;
        font-weight: bold;
    }

    .Mybalance > div:nth-of-type(2) {
        font-size: .24rem;
        color: #AAAAAA;
        font-weight: bold;
    }

    .tab > .ativetab {
        background: #E6821E;
        color: white;
    }

    .tab {
        display: flex;
        padding: .3rem;
    }

    .main {
        height: 100%;
        overflow: scroll;
        padding: 0 .3rem;
    }

    .main > div {
        margin-bottom: 3.5rem;
    }

    .main > div > div {
        padding: .2rem 0;
        height: .8rem;
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;
    }

    .main > div > div > div {
        display: flex;
    }

    .main > div > div > div p:nth-of-type(1) {
        font-size: .26rem;
    }

    .main > div > div > div p:nth-of-type(2) {
        color: #AAAAAA;
        font-size: .2rem;
    }

    .main > div > div > div:nth-of-type(1) img {
        margin-top: .075rem;
        width: .6rem;
        height: .6rem;
        margin-right: .15rem;
    }

    .main > div > div > div:nth-of-type(2) img {
        margin-left: .1rem;
        margin-top: .2rem;
        width: .35rem;
        height: .35rem;
    }

    .main > div > p {
        text-align: center;
        line-height: .6rem;
        color: #666666;
    }

    .main > div > div > div:nth-of-type(2) {
        text-align: right;
    }

    .he {
        height: .2rem;
        background: #F5F5F5;
    }

    .tab > div {
        width: 33.3%;
        height: .8rem;
        line-height: .8rem;
        color: #070707;
        text-align: center;
        border: 1px solid rgba(238, 238, 238, 1);
    }

    .gree {
        color: #22AC38;
        font-size: .26rem;
    }

    .red {
        color: #FF0000 !important;
    }
</style>
