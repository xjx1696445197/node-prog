<template>
    <div class="page">
        <div class="wrapper">
            <div class="logo mauto"></div>
            <div class="logotest mauto"></div>
            <div class="btns">
                <div class="btn BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter"
                    @click="toCreateWallet"
                >创建钱包</div>
                <div class="btn BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter"
                    @click="toImportWallet"
                >导入钱包</div>
            </div>
            <div class="version tcenter">版本：1.0.0</div>
        </div>
    </div>
</template>


<script>

    export default {
        name: "WalletIndex",
        data(){
            return {

            }
        },
        mounted(){

        },
        computed: {

        },
        methods: {

        //    跳转到创建钱包页面
            toCreateWallet(){
                this.$push({
                    path: '/walletCreate'
                })
            },
        //    跳转到导入钱包页面
            toImportWallet(){
                this.$push({
                    path: '/walletImport'
                })
            }
        }
    }
</script>

<style scoped>
.logotest{
            width: 1.8rem;
        height: 1.8rem;
        border-radius: .35rem;
        background: url("../static/images/newWallet/logotest.png") no-repeat center center / cover;
        background-size:100%;   
}
    .logo{
        width: 2.2rem;
        height: 2.2rem;
              background: url("../static/images/newWallet/logo.png") no-repeat center center / cover;
        border-radius: 0.4rem;
        margin-top: 1.1rem;
    }
    .btns{
        margin-top: 1rem;
    }
    .btn{
        width: 5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        font-size: 0.3rem;
        line-height: 0.8rem;
        color: #fff;
    }
    .btn+.btn{
        margin-top: 0.76rem;
    }
    .version{
        position: fixed;
        left: 0;
        bottom: 0.4rem;
        font-size: 0.24rem;
        line-height: 0.4rem;
        color: #070707;
        width: 100%;
    }

</style>




