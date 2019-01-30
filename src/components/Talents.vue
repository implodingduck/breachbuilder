<template>
  <div style="margin-top: 1em;">
    <fieldset>
      <legend>Talents</legend>
      <label for="talent1">Level 1:</label>
      <select id="talent1" v-model="lvl1" @change="talentChange(1)">
        <option v-for="t in level1Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label for="talent2">Level 2:</label> 
      <select id="talent2" v-model="lvl2" @change="talentChange(2)">
        <option v-for="t in level2Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label for="talent3">Level 3:</label> 
      <select id="talent3" v-model="lvl3" @change="talentChange(3)">
        <option v-for="t in level3Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label for="talent4">Level 4:</label> 
      <select id="talent4" v-model="lvl4" @change="talentChange(4)">
        <option v-for="t in level4Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
    </fieldset>
           
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    "selectedHero": Object,
    "selectedLvl1": Number,
    "selectedLvl2": Number,
    "selectedLvl3": Number,
    "selectedLvl4": Number
  },
  data () {
    return {
      talentList: [],
      lvl1: this.selectedLvl1,
      lvl2: this.selectedLvl2,
      lvl3: this.selectedLvl3,
      lvl4: this.selectedLvl4
      
    }
  },
  created (){
    let $vm = this;
    axios.get('/talents.json').then((result) => {
      $vm.talentList = result.data;
    });
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
          retVal.push(t);  
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