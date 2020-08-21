<template>
    <div class="page">
        <div class="HEADER">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE">{{$t('market.title')}}</p>
        </div>
        <div class="wrapper">
            <div class="topper">
                <div class="header">
                    <p class="header_txt1">{{$t('market.market_name')}}</p>
                    <p class="header_txt2">{{$t('market.market_newPrice')}}</p>
                    <p class="header_txt3">{{$t('market.market_downUpToday')}}</p>
                </div>
            </div>
            <div class="list">
                <div class="item"
                     v-for="(item, index) in list"
                     :key="index"
                     :class="[itemClass(item.rate)]"
                >
                    <div class="item_pic radius-round"
                        :style="{'background': `url(${sourceUrl + item.currencyImgUrl}) no-repeat center center / cover`}"
                    ></div>
                    <div class="item_content">
                        <p class="item_content_txt1">{{item.currency}}</p>
                        <p class="item_content_txt2">/{{item.postCurrency}}</p>
                    </div>
                    <p class="item_txt1">{{item.price}}</p>
                    <p class="item_txt2">{{ item.rate.indexOf('-') > -1 ? item.rate : `+${item.rate}` }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import { sourceUrl } from '@/config'

    export default {
        name: "Market",
        data(){
            return {
                list: [],
                timer: null,
                sourceUrl
            }
        },
        mounted(){
            this.getList()
            this.timer = setInterval(() => {
                this.getList()
            }, 1500)
        },
        destroyed(){
            clearInterval(this.timer)
            this.timer = null
        },
        methods: {
            // 判断item单项应该添加什么class
            itemClass(value){
                if(value.indexOf('-') > -1){
                    return 'down'
                }else if(value == "0.00%"){
                    return ''
                }else{
                    return 'up'
                }
            },
            // 获取数据
            getList(){
                this.$http.get('js/usersLogin/marketHistory').then((res) => {
                    if( res.success ){
                        this.list = res.result
                        console.log(res.result)
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .topper{
        padding: 0.24rem 0;
    }
    .header{
        box-shadow: 0 0.05rem 0.15rem rgba(102,102,102,0.1);
        background: #fff;
        padding-left: 0.75rem;
        display: flex;
    }
    .header_txt1{
        font-size: 0.26rem;
        color: #333;
        line-height: 0.9rem;
        padding: 0 0.3rem;
    }
    .header_txt2{
        margin-left: 1.7rem;
        font-size: 0.26rem;
        color: #333;
        line-height: 0.9rem;
        padding: 0 0.3rem;
    }
    .header_txt3{
        margin-left: 0.3rem;
        color: #333;
        line-height: 0.9rem;
        padding: 0 0.3rem;
        font-size: 0.26rem;
    }
    .list{
        padding: 0 0.3rem;
    }
    .item{
        height: 1.2rem;
        background: #fff;
        border-radius: 0.24rem;
        margin-top: 0.24rem;
        padding: 0 0.2rem;
        box-shadow: 0 0.05rem 0.15rem rgba(102,102,102,0.1);
        position: relative;
        display: flex;
        align-items: center;
    }
    .item_pic{
        width: 0.44rem;
        height: 0.44rem;
        background: #f3f3f3;
    }
    .item_content{
        display: flex;
        padding: 0 0.1rem;
    }
    .item_content_txt1{
        font-size: 0.3rem;
        color: #333;
        line-height: 0.44rem;
    }
    .item_content_txt2{
        font-size: 0.24rem;
        color: #333;
        line-height: 0.44rem;
    }
    .item_txt1{
        font-size: 0.3rem;
        color: #333;
        position: absolute;
        right: 2.3rem;
    }
    .item_txt2{
        width: 1.5rem;
        height: 0.6rem;
        border-radius: 0.1rem;
        font-size: 0.26rem;
        color: #fff;
        line-height: 0.6rem;
        text-align: center;
        position: absolute;
        right: 0.2rem;
        background: #ccc;
    }
    .item.up .item_txt2{
        background: #21b369;
    }
    .item.down .item_txt2{
        background: #ed472c;
    }
</style>
