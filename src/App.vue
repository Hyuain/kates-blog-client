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
  @import "./src/assets/common";
  #app {
    display: flex;
    flex-direction: column;
    #header {
      border: 1px solid red;
    }
    #main {
      flex-grow: 1;
      border: 1px solid red;
    }
    #footer {
      min-height: 5em;
      border: 1px solid red;
    }
  }
</style>
