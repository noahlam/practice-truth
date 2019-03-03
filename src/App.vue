<template>
  <div id="app">
    <!--<v-coupon :config="couponConfig">-->
      <!--<div class="couponContent">我是卡券内容哈哈哈</div>-->
    <!--</v-coupon>-->
    <WhiteBoard/>
  </div>
</template>

<script>
  import WhiteBoard from './white-board'
  export default {
    components: {WhiteBoard},
    name: 'App',
    data() {
      return {
        couponConfig: {
          width: 200,
          height: 300,
          background: '#f5f5f5'

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
