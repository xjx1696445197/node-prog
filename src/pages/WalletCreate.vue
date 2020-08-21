<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">创建钱包</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="list">
                    <div class="item">
                        <p class="title fweight">钱包名字</p>
                        <input class="create_input" type="text" placeholder="请输入钱包名称" v-model="name"  autocomplete="off">
                        <p class="subTitle">1-12位字符</p>
                    </div>
                    <div class="item" style="margin-top: 0.25rem;">
                        <p class="title fweight">钱包密码</p>
                        <input class="create_input" type="password" placeholder="请输入密码"  v-model="password"  autocomplete="off">
                        <p class="subTitle">不小于8个字符，且为数字和字母的组合</p>
                    </div>
                    <div class="item">
                        <div class="input">
                            <input class="create_input" type="password" placeholder="请再次输入密码" v-if="!hide"  v-model="passwords"  autocomplete="off">
                            <input class="create_input" type="text" placeholder="请再次输入密码"  v-if="hide"  v-model="passwords"  autocomplete="off">

                            <div class="eyes_icon" :class="hide ? 'eyes_show_icon' : 'eyes_hide_icon'"  @click="show()"></div>
                        </div>

                    </div>
                </div>

            </div>
            <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter"
                @click="toBackupWallet"
            >创建钱包</div>
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
    import { sourceUrl } from '@/config'
    import { mapGetters, mapActions } from 'vuex'
    import {Submitpasswords,addaccountsss,SeedPhrase} from '../util/dip.js'
    // import {} from "../util/dip";

    export default {
        name: "WalletCreate",
        components: {
            Nlayer
        },
        data(){
            return {
                name:"",
                password:"",
                passwords:"",
                Mnemonic:"",
                tips:"",
                tipsVisible:false,
                hide:0,
                userList:JSON.parse(localStorage.getItem("Addressinformation"))
            }
        },
        mounted(){

        },
        computed: {

        },
        methods: {
            //创建钱包
            submitpassword() {

                Submitpasswords(this.password).then((res)=>{
                    console.log(res)
                    this.Mnemonic=res
                })
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
        // 去备份
            toBackupWallet(){
                var that=this;
                var regex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                // console.log(regex.test(this.password))
                if (this.name==""){
                    that.showTips("填写钱包名称")
                    return;
                }else if (/[\u4E00-\u9FA5]/i.test(this.walletname)){
                    this.showTips("昵称不能为中文")
                    return
                }else if (this.name.length>20){
                    this.showTips("昵称不能超过20个字符")
                    return
                }else if (this.password==""){
                    that.showTips("填写密码")
                    return;

                }else if (!regex.test(this.password)){
                    that.showTips("密码格式错误")
                    return;

                }
                else if (this.passwords!==this.password){
                    that.showTips("两次密码不一致")
                    return;
                }
                if (this.$route.query.store){
                    addaccountsss(this.name).then((res) => {
                        that.userList.push(res)
                        localStorage.setItem("Addressinformation", JSON.stringify(that.userList))
                        SeedPhrase(res.accounts)
                    })
                }else {
                    // alert(1)
                    Submitpasswords(this.password,this.name).then((res)=>{
                        this.Mnemonic=res
                        this.$replace({
                            path: '/walletBackup',
                            query: {
                                Mnemonics: this.Mnemonic
                            }
                        })
                    })
                }
            },
            show(){
                if (this.hide){
                    this.hide=0
                }else {
                    this.hide=1
                }
            }
        }
    }
</script>

<style scoped>
    .content{
        margin-top: 0.5rem;
        padding: 0 0.3rem;
    }
    .title{
        font-size: 0.3rem;
        line-height: 0.45rem;
        color: #070707;
    }
    .create_input{
        width: 100%;
        height: 0.75rem;
        font-size: 0.26rem;
        color: #070707;
        line-height: 0.75rem;
        border:none;
        border-bottom: 1px solid #070707;

    }

    .subTitle{
        font-size: 0.24rem;
        line-height: 0.65rem;
        color: #070707;
        margin-top: 0.1rem;
    }
    .input{
        position: relative;
    }
    .eyes_icon{
        width: 0.3rem;
        height: 0.3rem;
        position: absolute;
        top: 0.275rem;
        right: 0.2rem;
    }
    .eyes_show_icon{
        background: url("../static/images/newWallet/icon_create_show.png")no-repeat center center /cover;
    }
    .eyes_hide_icon{
        background: url("../static/images/newWallet/icon_create_hide.png")no-repeat center center /cover;
    }
    .btn{
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #fff;
        position: fixed;
        bottom: 0.8rem;
        left: 1.25rem;
    }

</style>
