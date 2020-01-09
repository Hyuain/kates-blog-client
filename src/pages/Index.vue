<template>
  <div id="index">
    首页
    <el-button @click="onClick">哈哈</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(){
      this.$message.error('错啦')
    }
  }
}
</script>

<style scoped lang="scss">

</style>
