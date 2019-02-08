<template>
  <div style="margin-top: 1em;">
    <fieldset>
      <legend>Talents</legend>
      <label for="talent1">Level 1:</label>
      <model-select id="talent1" v-model="lvl1" :options="level1Talents" placeholder="Select a Talent" @input="talentChange(1)">
      </model-select>
      
      <label for="talent2">Level 2:</label> 
      <model-select id="talent2" v-model="lvl2" :options="level2Talents" placeholder="Select a Talent" @input="talentChange(2)">
      </model-select>
      
      <label for="talent3">Level 3:</label> 
      <model-select id="talent3" v-model="lvl3" :options="level3Talents" placeholder="Select a Talent" @input="talentChange(3)">
      </model-select>
      
      <label for="talent4">Level 4:</label> 
      <model-select id="talent4" v-model="lvl4" :options="level4Talents" placeholder="Select a Talent" @input="talentChange(4)">
      </model-select>
    </fieldset>
           
    
  </div>
</template>

<script>
import { ModelSelect } from 'vue-search-select'
import TalentsJson from '../../public/talents.json'

export default {
  props: {
    "selectedHero": Object,
    "selectedLvl1": Number,
    "selectedLvl2": Number,
    "selectedLvl3": Number,
    "selectedLvl4": Number
  },
  components: {
    ModelSelect
  },
  data () {
    return {
      talentList: TalentsJson,
      lvl1: this.selectedLvl1,
      lvl2: this.selectedLvl2,
      lvl3: this.selectedLvl3,
      lvl4: this.selectedLvl4
      
    }
  },
  created (){

  },
  methods: {
    levelXTalents ( level ){
      let retVal = []
      let school = (this.selectedHero) ? this.selectedHero.school : '';
      for( let t of this.talentList){
        if( 
          (t.school == school || 
            (t.school == 'mage' && school != 'Veil Demon')
          ) && t.levels.indexOf(level) > -1  ){
          retVal.push({
            "value": t.id,
            "text": t.talent
          });  
        }
      }
      return retVal;
    },
    talentChange( level ){
      let talentId = 0
      switch(level){
        case 1: 
          talentId = this.lvl1;
          break;
        case 2: 
          talentId = this.lvl2;
          break;
        case 3: 
          talentId = this.lvl3;
          break;
        case 4: 
          talentId = this.lvl4;
          break;
          
      }
      this.$emit('talentChange', { 'level': level, 'talentId': talentId })
    }
  },
  computed: {
    level1Talents(){
      return this.levelXTalents(1)
    },
    level2Talents(){
      return this.levelXTalents(2)
    },
    level3Talents(){
      return this.levelXTalents(3)
    },
    level4Talents(){
      return this.levelXTalents(4)
    }
  }
}

</script>

<style scoped>
  label {
    display: block;
    width: 4.5em;
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