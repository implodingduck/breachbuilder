<template>
  <div class="hotbarAbility">
    <button @click.prevent="abilityClicked"><img :src="ability.icon" :alt="ability.name" /></button>
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
    abilityClicked: function(e) {
      this.$emit('abilityClicked', e)
    }
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
    margin-bottom: 1em;
    position: relative;
    text-align: center;
  }
  button {
    background-color: transparent;
    border: none;
  }
  img:focus, button:focus {
    border: none;
    outline:0;
  }
</style>