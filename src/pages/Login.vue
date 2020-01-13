<template>
  <div id="login">
    <div class="username form-item">
      <label for="username">用户名</label>
      <input type="username" v-model="username" id="username">
    </div>
    <div class="password form-item">
      <label for="password">密码</label>
      <input type="password" v-model="password" @keyup.enter="onLogin" id="password">
    </div>
    <el-button @click="onLogin" type="primary" round>立即登录</el-button>
    <p>还没有注册？<router-link to="/register">点这里注册一下吧</router-link></p>
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
  #login{
    margin: 2em auto;
    width: 32em;
    max-width: 90%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 4px #90c2db;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    .form-item{
      margin: 0 auto;
      width: 60%;
      @media (max-width: 576px) {
        width: 80%;
      }
      label{
        color: #606266;
        position: relative;
        top: -5px;
        left: 5px;
      }
      input{
        background-color: #fff;
        border-radius: 20px;
        border: 1px solid #dcdfe6;
        color: #606266;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        transition: border-color .2s cubic-bezier(.645,.045,.355,1);
        width: 100%;
        &:focus {
          outline: none;
          border-color: #409eff;
        }
      }
    }
    .username{
      margin-top: 4em;
    }
    .password{
      margin-top: 2em;
    }
    button{
      width: 8em;
      margin: 0 auto;
      margin-top: 3em;
      margin-bottom: .5em;
    }
    p{
      margin: 0 auto;
      font-size: .8em;
      color: #909399;
      margin-bottom: 3em;
      a{
        color: #90c2db ;
      }
    }
  }
</style>
