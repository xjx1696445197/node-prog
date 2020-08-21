<template>
    <div class="page">
        <div class="HEADER">
            <p class="HEADER_TITLE">{{$t('news.news_title')}}</p>
        </div>

        <div class="wrapper">
            <div class="top">
                <div class="carousel">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="(item, index) in carousel" :key="item.id">
                                <div
                                        class="carousel_item"
                                        :style="{
                                            'backgroundImage': `url(${sourceUrl + item.picture})`,
                                            'backgroundRepeat': 'no-repeat',
                                            'backgroundSize': 'cover',
                                            'backgroundPosition': 'center'
                                        }"
                                        :data-id="item.id"
                                        @click="toDetail"
                                >
                                </div>
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>

                <div class="recommend">
                    <div class="title">
                        <p class="title_txt">{{$t('news.news_recommend')}}</p>
                    </div>

                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide"
                                 v-for="(item, index) in recommend"
                                 :key="item.id"
                                 :data-id="item.id"
                                 @click="toDetail"
                            >
                                <div
                                        class="recommend_item"
                                        :style="{
                                            'backgroundImage': `url(${sourceUrl + item.picture})`,
                                            'backgroundRepeat': 'no-repeat',
                                            'backgroundSize': 'cover',
                                            'backgroundPosition': 'center'
                                        }"

                                >
                                    <p class="recommend_item_txt thide" v-text="item.title"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="sub">
                <div class="news">
                    <div class="title">
                        <p class="title_txt">{{$t('news.news_journalism')}}</p>
                        <p class="more" @click="more">{{$t('news.news_more')}}</p>
                    </div>

                    <div class="news_pos">
                        <div class="news_list">
                            <div
                                class="news_item"
                                v-for="(item, index) in news"
                                :key="item.id"
                                :data-id="item.id"
                                @click="toDetail"
                            >
                                <div
                                    class="news_item_pic"
                                    :style="{
                                        'backgroundImage': `url(${sourceUrl + item.picture})`,
                                        'backgruondRepeat': 'no-repeat',
                                        'backgroundPosition': 'center',
                                        'backgroundSize': 'cover'
                                    }"

                                ></div>
                                <div class="news_item_main">
                                    <p class="news_item_txt1 thides thides2" v-text="item.title"></p>
                                    <p class="news_item_txt2" v-text="">{{item.publishTime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
    import 'static/swiper/swiper.min.js'
    import 'static/swiper/swiper.min.css'

    import {
        sourceUrl
    } from '@/config'

    export default {
        name: "News",
        data(){
            return {
                carousel: [],
                recommend: [],
                news: [],
                sourceUrl,
                carouselSwiper: null,
                recommendSwiper: null
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            // 初始化
            init(){
                this.getCarousel()
                this.getRecommend()
                this.getNews()

                this.initCarouselSwiper()
                this.initRecommendSwiper()
            },
            // 初始化顶部轮播
            initCarouselSwiper(){
                this.carouselSwiper = new Swiper('.carousel .swiper-container', {
                    loop: true,
                    spaceBetween: 20,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.carousel .swiper-pagination',
                        clickable: true
                    }
                })
            },
            // 初始化推荐轮播
            initRecommendSwiper(){
                this.recommendSwiper = new Swiper('.recommend .swiper-container', {
                    spaceBetween: 15,
                    slidesPerView: 'auto'
                })
            },
            // 获取轮播数据
            getCarousel(){
                this.$http.get('js/consultationAdministrationApp/findConsultationByConsultationId', {
                    classificationId: '1160013920566407168'
                }).then((res) => {
                    const {
                        result,
                        success
                    } = res

                    if( success ){
                        this.carousel = result
                        setTimeout(() => {
                            this.carouselSwiper && this.carouselSwiper.updateSlides()
                        }, 30)
                    }
                })


            },
            // 获取推荐轮播数据
            getRecommend(){
                this.$http.get('js/consultationAdministrationApp/findConsultationByConsultationId', {
                    classificationId: '1160014073201324032'
                }).then((res) =>{
                    const {
                        result,
                        success
                    } = res

                    if( success ){
                        this.recommend = result
                        setTimeout(() => {
                            this.recommendSwiper && this.recommendSwiper.updateSlides()
                        }, 30)
                    }
                })
            },
            // 获取新闻数据
            getNews(){
                this.$http.get('js/consultationAdministrationApp/findConsultationByConsultationId', {
                    classificationId: '1160013950140444672'
                }).then((res) =>{
                    const {
                        result,
                        success
                    } = res

                    if( success ){
                        this.news = result
                    }
                })
            },
            // 去详情
            toDetail(e){
                const { id } = e.currentTarget.dataset

                this.$push({
                    path: '/NewsDetail',
                    query: {
                        id
                    }
                })
            },
            // 更多
            more(){
                this.$push({
                    path: '/NewsList'
                })
            }
        }
    }
</script>

<style>
    .carousel .swiper-pagination .swiper-pagination-bullet {
        width: 0.1rem;
        height: 0.1rem;
        border-radius: 100%;
        background: #fff;
        opacity: 1;
    }
    .carousel .swiper-pagination .swiper-pagination-bullet.swiper-pagination-bullet-active{
        background: #eda22c!important;
    }
    .recommend .swiper-slide{
        width: auto;
    }
</style>
<style scoped>
    .page{
        background: #f3f3f3;
    }
    .wrapper{
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    .title{
        padding: 0 .3rem;
        display: flex;
        justify-content: space-between;
    }
    .title_txt{
        font-size: .3rem;
        color: #333;
        line-height: .8rem;
        font-weight: bold;
    }
    .more{
        font-size: .3rem;
        color: #333;
        line-height: .8rem;
    }

    .carousel{
        padding: .24rem 0;
    }
    .carousel .swiper-container{
        padding: 0 .3rem;
    }
    .carousel .swiper-pagination{
        bottom: 10px;
        font-size: 0;
    }


    .carousel_item{
        height: 3.27rem;
        -webkit-border-radius: 0.2rem;
        -moz-border-radius: 0.2rem;
        border-radius: 0.2rem;
    }

    .recommend .swiper-container{
        padding:0 0.3rem;
    }

    .recommend_item{
        width: 3rem;
        height: 2.25rem;
        position: relative;
        -webkit-border-radius: 0.1rem;
        -moz-border-radius: 0.1rem;
        border-radius: 0.1rem;
        overflow: hidden;
    }
    .recommend_item_txt{
        font-size: .2rem;
        color: #fff;
        line-height: .5rem;
        position: absolute;
        left: 0;
        bottom: 0;
        background: #666;
        width: 100%;
        padding:0 .15rem;
        box-sizing: border-box;
    }

    .sub{
        flex: 1;
        position: relative;
    }
    .news{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .news_pos{
        flex: 1;
        position: relative;
    }
    .news_list{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 0.3rem 0.3rem;
        overflow-x: hidden;
        overflow-y: auto;
        overflow-scrolling: touch;
    }
    .news_item{
        -webkit-border-radius: 0.2rem;
        -moz-border-radius: 0.2rem;
        border-radius: 0.2rem;
        overflow: hidden;
        box-shadow: 0 0.05rem 0.15rem rgba(102,102,102,0.1);
        background: #FFF;
        display: flex;
    }
    .news_item+.news_item{
        margin-top: 0.24rem;
    }
    .news_item_pic{
        width: 2rem;
        height: 1.5rem;
    }
    .news_item_main{
        flex: 1;
        padding: 0.17rem 0.13rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .news_item_txt1{
        font-size: 0.26rem;
        color: #333;
        line-height: 0.35rem;
        width: 5rem;
    }
    .news_item_txt2{
        font-size: 0.2rem;
        color: #666;
        line-height: 0.3rem;
        text-align: right;
    }


</style>
