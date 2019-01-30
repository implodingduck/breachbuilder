<template>
  <div style="margin-top: 1em;">
    <fieldset>
      <legend>Talents</legend>
      <label>Level 1:</label>
      <select>
        <option v-for="t in level1Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label>Level 2:</label> 
      <select>
        <option v-for="t in level2Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label>Level 3:</label> 
      <select>
        <option v-for="t in level3Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
      
      <label>Level 4:</label> 
      <select>
        <option v-for="t in level4Talents" :key="t.id" :value="t.id">{{t.talent}}</option>
      </select>
    </fieldset>
           
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    "selectedHero": Object
  },
  data () {
    return {
      talentList: []
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
  }
  
  select {
    float: left;
    width: 80%;
  }
  fieldset {
    margin-top: 2em;
  }
</style>