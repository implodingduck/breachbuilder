<template>
  <div class="hello">
    <h1>Breach Builder</h1>
    <div>
      <select v-model="selectedHeroId" @change="pushHeroId" >
          <option v-for="hero in heroes" :value="hero.id" :key="hero.id">{{hero.name}}</option>
      </select>
      <pre>{{JSON.stringify(selectedHero, undefined, 2)}}</pre>
      <Hotbar v-if="heroes.length > 0" :defaultAbilities="selectedHero.abilities" :signature="selectedHero.signature"></Hotbar>
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
      selectedHeroId: 1,
      heroes: []
    }
  },
  components: {
    Hotbar
  },
  created () {
    let $vm = this;
    axios.get('/heroes.json').then((result) => {
      $vm.heroes = result.data.sort(function(o1, o2){
        let retVal = 0
        if (o1.name > o2.name) {
          retVal = 1;
        }else if (o1.name < o2.name){
          retVal = -1
        }
        return retVal;
      });
    });
    
  },
  computed: {
    
    selectedHero: function(){
      let selHero = undefined;
      for ( let hero of this.heroes){
        if ( hero.id == this.selectedHeroId){
          selHero = hero;
          break;
        }
      }
      return selHero
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
