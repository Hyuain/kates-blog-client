<template>
  <div id="login">
    <div><input type="username" v-model="username" placeholder="用户名"></div>
    <div><input type="password" v-model="password" placeholder="密码" @keyup.enter="onLogin"></div>
    <el-button @click="onLogin">立即登录</el-button>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      ...mapActions(['login']),
      onLogin() {
        this.login({username: this.username, password: this.password})
          .then(() => {
            this.$router.push({path: this.$route.query.redirect || '/'})
          })
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
