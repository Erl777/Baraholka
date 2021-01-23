<template>
  <button
    type="button"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot></slot>
  </button>
</template>

<script>
    export default {
        name: "buttonBase",
    }
</script>

<style scoped>

</style>
