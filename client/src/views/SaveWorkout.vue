<template>
  <div class="row justify-content-md-center">
    <div class="header col-12">
        <h3>Save Your Workout</h3>
    </div>
    <div class="">
      <workout-lander></workout-lander>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import WorkoutLander from '@/components/WorkoutLander.vue';

export default {
  data() {
  },
  components: {
    'workout-lander': WorkoutLander,
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
