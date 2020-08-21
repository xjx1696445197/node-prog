<template>
    <div class="common_tabbar">
        <router-link replace tag="div" class="common_tabbar_item" to="/asset">
            <div class="common_tabbar_item_icon common_tabbar_item_icon001"></div>
            <p class="common_tabbar_item_txt">{{$t('tabbar.asset')}}</p>
        </router-link>
        <!-- <router-link replace tag="div" class="common_tabbar_item" to="/entrust">
            <div class="common_tabbar_item_icon common_tabbar_item_icon002"></div>
            <p class="common_tabbar_item_txt">委托</p>
        </router-link>
        <router-link replace tag="div" class="common_tabbar_item" to="/vote">
            <div class="common_tabbar_item_icon common_tabbar_item_icon003"></div>
            <p class="common_tabbar_item_txt">投票</p>
        </router-link> -->
<!--        <router-link replace tag="div" class="common_tabbar_item" to="/news">-->
<!--            <div class="common_tabbar_item_icon common_tabbar_item_icon004"></div>-->
<!--            <p class="common_tabbar_item_txt">{{$t('tabbar.news')}}</p>-->
<!--        </router-link>-->
        <router-link replace tag="div" class="common_tabbar_item" to="/my">
            <div class="common_tabbar_item_icon common_tabbar_item_icon005"></div>
            <p class="common_tabbar_item_txt">我的</p>
        </router-link>
    </div>
</template>

<script>
    export default {

    }
</script>

<style scoped>


    .common_tabbar{
        height: 1.1rem; box-sizing: border-box;
        background: #fff; border-top: 1px solid #dbdbdb;
        position: fixed;
        bottom: 0; text-align: center;
        left: 0;
        width: 100%;
        display: table; table-layout: fixed;
    }
    .common_tabbar_item{
        padding-top: 0.1rem; padding-bottom: 0.1rem;
        display: table-cell;
    }
    .common_tabbar_item_icon {
        width: 0.6rem;
        height: 0.6rem;
        margin: 0 auto;
    }
    .common_tabbar_item_txt {
        font-size: 0.2rem;
        color: #666;
        line-height: 0.3rem;
        background: none;
    }
    .common_tabbar_item_icon.common_tabbar_item_icon001 {
        background: url('../static/images/newWallet/icon_zc1.png') no-repeat center center / cover;
    }
    .common_tabbar_item_icon.common_tabbar_item_icon002 {
        background: url('../static/images/newWallet/icon_wt1.png') no-repeat center center / cover;
    }
    .common_tabbar_item_icon.common_tabbar_item_icon003 {
        background: url('../static/images/newWallet/icon_tp1.png') no-repeat center center / cover;
    }
    .common_tabbar_item_icon.common_tabbar_item_icon004 {
        background: url('../static/images/icon/index_icon_004.png') no-repeat center center / cover;
    }
    .common_tabbar_item_icon.common_tabbar_item_icon005 {
        background: url('../static/images/newWallet/icon_wd1.png') no-repeat center center / cover;
    }

    .common_tabbar_item.active .common_tabbar_item_txt {
        color: #e4811d;
    }
    .common_tabbar_item.active .common_tabbar_item_icon.common_tabbar_item_icon001 {
        background: url('../static/images/newWallet/icon_zc.png') no-repeat center center / cover;
    }
    .common_tabbar_item.active .common_tabbar_item_icon.common_tabbar_item_icon002 {
        background: url('../static/images/newWallet/icon_wt.png') no-repeat center center / cover;
    }
    .common_tabbar_item.active .common_tabbar_item_icon.common_tabbar_item_icon003 {
        background: url('../static/images/newWallet/icon_tp.png') no-repeat center center / cover;
    }
    .common_tabbar_item.active .common_tabbar_item_icon.common_tabbar_item_icon004 {
        background: url('../static/images/icon/index_icon_active_004.png') no-repeat center center / cover;
    }
    .common_tabbar_item.active .common_tabbar_item_icon.common_tabbar_item_icon005 {
        background: url('../static/images/newWallet/icon_wd.png') no-repeat center center / cover;
    }
</style>
