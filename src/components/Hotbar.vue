<template>
  <div style="position: relative;">
    <div class="abilitydesc" v-if="desc" v-html="desc"></div>
    <fieldset><legend>Abilities</legend>
    <div class="hotbar">
      <HotbarAbility :class="{ selected: selectedSlot == 1 }" :ability="getAbility(selectedSlot1)" @abilityClicked="toggleAbilityList(getAbility(selectedSlot1), 1, $event)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 2 }" :ability="getAbility(selectedSlot2)" @abilityClicked="toggleAbilityList(getAbility(selectedSlot2), 2, $event)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 3 }" :ability="getAbility(selectedSlot3)" @abilityClicked="toggleAbilityList(getAbility(selectedSlot3), 3, $event)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
      <HotbarAbility :class="{ selected: selectedSlot == 4 }" :ability="getAbility(selectedSlot4)" @abilityClicked="toggleAbilityList(getAbility(selectedSlot4), 4, $event)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
      <HotbarAbility :ability="getAbility(signature)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
    </div>
    </fieldset>
    <div v-if="selectedSlot > 0" class="abilityList" :style="yPos">
      <div>Select an Ability for Slot {{selectedSlot}}</div>
      <span v-for="ability in abilityList" :key="ability.id">
         <HotbarAbility :ability="ability" @abilityClicked="selectAbility(ability.id, selectedSlot)" @mouseover="mouseover" @mouseleave="mouseleave"></HotbarAbility>
      </span>
    </div>
  </div>
</template>

<script>
import HotbarAbility from './HotbarAbility'


export default {
  name: 'Hotbar',
  props: {
    "defaultAbilities": Object,
    "selectedSlot1": Number,
    "selectedSlot2": Number,
    "selectedSlot3": Number,
    "selectedSlot4": Number,
    "signature": Number,
    "abilities": Array,
    "spelldescs": Object
  },
  components: {
    HotbarAbility
  },
  data () {
    return {
      selectedSlot: 0,
      abilityList: [],
      yPos: "top: 0px",
      desc: ''
    }
  },
  created (){
  
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
    toggleAbilityList (slotAbility, index, event){
      if( this.selectedSlot == index ) {
        this.selectedSlot = 0;
      }else{
        this.selectedSlot = index;
        this.abilityList = this.findAbilities(slotAbility.school, slotAbility.type);
        if( location.host == 'breach.gamepedia.com'){
          this.yPos = 'top: 25px;'
        }else{
          this.yPos = 'top: ' + (event.target.getBoundingClientRect().top - 120 + window.scrollY) + 'px;'
        }
        
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
    },
    mouseover(ability){
      if(this.spelldescs.hasOwnProperty(ability.name)){
        this.desc = this.spelldescs[ability.name];
      }
      
    },
    mouseleave(){
      this.desc = '';
    }
  }
  
}
</script>

<style scoped>
  
  .abilityList {
    margin-left: 3px;
    padding: .5em;
    position: absolute;
    background-color: rgba(27,34,66,1.0);
    border: 1px solid #B3B4B7;
    width: 88%;
    box-shadow: 3px 3px #333333;
    z-index: 80;
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
    border-bottom: 0;
    margin-left: -.3em;
    position: absolute;
  }
  
  .abilitydesc {
    position:absolute;
    z-index: 90;
    border: 1px solid #B3B4B7;
    width: 90%;
    margin-left: 1em;
    padding: .5em;
    background-color: rgba(27,34,66,1.0);
    
  }

</style>