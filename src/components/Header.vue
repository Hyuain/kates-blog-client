<template>
  <header v-if="!loginStatus" class="not-logged-in">
    <h1>Kate's Garden</h1>
    <p>立子的后花园</p>
    <div class="buttons">
      <router-link to="/register"><el-button>注册账号</el-button></router-link>
      <router-link to="/login"><el-button>立即登录</el-button></router-link>
    </div>
  </header>
  <header v-else class="logged-in">
    <h1><router-link to="/">Kate's Garden</router-link></h1>
    <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
    <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username" class="avatar">
    <el-button @click="onLogout">注销</el-button>
    <router-link to="/my"><el-button>我的</el-button></router-link>
  </header>
</template>

<script>
  import user from '../api/user'

  import {mapGetters, mapActions} from 'vuex'

  window.user = user

  export default {
    name: "Header",
    computed: {
      ...mapGetters(['userInfo','loginStatus'])
    },
    created() {
      this.checkLoginStatus()
    },
    methods: {
      ...mapActions(['checkLoginStatus', 'logout']),
      onLogout(){
        this.logout().then(()=>{
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>

  #header {
    display: flex;
    align-items: center;
    &.not-logged-in{
      justify-content: center;
      flex-direction: column;
    }
    &.logged-in{
      justify-content: flex-start;
      i {
        margin-left: auto;
      }
      img{
        width: 2em;
      }
    }
  }
</style>