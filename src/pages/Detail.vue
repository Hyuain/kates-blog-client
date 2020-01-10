<template>
  <div id="detail">
    <section class="user-info">
      <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username" class="avatar">
      <h3>{{title}}</h3>
      <p>
        <router-link :to="`/user/${userInfo.id}`">{{userInfo.username}}</router-link>
        发布于{{$friendlyDate(createdAt)}}
      </p>
    </section>
    <article class="article" v-html="htmlContent">
    </article>
  </div>
</template>

<script>
  import blog from '../api/blog.js'
  import marked from 'marked'
  export default {
    data(){
      return {
        title: '',
        rawContent: '',
        userInfo: {},
        createdAt:''
      }
    },
    computed: {
      htmlContent() {
        return marked(this.rawContent)
      }
    },
    created() {
      const blogId = this.$route.params.blogId
      blog.getDetail({blogId}).then(response => {
        this.title = response.data.title
        this.rawContent = response.data.content
        this.createdAt = response.data.createdAt
        this.userInfo = response.data.user
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../assets/article";
  #detail{
    margin: 20px;
    article.article {
      margin: 20px;
    }
  }

</style>
