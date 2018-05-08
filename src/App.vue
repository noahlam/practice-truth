<template>
  <div id="app">
    <img :src="img" alt="">
    <input type="button" @click="getCode" value="获取验证码">
    <br /><br /><br />
    <input type="text"  v-model="code">
    <input type="button" @click="deCode" value="验证"><br />
    <hr>
    用户名: <input type="text"  v-model="uid"><br />
    密  码: <input type="text"  v-model="pwd"><br />
    <input type="button" @click="userAdd" value="用户注册">
    <hr>
    用户名: <input type="text"  v-model="uid"><br />
    密  码: <input type="text"  v-model="pwd"><br />
    <input type="button" @click="userLogin" value="用户登录">
    <br /><br /><br />
  </div>
</template>

<script>
  import axios from 'axios'
  import fetch from 'isomorphic-fetch';
  import miment from 'miment'

  export default {
    name: 'App',
    data () {
      return {
        img:'',
        id:'',
        code:'',
        title: 'nothing',
        // serverPath: 'http://127.0.0.1:8886/',
        serverPath: '/',
        // serverPath: 'http://baidu.com/'
        uid:'',
        pwd:''
      }
    },
    components: {},
    methods: {
      post (url, data = {}) {
        return new Promise((resolve, reject) => {
          axios({
            method: 'post',
            url: this.serverPath + url,
            data: data,
            withCredentials: true, // default
          }).then((res) => {
            resolve(res)
          })
        })
      },
      async getCode(){
        let res = await this.post('code')
        this.img =  res.data.base64
        this.id = res.data.id
      },
      async deCode () {
        let body = {
          id:this.id,
          code:this.code,
        }
        let res = await this.post('decode',body)
      },
      async userAdd () {
        let body = {
          name:this.uid,
          age:this.pwd
        }
        let res = await this.post('userAdd',body)
      },
      async userLogin () {
        let body = {
          name:this.uid,
          age:this.pwd
        }
        let res = await this.post('userLogin',body)
      }
    },
    mounted () {
      window.miment = miment
      console.warn(miment().format())
    }
  }
</script>

<style>
  body {
    margin: 0;
    padding: 0;
  }
</style>

<style scoped>
  #app {
    border: 1px solid #f5f5f5;
  }
</style>
