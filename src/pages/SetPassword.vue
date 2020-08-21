<template>
    <div class="slider-box" style="margin-top: 150px">
            <div>
                <vue-slider ref="slider3" v-bind="demo.demo8"  @change="aler(demo.demo8.value)" v-model="demo.demo8.value">
                    <template slot="label" slot-scope="{ label, active }">
            <span :class="['custom-label', { active }]" v-if="label % 10 === 0">
              {{ label }}
            </span>
                    </template>
                </vue-slider>
<!--                <div class="btn-group">-->
<!--                    <button @click="setValue('demo8', [100, 200])">set value = [100, 200]</button>-->
<!--                    <button @click="setIndex('slider3', 250)">set index = 250</button>-->
<!--                    <button @click="getValue('slider3')">getValue()</button>-->
<!--                    <button @click="getIndex('slider3')">getIndex()</button>-->
<!--                </div>-->
            </div>
            <div>
            </div>
    </div>
</template>
<script>
    import vueSlider from 'vue-slider-component';
    import 'vue-slider-component/theme/antd.css'
    export default {
        components: {
            vueSlider
        },
        data () {
            return {
                demo: {
                    demo3: {
                        value: [0, 0],
                        width: '100%',
                        height: 8,
                        dotSize: 16,
                        min: 0,
                        max: 500,
                        disabled: false,
                        show: true,
                        useKeyboard: true,
                        tooltip: 'always',
                        tooltipDir: [
                            "bottom",
                            "top"
                        ],
                        formatter: '¥{value}',
                        enableCross: false,
                        mergeFormatter: '¥{value1} ~ ¥{value2}',
                        bgStyle: {
                            backgroundColor: '#fff',
                            boxShadow: 'inset 0.5px 0.5px 3px 1px rgba(0,0,56,.36)'
                        },
                        tooltipStyle: {
                            backgroundColor: '#666',
                            borderColor: '#666'
                        },
                        processStyle: {
                            backgroundColor: '#999'
                        },
                        piecewiseLabel: true,
                        width: "100%",
                        show: true
                    },
                    demo8: {
                        width: '100%',
                        show: true,
                        value: [0],
                        min: 0,
                        max: 100,
                        piecewiseLabel: true,
                        tooltip: 'always',
                        tooltipDir: [
                            "bottom",
                            "top"
                        ]
                    }
                },
                diy_tooltip: '',
                diy_label: ''
            }
        },
        methods: {
            format (value) {

                return value === null ? 'null' : (typeof value === 'string' ? `"${value}"` : value)
            },
            // 有时候在tab 下面引用 会有个坑，滚动条不能动，这时候就需要在created 里面跑下面这个方法
            refreshSlider (val) {
                this.$nextTick(() => {
                    this.$refs.slider3.refresh()
                })
            },
            aler(i){
               console.log(i)
            },
            // 下面 的方法都不是必须的
            setDisabled (name) {
                let obj = this.demo[name]
                obj.disabled = !obj.disabled
            },
            setTooltip (name) {

                let obj = this.demo[name]
                obj.tooltip = obj.tooltip === 'hover' ? 'always' : 'hover'
            },
            setValue (name, num) {

                let obj = this.demo[name]
                obj.value = num
            },
            setIndex (name, num) {

                let slider = this.$refs[name]
                slider.setIndex(num)
            },
            getValue (name) {

                let slider = this.$refs[name]
                alert(slider.getValue())
            },
            getIndex (name) {

                let slider = this.$refs[name]
                alert(slider.getIndex())
            },
            dragStart () {

                this.demo.demo5.speed = 0
            },
            dragEnd () {

                this.demo.demo5.speed = 0.5
            },
            cb (val) {

                console.log(val)
            }
        },
    }
</script>

<style>
    .slider-box {
        width: 4rem;
        margin: 150px auto;
    }
    .custom-label {
        position: absolute;
        bottom: 100%;
        left: 0;
        transform: translate(-50%, -12px);
        margin-left: 3px;
    }
    .custom-label::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 5px);
        width: 1px;
        height: 5px;
        background-color: #000;
    }

    .custom-label.active {
        color: #222!important;
        font-weight: bold;
    }
    .custom-label.active::after {
        background-color: #222!important;
        width: 2px;
    }
</style>
