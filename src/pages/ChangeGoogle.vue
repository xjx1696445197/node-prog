<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">遗忘谷歌验证码</p>
        </div>
    <div class="wrapper">
        <div class="content">
            <div class="inputBox_list">
                <div class="inputBox">
                    <p class="inputBox_label">秘钥</p>
                    <div class="inputBox_sub">
                        <input
                                type="text"
                                class="INPUT3"
                                placeholder="请输入秘钥"
                                v-model="formData.captcha"
                                v-validate:captcha="validateOtions.captcha"
                        >
                        <div>
                            13绑定谷歌验证码时备份的32位秘钥
                        </div>
                    </div>

                </div>
            </div>
            <div
                    class="changeGoogle_btn LONGBTN GE_BUTTON_SHADOW"
                    @click="toValidate"
            >确定</div>
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
</div>
</template>

<script>
    // 验证格式及错误信息
    const validateOtions = {
        captcha: {
            rules:{
                required: true
            },
            msg:{
                required: "请输入验证码"
            }
        }
    }


    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import Nlayer from '@/components/Nlayer'

    import urlUtil from '../util/apiUtil.js'
    import jsonAjax from '../util/restUtil.js'

    const TIME = 60

    export default {
        name: "ChangeGoogle",
        data(){
            return {
                validateOtions,
                formData: {
                    captcha: ''
                },
                tips: '',
                tipsVisible: false,
                sended: false,
                captchaToken: '',
                time: TIME
            }
        },
        components: {
            Nlayer
        },
        computed: {
        },
        methods: {

            // 打开消息提示
            showTips(msg){
                this.tips = msg
                this.tipsVisible = true
            },
            // 监听消息提示关闭
            tipsClosed(){
                this.msg = ''
                this.tipsVisible = false
            }
        }
    }
</script>

<style scoped>
.page{
    background: white;
}
    .inputBox_list{
        padding: 0.3rem 0.3rem 0;
    }
    .inputBox_label{
        font-size: 0.3rem;
        color:#070707;
        font-weight: bold;
        line-height: 0.9rem;
    }
    .inputBox_sub{
        margin-top: 0.1rem;
    }
    .inputBox_sub>div{
        margin-top: .15rem;
        color: #070707;

    }
    .inputBox{
        position: relative;
    }
    .INPUT3{
        font-size: 0.26rem;
        height: 1rem;
    }
    .sendCaptcha{
        position: absolute;
        top: 1rem;
        right: 0.1rem;
        /*background: #C8A76D;*/
        width: 2.3rem;
        height: 0.8rem;
        border-top-right-radius: 0.1rem;
        border-bottom-right-radius: 0.1rem;
        font-size: 0.26rem;
        color: #203395;
        line-height: 0.8rem;
        margin-top: 0.1rem;
        text-align: center;
    }
    .sendCaptcha:before{
        position: absolute;
        content: '';
        top: 0.2rem;
        left: 0;
        width: 1px;
        height: 0.4rem;
        background: #203395;
    }
    .sendCaptcha.active{
        background: #fff;
    }
    input::-webkit-input-placeholder {
        color: #aaa;
    }
    .changeGoogle_btn{
        margin-top: 5.7rem;
        width: 5rem;
        height:.8rem;
        line-height: .8rem;
        background: #E6821E;
    }
</style>
