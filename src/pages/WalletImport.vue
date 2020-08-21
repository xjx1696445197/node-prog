<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">导入钱包</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="word_title">填写您备份的助记词</div>
                <div class="word_list clearfix">
                    <input type="text" class="word_item fl" v-for="input in dataList" :key="input.id"
                           v-model="input.model">
                </div>
                <!--输入钱包名字-->
                <div class="list">
                    <div class="item">
                        <p class="title fweight">钱包名字</p>
                        <input class="create_input" type="text" v-model="walletname" placeholder="请输入钱包名称">
                        <p class="subTitle">1-12位字符</p>
                    </div>
                    <div class="item" style="margin-top: 0.25rem;">
                        <p class="title fweight">钱包密码</p>
                        <input class="create_input" type="password" placeholder="请输入密码" v-model="password">
                        <p class="subTitle">不小于8个字符，且为数字和字母的组合</p>
                    </div>
                    <div class="item">
                        <div class="input">
                            <input class="create_input" type="password" placeholder="请再次输入密码" v-if="!hide"  v-model="passwordtwo"  autocomplete="off">
                            <input class="create_input" type="text" placeholder="请再次输入密码"  v-if="hide"  v-model="passwordtwo"  autocomplete="off">

                            <div class="eyes_icon" :class="hide ? 'eyes_show_icon' : 'eyes_hide_icon'"  @click="show()"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR_UN mauto tcenter"
                 @click="toBackupWallet"
            >导入钱包
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


    export default {
        name: "WalletImport",
        components: {
            Nlayer
        },
        data() {
            return {
                dataList: [
                    {id: "1", model: ""},
                    {id: "2", model: ""},
                    {id: "3", model: ""},
                    {id: "4", model: ""},
                    {id: "5", model: ""},
                    {id: "6", model: ""},
                    {id: "7", model: ""},
                    {id: "8", model: ""},
                    {id: "9", model: ""},
                    {id: "10", model: ""},
                    {id: "11", model: ""},
                    {id: "12", model: ""},],
                Mnemonic: [],
                Mnemonicview: "",
                password:"",
                passwordtwo:"",
                tips:"",
                tipsVisible:false,
                walletname:"",
                hide:0
            }
        },
        mounted() {

        },
        computed: {},
        methods: {

            show(){
                if (this.hide){
                    this.hide=0
                }else {
                    this.hide=1
                }
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
            toBackupWallet: function () {
                var that=this;
                var regex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                
                if (this.walletname==""){
                    that.showTips("填写钱包名称")
                    return;
                }else if (/[\u4E00-\u9FA5]/i.test(this.walletname)){
                    this.showTips("昵称不能为中文")
                    return
                }else if (this.walletname.length>20){
                    this.showTips("昵称不能超过20个字符")
                    return
                }else if (this.password==""){
                    that.showTips("填写密码")
                    return;

                }else if (!regex.test(this.password)){
                    that.showTips("密码格式错误")
                    return;

                }else if (this.passwordtwo!==this.password){
                    that.showTips("两次密码不一致")
                    return;

                }
                for (let i = 0; i < this.dataList.length; i++) {
                    let res = this.dataList[i].model;
                    this.Mnemonic.push(res);
                    if (this.dataList[i].model==""){
                        that.showTips("助记词需全部填写")
                        return
                    }
                }

                this.Mnemonic=this.Mnemonic.join(" ")
                console.log(this.Mnemonic)
                ImportWallet(this.password,this.Mnemonic,this.walletname).then(
                    (res)=>{
                        this.$push({
                            path: '/Importaddress',
                            query: {
                                addresslist:res
                            }
                        })
                    }
                ).catch((res)=>{
                    this.showTips("助记词错误")
                    this.Mnemonic=[]
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        /*margin-top: 0.5rem;*/
        padding: 0 0.3rem;
    }

    .word_title {
        font-size: 0.3rem;
        line-height: 1rem;
        color: #070707;
    }

    .word_list {
        margin-left: -0.3rem;
    }

    .word_item {
        width: 1.5rem;
        height: 0.6rem;
        background: #eee;
        border: none;
        border-radius: 0.05rem;
        margin-left: 0.3rem;
        margin-top: 0.3rem;
        text-align: center;
        padding: 0 0.05rem;
        box-sizing: border-box;
    }

    .list {
        margin-top: 0.8rem;
    }

    .title {
        font-size: 0.3rem;
        line-height: 0.45rem;
        color: #070707;
    }

    .create_input {
        width: 100%;
        height: 0.75rem;
        font-size: 0.26rem;
        color: #070707;
        line-height: 0.75rem;
        border: none;
        border-bottom: 1px solid #070707;

    }

    .subTitle {
        font-size: 0.24rem;
        line-height: 0.65rem;
        color: #070707;
        margin-top: 0.1rem;
    }

    .input {
        position: relative;
    }

    .eyes_icon {
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 0.275rem;
        right: 0.2rem;
    }

    .eyes_show_icon {
        background: url("../static/images/newWallet/icon_create_show.png") no-repeat center center /cover;
    }

    .eyes_hide_icon {
        background: url("../static/images/newWallet/icon_create_hide.png") no-repeat center center /cover;
    }

    .btn {
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #fff;
        background: #E6821E;
        margin-top: 0.6rem;
    }
</style>
