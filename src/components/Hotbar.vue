<template>
  <div>
    <div class="hotbar">
      <HotbarAbility :ability="slot1" @click.native="toggleAbilityList(slot1, 1)"></HotbarAbility>
      <HotbarAbility :ability="slot2" @click.native="toggleAbilityList(slot2, 2)"></HotbarAbility>
      <HotbarAbility :ability="slot3" @click.native="toggleAbilityList(slot3, 3)"></HotbarAbility>
      <HotbarAbility :ability="slot4" @click.native="toggleAbilityList(slot4, 4)"></HotbarAbility>
      <HotbarAbility :ability="getAbility(signature)"></HotbarAbility>
    </div>
    <div v-if="selectedSlot > 0" class="abilityList">
      <span v-for="ability in abilityList" :key="ability.id">
         <HotbarAbility :ability="ability" @click.native="selectAbility(ability.id, selectedSlot)"></HotbarAbility>
      </span>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import HotbarAbility from './HotbarAbility'

export default {
  name: 'Hotbar',
  props: {
    "defaultAbilities": Object,
    "signature": Number
  },
  components: {
    HotbarAbility
  },
  data () {
    return {
      abilities: [],
      slot1: {},
      slot2: {},
      slot3: {},
      slot4: {},
      selectedSlot: 0,
      abilityList: []
    }
  },
  created (){
    let $vm = this;
    axios.get('/abilities.json').then((result) => {
      $vm.abilities = result.data;
      $vm.slot1 = $vm.getAbility($vm.defaultAbilities['1'])
      $vm.slot2 = $vm.getAbility($vm.defaultAbilities['2'])
      $vm.slot3 = $vm.getAbility($vm.defaultAbilities['3'])
      $vm.slot4 = $vm.getAbility($vm.defaultAbilities['4'])
    });
  },
  methods: {
    getAbility (abilityId){
      if(this.abilities){
        for( let ability of this.abilities){
          if ( ability.id == abilityId){
            return ability
          }
        }
      }
      return { "icon": "" }
    },
    toggleAbilityList (slotAbility, index){
      if( this.selectedSlot == index ) {
        this.selectedSlot = 0;
      }else{
        this.selectedSlot = index;
        this.abilityList = this.findAbilities(slotAbility.school, slotAbility.type); 
      }
      
    },
    findAbilities(school, type){
      let retVal = [];
      if(this.abilities){
        for( let ability of this.abilities){
          if( ability.school == school && ability.type == type){
            retVal.push(ability);
          }
        }  
      }
      return retVal;
    },
    selectAbility(abilityId, index){
      let ability = this.getAbility(abilityId);
      switch(index){
        case 1:
          this.slot1 = ability;
          break;
        case 2:
          this.slot2 = ability;
          break;
        case 3:
          this.slot3 = ability;
          break;  
        case 4:
          this.slot4 = ability;
          break;
      }
      this.selectedSlot = 0;
    }
  },
  watch: {
    defaultAbilities (newVal){
      this.slot1 = this.getAbility(newVal['1'])
      this.slot2 = this.getAbility(newVal['2'])
      this.slot3 = this.getAbility(newVal['3'])
      this.slot4 = this.getAbility(newVal['4'])
      
    }
  }
  
}
</script>

<style scoped>
  .hotbar {
    margin-top: 3em;
    overflow: auto;
    min-height: 7em;
  }
  .abilityList {
    margin-top: 1em;
    padding: 1em;
  }
</style>