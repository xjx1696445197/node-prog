<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">谷歌验证</p>
        </div>
        <div class="wrapper">
            <div class="googleVerification_wrapper">
                <div class="googleVerification_top">
                    <div class="googleVerification_bg tcenter">
                        <p class="googleVerification_txt1">第一步</p>
                    </div>

                </div>

                <div class="googleVerification_content">
                    <p class="googleVerification_txt2">请使用您手机上的谷歌验证器 APP（Authenticator）扫描下方二维码</p>
                    <div class="googleVerification_code mauto">
                        <!--<div class="googleVerification_img"-->
                        <!--:style="{-->
                        <!--'background': `url(${detail.secretkeyImg}) no-repeat center center / cover`}"-->
                        <!--&gt;</div>-->
                        <div class="qrcode mauto" ref="qrCodeUrl">

                        </div>
                    </div>
                    <p class="googleVerification_txt2 tcenter googleVerification_line">或者</p>
                    <p class="googleVerification_txt2 tcenter">无法识别二维码可将密钥输入到谷歌验证APP中</p>
                    <div class="googleVerification_address radius-half" data-initcopyer="true">
                        <div class="address_txt1">
                            <p class="">{{key}}</p>
                        </div>
                        <div class="googleVerification_copy radius-half">
                            <div class="googleVerification_copy_icon"></div>
                        </div>
                    </div>
                    <div class="googleVerification_tips">
                        <div class="googleVerification_tip">
                            <p class="googleVerification_tip_txt">请将16位密钥记录在纸上，并保存在安全的地方。如果遇到手机丢失，可以通过该密钥恢复您的谷歌验证</p>
                        </div>
                        <!--<div class="googleVerification_tip">-->
                        <!--<p class="googleVerification_tip_txt">通过人工客服重置你的谷歌验证需要提交工单，处理时间需要7日</p>-->
                        <!--</div>-->

                    </div>
                </div>

                <div
                        class="button LONGBTN GE_BUTTON_SHADOW"
                        @click="toGoogleVerificationSecound"
                >下一步
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
                    <p class="realAuthentxt2">请勿截屏和存储，这将可能被第三方恶意软件手机，造成资产损失。</p>
                    <div class="realAuthenBtn"
                         @click="toAgainAuthen"
                    >我知道了</div>
                </div>
            </div>
        </nlayer>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {sourceUrl} from '@/config'
    import urlUtil from '../util/apiUtil.js'
    import axios from 'axios'

    import Nlayer from '@/components/Nlayer'
    import ClipboardJS from 'clipboard'
    import QRCode from 'qrcodejs2'

    export default {
        name: "GoogleVerification",
        components: {
            Nlayer
        },
        data() {
            return {
                sourceUrl,
                currency: '',
                detail: {},
                tips: '',
                tipsVisible: false,
                copyer: null,
                type: null,
                key: "",
                realAuthenErrorDig:false,
            }
        },
        computed: {
            userinfo() {
                return this.getUserinfo()
            },
            userId() {
                return this.userinfo.customerId
            },
            customerToken() {
                return this.userinfo.customerToken
            },
            googleType() {
                return this.$route.query.googleType
            }
        },
        mounted() {
            this.getDetail()
        },
        destroyed() {
            this.copyer && this.copyer.destroy()
        },
        methods: {
            ...mapGetters(['getUserinfo']),
            // 监听提示弹框
            realAuthenErrorDigClose(){
                this.realAuthenErrorDig = false
            },
            //生成二维码
            creatQrCode(add) {
                var qrcode = new QRCode(this.$refs.qrCodeUrl, {
                    text: add, // 需要转换为二维码的内容
                    width: 200,
                    height: 200,
                    colorDark: '#000000',
                    colorLight: '#ffffff',
                    correctLevel: QRCode.CorrectLevel.H
                })
            },
            // 初始化复制器
            initCopyer(value) {
                if (this.copyer) {
                    this.copyer.destroy()
                }

                this.copyer = new ClipboardJS('[data-initcopyer]', {
                    text() {
                        return value
                    }
                }).on('success', () => {
                    this.showTips('复制成功')
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
            // 请求获取谷歌二维码以及秘钥
            getDetail(refresh = false) {
                var that = this
                axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/generate", {
                    params: {}
                },).then((res) => {
                    localStorage.setItem("googleid",res.data.id)
                    that.creatQrCode("otpauth://totp/Hallechain?secret=" + res.data.key + "&issuer=HalleToken")
                    that.key=res.data.key
                    that.initCopyer(res.data.key)
                })
                // jsonAjax.get(urlUtil.getApiUrl("getUserCodeImg"), {
                //     userId: that.userId,
                //     customerToken:that.customerToken
                // }, function (res) {
                //     console.log(res)
                //     if( res.returnCode == 1 ){
                //         that.detail = res.resultData
                //         that.initCopyer(that.detail.secretKey)
                //     }
                // })

            },
            toGoogleVerificationSecound(){
                this.realAuthenErrorDig=true
            },
            // 去第二步
            toAgainAuthen() {
                this.$push({
                    path: '/googleVerificationSecound',
                    query: {
                        googleType: this.googleType,
                        secretKey: this.detail.secretKey
                    }
                })
            },
        }


    }
</script>

<style scoped>
.wrapper{
    overflow-y:scroll;
}
    .googleVerification_top {
        background: #fafafa;
        /*padding-top:0.24rem;*/
    }

    .googleVerification_bg {
        background: #E6821E;
        /*background: #203395;*/
        height: 1rem;
    }

    .googleVerification_txt1 {
        font-size: 0.3rem;
        color: #fff;
        line-height: 1rem;
        font-weight: bold;
    }

    .googleVerification_txt2 {
        font-size: 0.26rem;
        color: #333;
        line-height: 0.4rem;
    }

    .googleVerification_content {
        padding: 0.24rem 0.3rem 0;
    }

    .googleVerification_code {
        width: 200px;
        height: 200px;
        background: #fff;
        margin-bottom: 0.15rem;
    }

    .googleVerification_img {
        width: 100%;
        height: 100%;
    }

    .googleVerification_txt2 + .googleVerification_txt2 {
        margin-top: 0.3rem;
    }

    .googleVerification_line {
        position: relative;
    }

    .googleVerification_line:before {
        position: absolute;
        content: '';
        width: 3rem;
        height: 0.01rem;
        background: #ccc;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .googleVerification_line:after {
        position: absolute;
        content: '';
        width: 3rem;
        height: 0.01rem;
        background: #ccc;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
    }

    .googleVerification_address {
        background: #E6821E;
        height: 0.9rem;
        position: relative;
        margin-top: 0.45rem;
    }

    .address_txt1 {
        width: 6rem;
        font-size: 0.26rem;
        color: #fff;
        line-height: 0.6rem;
        padding: 0.13rem 0.45rem 0;
        word-wrap: break-word
    }

    .googleVerification_copy {
        background: #fff;
        width: 0.6rem;
        height: 0.6rem;
        position: absolute;
        right: 0.42rem;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
        display: flex;
        align-items: center;

    }

    .googleVerification_copy_icon {
        background: url('../static/images/icon/detail_copy_icon.png') no-repeat center center / cover;
        width: 0.26rem;
        height: 0.26rem;
        margin-left: 0.18rem;
    }

    .googleVerification_tips {
        margin-top: 0.25rem;

    }

    .googleVerification_tip_txt {
        padding: 0.15rem 0.35rem 0.15rem 0.65rem;
        position: relative;
        font-size: 0.2rem;
        color: #333;
        line-height: 0.3rem;

    }

    .googleVerification_tip_txt:before {
        position: absolute;
        content: '';
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 0.05rem;
        border: 1px solid #333;
        top: 50%;
        transform: translateY(-50%);
        left: 0.15rem;
    }

    .button {
        margin-top: 1rem;
        width: 5rem;
        height: .8rem;
        line-height: .8rem;
        background: #E6821E;
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
