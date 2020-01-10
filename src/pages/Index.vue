<template>
  <div id="index">
    <section class="blog-list">
      <router-link class="blog-item" v-for="blog in blogs" :key="blog.id" :to="`/detail/${blog.id}`">
        <figure class="avatar">
          <img :src="blog.user.avatar" :alt="blog.user.username" class="avatar">
          <figcaption>{{blog.user.username}}</figcaption>
        </figure>
        <h3>{{blog.title}}</h3> <span>{{$friendlyDate(blog.createdAt)}}</span>
        <p>{{blog.description}}</p>
      </router-link>
    </section>
    <section class="">
      <el-pagination
          layout="prev, pager, next"
          @current-change="onPageChange"
          :total="total">
      </el-pagination>
    </section>
  </div>
</template>

<script>

  import blog from '../api/blog.js'

  export default {
    data(){
      return{
        blogs: [],
        total: 0,
        page: 1
      }
    },
    created() {
      this.page = parseInt(this.$route.query.page) || 1
      blog.getBlogs({page: this.page}).then(response=> {
        this.blogs = response.data
        this.total = response.total
        this.page = response.page
      })
    },
    methods: {
      onPageChange(newPage) {
        blog.getBlogs({page:newPage}).then(response=> {
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
#index{
  .blog-list{
    margin: 2em 10%;
    .blog-item{
      margin: 2em 0;
      figure.avatar{
        display: flex;
        img{
          width: 20px;
        }
        figcaption{

        }
      }
      h3{

      }
      span{

      }
      p{

      }
    }
  }
}
</style>
