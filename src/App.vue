<template>
  <div id="app">
    <Header id="header"></Header>
    <main id="main">
      <router-view/>
    </main>
    <Footer id="footer"></Footer>
  </div>
</template>

<script>
  import Header from "./components/Header"
  import Footer from "./components/Footer"

  export default {
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
</script>

<style lang="scss">
  @import "assets/reset";
  #app {
    display: flex;
    flex-direction: column;
    background: #c1dfee;
    #header {
    }
    #main {
      flex-grow: 1;
      background: #c1dfee;
    }
    #footer {
      min-height: 5em;
      background: #c1dfee;
    }
  }
</style>
