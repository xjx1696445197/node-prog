<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">导入钱包</p>
        </div>
        <div class="wrapper">
            <div class="content">

        <div class="address">
            <div>
                <div>
                    <div class="clola">地址</div>
                    <div>{{addresslist[1]|addressFormat}}</div>
                </div>
                <div>
                    <div>
                            <div class="clola">当前余额（HALE）</div>
                            <div>{{balance|tofixed6}}</div>
                    </div>
<!--                    <div>-->
<!--                        <div class="clola">已委托总数（HALE）</div>-->
<!--                        <div>0.000</div>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
                <p><span>*</span>
                    请确认钱包信息是否有误</p>
            </div>
            <div class="btns LONG_WALLET_BTN BUTTON_BGCOLOR_UN mauto tcenter"
                 @click="addressd"
            >确认导入
            </div>
            <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR_UN mauto tcenter"
                 @click="this.$back"
            >返回修改
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
    import {sourceUrl} from '@/config'
    import {mapGetters, mapActions} from 'vuex'
    import {ImportWallet} from '../util/dip.js'
    import Web3 from 'web3'
    import urlUtil from "../util/apiUtil";

    export default {
        name: "Importaddress",
        components: {
            Nlayer
        },
        data(){
            return {
                addresslist:[],
                tips:"",
                tipsVisible:false,
                web3: {},
                balance:""
            }
        },
        mounted(){
            this.addresslist=(this.$route.query.addresslist)
            console.log(this.addresslist)
            this.web3 = new Web3(Web3.givenProvider ||urlUtil.getApiUrl("api_rootbalance"));
            // console.log(this.web3)
            this.getBalance(this.addresslist[2].accounts)
            localStorage.setItem("googleVerification",0)

        },
        computed: {

        },
        methods: {
            ...mapGetters(['mapGetters','mapActions']),
            //取余额
            getBalance(fromAddress) {
                var that = this;
                const _from = fromAddress;
                const web3 = this.web3
                web3.eth.getBalance(_from, function (err, value) {
                    that.balance = value/1000000
                    console.log('-------getBalance-------err--------' + err)
                    console.log('-------getBalance--------value-------' + value)
                    if (err) {
                        this.balance = ''
                        this.msg = '未获取到余额'
                        console.warn(err.message)
                        return
                    }
                }.bind(this))
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
            addressd(){
                var that = this;
                localStorage.setItem("Addressinformation", JSON.stringify([this.addresslist[2]]))
                localStorage.setItem("assetaddress", this.addresslist[2].accounts)
                localStorage.setItem("walltname", this.addresslist[2].name)
                localStorage.setItem("show", 1)
                localStorage.setItem("Createdsuccessfully", 1)
                that.showTips("操作成功")
                setTimeout(function () {
                    that.$replace({
                        path: '/asset',
                    })
                }, 1200)
            }
        }
    }
</script>

<style scoped>
    .btns{

        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: white;
        border: 1px solid #E6821E;
        background: #E6821E;
        margin-top: 5rem;
    }

    .btn {
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #E6821E;
        border: 1px solid #E6821E;
        background: none;
        margin-top: 0.4rem;
    }
    .content{
        padding: .3rem;
    }
    .content>p{
        margin-top: .3rem;
        margin-left: .4rem;
    }
    .content>p>span{
        color: #E6821E;
    }
    .address>div{
        padding: .3rem;
        font-size: .24rem;
        width: 6.3rem;
        height: 1.9rem;
        background: #EEEEEE;
        border-radius: .2rem;
    }
    .address>div>div:nth-of-type(2){
        line-height: .5rem;
        display: flex;
        justify-content: space-between;
    }
    .address>div>div:nth-of-type(1) {
        line-height: .5rem;
    }
    .clola{
        color: #AAAAAA;
    }
</style>
