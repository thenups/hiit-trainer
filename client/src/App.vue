<template>
  <div id="app">
    <universal-menu></universal-menu>
    <router-view/>
  </div>
</template>

<script>
import Menu from '@/components/universal/Menu.vue';

export default {
  components: {
    'universal-menu': Menu,
  },
};
</script>

<style>
#app {
  font-family: 'Verdana', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-right:0;
  margin-left:0;
}
</style>
