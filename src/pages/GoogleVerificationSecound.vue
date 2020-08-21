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
                        <p class="googleVerification_txt1">第二步</p>
                    </div>

                </div>


                <div class="googleVerification_list">
                    <div class="googleVerification_item">
                        <div>
                            钱包密码
                        </div>
                        <input  type="password" class="INPUT3"
                                placeholder="请输入钱包密码"
                                v-model="formData.newPwd"
                                v-validate:newPassword="validateOtions.newPwd"
                        >
                    </div>
                    <div class="googleVerification_item">
                        <div>
                            谷歌验证码
                        </div>
                        <input type="password" class="INPUT3"
                               placeholder="请输入谷歌验证码"
                               v-model="formData.confirmPwd"
                               v-validate:confirmPassword="validateOtions.confirmPwd"
                        >
                    </div>
                </div>


                <div
                        class="button LONGBTN GE_BUTTON_SHADOW"
                        @click="toValidate"
                >{{this.googleType == '1' ? '更换谷歌验证' : '开启谷歌验证'}}</div>
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
    import {Existingaccounts} from '@/util/dip'
    import axios from 'axios'
    import { mapGetters, mapActions, mapMutations } from 'vuex'
    import { sourceUrl } from '@/config'
    import Nlayer from '@/components/Nlayer'

    import urlUtil from '../util/apiUtil.js'


    // 验证格式及错误信息
    const validateOtions = {
        newPwd: {
            rules:{
                required: true,
                sPassword: true
            },
            msg:{
                required: "请输入新密码",
                sPassword: "密码由8-18位数字+字母组合"
            }
        },
        confirmPwd: {
            rules:{
                required: true
            },
            msg:{
                required: "请再次输入新密码"
            }
        }
    }
    export default {
        name: "GoogleVerificationSecound",
        data(){
            return {
                validateOtions,
                sourceUrl,
                currency: '',
                detail: {},
                tips: '',
                tipsVisible: false,
                formData: {
                    newPwd: '',
                    confirmPwd: ''
                },
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
            },
            googleType(){
                return this.$route.query.googleType
            },
            secretKey(){
                return this.$route.query.secretKey
            },

        },
        mounted(){
            // this.getDetail()
        },
        destroyed(){
            this.copyer && this.copyer.destroy()
        },
        methods: {
            ...mapMutations(['SET_ROUTEACTION']),
            ...mapActions(['removeUserinfo','setUserinfo']),
            ...mapGetters(['getUserinfo']),

            // 去验证格式
            toValidate(){
                const pass = this.$validator.checkAll()
                const {
                    newPwd,
                    confirmPwd
                } = this.formData



                this.submit()
            },
            // 提交信息
            submit(){
                // 请求确定绑定的接口
                var that = this
                var regex=/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/;
                if (that.formData.newPwd==""){
                    that.showTips("填写密码")
                    return;

                }else if (!regex.test(that.formData.newPwd)){
                    that.showTips("密码格式错误")
                    return;
                }else if(that.formData.confirmPwd==""){
                    that.showTips("谷歌验证码不能为空")
                    return;
                }else if(that.formData.confirmPwd.length!==6){
                    that.showTips("填写六位验证码")
                    return;
                }
                Existingaccounts(that.formData.newPwd).then((res) => {
                    console.log(res)
                    this.goolepd()
                }).catch((res) => {
                    this.formData.confirmPwd=""
                    this.formData.newPwd=""
                    this.showTips("密码错误")
                })
                // jsonAjax.post(urlUtil.getApiUrl("addGoogleVerification"), {
                //     userId: that.userId,
                //     userPass:that.formData.newPwd,
                //     verification:that.formData.confirmPwd,
                //     secretKey:that.secretKey,
                //     secretKeyImg:that.secretKeyImg,
                // }, function (result) {
                //     console.log(result)
                //     if( result.returnCode == 1 ){
                //         // 验证成功
                //         that.showTips(result.message)
                //         // 修改缓存信息
                //         that.setUserinfo({
                //             ...that.userinfo
                //         })
                //         // 修改为谷歌认证过
                //         localStorage.setItem('googleVerification', 1)
                //         setTimeout(() => {
                //             if( that.googleType == 1 ){
                //                 that.$go(-4)
                //             } else if ( that.googleType == 0 ){
                //                 that.$go(-3)
                //             } else if ( that.googleType == 2 ){
                //                 that.$go(-2)
                //             }
                //         }, 1200)
                //     }else{
                //         that.showTips(result.message)
                //     }
                //
                //
                // })

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
            },
            goolepd(){
                var that=this;
                axios.get(urlUtil.getApiUrl("api_rootlist") + "/v1/two_auth/auth", {
                    params: {
                        id:localStorage.getItem("googleid"),
                        passwd:this.formData.confirmPwd
                    }
                },).then((res) => {
                    if (res.data){
                        that.showTips("绑定成功")
                        localStorage.setItem('googleVerification', 1)
                        console.log(that.googleType)
                                setTimeout(() => {
                                    if( that.googleType == 1 ){
                                        that.$go(-4)
                                    } else if ( that.googleType == 0 ){
                                        that.$go(-3)
                                    } else if ( that.googleType == 2 ){
                                        that.$go(-2)
                                    }
                                }, 1200)
                    }else {
                        that.showTips("谷歌验证码错误")
                    }
                })
            }
        }

    }
</script>

<style scoped>
    .googleVerification_top{
        background: #fafafa;
        /*padding-top:0.24rem;*/
    }
    .googleVerification_bg{
        background: #E6821E;
        /*background: #203395;*/
        height: 1rem;
    }
    .googleVerification_txt1{
        font-size: 0.3rem;
        color: #fff;
        line-height: 1rem;
        font-weight: bold;
    }
    .googleVerification_list{
        padding: 0.25rem 0.3rem 0.85rem;
    }
    .googleVerification_item{
        position: relative;

    }
    .googleVerification_item div{
        font-size: 0.3rem;
        color:#070707;
        font-weight: bold;
        line-height: 0.9rem;
    }
    .googleVerification_item_txt1{
        position: absolute;
        font-size: 0.26rem;
        color: #333;
        line-height: 0.9rem;
        padding: 0 0.24rem;

    }
    .googleVerification_item+.googleVerification_item{
        margin-top: 0.5rem;
    }

    .button{
        margin-top: 1rem;
        width: 5rem;
        height:.8rem;
        line-height: .8rem;
        background: #E6821E;
    }
</style>
