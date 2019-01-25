<template>
  <div class="hello">
    <h1>Breach Builder</h1>
    <div style="display: none;">{{schoolList}}</div>
    <div>
      <select v-model="selectedClass">
        <optgroup v-for="(classList, school) in schoolList" :label="formatKey(school)" :key="classList">
          <option v-for="c in classList" :value="c" :key="c">{{formatKey(c)}}</option>
        </optgroup>
      </select>
    </div>
    <h2>{{formatKey(selectedClass)}}</h2>
    <Hotbar :defaultAbilities="defaultAbilities(selectedClass)"></Hotbar>
  </div>
</template>

<script>
import axios from 'axios'
import Hotbar from './Hotbar.vue'

export default {
  name: 'Builder',
  props: {
  },
  data () {
    return { 
      selectedClass: 'arcane_mender',
      classes: {},
      talents: {},
      gems: {}
    }
  },
  components: {
    Hotbar
  },
  created () {
    let $vm = this;
    axios.get('/data.json').then((result) => {
      $vm.classes = result.data.classes;
      $vm.gems = result.data.gems;
      $vm.talents = result.data.talents;
    });
  },
  computed: {
    schoolList: function() {
      let retVal = {};
      for(let schoolKey of Object.keys(this.classes)){
        let school = this.classes[schoolKey];
        retVal[schoolKey] = Object.keys(school);
      }
      return retVal;
    }
  },
  methods: {
    formatKey: function(key){
      let f = key.split('_');
      f = f.map( x => x.charAt(0).toUpperCase() + x.slice(1) );
      return f.join(' ');
    },
    defaultAbilities: function(theClass) {
      for(let schoolName of Object.keys(this.classes)){
        let school = this.classes[schoolName];
        for(let c of Object.keys(school)){
          if ( c == theClass ){
            return school[c];
          }
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
