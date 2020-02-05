<template>
  <div id="header">
    <div v-if="!isLoading">
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
            <router-link to="/my">
              <el-dropdown-item>
                <span>我的</span>
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="onLogout">注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </header>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

  export default {
    name: "Header",
    data() {
      return {
        isLoading: true
      }
    },
    computed: {
      ...mapGetters(['userInfo', 'loginStatus'])
    },
    async created() {
      await this.checkLoginStatus()
      this.isLoading = false
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
      background-position: 1000% 0;
    }
  }
  @keyframes halfBackgroundAnimation {
    0% {
      background-position: 0 86%;
    }
    100% {
      background-position: 1000% 86%;
    }
  }
  #header {
    header {
      background-image: url("../assets/images/bg-clouds.png");
      background-repeat: repeat-x;
      background-position: 0 0;
      color: #fff;
      a {
        color: #fff;
      }
    }
    .not-logged-in {
      padding: 1em;
      text-align: center;
      animation: fullBackgroundAnimation 400s linear infinite;
      h1 {
        margin-bottom: 10px;
        font-size: 3em;
        @media(max-width: 576px) {
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
    .logged-in {
      animation: halfBackgroundAnimation 400s linear infinite;
      display: flex;
      align-items: center;
      padding: 0 2em;
      h1 {
        height: 100px;
        line-height: 100px;
        display: inline-block;
        @media(max-width: 576px) {
          font-size: 1.7em;
        }
      }
      .edit {
        margin-left: auto;
        margin-right: .2em;
        height: 100px;
        line-height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5em;
        color: #fff;
        @media(max-width: 576px) {
          font-size: 2.2em;
        }
      }
      .avatar-dropdown {
        .avatar {
          width: 3.2em;
          height: 3.2em;
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          border: 2px solid #fff;
          &:hover {
            cursor: pointer;
          }
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