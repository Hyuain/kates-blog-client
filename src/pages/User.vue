<template>
  <div id="user">
    <section class="user-info">
      <div class="avatar">
        <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username">
      </div>
      <h3>{{userInfo.username}}</h3>
    </section>
    <section class="blog-list">
      <div class="blog-item" v-for="blog in blogs" :key="blog.id">
        <div class="date">
          <span class="day">{{parseDate(blog.createdAt).date}}</span>
          <span class="month">{{parseDate(blog.createdAt).year}}.{{parseDate(blog.createdAt).month}}</span>
        </div>
        <router-link :to="`/detail/${blog.id}`" class="blog-info">
          <h3>{{blog.title}}</h3>
          <p>{{blog.description}}</p>
        </router-link>
      </div>
    </section>

    <section class="pagination">
      <el-pagination
          layout="prev, pager, next"
          :current-page="page"
          @current-change="onPageChange"
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
        userInfo: {},
        page: 1,
        total: 0,
        userId: 0,
        date: {}
      }
    },
    created() {
      this.userId = this.$route.params.userId
      this.page = this.$route.query.page || 1
      blog.getBlogs({page: this.page, userId: this.userId})
        .then(response => {
          this.page = response.page
          this.total = response.total
          this.blogs = response.data
          if (response.data.length > 0) {
            this.userInfo = response.data[0].user
          }
        })
    },
    methods: {
      parseDate(dateStr) {
        let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
        return {
          date: dateObj.getDate(),
          month: dateObj.getMonth() + 1,
          year: dateObj.getFullYear()
        }
      },
      onPageChange(newPage) {
        blog.getBlogs({page: newPage, userId: this.userId}).then(response => {
          this.blogs = response.data
          this.page = response.page
          this.total = response.total
          this.$router.push({path: `/user/${this.userId}`, query: {page: newPage}})
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  #user {
    margin: 0 15%;
    @media(max-width: 576px) {
      margin: 0 20px;
    }
    border-radius: 10px;
    background: #fff;
    padding: 1em;
    box-shadow: 0 1px 4px #90c2db;
    .user-info {
      text-align: center;
      @media (max-width: 576px) {
        border-bottom: 1px solid rgba(201, 201, 201, 0.75);
        padding-bottom: 2em;
      }
      .avatar {
        margin-left: auto;
        margin-right: auto;
        width: 4em;
        height: 4em;
        overflow: hidden;
        border-radius: 50%;
        position: relative;
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
      h3 {
      }
    }
    .blog-list {
      margin: 2em 2em;
      @media (max-width: 576px) {
        margin: 0 1em;
      }
      .blog-item {
        border-radius: 10px;
        background: #fff;
        padding: 2em 1em;
        box-shadow: 0 1px 3px rgba(92, 119, 133, 0.7);
        margin: 32px 0;
        display: flex;
        transition: all .2s;
        position: relative;
        &:hover {
          transform: translateY(-2%);
        }
        @media (max-width: 576px) {
          padding: .5em 0;
          margin: 20px 0;
          box-shadow: none;
          border-radius: 0;
          + .blog-item::before {
            content: '';
            height: 20px;
            width: 100%;
            position: absolute;
            border-top: 1px solid #c2e0ef;
            left: 50%;
            top: -6px;
            transform: translateX(-50%);
          }
          &:hover {
            transform: none;
          }
        }
        .date {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 4em;
          flex-shrink: 0;
          color: #90c2db;
          @media(max-width: 576px) {
            width: 3em;
          }
          .day {
            font-size: 2em;
          }
          .month {
          }
        }
        .blog-info {
          max-width: calc(100% - 5em);
          margin-left: 1em;
          display: flex;
          flex-direction: column;
          justify-content: center;
          @media(max-width: 576px) {
            max-width: calc(100% - 4em);
          }
          h3 {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
