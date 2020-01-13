<template>
  <header v-if="!loginStatus" class="not-logged-in">
    <router-link to="/">
      <h1>Sharing Garden</h1>
      <p>分享你的见解</p>
    </router-link>
    <div class="buttons">
      <router-link to="/register" class="button">
        <el-button round size="medium">注册账号</el-button>
      </router-link>
      <router-link to="/login" class="button">
        <el-button round size="medium">立即登录</el-button>
      </router-link>
    </div>
  </header>
  <header v-else class="logged-in">
    <h1>
      <router-link to="/">Sharing Garden</router-link>
    </h1>
    <router-link to="/create"><i class="edit el-icon-plus"></i></router-link>
    <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username" class="avatar">
    <el-button @click="onLogout">注销</el-button>
    <router-link to="/my">
      <el-button>我的</el-button>
    </router-link>
  </header>
</template>

<script>
  import user from '../api/user'

  import {mapGetters, mapActions} from 'vuex'

  window.user = user

  export default {
    name: "Header",
    computed: {
      ...mapGetters(['userInfo', 'loginStatus'])
    },
    created() {
      this.checkLoginStatus()
    },
    methods: {
      ...mapActions(['checkLoginStatus', 'logout']),
      onLogout() {
        this.logout().then(() => {
          this.$router.push('/')
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @keyframes fullBackgroundAnimation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 100% 0;
    }
  }
  @keyframes halfBackgroundAnimation {
    0% {
      background-position: 0 86%;
    }
    100% {
      background-position: 100% 86%;
    }
  }
  #header {
    padding: 1em;
    display: flex;
    align-items: center;
    background-image: url("../assets/images/bg-clouds.png");
    background-repeat: repeat-x;
    color: #fff;
    a{
      color:#fff;
    }
    &.not-logged-in {
      justify-content: center;
      text-align: center;
      flex-direction: column;
      animation: fullBackgroundAnimation 40s linear infinite;
      h1 {
        margin-bottom: 10px;
        font-size: 3em;
        @media(max-width: 567px) {
          font-size: 2.2em;
        }
      }
      p {
        margin-bottom: 15px;
        font-size: 1.2em;
      }
      .buttons {
        .button {
          margin: 5px;
        }
      }
    }
    &.logged-in {
      justify-content: flex-start;
      animation: halfBackgroundAnimation 40s linear infinite;
      h1{
        margin-top: .2em;
        margin-left: .2em;
        @media(max-width: 567px) {
          font-size: 2em;
        }
      }
      i {
        margin-left: auto;
      }
      img {
        width: 2em;
      }
    }
  }
</style>