<template>
  <div id="user">
    <section class="user-info">
      <img :src="userInfo.avatar" :alt="userInfo.username" :title="userInfo.username">
      <h3>{{userInfo.username}}</h3>
    </section>
    <section class="blog-list">
      <div class="blog-item" v-for="blog in blogs" :key="blog.id">
        <div class="date" >
          <span class="day">{{parseDate(blog.createdAt).date}}</span>
          <span class="month">{{parseDate(blog.createdAt).month}}</span>
          <span class="year">{{parseDate(blog.createdAt).year}}</span>
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
      onPageChange(newPage){
        blog.getBlogs({page:newPage, userId:this.userId}).then(response => {
          this.blogs =response.data
          this.page = response.page
          this.total = response.total
          this.$router.push({path: `/user/${this.userId}`, query: {page: newPage}})
        })
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
