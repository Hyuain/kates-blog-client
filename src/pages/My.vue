<template>
  <div id="my">
    <section class="user-info">
      <img :src="this.userInfo.avatar" :alt="this.userInfo.username" class="avatar">
      <h3>{{this.userInfo.username}}</h3>
    </section>
    <section class="blog-list">
      <div class="blog-item" v-for="blog in blogs" :key="blog.id">
        <div class="date">
          <span class="day">{{parseDate(blog.createdAt).date}}</span>
          <span class="month">{{parseDate(blog.createdAt).month}}</span>
          <span class="year">{{parseDate(blog.createdAt).year}}</span>
        </div>
        <router-link :to="`/detail/${blog.id}`" class="blog-info">
          <h3>{{blog.title}}</h3>
          <p>{{blog.description}}</p>
        </router-link>
        <router-link :to="`/edit/${blog.id}`">编辑</router-link>
        <a href="#" @click.prevent="onDelete(blog.id)">删除</a>
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
  import {mapGetters} from 'vuex'

  export default {
    data() {
      return {
        blogs: [],
        page: 1,
        total: 0,
        date: {}
      }
    },
    computed: {
      ...mapGetters(['userInfo'])
    },
    created() {
      this.page = parseInt(this.$route.query.page) || 1
      blog.getBlogs({page: this.page, userId: this.userInfo.id})
        .then(response => {
          this.page = response.page
          this.total = response.total
          this.blogs = response.data
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
        blog.getBlogs({page: newPage, userId: this.userInfo.id}).then(response => {
          this.blogs = response.data
          this.page = response.page
          this.total = response.total
          this.$router.push({path: 'my', query: {page: newPage}})
        })
      },
      async onDelete(blogId) {
        await this.$confirm('删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await blog.deleteBlog({blogId})
        this.$message.success('删除成功！')
        this.blogs = this.blogs.filter(blog => blog.id !== blogId)
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
