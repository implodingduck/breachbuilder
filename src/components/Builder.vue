<template>
  <div class="hello">
    <h1>Breach Builder</h1>
    <div>
      
      <fieldset>
        <legend>Class</legend>
        <select v-model="selectedHeroId" @change="setDefaultSelectedSlots" >
            <option v-for="hero in heroes" :value="hero.id" :key="hero.id">{{hero.name}}</option>
        </select>
      </fieldset>
      <pre style="display: none;">{{JSON.stringify(selectedHero, undefined, 2)}}</pre>
      <Hotbar v-if="heroes.length > 0" :selectedSlot1="selectedSlot1" :selectedSlot2="selectedSlot2" :selectedSlot3="selectedSlot3" :selectedSlot4="selectedSlot4" :signature="selectedHero.signature" @slotchange="handleSlotChange"></Hotbar>
      <Talents :selectedHero="selectedHero" :selectedLvl1="selectedLvl1" :selectedLvl2="selectedLvl2" :selectedLvl3="selectedLvl3" :selectedLvl4="selectedLvl4" @talentChange='handleTalentChange'></Talents>
      <Gems :selectedHero="selectedHero" :selectedSapp1="selectedSapp1" :selectedSapp2="selectedSapp2" :selectedRuby1="selectedRuby1" :selectedRuby2="selectedRuby2" :selectedPris1="selectedPris1" :selectedPris2="selectedPris2" @gemChange="handleGemChange" ></Gems> 
    </div>
    <div style="font-family: 'Lucida Console'; margin-top: 2em; display: none;">ID: {{computedId}}</div>
  </div>
</template>

<script>
import axios from 'axios'
import Hotbar from './Hotbar.vue'
import Talents from './Talents.vue'
import Gems from './Gems.vue'

export default {
  name: 'Builder',
  props: {
  },
  data () {
  let routerId = this.$route.params.id
    return { 
      selectedHeroId: this.parseRouterId(routerId, 0, 1),
      selectedSlot1: this.parseRouterId(routerId, 1, 1),
      selectedSlot2: this.parseRouterId(routerId, 2, 2),
      selectedSlot3: this.parseRouterId(routerId, 3, 3),
      selectedSlot4: this.parseRouterId(routerId, 4, 4),
      selectedLvl1: this.parseRouterId(routerId, 5, 1),
      selectedLvl2: this.parseRouterId(routerId, 6, 2),
      selectedLvl3: this.parseRouterId(routerId, 7, 3),
      selectedLvl4: this.parseRouterId(routerId, 8, 24),
      selectedSapp1: this.parseRouterId(routerId, 9, 0),
      selectedSapp2: this.parseRouterId(routerId, 10, 0),
      selectedRuby1: this.parseRouterId(routerId, 11, 0),
      selectedRuby2: this.parseRouterId(routerId, 12, 0),
      selectedPris1: this.parseRouterId(routerId, 13, 0),
      selectedPris2: this.parseRouterId(routerId, 14, 0),
      heroes: [],
    }
  },
  components: {
    Hotbar,
    Talents,
    Gems
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
    
    selectedHero: function() {
      let selHero = { "signature": 0 };
      for ( let hero of this.heroes){
        if ( hero.id == this.selectedHeroId){
          selHero = hero;
          break;
        }
      }
      return selHero
    },
    computedId: function() {
      let retVal = '';
      retVal += this.toBase32(this.selectedHeroId)
      retVal += this.toBase32(this.selectedSlot1)
      retVal += this.toBase32(this.selectedSlot2)
      retVal += this.toBase32(this.selectedSlot3)
      retVal += this.toBase32(this.selectedSlot4)
      retVal += this.toBase32(this.selectedLvl1)
      retVal += this.toBase32(this.selectedLvl2)
      retVal += this.toBase32(this.selectedLvl3)
      retVal += this.toBase32(this.selectedLvl4)
      retVal += this.toBase32(this.selectedSapp1)
      retVal += this.toBase32(this.selectedSapp2)
      retVal += this.toBase32(this.selectedRuby1)
      retVal += this.toBase32(this.selectedRuby2)
      retVal += this.toBase32(this.selectedPris1)
      retVal += this.toBase32(this.selectedPris2)
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
    },
    toBase32(x){
      let xString = x.toString(32);
      if (xString.length % 2) {
        xString = '0' + xString;
      }
      return xString
    },
    fromBase32(xString){
      return parseInt(xString, 32);
    },
    setDefaultSelectedSlots() {
      let thisHero = this.selectedHero
      this.selectedSlot1 = thisHero.abilities['1'];
      this.selectedSlot2 = thisHero.abilities['2'];
      this.selectedSlot3 = thisHero.abilities['3'];
      this.selectedSlot4 = thisHero.abilities['4'];
      this.$router.push('/' + this.computedId)
    },
    handleSlotChange(e){
      switch(e.slot){
        case 1:
          this.selectedSlot1 = e.abilityId;
          break;
        case 2:
          this.selectedSlot2 = e.abilityId;
          break;
        case 3:
          this.selectedSlot3 = e.abilityId;
          break;
        case 4:
          this.selectedSlot4 = e.abilityId;
          break;
      }
      this.$router.push('/' + this.computedId)
    },
    handleTalentChange(e){
      switch(e.level){
        case 1:
          this.selectedLvl1 = e.talentId
          break;
        case 2:
          this.selectedLvl2 = e.talentId
          break;
        case 3:
          this.selectedLvl3 = e.talentId
          break;
        case 4:
          this.selectedLvl4 = e.talentId
          break;
      }
      this.$router.push('/' + this.computedId)
    },
    handleGemChange(e){
      switch(e.slot){
        case 's1':
          this.selectedSapp1 = e.gemId
          break;
        case 's2':
          this.selectedSapp2 = e.gemId
          break;
        case 'r1':
          this.selectedRuby1 = e.gemId
          break;
        case 'r2':
          this.selectedRuby2 = e.gemId
          break;
        case 'p1':
          this.selectedPris1 = e.gemId
          break;
        case 'p2':
          this.selectedPris2 = e.gemId
          break;
      }
      this.$router.push('/' + this.computedId)
    },
    parseRouterId(routerId, index, defaultValue){
      try{
        let idSubstr = routerId.substr(index*2, 2)
        return this.fromBase32(idSubstr);
      }catch(err){
        return defaultValue
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #eee;
  text-shadow: 0 0 0.3em rgba(1,130,240,0.75), 0 0 0.5em #0182f0;
  font-variant: small-caps;
  font-weight: bold;
  font-size: 2em;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 0;
}
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
select {
  height: 2em;
  font-size: 1em;
} 
</style>
