<template>
  <div id="register">
    <div><input type="username" v-model="username" placeholder="用户名"></div>
    <div><input type="password" v-model="password" placeholder="密码" @keyup.enter="onRegister"></div>
    <el-button @click="onRegister">立即注册</el-button>
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
      ...mapActions(['register']),
      onRegister() {
        this.register({username: this.username, password: this.password})
          .then(() => {
            this.$router.push({path: '/'})
          })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
