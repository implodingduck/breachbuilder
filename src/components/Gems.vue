<template>
  <div>
    <fieldset>
      <legend>Gems</legend>
      <label>Sapphire 1:</label>
      <select v-model="s1" @change="gemChange('s1')">
        <option v-for="gem in sapphireGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
      <label>Sapphire 2:</label>
      <select v-model="s2" @change="gemChange('s2')">
        <option v-for="gem in sapphireGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
      
      <label>Ruby 1:</label>
      <select v-model="r1" @change="gemChange('r1')">
        <option v-for="gem in rubyGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
      <label>Ruby 2:</label>
      <select v-model="r2" @change="gemChange('r2')">
        <option v-for="gem in rubyGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
      
      <label>Prismatic 1:</label>
      <select v-model="p1" @change="gemChange('p1')">
        <option v-for="gem in prismaticGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
      <label>Prismatic 2:</label>
      <select v-model="p2" @change="gemChange('p2')">
        <option v-for="gem in prismaticGems" :value="gem.id" :key="gem.id">{{gem.name}}: {{gem.desc}}</option>
      </select>
    </fieldset>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    "selectedHero": Object,
    "selectedSapp1": Number,
    "selectedSapp2": Number,
    "selectedRuby1": Number,
    "selectedRuby2": Number,
    "selectedPris1": Number,
    "selectedPris2": Number,
  },
  data () {
    return {
      gemList: [],
      s1: this.selectedSapp1,
      s2: this.selectedSapp2,
      r1: this.selectedRuby1,
      r2: this.selectedRuby2,
      p1: this.selectedPris1,
      p2: this.selectedPris2,
    }
  },
  created () {
    let $vm = this;
    axios.get('/gems.json').then((result) => {
      $vm.gemList = result.data;
    });
  },
  computed: {
    sapphireGems () {
      return this.filterGems('sapphire')      
    },
    rubyGems () {
      return this.filterGems('ruby')  
    },
    prismaticGems () {
      return this.filterGems('prismatic')  
    }
  },
  methods: {
    filterGems (gemType){
      let retVal = []
      retVal.push( { id: 0, "type": gemType, "name": "None", "desc": "" } )
      for ( let gem of this.gemList){
        if ( gem.type == gemType && (gem.school == 'Universal' || gem.school == this.selectedHero.school || ( this.selectedHero.school != 'Veil Demon' && gem.school == 'Hero')  )){
          retVal.push(gem);
        }
      }
      return retVal;
    },
    gemChange (gemSlot){
      this.$emit('gemChange', { "slot": gemSlot, "gemId": this._data[gemSlot] } )
    }
  }
}
</script>

<style scoped>
  label {
    display: block;
    width: 6em;
    float: left;
    clear: both;
    margin-bottom: 1em;
  }
  
  select {
    float: left;
    width: 80%;
  }
  fieldset {
    margin-top: 2em;
  }
</style>