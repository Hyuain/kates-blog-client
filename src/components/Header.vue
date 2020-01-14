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
    <router-link to="/create" class="edit"><i class="el-icon-plus"></i></router-link>
    <el-dropdown class="avatar-dropdown">
      <div class="avatar el-dropdown-link">
        <img :src="userInfo.avatar" :alt="userInfo.avatar">
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <router-link to="/my">
            <span>我的</span>
          </router-link>
        </el-dropdown-item>
        <el-dropdown-item @click.native="onLogout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
    display: flex;
    align-items: center;
    background-image: url("../assets/images/bg-clouds.png");
    background-repeat: repeat-x;
    color: #fff;
    a {
      color: #fff;
    }
    &.not-logged-in {
      padding: 1em;
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
      h1 {
        margin-left: .4em;
        height: 3em;
        line-height: 3em;
        @media(max-width: 567px) {
          font-size: 1.7em;
        }
      }
      .edit {
        margin-left: auto;
        margin-right: .3em;
        height: 3em;
        line-height: 3em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5em;
        @media(max-width: 567px) {
          font-size: 2.2em;
        }
      }
      .avatar-dropdown{
        margin-right: .4em;
        .avatar {
          vertical-align: center;
          width: 3em;
          height: 3em;
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          img {
            width: 110%;
            height: 110%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
        }
      }

    }
  }
</style>