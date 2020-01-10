<template>
  <div id="create">
    <input type="text" v-model="title" placeholder="title"/>
    <input type="textarea" v-model="description" placeholder="description"/>
    <input type="textarea" v-model="content" placeholder="content"/>
    <button @click="onCreate">Create</button>
  </div>
</template>

<script>
  import blog from '../api/blog.js'

export default {
  data(){
    return {
      title: '',
      description: '',
      content: ''
    }
  },
  methods:{
    onCreate(){
      blog.createBlog({title: this.title, content: this.content, description: this.description})
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
