<template>
  <div id="index">
    <section class="blog-list">
      <div class="blog-item" v-for="blog in blogs" :key="blog.id">
        <router-link :to="`/user/${blog.user.id}`" class="user-info">
          <div class="avatar">
            <img :src="blog.user.avatar" :alt="blog.user.username">
          </div>
          <p>{{blog.user.username}}</p>
        </router-link>
        <router-link :to="`/detail/${blog.id}`" class="blog-info">
          <h3>{{blog.title}}</h3> <span>{{$friendlyDate(blog.createdAt)}}</span>
          <p>{{blog.description}}</p>
        </router-link>
      </div>
    </section>
    <section class="pagination">
      <el-pagination
          layout="prev, pager, next"
          @current-change="onPageChange"
          :current-page="page"
          :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script>

  import blog from '../api/blog.js'

  export default {
    data() {
      return {
        blogs: [],
        total: 0,
        page: 1,
        blog: {}
      }
    },
    created() {
      this.page = parseInt(this.$route.query.page) || 1
      blog.getBlogs({page: this.page, atIndex: true}).then(response => {
        this.blogs = response.data
        this.total = response.total
        this.page = response.page
        this.blog=this.blogs[0]
      })
    },
    methods: {
      onPageChange(newPage) {
        blog.getBlogs({page: newPage, atIndex: true}).then(response => {
          this.blogs = response.data
          this.total = response.total
          this.page = response.page
          this.$router.push({path: '/', query: {page: newPage}})
        })
      }
    },
  }
</script>

<style scoped lang="scss">
  #index {
    .blog-list {
      margin: 0 15%;
      @media(max-width: 576px) {
        margin: 0 20px;
      }
      .blog-item {
        margin: 32px 0;
        border-radius: 10px;
        background: #fff;
        padding: 1em;
        box-shadow: 0 1px 4px #90c2db;
        display: flex;
        overflow: hidden;
        transition: all .2s;
        @media(max-width: 576px) {
          margin: 20px 0;
          padding: .8em;
        }
        &:hover{
          box-shadow: 0 3px 4px #90c2db;
          transform: translateY(-2%);
        }
        .user-info {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 5em;
          flex-shrink: 0;
          @media(max-width: 576px) {
            width: 4em;
          }
          &:hover{
            .avatar{
              box-shadow: 0 2px 4px #333;
              transform: translateY(-2%);
            }
          }
          .avatar {
            width: 4em;
            height: 4em;
            overflow: hidden;
            border-radius: 50%;
            position: relative;
            transition: all .2s;
            @media(max-width: 576px) {
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            max-width: 100%;
          }
        }
        .blog-info{
          display: flex;
          flex-wrap: wrap;
          width: calc(100% - 5em);
          margin-left: 0.5em;
          padding-top: 10px;
          h3 {
            align-self: baseline;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            max-width: calc(100% - 4.5em);
          }
          span {
            align-self: baseline;
            margin-left: .5em;
          }
          p {
            width: 100%;
            word-break: break-all;
          }
        }
        }
    }
    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
