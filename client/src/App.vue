<template>
  <div id="app">
    <universal-menu></universal-menu>
    <router-view/>
  </div>
</template>

<script>
import UniversalMenu from '@/components/UniversalMenu.vue';

export default {
  components: {
    'universal-menu': UniversalMenu,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
