<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">立即备份</p>
        </div>
        <div class="wrapper">
            <div class="content">
<p>

    立即备份你的钱包

</p>
                <p>


                    我们强烈建议你现在就将助记词准确的抄写在纸上，并安全存放，任何人拥有助记词即可自由支配资产。

                </p>

            </div>
            <div class="btn LONG_WALLET_BTN BUTTON_BGCOLOR BUTTON_SHADOW mauto tcenter" @click="gobackupmnem">立即备份</div>
        </div>
    </div>
</template>


<script>
    import Nlayer from '@/components/Nlayer'
    import { sourceUrl } from '@/config'
    import { mapGetters, mapActions } from 'vuex'

    export default {
        name: "WalletBackup",
        components: {
            Nlayer
        },
        data(){
            return {
                Mnemonic:""
            }
        },
        mounted(){
            this.Mnemonic=this.$route.query.Mnemonics
            console.log(this.Mnemonic)
        },
        computed: {
        },
        methods: {
            ...mapGetters(['mapGetters','mapActions']),
            gobackupmnem(){
                this.$replace({
                    path: '/Backupmnemonics',
                    query: {
                        Mnemonics: this.Mnemonic
                    }
                })
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
</style>
