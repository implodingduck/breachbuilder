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