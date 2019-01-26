<template>
  <div class="hello">
    <h1>Breach Builder</h1>
    <div style="display: none;">{{schoolList}}</div>
    <div>
      <select v-model="selectedHeroId" @change="pushHeroId" >
        <optgroup v-for="(heroList, school) in schoolList" :label="formatKey(school)" :key="school">
          <option v-for="(hero, heroId) in heroList" :value="heroId" :key="heroId">{{hero.name}}</option>
        </optgroup>
      </select>
      <pre>{{JSON.stringify(selectedHero, undefined, 2)}}</pre>
    </div>
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
      selectedHeroId: '01',
      heroes: {},
      talents: {},
      gems: {}
    }
  },
  components: {
    Hotbar
  },
  created () {
    let $vm = this;
    axios.get('/heroes.json').then((result) => {
      $vm.heroes = result.data;
      $vm.selectedHeroId = window.location.hash.substr(2);
      $vm.pushHeroId()
    });
    window.onpopstate = function(event) {
      $vm.selectedHeroId = event.state.selectedHeroId
    }
  },
  computed: {
    schoolList: function() {
      let unordered = {};
      for(let heroId of Object.keys(this.heroes)){
        let school = this.heroes[heroId].school;
        if ( !unordered.hasOwnProperty(school) ){
          unordered[school] = {}
        }
        unordered[school][heroId] = this.heroes[heroId]
      }
      const retVal = {};
      Object.keys(unordered).sort().forEach(function(key) {
        retVal[key] = unordered[key];
      });
      return retVal
    },
    selectedHero: function(){
      return this.heroes[this.selectedHeroId]
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
    },
    pushHeroId: function(){
      history.pushState({ "selectedHeroId": this.selectedHeroId }, this.heroes[this.selectedHeroId].name, "#/" + this.selectedHeroId);
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
