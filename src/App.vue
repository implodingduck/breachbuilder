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
  color: #2c3e50;
}
</style>
