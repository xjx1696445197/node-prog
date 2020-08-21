<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">备份助记词</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div>
                <p>
                    抄写下你的钱包助记词并妥善保存
                </p>
                <p>
                    助记词用于恢复钱包或重置钱包密码，请将它准确抄写到纸上，务必妥善保管。
                </p>
                </div>
                <div class="Mnemonic">
                <div v-for="(list,index) in Mnemonicview">
                    {{list}}
                </div>
                </div>
                <div v-if="store!==1" class="btn LONG_WALLET_BTN BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter" @click="gobackupmnems">下一步</div>
                <div v-if="store==1" class="btn LONG_WALLET_BTN BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter" @click="goback">确认</div>

            </div>
        </div>
        <!--认证弹窗-->
        <nlayer
                :visible="realAuthenErrorDig"
                @close="realAuthenErrorDigClose"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
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
    import Nlayer from '@/components/Nlayer'
    import {sourceUrl} from '@/config'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        name: "Backupmnemonics",
        components: {
            Nlayer
        },
        data() {
            return {
                Mnemonic: "",
                Mnemonicview:"",
                realAuthenErrorDig:false,
                store:""
            }
        },
        mounted() {
            this.Mnemonic = this.$route.query.Mnemonics
            this.store = this.$route.query.store

            var paddingNew = this.Mnemonic[0].replace(/px/g, "");
            var strArr = new Array();
            paddingNew = paddingNew.replace(/ +/g, " ");
            strArr = paddingNew.split(" ");
            this.Mnemonicview=strArr
            // console.log(this.Mnemonicview)
        },
        computed: {},
        methods: {
            ...mapGetters(['mapGetters', 'mapActions']),
            gobackupmnems() {
                this.openRealAuthenErrorDig()
            },
            // 打开提示弹窗
            openRealAuthenErrorDig(){
                this.realAuthenErrorDig = true
            },
            // 监听提示弹框
            realAuthenErrorDigClose(){
                this.realAuthenErrorDig = false
            },
            // 点击下一步
            toAgainAuthen(){
                this.$replace({
                    path: '/Verificationmnemonics',
                    query: {
                        Mnemonics: this.Mnemonic
                    }
                })
                this.realAuthenErrorDig = false
            },
            goback(){
                this.$back()
            }
        }
    }
</script>

<style scoped>
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
    .content{
        padding: .3rem;
        color: #070707;
    }
    .content p:nth-of-type(1){
        font-size: .3rem;
        font-weight: bold;
    }
    .content p:nth-of-type(2){
        margin-top: .3rem;
    }
    .Mnemonic{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .Mnemonic>div{
        width: 1.5rem;
        height: .6rem;
        line-height: .6rem;
        color: white;
        background: #E6821E;
        border-radius: .1rem;
        text-align: center;
        margin-top: .3rem;
    }
    /*提示*/
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


</style>
