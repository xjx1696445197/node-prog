<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">验证助记词</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div>
                    <p>
                        验证你的钱包助记词
                    </p>
                    <p>
                        轻按顺序点击助记词，验证你备份的助记词正确无误。
                    </p>
                </div>
                <div class="Mnemonic Mnemonicborder">
                    <div>
                        <div v-for="(list,index) in MnemonicviewSelect" @click="removeMnemonic(list,index)"
                             :class="[Mnemonicviewred[index] ? 'red' : '']">
                            {{list}}
                        </div>
                    </div>
                </div>
                <div class="Mnemonic">
                    <div>
                        <div v-for="(list,index) in Mnemonicview" @click="addMnemonic(list,index)">
                            {{list}}
                        </div>
                    </div>
                </div>
                <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter" @click="gobackupmnems">下一步
                </div>

            </div>
        </div>
        <!--认证失败弹窗-->
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
                    <p class="realAuthentxt1">助记词顺序错误，请检查备份</p>
                    <!--                    <p class="realAuthentxt2"></p>-->
                    <div class="realAuthenBtn"
                         @click="toAgainAuthen"
                    >重新填写
                    </div>
                </div>
            </div>
        </nlayer>
        <nlayer
                :visible="validationSuccessfulDig"
                @close="validationSuccessful"
                class="ANIMATITE_TOP_TO_BOTTOM_SMALL NDIALOG"
                width="80%"
                :zIndex="999"
        >
            <div class='DIALOG'>
                <div class="DIALOG_TITLE_ERROR">
                    <div class="SuccessIcon"></div>
                    <p class="realAuthentxt1">验证通过</p>
                    <p class="realAuthentxt2">助记词验证通过，Halle 将从此设备中删除你的助记词，请妥善保管。</p>
                    <div class="realAuthenBtn"
                         @click="vSuccessful"
                    >确定
                    </div>
                </div>
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

    export default {
        name: "Verificationmnemonics",
        components: {
            Nlayer
        },
        data() {
            return {
                Mnemonic: "",
                Mnemonicview: "",
                Mnemonicviewred: [false, false, false, false, false, false, false, false, false, false, false, false],
                realAuthenErrorDig: false,
                validationSuccessfulDig: false,
                MnemonicviewSelect: [],
                tipsVisible: false,
                tips: "",
                correct: ""
            }
        },
        mounted() {
            this.Mnemonic = this.$route.query.Mnemonics
            var paddingNew = this.Mnemonic[0].replace(/px/g, "");
            var strArr = new Array();
            paddingNew = paddingNew.replace(/ +/g, " ");
            strArr = paddingNew.split(" ");
            var newArr = []
            for (var i = strArr.length + 1; i > 0;) {
                i--
                var rdm = Math.floor(Math.random() * strArr.length)
                if (!newArr.includes(strArr[rdm])) {
                    newArr.push(strArr[rdm])
                } else {
                    if (newArr.length == strArr.length) {
                        break;
                    }
                    i++
                }
                // console.log(newArr)
            }
            this.Mnemonicview = newArr
            this.correct = this.Mnemonic[0].split(" ")
            console.log(this.correct)
            console.log(this.Mnemonic)
        },
        computed: {},
        methods: {
            ...mapGetters(['mapGetters', 'mapActions']),
            addMnemonic(data, i) {
                this.MnemonicviewSelect.push(data)
                this.Mnemonicview.splice(i, 1);
                for (var i = 0; i < this.MnemonicviewSelect.length; i++) {
                    var obj = this.MnemonicviewSelect[i]
                    // var isExist = false
                    var aj = this.correct[i]
                    console.log(aj, obj)
                    if (aj == obj) {
                        this.Mnemonicviewred[i] = false
                    }else {
                        this.Mnemonicviewred[i] = true
                        console.log(this.Mnemonicviewred)
                    }
                }



        },
        removeMnemonic(data, i) {
            this.Mnemonicview.push(data)
            this.MnemonicviewSelect.splice(i, 1);
            for (var i = 0; i < this.MnemonicviewSelect.length; i++) {
                var obj = this.MnemonicviewSelect[i]
                // var isExist = false
                var aj = this.correct[i]
                console.log(aj, obj)
                if (aj == obj) {
                    this.Mnemonicviewred[i] = false
                }else {
                    this.Mnemonicviewred[i] = true
                    console.log(this.Mnemonicviewred)
                }
            }

        },
        gobackupmnems() {
            // console.log(this.MnemonicviewSelect)
            if (this.MnemonicviewSelect.length == 12) {
                if (this.Mnemonic[0] == this.MnemonicviewSelect.join(" ").toString()) {

                    this.openvalidationSuccessful()
                } else {
                    this.openRealAuthenErrorDig()
                }
            } else {
                this.showTips("请您将助记词全部填写")
            }

        },
        // 打开失败提示弹窗
        openRealAuthenErrorDig() {
            this.realAuthenErrorDig = true
        },
        // 监听失败提示弹框
        realAuthenErrorDigClose() {
            this.MnemonicviewSelect = []
            var paddingNew = this.Mnemonic[0].replace(/px/g, "");
            var strArr = new Array();
            paddingNew = paddingNew.replace(/ +/g, " ");
            strArr = paddingNew.split(" ");
            var newArr = []
            for (var i = strArr.length + 1; i > 0;) {
                i--
                var rdm = Math.floor(Math.random() * strArr.length)
                if (!newArr.includes(strArr[rdm])) {
                    newArr.push(strArr[rdm])
                } else {
                    if (newArr.length == strArr.length) {
                        break;
                    }
                    i++
                }
                // console.log(newArr)
            }
            this.Mnemonicview = newArr
            this.realAuthenErrorDig = false
        },
        // 打开成功提示弹窗
        openvalidationSuccessful() {
            this.validationSuccessfulDig = true
        },
        // 监听成功提示弹框
        validationSuccessful() {
            this.validationSuccessfulDig = false
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
        // 重新填写
        toAgainAuthen() {
            this.MnemonicviewSelect = []
            var paddingNew = this.Mnemonic[0].replace(/px/g, "");
            var strArr = new Array();
            paddingNew = paddingNew.replace(/ +/g, " ");
            strArr = paddingNew.split(" ");
            var newArr = []
            for (var i = strArr.length + 1; i > 0;) {
                i--
                var rdm = Math.floor(Math.random() * strArr.length)
                if (!newArr.includes(strArr[rdm])) {
                    newArr.push(strArr[rdm])
                } else {
                    if (newArr.length == strArr.length) {
                        break;
                    }
                    i++
                }
                // console.log(newArr)
            }
            this.Mnemonicview = newArr
            this.realAuthenErrorDig = false
        },
        //填写正确确认
        vSuccessful() {
            var that = this;
            localStorage.setItem("Addressinformation", JSON.stringify([this.Mnemonic[2]]))
            localStorage.setItem("assetaddress", this.Mnemonic[2].accounts)
            localStorage.setItem("walltname", this.Mnemonic[2].name)
            localStorage.setItem("show", 1)
            localStorage.setItem("Createdsuccessfully", 1)
            localStorage.setItem("googleVerification",0)
            this.validationSuccessfulDig = false
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
    .btn {
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

    .content {
        padding: .3rem;
        color: #070707;
    }

    .content p:nth-of-type(1) {
        font-size: .3rem;
        font-weight: bold;
    }

    .content p:nth-of-type(2) {
        margin-top: .3rem;
    }

    .Mnemonic > div {
        display: flex;
        flex-wrap: wrap;
    }

    .Mnemonic > div > div {
        margin-left: .185rem;
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
    .DIALOG_TITLE_ERROR {
        padding: 0.35rem 0 0.35rem;
    }

    .realAuthenIcon {
        margin: 0 auto;
        width: 1.4rem;
        height: 1.4rem;
        background: url("../static/images/newWallet/icon_tanhao.png") no-repeat center center / cover;
    }

    .SuccessIcon {
        margin: 0 auto;
        width: 1.4rem;
        height: 1.4rem;
        background: url("../static/images/newWallet/icon_seccus.png") no-repeat center center / cover;
    }

    .realAuthentxt1 {
        font-size: 0.30rem;
        color: #333;
        line-height: 0.45rem;
        font-weight: bold;
        padding: 0.2rem 0 0.2rem;
    }

    .realAuthentxt2 {
        font-size: 0.24rem;
        padding: 0 .3rem;
        color: #666;
        line-height: 0.45rem;
    }

    .realAuthenBtn {
        width: 2.1rem;
        height: 0.6rem;
        background: #E6821E;
        font-size: 0.24rem;
        color: #FEFEFE;
        line-height: 0.6rem;
        border-radius: 50rem;
        margin: 0.5rem auto 0;
    }

    .Mnemonicborder {
        margin-top: .4rem;
        margin-bottom: .1rem;
        width: 6.9rem;
        height: 4rem;
        border: 1px solid #E6821E;
        border-radius: .2rem;
    }

    .Mnemonicborder > div > div {
        background: none;
        color: #070707;
    }

    .red {
        color: #FF0000 !important;
    }
</style>
