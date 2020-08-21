<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">换绑谷歌验证码</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="inputBox_list">
                    <div class="inputBox">
                        <div class="inputBox_sub">
                            <div>谷歌验证码</div>
                            <input
                                    type="text" class="INPUT3"
                                    placeholder="输入谷歌验证码"
                                    v-model="formData.googleCode"
                                    v-validate:newPassword="validateOtions.googleCode"
                            >
                        </div>
                    </div>
                </div>

                <div class="forget">
                    <div class="forget_txt" @click="toChangeGoogle">遗忘谷歌验证码</div>
                </div>

                <div
                        class="modifyCode_btn LONGBTN GE_BUTTON_SHADOW"
                        @click="toValidate"
                >确定</div>
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
    // 验证格式及错误信息
    const validateOtions = {
        googleCode: {
            rules:{
                required: true
            },
            msg:{
                required: "请输入谷歌验证码"
            }
        }
    }

    import { mapGetters } from 'vuex'
    import Nlayer from '@/components/Nlayer'
    import axios from 'axios'
    import urlUtil from '../util/apiUtil.js'

    export default {
        name: "ChangeGoogle",
        data(){
            return {
                validateOtions,
                formData: {
                    googleCode: ''
                },
                tips: '',
                tipsVisible: false
            }
        },
        components: {
            Nlayer
        },
        computed: {
            userinfo(){
                return this.getUserinfo()
            },
            userId(){
                return this.userinfo.customerId
            }
        },
        methods: {
            ...mapGetters(['getUserinfo']),
            // 去验证格式
            toValidate(){
                const pass = this.$validator.checkAll()
                const {
                    googleCode
                } = this.formData

                if( !pass ) {
                    // 没通过验证
                    const errors = this.$validator.errors.errors
                    const errorMsg = errors[0].msg
                    this.showTips(errorMsg)
                    return
                }

                this.submit()
            },
            // 提交信息
            submit(){
                // 请求换绑接口
                var that = this
                if(that.formData.googleCode==""){
                    that.showTips("谷歌验证码不能为空")
                    return;
                }else if(that.formData.googleCode.length!==6){
                    that.showTips("填写六位验证码")
                    return;
                }
                axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/auth", {
                    params: {
                        id:localStorage.getItem("googleid"),
                        passwd:this.formData.googleCode
                    }
                },).then((res) => {
                    if (res.data){
                        that.showTips("验证成功")
                        localStorage.setItem("googleVerification",0)
                        setTimeout(() => {
                                        // 输入谷歌验证码正确的情况下
                                        that.$push({
                                            path: '/googleVerification',
                                            query: {
                                                googleType: 0
                                            }
                                        })
                                    }, 1200)
                    }else {
                        that.showTips("谷歌验证码错误")
                    }
                })
                // jsonAjax.post(urlUtil.getApiUrl("changeCode"), {
                //     userId: that.userId,
                //     messageValidateCode: that.formData.googleCode,
                //     type: 0
                // }, function (result) {
                //     console.log(result)
                //     if( result.returnCode == 1 ){
                //         that.showTips(result.message)
                //         // 验证成功
                //         setTimeout(() => {
                //             // 输入谷歌验证码正确的情况下
                //             that.$push({
                //                 path: '/googleVerification',
                //                 query: {
                //                     googleType: 0
                //                 }
                //             })
                //         }, 1200)
                //
                //     }else{
                //         that.showTips(result.message)
                //     }
                //
                //
                // })
            },
            // 去忘记密码页面
            toChangeGoogle(){
                this.$push({
                    path: '/walletImport'
                    // ,
                    // query: {
                    //     googleType: 1
                    // }
                })
            },
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
        padding: 0.34rem 0.3rem 0;
    }
    .INPUT3{
        font-size: 0.24rem;
    }
    input::-webkit-input-placeholder {
        color: #aaa;
    }
    .forget{
        padding: 0.1rem 0.5rem;
    }
    .forget_txt{
        font-size: 0.26rem;
        color: #E6821E;
        line-height: 0.55rem;
        text-align: right;
    }
    .modifyCode_btn{
        margin-top: 5.7rem;
        width: 5rem;
        height:.8rem;
        line-height: .8rem;
        background: #E6821E;
    }
    .inputBox_sub div{
        font-size: 0.3rem;
        color:#070707;
        font-weight: bold;
        line-height: 0.9rem;
    }
</style>
