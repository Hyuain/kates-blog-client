<template>
  <div id="detail">
    <section class="title">
      <router-link :to="`/user/${userInfo.id}`" class="user-info">
        <div class="avatar">
          <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username">
        </div>
        <p>{{userInfo.username}}</p>
      </router-link>
      <div class="blog-info">
        <h1>{{title}}</h1>
        <p>
          发布于 {{$friendlyDate(createdAt)}}
        </p>
      </div>
    </section>
    <article class="article" v-html="htmlContent">
    </article>
  </div>
</template>

<script>
  import blog from '../api/blog.js'
  import marked from 'marked'

  export default {
    data() {
      return {
        title: '',
        rawContent: '',
        userInfo: {},
        createdAt: '',
        blogId: 0
      }
    },
    computed: {
      htmlContent() {
        return marked(this.rawContent)
      }
    },
    created() {
      this.blogId = this.$route.params.blogId
      blog.getDetail({blogId: this.blogId}).then(response => {
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
  #detail {
    margin: 0 15%;
    @media(max-width: 567px) {
      margin: 0 20px;
    }
    border-radius: 10px;
    background: #fff;
    padding: 2.5em;
    @media (max-width: 576px) {
      padding: 1.5em;
    }
    box-shadow: 0 1px 4px #90c2db;
    .title {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding-bottom: 2em;
      border-bottom: 1px solid rgba(144, 194, 219, 0.71);
      @media (max-width: 576px) {
        flex-direction: column;
      }
      .user-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 5em;
        flex-shrink: 0;
        .avatar {
          width: 4em;
          height: 4em;
          overflow: hidden;
          border-radius: 50%;
          position: relative;
          transition: all .2s;
          @media(max-width: 567px) {
            width: 3.5em;
            height: 3.5em;
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
        p {
        }
      }
      .blog-info {
        margin-left: 2em;
        @media (max-width: 576px) {
          margin-left: 0;
          text-align: center;
        }
        h1 {
          @media (max-width: 576px) {
            margin-top: .5em;
          }
        }
        p {
          margin-top: .2em;
          @media (max-width: 576px) {
            margin-top: 0;
          }
        }
      }

    }
    article.article {
      margin-top: 32px;
      margin-left: 8px;
      margin-right: 8px;
    }
  }

</style>
