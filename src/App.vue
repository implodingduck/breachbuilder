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
  color: #B3B4B7;
  background-color: rgba(27,34,66,0.9);
  display: block;
  padding: 1em;
}
body {
  margin: 0;
  padding: 0;
}
</style>
