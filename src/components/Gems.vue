<template>
  <div>
    <fieldset>
      <legend>Gems</legend>
      <label>Sapphire 1:</label>
      <model-select v-model="s1" :options="sapphireGems" placeholder="Select a Gem" @input="gemChange('s1')">
      </model-select>

      <label>Sapphire 2:</label>
      <model-select v-model="s2" :options="sapphireGems" placeholder="Select a Gem" @input="gemChange('s2')">
      </model-select>
      
      <label>Ruby 1:</label>
      <model-select v-model="r1" :options="rubyGems" placeholder="Select a Gem" @input="gemChange('r1')">
      </model-select>
      
      <label>Ruby 2:</label>
      <model-select v-model="r2" :options="rubyGems" placeholder="Select a Gem" @input="gemChange('r2')">
      </model-select>
      
      <label>Prismatic 1:</label>
      <model-select v-model="p1" :options="prismaticGems" placeholder="Select a Gem" @input="gemChange('p1')">
      </model-select>

      <label>Prismatic 2:</label>
      <model-select v-model="p2" :options="prismaticGems" placeholder="Select a Gem" @input="gemChange('p2')">
      </model-select>
    </fieldset>
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select'


export default {
  props: {
    "selectedHero": Object,
    "selectedSapp1": Number,
    "selectedSapp2": Number,
    "selectedRuby1": Number,
    "selectedRuby2": Number,
    "selectedPris1": Number,
    "selectedPris2": Number,
    "gemList": Array
  },
  components: {
    ModelSelect
  },
  data () {
    return {
      s1: this.selectedSapp1,
      s2: this.selectedSapp2,
      r1: this.selectedRuby1,
      r2: this.selectedRuby2,
      p1: this.selectedPris1,
      p2: this.selectedPris2,
    }
  },
  created () {

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
      retVal.push( { "value": 0, "text": "None: "  } )
      for ( let gem of this.gemList){
        if ( gem.type == gemType && (gem.school == 'Universal' || gem.school == this.selectedHero.school || ( this.selectedHero.school != 'Veil Demon' && gem.school == 'Hero')  )){
          retVal.push({
            "value": gem.id,
            "text": gem.name + ": " +gem.desc
          });
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
    margin-top: .25em;
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