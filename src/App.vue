<template>
  <div id="app">
    <Builder/>
  </div>
</template>

<script>
import Builder from './components/Builder.vue'

export default {
  name: 'app',
  components: {
    Builder,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  
  display: block;
  padding: 1em;
  overflow: unset;
}
body {
  margin: 0;
  padding: 0;
  color: #B3B4B7;
  background-color: rgba(27,34,66,1.0);
}
</style>
