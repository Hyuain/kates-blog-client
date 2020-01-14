<template>
  <div id="create">
    <div class="title form-item">
      <label for="title">博客标题</label>
      <el-input
          type="text"
          v-model="title"
          id="title">
      </el-input>

    </div>

    <div class="description form-item">
      <label for="description">博客简介 </label>
      <el-input
          type="text"
          v-model="description"
          id="description">
      </el-input>

    </div>

    <div class="content form-item">
      <label for="content"> 博客内容 </label>
      <el-input
          type="textarea"
          :autosize="{ minRows: 10 }"
          v-model="content"
          id="content">
      </el-input>

    </div>

    <div class="switch">
      <span>展示到首页</span>
      <el-switch v-model="atIndex"></el-switch>
    </div>
    <el-button type="primary" round @click.native="onCreate">创建博客</el-button>
  </div>
</template>

<script>
  import blog from '../api/blog.js'

  export default {
    data() {
      return {
        title: '',
        description: '',
        content: '',
        atIndex: false
      }
    },
    methods: {
      onCreate() {
        blog.createBlog({
          title: this.title,
          content: this.content,
          description: this.description,
          atIndex: this.atIndex
        })
          .then(response => {
            this.$message.success(response.msg)
            this.$router.push({path: `/detail/${response.data.id}`})
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  #create{
    margin: 32px 15%;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0 1px 4px #90c2db;
    padding: 4em 0;
    @media(max-width: 576px) {
      margin: 20px;
      padding: 2em 0;

    }
    .form-item{
      position: relative;
      width: 70%;
      left: 50%;
      transform: translateX(-50%);
      @media(max-width: 576px) {
        width: 90%;
      }
      label{
        display: block;
        margin-bottom: .5em;
        margin-left: .5em;
      }
    }
    .title{ label{} input{} }
    .description{margin-top: 2em; label{} input{} }
    .content{margin-top: 2em; label{} input{} }
    .switch{
      text-align: right;
      margin-top: 2em;
      margin-right: 15%;
      @media(max-width: 576px) {
        margin-top: 1.5em;
        margin-right: 5%;
      }
      span{
        margin-right: .5em;
      }
    }
    button{
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 1em;
      width: 15em;
    }
  }
</style>
