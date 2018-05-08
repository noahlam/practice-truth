<template>
    <div id="app">
        <coupon :config="couponConfig">
            <div class="couponContent">我是卡券内容哈哈哈</div>
        </coupon>
    </div>
</template>

<script>
    import coupon from './coupon'
    export default {
        components: {coupon},
        name: 'App',
        data() {
            return {
              couponConfig: {
                width:200,
                height: 300

              }
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>


<style scoped>
    #app {
        padding: 50px;
    }

    .couponContent {
        width: 200px;
        height: 300px;
        color: #aa496f;
        padding: 20px;
        box-sizing: border-box;
        text-align: center;
    }
</style>
