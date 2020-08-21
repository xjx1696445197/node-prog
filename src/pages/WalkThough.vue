<template>
    <div class="page">
        <div class="walkThough">
            <div class="swiper-container walkThough_swiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide"
                     
                    >
                        <div class="walkThough_btn" @click="toAsset">{{$t('layerdate.layerdate_opening')}}</div>
                    </div>
                </div>
                <div class="walkThough_pagination swiper-pagination" ref="pagination"></div>
            </div>

        </div>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import 'static/swiper/swiper.min.js'
    import 'static/swiper/swiper.min.css'
    import {
        sourceUrl
    } from '@/config'

    export default {
        name: "WalkThough",
        data(){
            return{
                sourceUrl,
                swiper: null,
                // swiperPics: []
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            ...mapMutations({
                'setRouteAction': 'SET_ROUTEACTION'
            }),
            // 去资产页面
            toAsset(){
                if (localStorage.getItem("useragreemeny")==1&&localStorage.getItem("Createdsuccessfully")==1){
                    this.$replace({
                        path: '/asset'
                    })
                }else if (localStorage.getItem("useragreemeny")==1){
                    this.$replace({
                        path: '/walletindex'
                    })
                }else {
                    this.$replace({
                        path: '/useragreement'
                    })
                }

            },
            // 初始化
            init(){
                this.getDetail()

            },
            // 获取轮播数据
            getDetail(){
                this.$http.get('js/startup/list').then((res) => {
                    this.swiperPics = res
                    if( this.swiperPics.length <= 0 ){
                        this.setRouteAction('')
                        this.$router.replace({
                            path: '/asset'
                        })
                        return
                    }
                    setTimeout(() => {
                        this.initSwiper()
                    }, 30)
                })
            },
            // 初始化轮播
            initSwiper(){
                this.swiper = new Swiper('.walkThough_swiper', {
                    pagination: {
                        el: '.walkThough_swiper .swiper-pagination',
                        clickable: true
                    },
                    on: {
                        init:() => {
                            this.$refs.pagination.style.opacity = 1
                            this.$refs.pagination.style.visibility = 'visible'
                        }
                    },
                    resistanceRatio: 0
                })
            },
        }

    }
</script>

<style scoped>
    .walkThough{
        width: 100%; height: 100%;
        position: relative;
    }
    .walkThough_btn{
        position: absolute;
        left: 50%;
        margin-left: -2.5rem;
        bottom: .85rem;
        background: #f5b90b;
        color: #fff;
        line-height: .7rem;
        font-size: .34rem;
        z-index: 99999;
        border-radius: 50rem;
        width: 5rem;
        transform: translatez(200px);
        text-align: center;
    }
    .walkThough_swiper{
        width: 100%; height: 100%;
    }
    .walkThough_swiper .swiper-slide{
        background: url(../static/images/newWallet/walletbackground.jpg) no-repeat center center / cover;
        position: relative;
        width: 100%; height: 100%; 
    }
    .walkThough_swiper .swiper-pagination{
        font-size: 0; line-height: 0;
        opacity: 0; visibility: hidden;
        transition: all 0.3s ease ;
    }
    .walkThough_swiper >>> .swiper-pagination-bullet{
        width: 0.15rem;
        height: 0.15rem;
        -webkit-border-radius: 50rem;
        -moz-border-radius: 50rem;
        border-radius: 50rem;
        margin: 0 0.07rem;
    }
    .walkThough_swiper >>> .swiper-pagination-bullet.swiper-pagination-bullet-active{
        width: 0.3rem;
        /*border-radius: 100%;*/
        background: #4700e8;
    }

    .walkThough_swiper >>> .swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction {
        bottom: 0.4rem;
        left: 0;
        width: 100%;
    }
</style>
