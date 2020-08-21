<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">关于我们</p>
        </div>
        <div class="wrapper">
            <div class="content">
                <div class="aboutUs_top">
                    <div class="aboutUs_logo"></div>
                    <p class="aboutUs_txt1"></p>
                </div>

                <div class="aboutUs_lists">
                    <div class="LIST ARROW LAST_NO_BORDER">
                        <div class="ITEM" @click="go" data-path="/userAgreements">
                            <p class="ITEM_TXT">{{$t('aboutUs.aboutUs_userProtocol')}}</p>
                        </div>
                        <div class="ITEM" @click="go" data-path="/privacyAgreement">
                            <p class="ITEM_TXT">{{$t('aboutUs.aboutUs_policy')}}</p>
                        </div>
<!--                        <div class="ITEM" @click="go" data-path="/updatelog">-->
<!--                            <p class="ITEM_TXT">版本日志</p>-->
<!--                        </div>-->
                        <div class="ITEM">
                            <p class="ITEM_TXT">当前版本</p>
                            <p class="ITEM_TXTs">{{version}}</p>
                        </div>
                    </div>

                    <!--<div class="LIST">-->
                        <!--<div class="ITEM">-->
                            <!--<p class="ITEM_TXT">{{$t('aboutUs.aboutUs_officialWebsite')}}</p>-->
                            <!--<p class="ITEM_TXT">http://www.halle.io</p>-->
                        <!--</div>-->
                    <!--</div>-->
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import { version } from "@/config";

    export default {
        name: "AboutUs",
        data(){
            return {
                version
            }
        },
        methods: {
            go(e){
                const {
                    path
                } = e.currentTarget.dataset

                this.$push({ path })
            }
        }
    }
</script>

<style scoped>
    .content{
        padding-top: .24rem;
    }
    .aboutUs_top{
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: .5rem 0;
    }
    .aboutUs_logo{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: .35rem;
        background: url("../static/images/newWallet/logo.png") no-repeat center center / cover;
    }
    .aboutUs_txt1{
        width: 1.8rem;
        height: 1.8rem;
        border-radius: .35rem;
        background: url("../static/images/newWallet/logotest.png") no-repeat center center / cover;
        background-size:100%;
    }
    .aboutUs_txt2{
        font-size: .26rem;
        color: #333;
        line-height: .45rem;
        margin-top: 0.1rem;
    }
    .aboutUs_lists{
        padding: 0 .3rem;
    }
    .ITEM{
        justify-content: space-between;
        border-bottom: 1px solid #EEEEEE;

    }
    .LIST+.LIST{
        margin-top: 0.35rem;
    }
    .LIST.LAST_NO_BORDER .ITEM:last-child {
        border-bottom: 1px solid #EEEEEE;
    }
    .LIST.ARROW .ITEM:last-child:after{
      display: none;
    }
    .LIST.ARROW .ITEM:last-child{
        padding-right: 0;
    }
</style>
