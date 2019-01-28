<template>
  <div class="hotbar">
    <img :src="getAbility(slot1).icon" :alt="getAbility(slot1).name" />
    <img :src="getAbility(slot2).icon" :alt="getAbility(slot2).name" />
    <img :src="getAbility(slot3).icon" :alt="getAbility(slot3).name" />
    <img :src="getAbility(slot4).icon" :alt="getAbility(slot4).name" />
    <img :src="getAbility(signature).icon" :alt="getAbility(signature).name" />
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Hotbar',
  props: {
    "defaultAbilities": Object,
    "signature": Number
  },
  data () {
    return {
      abilities: [],
      slot1: 1,
      slot2: 2,
      slot3: 3,
      slot4: 4,
    }
  },
  created (){
    let $vm = this;
    axios.get('/abilities.json').then((result) => {
      $vm.abilities = result.data;
    });
  },
  methods: {
    getAbility (abilityId){
      for( let ability of this.abilities){
        if ( ability.id == abilityId){
          return ability
        }
      }
      return { "icon": "" }
    }
  },
  watch: {
    defaultAbilities (newVal){
      this.slot1 = newVal['1']
      this.slot2 = newVal['2']
      this.slot3 = newVal['3']
      this.slot4 = newVal['4']
      
    }
  }
  
}
</script>