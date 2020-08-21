<template>
    <div class="page">
        <div class="HEADER">
            <div class="product_tabbar">
                <router-link replace tag="div" class="product_tabbar_item" to="/product/lockedPosition">{{$t('product.hale_Licking')}}</router-link>
                <router-link replace tag="div" class="product_tabbar_item" to="/product/group">{{$t('product.hale_Community')}}</router-link>
                <router-link replace tag="div" class="product_tabbar_item" to="/product/calculatePower">{{$t('product.hale_calculationPower')}}</router-link>
            </div>
        </div>
        <div class="wrapper">
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Product',
    }
</script>

<style scoped>
    .product_tabbar{
        display: flex;
        justify-content: center;
        height: 100%;
    }
    .product_tabbar_item{
        font-size: .4rem;
        color: #fff;
        line-height: .88rem;
        padding: 0 .35rem;
        position: relative;
    }
    .product_tabbar_item:after{
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        content: '';
        height: 0.04rem;
        background: #fff;
        -webkit-border-radius: 50rem;
        -moz-border-radius: 50rem;
        border-radius: 50rem;
        display: none;
    }
    .product_tabbar_item+.product_tabbar_item{
        margin-left: .45rem;
    }
    .product_tabbar_item.active{
        font-weight: bold;
    }
    .product_tabbar_item.active:after{
        display: block;
    }
    .content{
        height: 100%;
        position: relative;
    }
</style>
