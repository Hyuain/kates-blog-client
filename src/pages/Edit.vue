<template>
  <div id="edit">
    <input type="text" v-model="title" placeholder="title"/>
    <input type="textarea" v-model="description" placeholder="description"/>
    <input type="textarea" v-model="content" placeholder="content"/>
    <button @click="onEdit">Submit</button>
  </div>
</template>

<script>
import blog from "../api/blog"

export default {
  data(){
    return {
      blogId: null,
      title: '',
      description: '',
      content: ''
    }
  },
  created() {
    this.blogId = this.$route.params.blogId
    blog.getDetail({blogId: this.blogId}).then(response => {
      this.title = response.data.title
      this.description = response.data.description
      this.content = response.data.content
    })
  },
  methods:{
    onEdit(){
      blog.updateBlog({blogId: this.blogId}, {title: this.title, content: this.content, description: this.description})
        .then(response => {
          this.$message.success(response.msg)
          this.$router.push({path:`/detail/${response.data.id}`})
        })
    }
  }
}
</script>

<style scoped lang="scss">

</style>
