<template>
  <div class="hotbarAbility">
    <img :src="ability.icon" :alt="ability.name" />
    <div class="abilityName">{{ability.name}}</div>
  </div>
</template>

<script>


export default {
  name: 'HotbarAbility',
  props: {
    "ability": Object,
  },
  created () {
  },
  data () {
    return {

    }
  },
  methods: {
    
  }
  
}
</script>

<style scoped>
  .abilityList {
    z-index: 99;
    border: 1px solid #333333;
    position: absolute;
    top: 10em;
    padding: 1em;
    width: 27em;
    background-color: rgba(27,34,66,1.0);
  }
  .abilityName {
    margin-top: -1em;
  }
  .hotbarAbility {
    float: left;
    width: 10em;
    position: relative;
    text-align: center;
  }
</style>