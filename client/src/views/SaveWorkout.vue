<template>
  <div class="row justify-content-md-center">
    <div class="header col-12">
        <h3>Save Your Workout</h3>
    </div>
    <div class="">
      <create-workout></create-workout>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CreateWorkout from '@/components/CreateWorkout.vue';

export default {
  data() {
  },
  components: {
    'create-workout': CreateWorkout,
  },
  created() {
    this.$store.commit('updateSaveOnlyVariable', true);
  },
};
</script>

<style scoped>
  h3 {
    font-size: 30px;
    color: rgba(255,255,255,.75);
  }

</style>
