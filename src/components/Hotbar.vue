<template>
  <div>
    <fieldset><legend>Abilities</legend>
    <div class="hotbar">
      <HotbarAbility :class="{ selected: selectedSlot == 1 }" :ability="getAbility(selectedSlot1)" @click.native="toggleAbilityList(getAbility(selectedSlot1), 1)"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 2 }" :ability="getAbility(selectedSlot2)" @click.native="toggleAbilityList(getAbility(selectedSlot2), 2)"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 3 }" :ability="getAbility(selectedSlot3)" @click.native="toggleAbilityList(getAbility(selectedSlot3), 3)"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 4 }" :ability="getAbility(selectedSlot4)" @click.native="toggleAbilityList(getAbility(selectedSlot4), 4)"></HotbarAbility>
      <HotbarAbility :ability="getAbility(signature)"></HotbarAbility>
    </div>
    </fieldset>
    <div v-if="selectedSlot > 0" class="abilityList">
      <div>Select an Ability</div>
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
    "selectedSlot1": Number,
    "selectedSlot2": Number,
    "selectedSlot3": Number,
    "selectedSlot4": Number,
    "signature": Number
  },
  components: {
    HotbarAbility
  },
  data () {
    return {
      abilities: [],
      selectedSlot: 0,
      abilityList: []
    }
  },
  created (){
    let $vm = this;
    axios.get(process.env.BASE_URL + 'abilities.json').then((result) => {
      $vm.abilities = result.data;
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
      this.selectedSlot = 0;
      this.$emit('slotchange', { "slot": index, "abilityId": abilityId })
    }
  }
  
}
</script>

<style scoped>
  .hotbar {
    overflow: auto;
    height: 9.7em;
  }
  .abilityList {
    margin-top: -30px;
    margin-left: 3px;
    padding: 1em;
    position: absolute;
    background-color: rgba(27,34,66,1.0);
    border: 1px solid #B3B4B7;
    width: 91%;
    box-shadow: 3px 3px #333333;
  }
  fieldset {
    margin-top: 2em;
  }
  .selected::after {
    content: "^";
    color: #eee;
    text-shadow: 0 0 0.3em rgba(1,130,240,0.75), 0 0 0.5em #0182f0;
    font-variant: small-caps;
    font-weight: bold;
    font-size: 1.2em;
    padding-bottom: 10px;
    border-bottom: 0;
  }
</style>