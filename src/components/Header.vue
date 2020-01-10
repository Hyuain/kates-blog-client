<template>
  <header v-if="!isLogin" class="not-logged-in">
    <h1>Kate's Garden</h1>
    <p>立子的后花园</p>
    <div class="buttons">
      <el-button>注册账号</el-button>
      <el-button>立即登录</el-button>
    </div>
  </header>
  <header v-else class="logged-in">
    <h1>Kate's Garden</h1>
    <i class="edit el-icon-edit"></i>
    <img src="http://cn.gravatar.com/avatar/1?s=128&d=identicon" alt="" class="avatar">
  </header>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        isLogin: false
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