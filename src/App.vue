<template>
  <div id="app">
    <Builder/>
    <div class="footer">
      <hr />
      <a href="https://www.playbreach.com">Breach</a>
      <a href="https://breach.gamepedia.com">Wiki</a>
      <a href="https://github.com/implodingduck/breachbuilder">Git Repo</a>
    </div>
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
.footer {
  text-align: center;
}
.footer hr {
  border-color: #B3B4B7;
  width: 90%;
}
.footer a {
  margin: 1em;
  color: #B3B4B7;
  text-decoration: none;
}

.footer a:visited {
  color: #B3B4B7;
}
.footer a:hover, .footer a:focus  {
  text-decoration: underline;
}
legend {
  color: #eee;
  text-shadow: 0 0 0.3em rgba(1,130,240,0.75), 0 0 0.5em #0182f0;
  font-variant: small-caps;
  font-weight: bold;
  font-size: 1em;
  padding-bottom: 10px;
  border-bottom: 0;
}
</style>
