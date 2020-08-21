<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">版本日志</p>
        </div>
        <div class="wrapper">
            <div>
                <div>
                    v 2.1.9
                </div>
                <div>
                    <span>修改：</span>
                        1、添加了简单的错误控制，2、"查询"按钮键可以通过"回车"实现。
                </div>
                <div>
                    <span>优化：</span>
                        1.添加对天天基金网相应页的超级连接

                </div>
            </div>
            <div>
                <div>
                    v 2.1.9
                </div>
                <div>
                    <span>修改：</span>
                    1、添加了简单的错误控制，2、"查询"按钮键可以通过"回车"实现。
                </div>
                <div>
                    <span>优化：</span>
                    1.添加对天天基金网相应页的超级连接

                </div>
            </div>
            <div>
                <div>
                    v 2.1.9
                </div>
                <div>
                    <span>修改：</span>
                    1、添加了简单的错误控制，2、"查询"按钮键可以通过"回车"实现。
                </div>
                <div>
                    <span>优化：</span>
                    1.添加对天天基金网相应页的超级连接

                </div>
            </div>
            <div>
                <div>
                    v 2.1.9
                </div>
                <div>
                    <span>修改：</span>
                    1、添加了简单的错误控制，2、"查询"按钮键可以通过"回车"实现。
                </div>
                <div>
                    <span>优化：</span>
                    1.添加对天天基金网相应页的超级连接

                </div>
            </div>
            <div>
                <div>
                    v 2.1.9
                </div>
                <div>
                    <span>修改：</span>
                    1、添加了简单的错误控制，2、"查询"按钮键可以通过"回车"实现。
                </div>
                <div>
                    <span>优化：</span>
                    1.添加对天天基金网相应页的超级连接

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Updatelog"
    }
</script>

<style scoped>
    .page{
        overflow: scroll;
    }
.wrapper{
    margin-top: .88rem;
    padding: 0 0.3rem ;
}
.wrapper>div{
    border-bottom: 1px dashed #070707;
    padding-bottom: .3rem;
}
.wrapper>div>div:nth-of-type(1){
    padding-top: .4rem;
    font-weight: bold;
}
.wrapper>div>div:nth-of-type(2){
    margin-top: .3rem;
}
</style>
