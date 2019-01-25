<template>
  <div class="hotbar">
    I am a hot bar
    {{defaultAbilities}}
  </div>
</template>

<script>
export default {
  props: {
    "defaultAbilities": Object
  }
}
</script>