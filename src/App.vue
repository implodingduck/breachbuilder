<template>
  <div id="app">
    <router-view></router-view>
    
    <div class="footer">
      <hr />
      <div>
        <a href="https://www.playbreach.com">Breach</a>
        <a href="https://breach.gamepedia.com">Wiki</a>
        <a href="https://github.com/implodingduck/breachbuilder">Git Repo</a>
      </div>
      <div class="small">A big thank you to QC Games for creating Breach! I also want to thank those who contribute to the wiki, its been an awesome soure of information for this project</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
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
  color: #eee;
  background-color: rgba(27,34,66,1.0);
}
.footer {
  text-align: center;
  color: #B3B4B7;
}
.footer hr {
  border-color: #B3B4B7;
  width: 90%;
}
.footer div {
  margin: 1em 0;
}
.footer a {
  margin: 1em;
  color: #B3B4B7;
}

.footer a:visited {
  color: #B3B4B7;
}
.footer a:hover, .footer a:focus  {
  color: #eee;
  text-shadow: 0 0 0.3em rgba(1,130,240,0.75), 0 0 0.5em #0182f0;
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
.small {
  font-size: .8em;
}
select {
  background-color: #ffffff;
}
fieldset .ui.fluid.search.selection.dropdown {
    background-color: #ffffff;
    width: 80%;
    float: left;
    min-height: 1em;
    margin: .25em;
    padding: .25em;
}
#app fieldset .dropdown.icon {
  top:  4px;
}
#app fieldset input.search {
  padding: .25em;
}

</style>
